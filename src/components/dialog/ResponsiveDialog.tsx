import { ReactNode } from 'react';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Breakpoint, useTheme } from '@mui/material/styles';

export interface IProps {
    title?: ReactNode;
    content: ReactNode;
    actions?: ReactNode;
    onClose?: () => void;
    maxWidth?: Breakpoint | false;
    backgroundColor?: string;
    disableRestoreFocus?: boolean;
}

export const ResponsiveDialog = (props: IProps) => {
    const { title, content, actions, onClose, maxWidth = 'xs', backgroundColor, disableRestoreFocus = false } = props;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Dialog
            fullScreen={fullScreen}
            fullWidth={true}
            maxWidth={maxWidth}
            onClose={onClose}
            open={true}
            disableRestoreFocus={disableRestoreFocus}
            PaperProps={{
                sx: {
                    backgroundColor,
                }
            }}
        >
            {title && (
                <DialogTitle>{title}</DialogTitle>
            )}
            <Divider />
            <DialogContent>
                {content}
            </DialogContent>
            {actions && (
                <>
                    <Divider />
                    <DialogActions sx={{ flexWrap: 'wrap' }}>
                        {actions}
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
};
