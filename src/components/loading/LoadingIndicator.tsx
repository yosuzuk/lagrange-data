import { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface IProps {
    delay?: number;
}

export const LoadingIndicator = (props: IProps) => {
    const { delay = 500 } = props;
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        const t = setTimeout(() => {
            setOpen(true);
        }, delay);
        return () => {
            clearTimeout(t);
        };
    }, [delay]);

    return (
        <Backdrop sx={{ color: '#fff' }} open={open}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}
