import { useCallback, useEffect, useMemo, useState, SetStateAction, Dispatch } from 'react';
import { UseQueryResult } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { routes } from '../../../../utils/routes';
import { IMapContent, IMapData, IParseMapContentError } from '../types/IMapContent';
import { MapInteractionMode } from '../types/Mode';
import { parseLines } from '../utils/codeUtils';
import { parseMapData } from '../utils/mapDataParser';
import { useQueryMapData } from './useQueryMapData';

interface IHookResult {
    mode: MapInteractionMode;
    mapUrl: string | null;
    queryResult: UseQueryResult<string | null, unknown>;
    input: string;
    mapData: IMapData | null;
    parseError: IParseMapContentError | null;
    setMode: Dispatch<SetStateAction<MapInteractionMode>>;
    cancelEditMode: () => void;
    setInput: (input: string) => void;
    applyInput: () => void;
    validateInput: () => void;
    removeContent: (content: IMapContent) => void;
}

export const useMapData = (): IHookResult => {
    const [searchParams, setSearchParams] = useSearchParams();
    const encodedMapUrl = searchParams.get('d');
    const mapUrl = useMemo<string | null>(() => encodedMapUrl ? window.atob(encodedMapUrl) : null, [encodedMapUrl]);
    const queryResult = useQueryMapData(mapUrl);

    const [mode, setMode] = useState<MapInteractionMode>('view');
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

    const cancelEditMode = useCallback(() => {
        setParseError(null);
        setInput(lastValidInput);
        setMode('view');
    }, [lastValidInput]);

    const removeContent = useCallback((content: IMapContent) => {
        const lines = parseLines(input);
        const lineIndex = content.lineNumber - 1;
        if (lineIndex < 0 || lineIndex > lines.length) {
            throw new Error(`Invalid line number "${content.lineNumber}" for content "${content.id}", lines: "${lines.length}"`);
        }
        const newLines = [...lines];
        newLines.splice(lineIndex, 1);
        const result = [...newLines].join('\n');

        const [mapData, parseError] = parseMapData(result);
        if (parseError) {
            throw new Error(`${parseError.message}, line: ${parseError.line}`);
        }
        setInput(result);
        setLastValidInput(result);
        setLastValidMapData(mapData);
    }, [input]);

    return {
        mode,
        mapUrl,
        queryResult,
        input,
        mapData: lastValidMapData,
        parseError,
        setMode,
        cancelEditMode,
        setInput,
        applyInput,
        validateInput,
        removeContent,
    };
}
