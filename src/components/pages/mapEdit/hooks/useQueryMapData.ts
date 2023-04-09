import { useQuery } from 'react-query';

export const useQueryMapData = (mapUrl: string | null) => {
    return useQuery(`map${mapUrl}`, () => fetchMapData(mapUrl));
};

const fetchMapData = async (url: string | null): Promise<string | null> => {
    if (!url) {
        return null;
    }

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
    }

    if (!`${response.headers.get('Content-Type')}`.includes('text/plain')) {
        throw new Error(`Invalid content type (expected "text/plain" but got "${response.headers.get('Content-Type')}")`);
    }

    return response.text();
}
