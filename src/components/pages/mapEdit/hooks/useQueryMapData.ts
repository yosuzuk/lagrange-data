import { useMutation, useQuery } from 'react-query';
import { URLSearchParams } from 'url';

export const useQueryMapData = (mapUrl: string | null) => {
    return useQuery(`map${mapUrl}`, () => fetchAllMapData(mapUrl));
};

export interface ILoadedMapData {
    primaryContent: string;
    importedMapContent: string[];
}

interface ISaveMapDataParams {
    mapUrl: string;
    mapData: string;
    key: string;
}

export const useMutateMapData = () => {
    return useMutation((params: ISaveMapDataParams) => {
        return putMapData(params);
    });
}

async function fetchAllMapData(url: string | null): Promise<ILoadedMapData | null> {
    if (!url) {
        return null;
    }

    const primaryContent = await fetchMapData(url);

    // load additional map content if original URL uses "?map=A&import=B,C,D" syntax
    if (url.includes('?')) {
        const [baseUrl, searchParams] = url.split('?');
        const params = new window.URLSearchParams(searchParams);
        const primaryMapId = params.get('map');
        const importedMapIds = params.get('import');

        if (primaryMapId && importedMapIds) {
            const importedMapIdList = importedMapIds.split(',');
            const importedMapUrls = importedMapIdList.map(id => baseUrl + '?map=' + id);

            const importedMapPromises = (importedMapUrls ?? []).map(importedMapUrl => fetchMapData(importedMapUrl));
            const importedMapContent = (importedMapPromises.length > 0 ? await Promise.allSettled(importedMapPromises) : []).map((result, index: number) => {
                if (result.status === 'fulfilled') {
                    return result.value ?? '';
                }
                console.error(`Failed to load imported map ${index + 1}`);
                return '';
            });

            return {
                primaryContent,
                importedMapContent,
            };
        }
    }

    return {
        primaryContent,
        importedMapContent: [],
    };
}

async function fetchMapData(url: string): Promise<string> {
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'text/plain',
        },
        mode: 'cors',
        cache: 'no-cache',
    });
    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
    }

    if (!`${response.headers.get('Content-Type')}`.includes('text/plain')) {
        throw new Error(`Invalid content type (expected "text/plain" but got "${response.headers.get('Content-Type')}")`);
    }

    return response.text();
}

async function putMapData(params: ISaveMapDataParams): Promise<void> {
    const { mapUrl, mapData, key } = params;
    const apiUrl = new URL(mapUrl);
    apiUrl.searchParams.append('key', key);

    const response = await fetch(`${apiUrl}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'text/plain',
        },
        body: mapData,
        mode: 'cors',
        cache: 'no-cache',
    });
    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
    }
}
