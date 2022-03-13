import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ActionBar } from '../../actionBar/ActionBar';
import { ButtonMenu } from '../../buttonMenu/ButtonMenu';

interface IProps {
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

    const handleClickAddOption = (value: string) => {
        switch (value) {
            case 'addInitialShip': {
                onOpenAddShips();
                break;
            }
            case 'addSelfReinforcement': {
                onOpenAddSelfReinforcement();
                break;
            }
            case 'addAllyReinforcement': {
                onOpenAddAllyReinforcement();
                break;
            }
        }
    };

    return (
        <ActionBar
            left={(fullWidth: boolean) => (
                <>
                    <ButtonMenu
                        icon={<AddIcon />}
                        text={'艦船を追加'}
                        onClick={handleClickAddOption}
                        fullWidth={fullWidth}
                        disabled={addShipsDisabled && addReinforcementDisabled}
                        options={[
                            {
                                key: 'addInitialShip',
                                text: '通常配備',
                                value: 'addInitialShip',
                                disabled: addShipsDisabled,
                            },
                            {
                                key: 'addSelfReinforcement',
                                text: '増援',
                                value: 'addSelfReinforcement',
                                disabled: addReinforcementDisabled,
                            },
                            {
                                key: 'addAllyReinforcement',
                                text: 'ユニオン増援',
                                value: 'addAllyReinforcement',
                                disabled: addReinforcementDisabled,
                            },
                        ]}
                    />
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
                </>
            )}
        />
    );
}
