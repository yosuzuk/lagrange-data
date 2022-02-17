import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import ShareIcon from '@mui/icons-material/Share';
import { ShipFilterState } from '../../filter/types/ShipFilterState';
import { ShipTypeFilterButton } from '../../filter/ShipTypeFilterButton';
import { ActionBar } from '../../actionBar/ActionBar';

interface IProps {
    shipFilter: ShipFilterState;
    onEdit: () => void;
    onShare: () => void;
    onFilter: (filter: ShipFilterState) => void;
}

export const MyListActionBar = (props: IProps) => {
    const {
        shipFilter,
        onEdit,
        onFilter,
        onShare,
    } = props;

    return (
        <ActionBar
            left={(
                <>
                    <ShipTypeFilterButton
                        key="filter"
                        filter={shipFilter}
                        onChange={onFilter}
                    />
                    <Button
                        key="edit"
                        variant="outlined"
                        startIcon={<SettingsIcon />}
                        onClick={onEdit}
                    >
                        {'マイリスト設定'}
                    </Button>
                </>
            )}
            right={(
                <>
                    <Button
                        key="share"
                        variant="outlined"
                        startIcon={<ShareIcon />}
                        onClick={onShare}
                    >
                        {'共有'}
                    </Button>
                </>
            )}
        />
    );
}
