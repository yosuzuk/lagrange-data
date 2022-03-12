import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

interface IProps {
    left?: (fullWidth: boolean) => ReactNode;
    right?: (fullWidth: boolean) => ReactNode;
}

export const ActionBar = (props: IProps) => {
    const { left, right } = props;
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Paper square={true} sx={{ position: 'sticky', top: '48px', zIndex: 1 }}>
            <Container maxWidth="md" disableGutters={true}>
                <Box
                    p={1}
                    sx={matches ? {
                        display: 'flex',
                        direction: 'row',
                        justifyContent: 'space-between',
                        columnGap: theme.spacing(1),
                    } : {
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(155px, 1fr))',
                        justifyContent: 'space-between',
                        columnGap: theme.spacing(1),
                        rowGap: theme.spacing(1),
                    }}
                >
                    {left?.(!matches)}
                    {matches && <Box flexGrow={1} />}
                    {right?.(!matches)}
                </Box>
            </Container>
        </Paper>
    );
}
