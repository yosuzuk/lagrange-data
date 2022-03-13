import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
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

    return (
        <ResponsiveDialog
            title={title}
            content={(
                <Stack spacing={2}>
                    <Typography variant="body2">{description}</Typography>
                    <ShipCountList
                        shipsForAddDialog={ships}
                        showCost={!reinforcement}
                        showReinforcement={false}
                    />
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
