import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ShipFilterState } from '../../filter/types/ShipFilterState';
import { ShipTypeFilterButton } from '../../filter/ShipTypeFilterButton';
import { ActionBar } from '../../actionBar/ActionBar';

interface IProps {
    shipFilter: ShipFilterState;
    onCancel: () => void;
    onSave: () => void;
    onReset: () => void;
    onFilter: (filter: ShipFilterState) => void;
}

export const MyListEditActionBar = (props: IProps) => {
    const {
        shipFilter,
        onCancel,
        onSave,
        onReset,
        onFilter,
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
                        key="save"
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={onSave}
                    >
                        {'保存'}
                    </Button>
                </>
            )}
            right={(
                <>
                    <Button
                        key="reset"
                        variant="outlined"
                        startIcon={<DeleteForeverIcon />}
                        onClick={onReset}
                    >
                        {'初期化'}
                    </Button>
                    <Button
                        key="cancel"
                        variant="outlined"
                        startIcon={<CancelIcon />}
                        onClick={onCancel}
                    >
                        {'キャンセル'}
                    </Button>
                </>
            )}
        />
    );
}
