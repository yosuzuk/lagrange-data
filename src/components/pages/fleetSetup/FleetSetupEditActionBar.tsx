import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ActionBar } from '../../actionBar/ActionBar';
import { ShipGroupingButton } from './ShipGroupingButton';
import { AddShipsButton } from './AddShipsButton';

interface IProps {
    grouping: string;
    onChangeGrouping: (grouping: string) => void;
    onCancel: () => void;
    onSave: () => void;
    onReset: () => void;
    onOpenAddShips: () => void;
    onOpenAddSelfReinforcement: () => void;
    onOpenAddAllyReinforcement: () => void;
    addShipsDisabled: boolean;
    addReinforcementDisabled: boolean;
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
        onOpenAddSelfReinforcement,
        onOpenAddAllyReinforcement,
        addShipsDisabled,
        addReinforcementDisabled,
        saveDisabled,
    } = props;

    

    return (
        <ActionBar
            left={(fullWidth: boolean) => (
                <>
                    <ShipGroupingButton
                        value={grouping}
                        onChange={onChangeGrouping}
                        fullWidth={fullWidth}
                    />
                    <AddShipsButton
                        onOpenAddShips={onOpenAddShips}
                        onOpenAddSelfReinforcement={onOpenAddSelfReinforcement}
                        onOpenAddAllyReinforcement={onOpenAddAllyReinforcement}
                        addShipsDisabled={addShipsDisabled}
                        addReinforcementDisabled={addReinforcementDisabled}
                        fullWidth={fullWidth}
                    />
                </>
            )}
            right={(fullWidth: boolean) => (
                <>
                    <Button
                        key="reset"
                        variant="outlined"
                        startIcon={<DeleteForeverIcon />}
                        onClick={onReset}
                        fullWidth={fullWidth}
                    >
                        {'初期化'}
                    </Button>
                    <Button
                        key="cancel"
                        variant="outlined"
                        startIcon={<CancelIcon />}
                        onClick={onCancel}
                        fullWidth={fullWidth}
                    >
                        {'キャンセル'}
                    </Button>
                    <Button
                        key="save"
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={onSave}
                        disabled={saveDisabled}
                        fullWidth={fullWidth}
                    >
                        {'保存'}
                    </Button>
                </>
            )}
        />
    );
}
