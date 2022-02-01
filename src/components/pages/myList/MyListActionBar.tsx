import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ShareIcon from '@mui/icons-material/Share';
import { ShipFilterState } from '../../filter/types/ShipFilterState';
import { ShipTypeFilterButton } from '../../filter/ShipTypeFilterButton';
import { ActionBar } from '../../actionBar/ActionBar';

interface Props {
    editMode: boolean;
    shipFilter: ShipFilterState;
    onEdit: () => void;
    onCancel: () => void;
    onSave: () => void;
    onReset: () => void;
    onShare: () => void;
    onFilter: (filter: ShipFilterState) => void;
}

export const MyListActionBar = (props: Props) => {
    const {
        editMode,
        shipFilter,
        onEdit,
        onCancel,
        onSave,
        onReset,
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
                    {!editMode && (
                        <Button
                            key="edit"
                            variant="outlined"
                            startIcon={<EditIcon />}
                            onClick={onEdit}
                        >
                            {'編集'}
                        </Button>
                    )}
                    {editMode && (
                        <Button
                            key="save"
                            variant="contained"
                            startIcon={<SaveIcon />}
                            onClick={onSave}
                        >
                            {'保存'}
                        </Button>
                    )}
                </>
            )}
            right={(
                <>
                    {!editMode && (
                        <Button
                            key="share"
                            variant="outlined"
                            startIcon={<ShareIcon />}
                            onClick={onShare}
                        >
                            {'共有'}
                        </Button>
                    )}
                    {editMode && (
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
                </>
            )}
        />
    );
}
