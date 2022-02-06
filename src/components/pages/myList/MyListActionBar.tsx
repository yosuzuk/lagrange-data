import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import { ShipFilterState } from '../../filter/types/ShipFilterState';
import { ShipTypeFilterButton } from '../../filter/ShipTypeFilterButton';
import { ActionBar } from '../../actionBar/ActionBar';

interface Props {
    shipFilter: ShipFilterState;
    onEdit: () => void;
    onShare: () => void;
    onFilter: (filter: ShipFilterState) => void;
}

export const MyListActionBar = (props: Props) => {
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
                        startIcon={<EditIcon />}
                        onClick={onEdit}
                    >
                        {'編集'}
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
