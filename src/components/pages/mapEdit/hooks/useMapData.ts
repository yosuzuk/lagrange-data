import { useCallback, useEffect, useMemo, useState } from 'react';
import { UseQueryResult } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { routes } from '../../../../utils/routes';
import { IMapData, IParseMapContentError } from '../types/IMapContent';
import { parseMapData } from '../utils/mapDataParser';
import { useQueryMapData } from './useQueryMapData';

type Mode = 'edit' | 'view';

interface IHookResult {
    mode: Mode;
    mapUrl: string | null;
    queryResult: UseQueryResult<string | null, unknown>;
    input: string;
    mapData: IMapData | null;
    parseError: IParseMapContentError | null;
    setEditMode: () => void;
    cancelEditMode: () => void;
    setInput: (input: string) => void;
    applyInput: () => void;
    validateInput: () => void;
}

export const useMapData = (): IHookResult => {
    const [searchParams, setSearchParams] = useSearchParams();
    const encodedMapUrl = searchParams.get('d');
    const mapUrl = useMemo<string | null>(() => encodedMapUrl ? window.atob(encodedMapUrl) : null, [encodedMapUrl]);
    const queryResult = useQueryMapData(mapUrl);

    const [mode, setMode] = useState<Mode>('view');
    const [input, setInput] = useState<string>('');
    const [lastValidMapData, setLastValidMapData] = useState<IMapData | null>(null);
    const [lastValidInput, setLastValidInput] = useState<string>('');
    const [parseError, setParseError] = useState<IParseMapContentError | null>(null);

    // update query parameter
    useEffect(() => {
        if (encodedMapUrl) {
            setSearchParams(routes.mapSelected.createSearchParams({
                d: encodedMapUrl,
                mode,
            }));
        }
    }, [encodedMapUrl, mode]);

    // apply loaded initial data
    useEffect(() => {
        if (queryResult.isSuccess && queryResult.data) {
            setInput(queryResult.data);

            const [mapData, parseError] = parseMapData(queryResult.data);
            if (parseError) {
                console.warn(`Failed to parse map data: ${parseError.message} (line: ${parseError.line})`);
                setParseError(parseError);
                setMode('edit');
                return;
            }
            setLastValidInput(queryResult.data);
            setLastValidMapData(mapData);
        }
    }, [queryResult.isSuccess, queryResult.data]);

    // apply manual input
    const applyInput = useCallback(() => {
        const [mapData, parseError] = parseMapData(input);
        if (parseError) {
            console.warn(`Failed to parse map data: ${parseError.message} (line: ${parseError.line})`);
            setParseError(parseError);
            return;
        }
        setParseError(null);
        setLastValidInput(input);
        setLastValidMapData(mapData);
        setMode('view');
    }, [input]);

    // just validate
    const validateInput = useCallback(() => {
        const [_mapData, parseError] = parseMapData(input);
        if (parseError) {
            console.warn(`Failed to parse map data: ${parseError.message} (line: ${parseError.line})`);
            setParseError(parseError);
            return;
        }
        setParseError(null);
    }, [input]);

    const setEditMode = useCallback(() => {
        setMode('edit');
    }, []);

    const cancelEditMode = useCallback(() => {
        setParseError(null);
        setInput(lastValidInput);
        setMode('view');
    }, [lastValidInput]);

    return {
        mode,
        mapUrl,
        queryResult,
        input,
        mapData: lastValidMapData,
        parseError,
        setEditMode,
        cancelEditMode,
        setInput,
        applyInput,
        validateInput,
    };
}
