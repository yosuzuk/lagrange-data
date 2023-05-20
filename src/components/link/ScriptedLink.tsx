import { ReactNode } from 'react';
import Link from '@mui/material/Link';

interface IProps {
    children: ReactNode;
    onClick: () => void;
}

export const ScriptedLink = (props: IProps) => {
    const { children, onClick } = props;
    return (
        <Link
            href="#"
            onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                onClick();
            }}
        >
            {children}
        </Link>
    );
};
