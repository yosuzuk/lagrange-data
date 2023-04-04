import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import { Container } from '../container/Container';

interface IProps {
    children: ReactNode;
    disableContainer?: boolean;
}

export const PageContent = ({ children, disableContainer }: IProps) => {
    return (
        <Box component="div" flexGrow={1}>
            <Container disabled={disableContainer}>
                {children}
            </Container>
        </Box>
    );
};
