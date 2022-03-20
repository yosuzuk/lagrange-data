import AddIcon from '@mui/icons-material/Add';
import { ButtonProps } from '@mui/material/Button';
import { ButtonMenu } from '../../buttonMenu/ButtonMenu';
import { ReinforcementType } from './types/IFleetSetup';

interface IProps {
    onOpenAddShips: (reinforcement: ReinforcementType | null, filter?: string) => void;
    filter?: string;
    buttonProps?: ButtonProps;
}

export const AddShipsButton = (props: IProps) => {
    const {
        onOpenAddShips,
        filter,
        buttonProps,
    } = props;

    const handleClickAddOption = (value: string) => {
        switch (value) {
            case 'addInitialShip': {
                onOpenAddShips(null, filter);
                break;
            }
            case 'addSelfReinforcement': {
                onOpenAddShips('self', filter);
                break;
            }
            case 'addAllyReinforcement': {
                onOpenAddShips('ally', filter);
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
