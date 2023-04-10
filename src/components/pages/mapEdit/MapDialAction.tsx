import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { routes } from '../../../utils/routes';
import { t } from '../../../i18n';

interface IProps {
    onEdit: () => void;
}

export const MapDialAction = (props: IProps) => {
    const { onEdit } = props;
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleClickEdit = useCallback(() => {
        setOpen(false);
        onEdit();
    }, [onEdit]);

    const handleClickExit = useCallback(() => {
        navigate(routes.map.path);
    }, [navigate]);

    return (
        <SpeedDial
            ariaLabel='menu'
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            sx={{
                position: 'absolute',
                bottom: '8px',
                right: '8px',
            }}
            icon={(
                <SpeedDialIcon />
            )}
            FabProps={{
                sx: {
                    backgroundColor: 'rgba(255,255,255,0.2)',
                }
            }}
        >
            <SpeedDialAction
                icon={<EditIcon color="primary" />}
                FabProps={{
                    sx: {
                        border: '1px solid lightgrey',
                    },
                }}
                onClick={handleClickEdit}
                tooltipTitle={t('button.edit')}
                tooltipOpen={true}
            />
            <SpeedDialAction
                icon={<ExitToAppIcon color="primary" />}
                FabProps={{
                    sx: {
                        border: '1px solid lightgrey',
                    },
                }}
                onClick={handleClickExit}
                tooltipTitle={t('button.exit')}
                tooltipOpen={true}
            />
        </SpeedDial>
    );
};
