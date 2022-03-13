import SpokeIcon from '@mui/icons-material/Spoke';
import { IFleetSetup } from './types/IFleetSetup';
import { ButtonMenu, IButtonMenuOption } from '../../buttonMenu/ButtonMenu';
import { useMemo } from 'react';

interface IProps {
    fleetSetups: IFleetSetup[];
    fleetSetup: IFleetSetup;
    onChange: (fleetKey: string) => void;
    fullWidth?: boolean;
}

export const FleetSelectionButton = (props: IProps) => {
    const { fleetSetups, fleetSetup, onChange, fullWidth } = props;

    const options: IButtonMenuOption[] = useMemo(() => fleetSetups.map(f => ({
        key: f.key,
        text: f.name,
        value: f.key,
    })), [fleetSetups]);

    return (
        <>
            <ButtonMenu
                icon={<SpokeIcon />}
                text={'艦隊選択'}
                value={fleetSetup.key}
                options={options}
                onClick={onChange}
                fullWidth={fullWidth}
            />
        </>
    );
};
