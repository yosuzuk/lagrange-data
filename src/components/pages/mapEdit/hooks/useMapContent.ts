import { useEffect, useMemo, useState } from 'react';
import { IMapContent, IParseMapContentError } from '../types/IMapContent';
import { parseMapContent } from '../utils/mapContentParser';

interface IHookResult {
    mapContent: IMapContent | null;
    parseError: IParseMapContentError | null;
}

export const useMapContent = (input: string): IHookResult => {
    const [lastValidMapContent, setLastValidMapContent] = useState<IMapContent | null>(null);

    const [mapContent, parseError] = useMemo(() => {
        return parseMapContent(input);
    }, []);

    useEffect(() => {
        if (parseError) {
            console.warn(`Failed to parse map content: ${parseError.message} (line: ${parseError.line})`);
        }
        setLastValidMapContent(mapContent);
    }, [mapContent, parseError]);

    return {
        mapContent: lastValidMapContent,
        parseError,
    };
}
