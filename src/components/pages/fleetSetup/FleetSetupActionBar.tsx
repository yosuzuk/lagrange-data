import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import ShareIcon from '@mui/icons-material/Share';
import { ActionBar } from '../../actionBar/ActionBar';

interface IProps {
    onEdit: () => void;
    onShare: () => void;
}

export const FleetSetupActionBar = (props: IProps) => {
    const {
        onEdit,
        onShare,
    } = props;

    return (
        <ActionBar
            left={(fullWidth: boolean) => (
                <>
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
