import AddIcon from '@mui/icons-material/Add';
import { ButtonProps } from '@mui/material/Button';
import { ButtonMenu } from '../../buttonMenu/ButtonMenu';

interface IProps {
    onOpenAddShips: (filter?: string) => void;
    onOpenAddSelfReinforcement: (filter?: string) => void;
    onOpenAddAllyReinforcement: (filter?: string) => void;
    filter?: string;
    buttonProps?: ButtonProps;
}

export const AddShipsButton = (props: IProps) => {
    const {
        onOpenAddShips,
        onOpenAddSelfReinforcement,
        onOpenAddAllyReinforcement,
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
            buttonProps={buttonProps}
            options={[
                {
                    key: 'addInitialShip',
                    text: '通常配備',
                    value: 'addInitialShip',
                },
                {
                    key: 'addSelfReinforcement',
                    text: '増援',
                    value: 'addSelfReinforcement',
                },
                {
                    key: 'addAllyReinforcement',
                    text: 'ユニオン増援',
                    value: 'addAllyReinforcement',
                },
            ]}
        />
    );
}
