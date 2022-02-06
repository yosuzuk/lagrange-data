import { ReactNode } from 'react';
import MuiContainer from '@mui/material/Container';

interface IProps {
    children: ReactNode;
    disabled?: boolean;
}

export const Container = (props: IProps) => {
    const { children, disabled } = props;

    if (disabled) {
        return (
            <>{children}</>
        );
    }

    return (
        <MuiContainer maxWidth="md" disableGutters={true}>
            {children}
        </MuiContainer>
    )
}
