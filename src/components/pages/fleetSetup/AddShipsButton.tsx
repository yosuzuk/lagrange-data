import AddIcon from '@mui/icons-material/Add';
import { ButtonMenu } from '../../buttonMenu/ButtonMenu';

interface IProps {
    onOpenAddShips: (groupId?: string) => void;
    onOpenAddSelfReinforcement: (groupId?: string) => void;
    onOpenAddAllyReinforcement: (groupId?: string) => void;
    addShipsDisabled: boolean;
    addReinforcementDisabled: boolean;
    fullWidth?: boolean;
    groupId?: string;
}

export const AddShipsButton = (props: IProps) => {
    const {
        onOpenAddShips,
        onOpenAddSelfReinforcement,
        onOpenAddAllyReinforcement,
        addShipsDisabled,
        addReinforcementDisabled,
        fullWidth,
        groupId,
    } = props;

    const handleClickAddOption = (value: string) => {
        switch (value) {
            case 'addInitialShip': {
                onOpenAddShips(groupId);
                break;
            }
            case 'addSelfReinforcement': {
                onOpenAddSelfReinforcement(groupId);
                break;
            }
            case 'addAllyReinforcement': {
                onOpenAddAllyReinforcement(groupId);
                break;
            }
        }
    };

    return (
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
    );
}
