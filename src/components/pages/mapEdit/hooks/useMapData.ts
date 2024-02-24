import { useCallback, useEffect, useMemo, useState, SetStateAction, Dispatch } from 'react';
import { useSearchParams } from 'react-router-dom';
import { routes } from '../../../../utils/routes';
import { IMapContent, IMapData, IParseMapContentError } from '../types/IMapContent';
import { MapInteractionMode } from '../types/Mode';
import { parseLines } from '../utils/codeUtils';
import { parseMapData } from '../utils/mapDataParser';
import { useMutateMapData, useQueryMapData } from './useQueryMapData';
import { MutationState } from '../types/MutationState';
import { isExampleMapUrl } from '../examples/examplesMaps';
import { joinMapData } from '../utils/mapDataUtils';

interface IHookResult {
    mode: MapInteractionMode;
    mapUrl: string | null;
    input: string;
    mapData: IMapData | null;
    parseError: IParseMapContentError | null;
    targetToMark: IMapContent | null;
    loading: boolean;
    saving: boolean;
    isError: boolean;
    error: unknown | null;
    changeState: MutationState;
    allowSave: boolean;
    focusedLineNumber: number | null;
    setMode: Dispatch<SetStateAction<MapInteractionMode>>;
    cancelEditMode: () => void;
    setInput: (input: string) => void;
    applyInput: () => void;
    validateInput: () => void;
    saveInput: (editKey: string) => void;
    editContent: (content: IMapContent) => void;
    removeContent: (content: IMapContent) => void;
    markTarget: Dispatch<SetStateAction<IMapContent | null>>;
}

export const useMapData = (): IHookResult => {
    const [searchParams, setSearchParams] = useSearchParams();
    const encodedMapUrl = searchParams.get('d');
    const mapUrl = useMemo<string | null>(() => encodedMapUrl ? window.atob(encodedMapUrl) : null, [encodedMapUrl]);
    const mapDataQueryResult = useQueryMapData(mapUrl);
    const mapDataMutation = useMutateMapData();
    const allowSave = useMemo<boolean>(() => !!mapUrl && !isExampleMapUrl(mapUrl), [mapUrl]);

    const [mode, setMode] = useState<MapInteractionMode>('interactive');
    const [focusedLineNumber, setFocusedLineNumber] = useState<number | null>(null);
    const [changeState, setChangeState] = useState<MutationState>('noData');
    const [input, setInput] = useState<string>('');
    const [lastValidMapData, setLastValidMapData] = useState<IMapData | null>(null);
    const [lastValidInput, setLastValidInput] = useState<string>('');
    const [importedMapData, setImportedMapData] = useState<IMapData[] | null>(null);
    const [parseError, setParseError] = useState<IParseMapContentError | null>(null);
    const [targetToMark, setTargetToMark] = useState<IMapContent | null>(null);

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
        if (mapDataQueryResult.isSuccess && mapDataQueryResult.data) {
            setInput(mapDataQueryResult.data.primaryContent);

            const [mapData, parseError] = parseMapData(mapDataQueryResult.data.primaryContent);
            if (parseError) {
                console.warn(`Failed to parse map data: ${parseError.message} (line: ${parseError.line})`);
                setParseError(parseError);
                setMode('edit');
                return;
            }
            setLastValidInput(mapDataQueryResult.data.primaryContent);
            setLastValidMapData(mapData);
            if (mapUrl && !isExampleMapUrl(mapUrl)) {
                window.localStorage.setItem('lastMapUrl', mapUrl);
            }
        }
    }, [mapDataQueryResult.isSuccess, mapDataQueryResult.data, mapUrl]);

    // apply loaded data from imported maps
    useEffect(() => {
        if (mapDataQueryResult.isSuccess && mapDataQueryResult.data) {
            if (mapDataQueryResult.data.importedMapContent.length === 0) {
                return setImportedMapData([]);
            }
            const mapDataList: IMapData[] = [];
            mapDataQueryResult.data.importedMapContent.forEach((mapContent: string, index: number) => {
                const [mapData, parseError] = parseMapData(mapContent, `map${index + 1}_`);
                if (parseError) {
                    console.warn(`Failed to parse map data of imported map ${index + 1}: ${parseError.message} (line: ${parseError.line})`);
                    return;
                }
                mapDataList.push(mapData);
            });
            setImportedMapData(mapDataList);
        }
    }, [mapDataQueryResult.isSuccess, mapDataQueryResult.data]);

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
        setMode('interactive');
        setChangeState('unsaved');
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

    // save map
    const saveInput = useCallback((editKey: string) => {
        if (parseError || !mapUrl || mapDataMutation.isLoading) {
            return;
        }
        mapDataMutation.mutate({
            mapUrl,
            mapData: input,
            key: editKey,
        }, {
            onSuccess: () => {
                setChangeState('saved');
            },
            onError: () => {
                setChangeState('unsaved');
            },
        });
    }, [mapUrl, input, parseError, mapDataMutation]);

    const cancelEditMode = useCallback(() => {
        setParseError(null);
        setInput(lastValidInput);
        setMode('interactive');
    }, [lastValidInput]);

    const editContent = useCallback((content: IMapContent) => {
        setMode('edit');
        setFocusedLineNumber(content.lineNumber);
    }, []);

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

        setTargetToMark(target => (target && target.id === content.id) ? null : target);
        setInput(result);
        setLastValidInput(result);
        setLastValidMapData(mapData);
        setChangeState('unsaved');
    }, [input]);

    useEffect(() => {
        setTargetToMark(null);
    }, [mode]);

    useEffect(() => {
        setFocusedLineNumber(null);
    }, [input]);

    // join map data for rendering
    const mapData = useMemo<IMapData | null>(() => {
        if (lastValidMapData === null || importedMapData === null) {
            return null;
        }
        return joinMapData([lastValidMapData, ...importedMapData]);
    }, [lastValidMapData, importedMapData]);

    return {
        mode,
        mapUrl,
        input,
        mapData,
        parseError,
        targetToMark,
        loading: !mapDataQueryResult.isFetched || mapDataQueryResult.isLoading,
        saving: mapDataMutation.isLoading,
        isError: mapDataQueryResult.isError || mapDataMutation.isError,
        error: mapDataQueryResult.error ?? mapDataMutation.error ?? null,
        changeState,
        allowSave,
        focusedLineNumber,
        setMode,
        cancelEditMode,
        setInput,
        applyInput,
        validateInput,
        saveInput,
        editContent,
        removeContent,
        markTarget: setTargetToMark,
    };
}
