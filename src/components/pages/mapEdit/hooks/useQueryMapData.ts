import { useMutation, useQuery } from 'react-query';

export const useQueryMapData = (mapUrl: string | null) => {
    return useQuery(`map${mapUrl}`, () => fetchMapData(mapUrl));
};

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

const fetchMapData = async (url: string | null): Promise<string | null> => {
    if (!url) {
        return null;
    }

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

const putMapData = async (params: ISaveMapDataParams): Promise<void> => {
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
