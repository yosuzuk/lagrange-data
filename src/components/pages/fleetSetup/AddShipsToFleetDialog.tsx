import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { ResponsiveDialog } from '../../dialog/ResponsiveDialog';
import { ShipCountList } from './ShipCountList';
import { ReinforcementType } from './types/IFleetSetup';
import { IShipsForAddDialog } from './types/IShipsForAddDialog';

export interface IProps {
    title: string;
    description: string;
    ships: IShipsForAddDialog;
    reinforcement: ReinforcementType | null;
    onCancel: () => void;
    onApply: () => void;
    onChangeCount: (shipId: string, count: number) => void;
}

export const AddShipsToFleetDialog = (props: IProps) => {
    const { title, description, ships, reinforcement, onCancel, onApply, onChangeCount } = props;
    const [drawList, setDrawList] = useState<boolean>(false);

    useEffect(() => {
        const t = setTimeout(() => {
            setDrawList(true);
        }, 0);
        return () => {
            clearTimeout(t);
        };
    }, []);

    return (
        <ResponsiveDialog
            title={title}
            content={(
                <Stack spacing={2}>
                    <Typography variant="body2">{description}</Typography>
                    {drawList ? (
                        <ShipCountList
                            shipsForAddDialog={ships}
                            showCost={!reinforcement}
                            showReinforcement={false}
                            onChangeCount={onChangeCount}
                        />
                    ) : (
                        <Stack spacing={1}>
                            <Skeleton variant="rectangular" height={90} />
                            <Skeleton variant="rectangular" animation="wave" height={90} />
                            <Skeleton variant="rectangular" height={90} />
                            <Skeleton variant="rectangular" animation="wave" height={90} />
                            <Skeleton variant="rectangular" height={90} />
                        </Stack>
                    )}
                </Stack>
            )}
            actions={(
                <>
                    <Button variant="outlined" onClick={onCancel}>
                        {'キャンセル'}
                    </Button>
                    <Button variant="contained" onClick={onApply}>
                        {'ＯＫ'}
                    </Button>
                </>
            )}
            onClose={onCancel}
        />
    );
};
