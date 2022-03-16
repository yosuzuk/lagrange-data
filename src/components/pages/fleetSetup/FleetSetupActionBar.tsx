import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import ShareIcon from '@mui/icons-material/Share';
import { ActionBar } from '../../actionBar/ActionBar';
import { FleetSelectionButton } from './FleetSelectionButton';
import { IFleetSetup } from './types/IFleetSetup';
import { ShipGroupingButton } from './ShipGroupingButton';

interface IProps {
    fleetSetups: IFleetSetup[];
    fleetSetup: IFleetSetup;
    grouping: string;
    onChangeFleet: (fleetKey: string) => void;
    onChangeGrouping: (grouping: string) => void;
    onEdit: () => void;
    onShare: () => void;
}

export const FleetSetupActionBar = (props: IProps) => {
    const {
        fleetSetups,
        fleetSetup,
        grouping,
        onChangeFleet,
        onChangeGrouping,
        onEdit,
        onShare,
    } = props;

    return (
        <ActionBar
            left={buttonProps => (
                <>
                    <ShipGroupingButton
                        value={grouping}
                        onChange={onChangeGrouping}
                        buttonProps={buttonProps}
                    />
                    <FleetSelectionButton
                        fleetSetups={fleetSetups}
                        fleetSetup={fleetSetup}
                        onChange={onChangeFleet}
                        buttonProps={buttonProps}
                    />
                    <Button
                        key="edit"
                        variant="outlined"
                        startIcon={<SettingsIcon />}
                        onClick={onEdit}
                        {...buttonProps}
                    >
                        {'編集'}
                    </Button>
                </>
            )}
            right={buttonProps => (
                <>
                    <Button
                        key="share"
                        variant="outlined"
                        startIcon={<ShareIcon />}
                        onClick={onShare}
                        {...buttonProps}
                    >
                        {'共有'}
                    </Button>
                </>
            )}
        />
    );
}
