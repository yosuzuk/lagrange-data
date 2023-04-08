import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { routes } from '../../../utils/routes';
import { NavigationBar } from '../../navigation/NavigationBar';
import { PageContent } from '../../pageStructure/PageContent';
import { MapSelectedActionBar } from './MapSelectedActionBar';
import { useMemo } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { PageFooter } from '../../pageStructure/PageFooter';

const MapSelectedPage = () => {
    const [searchParams] = useSearchParams();
    const encodedMapUrl = searchParams.get('d');
    const mapUrl = useMemo<string | null>(() => encodedMapUrl ? window.atob(encodedMapUrl) : null, [encodedMapUrl]);
    const result = useQuery('map', () => fetchMapData(mapUrl));

    return (
        <>
            <NavigationBar currentRoute={routes.mapSelected.path} />
            <MapSelectedActionBar mapDataValid={false} />
            <PageContent>
                <Box component="div" p={1}>
                    {(!mapUrl) && (
                        <Alert severity="error">
                            <AlertTitle>{'Invalid map'}</AlertTitle>
                        </Alert>
                    )}
                    {result.isLoading && (
                        <Typography variant="body2">{'Loading...'}</Typography>
                    )}
                    {result.isError && (
                        <Alert severity="error">
                            <AlertTitle>{'Error'}</AlertTitle>
                            {`${result.error}`}
                        </Alert>
                    )}
                    {result.isSuccess && (
                        <Paper>
                            <Stack p={1} spacing={2}>
                                <pre>
                                    <code>
                                        {result.data}
                                    </code>
                                </pre>
                            </Stack>
                        </Paper>
                    )}
                    <div>{mapUrl}</div>
                </Box>
            </PageContent>
            <PageFooter />
        </>
    );
};

export default MapSelectedPage;

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
