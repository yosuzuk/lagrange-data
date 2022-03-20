import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ActionBar } from '../../actionBar/ActionBar';
import { ShipGroupingButton } from './ShipGroupingButton';
import { AddShipsButton } from './AddShipsButton';
import { ReinforcementType } from './types/IFleetSetup';

interface IProps {
    grouping: string;
    onChangeGrouping: (grouping: string) => void;
    onCancel: () => void;
    onSave: () => void;
    onReset: () => void;
    onOpenAddShips: (reinforcement: ReinforcementType | null, filter?: string) => void;
    saveDisabled: boolean;
}

export const FleetSetupEditActionBar = (props: IProps) => {
    const {
        grouping,
        onChangeGrouping,
        onCancel,
        onSave,
        onReset,
        onOpenAddShips,
        saveDisabled,
    } = props;

    

    return (
        <ActionBar
            left={buttonProps => (
                <>
                    <ShipGroupingButton
                        value={grouping}
                        onChange={onChangeGrouping}
                        buttonProps={buttonProps}
                    />
                    <AddShipsButton
                        onOpenAddShips={onOpenAddShips}
                        buttonProps={buttonProps}
                    />
                </>
            )}
            right={buttonProps => (
                <>
                    <Button
                        key="reset"
                        variant="outlined"
                        startIcon={<DeleteForeverIcon />}
                        onClick={onReset}
                        {...buttonProps}
                    >
                        {'初期化'}
                    </Button>
                    <Button
                        key="cancel"
                        variant="outlined"
                        startIcon={<CancelIcon />}
                        onClick={onCancel}
                        {...buttonProps}
                    >
                        {'キャンセル'}
                    </Button>
                    <Button
                        key="save"
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={onSave}
                        disabled={saveDisabled}
                        {...buttonProps}
                    >
                        {'保存'}
                    </Button>
                </>
            )}
        />
    );
}
