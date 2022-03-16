import AddIcon from '@mui/icons-material/Add';
import { ButtonProps } from '@mui/material/Button';
import { ButtonMenu } from '../../buttonMenu/ButtonMenu';

interface IProps {
    onOpenAddShips: (filter?: string) => void;
    onOpenAddSelfReinforcement: (filter?: string) => void;
    onOpenAddAllyReinforcement: (filter?: string) => void;
    addShipsDisabled: boolean;
    addReinforcementDisabled: boolean;
    filter?: string;
    buttonProps?: ButtonProps;
}

export const AddShipsButton = (props: IProps) => {
    const {
        onOpenAddShips,
        onOpenAddSelfReinforcement,
        onOpenAddAllyReinforcement,
        addShipsDisabled,
        addReinforcementDisabled,
        filter,
        buttonProps,
    } = props;

    const handleClickAddOption = (value: string) => {
        switch (value) {
            case 'addInitialShip': {
                onOpenAddShips(filter);
                break;
            }
            case 'addSelfReinforcement': {
                onOpenAddSelfReinforcement(filter);
                break;
            }
            case 'addAllyReinforcement': {
                onOpenAddAllyReinforcement(filter);
                break;
            }
        }
    };

    return (
        <ButtonMenu
            icon={<AddIcon />}
            text={'艦船を追加'}
            onClick={handleClickAddOption}
            buttonProps={{
                ...buttonProps,
                disabled: addShipsDisabled && addReinforcementDisabled
            }}
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
