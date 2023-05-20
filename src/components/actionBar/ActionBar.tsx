import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import { ButtonProps } from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

interface IProps {
    left?: (ButtonProps: Partial<ButtonProps>) => ReactNode;
    right?: (buttonProps: Partial<ButtonProps>) => ReactNode;
}

export const ActionBar = (props: IProps) => {
    const { left, right } = props;
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    const buttonProps: Partial<ButtonProps> = matches ? {
        fullWidth: false,
        size: 'medium',
    } : {
        fullWidth: true,
        size: 'small',
    };

    return (
        <Paper square={true} sx={{ position: 'sticky', top: '48px', zIndex: 1 }}>
            <Container maxWidth="md" disableGutters={true}>
                <Box
                    component="div"
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
                    {left?.(buttonProps)}
                    {matches && <Box component="div" flexGrow={1} />}
                    {right?.(buttonProps)}
                </Box>
            </Container>
        </Paper>
    );
}
