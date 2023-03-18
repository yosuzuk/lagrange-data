import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { GridSide } from './types/IGridData';

interface IProps {
    side: GridSide;
    onAddCells: (side: GridSide) => void;
    onRemoveCells: (side: GridSide) => void;
    removeDisabled: boolean;
}

export const GridSideControl = (props: IProps) => {
    const { side, onAddCells, onRemoveCells, removeDisabled } = props;

    return (
        <Stack spacing={1} direction={(side === 'left' || side === 'right') ? 'column' : 'row'}>
            <IconButton color="primary" component="label" onClick={() => onAddCells(side)}>
                <AddIcon />
            </IconButton>
            <IconButton color="primary" component="label" onClick={() => onRemoveCells(side)} disabled={removeDisabled}>
                <RemoveIcon />
            </IconButton>
        </Stack>
    );
};
