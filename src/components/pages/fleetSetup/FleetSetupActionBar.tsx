import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import ShareIcon from '@mui/icons-material/Share';
import { ActionBar } from '../../actionBar/ActionBar';
import { FleetSelectionButton } from './FleetSelectionButton';
import { IFleetSetup } from './types/IFleetSetup';

interface IProps {
    fleetSetups: IFleetSetup[];
    fleetSetup: IFleetSetup;
    onChangeFleet: (fleetKey: string) => void;
    onEdit: () => void;
    onShare: () => void;
}

export const FleetSetupActionBar = (props: IProps) => {
    const {
        fleetSetups,
        fleetSetup,
        onChangeFleet,
        onEdit,
        onShare,
    } = props;

    return (
        <ActionBar
            left={(fullWidth: boolean) => (
                <>
                    <FleetSelectionButton
                        fleetSetups={fleetSetups}
                        fleetSetup={fleetSetup}
                        onChange={onChangeFleet}
                        fullWidth={fullWidth}
                    />
                    <Button
                        key="edit"
                        variant="outlined"
                        startIcon={<SettingsIcon />}
                        onClick={onEdit}
                        fullWidth={fullWidth}
                    >
                        {'編集'}
                    </Button>
                </>
            )}
            right={(fullWidth: boolean) => (
                <>
                    <Button
                        key="share"
                        variant="outlined"
                        startIcon={<ShareIcon />}
                        onClick={onShare}
                        fullWidth={fullWidth}
                    >
                        {'共有'}
                    </Button>
                </>
            )}
        />
    );
}
