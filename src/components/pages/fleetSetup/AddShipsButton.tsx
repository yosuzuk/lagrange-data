import AddIcon from '@mui/icons-material/Add';
import { ButtonProps } from '@mui/material/Button';
import { t } from '../../../i18n';
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
            case 'addAlly2Reinforcement': {
                onOpenAddShips('ally2', filter);
                break;
            }
            case 'addAlly3Reinforcement': {
                onOpenAddShips('ally3', filter);
                break;
            }
        }
    };

    return (
        <ButtonMenu
            icon={<AddIcon />}
            text={t('fleetSetup.addShips')}
            onClick={handleClickAddOption}
            buttonProps={buttonProps}
            options={[
                {
                    key: 'addInitialShip',
                    text: t('fleetSetup.normalAssignment'),
                    value: 'addInitialShip',
                },
                {
                    key: 'addSelfReinforcement',
                    text: t('fleetSetup.reinforcement'),
                    value: 'addSelfReinforcement',
                },
                {
                    key: 'addAllyReinforcement',
                    text: t('fleetSetup.orgReinforcementA'),
                    value: 'addAllyReinforcement',
                },
                {
                    key: 'addAlly2Reinforcement',
                    text: t('fleetSetup.orgReinforcementB'),
                    value: 'addAlly2Reinforcement',
                },
                {
                    key: 'addAlly3Reinforcement',
                    text: t('fleetSetup.orgReinforcementC'),
                    value: 'addAlly3Reinforcement',
                },
            ]}
        />
    );
}
