import { useMemo } from 'react';
import { ButtonProps } from '@mui/material/Button';
import SpokeIcon from '@mui/icons-material/Spoke';
import { IFleetSetup } from './types/IFleetSetup';
import { ButtonMenu, IButtonMenuOption } from '../../buttonMenu/ButtonMenu';
import { t } from '../../../i18n';

interface IProps {
    fleetSetups: IFleetSetup[];
    fleetSetup: IFleetSetup;
    onChange: (fleetKey: string) => void;
    buttonProps?: ButtonProps;
}

export const FleetSelectionButton = (props: IProps) => {
    const { fleetSetups, fleetSetup, onChange, buttonProps } = props;

    const options: IButtonMenuOption[] = useMemo(() => fleetSetups.map(f => ({
        key: f.key,
        text: f.name,
        value: f.key,
    })), [fleetSetups]);

    return (
        <>
            <ButtonMenu
                icon={<SpokeIcon />}
                text={t('fleetSetup.selectFleet')}
                value={fleetSetup.key}
                options={options}
                onClick={onChange}
                buttonProps={buttonProps}
            />
        </>
    );
};
