import { ReactNode } from 'react';
import { css } from '@emotion/css';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

const classes = {
    root: css`
        position: sticky;
        top: 48px;
        z-index: 1;
    `,
};

interface Props {
    left?: ReactNode;
    right?: ReactNode;
}

export const ActionBar = (props: Props) => {
    const { left, right } = props;

    return (
        <Paper square={true} className={classes.root}>
            <Container maxWidth="md" disableGutters={true}>
                <Box p={0.5}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        
                        flexWrap="wrap"
                    >
                        <Box p={0.5}>
                            <Stack
                                direction="row"
                                justifyContent="flex-end"
                                alignItems="center"
                                spacing={1}
                            >
                                {left}
                            </Stack>
                        </Box>
                        <Box p={0.5}>
                            <Stack
                                direction="row"
                                justifyContent="flex-end"
                                alignItems="center"
                                spacing={1}
                            >
                                {right}
                            </Stack>
                        </Box>
                    </Stack>
                </Box>
            </Container>
        </Paper>
    );
}
