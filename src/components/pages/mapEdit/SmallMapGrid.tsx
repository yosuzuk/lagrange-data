import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { styled } from '@mui/material/styles';
import { GridSide, IGridData } from './types/IGridData';
import { useGridContainerWidth } from './hooks/useGridContainerWidth';

const GRID_CONTROL_SIZE = 50;
const ROOT_PADDING = 8;

const GridContainer = styled(Box)<BoxProps>(({ theme }) => ({
    display: 'grid',
    gap: '1px',
    flexGrow: 1,
}));

const GridCell = styled(Box)<BoxProps>(({ theme }) => ({
    aspectRatio: '1 / 1',
    overflow: 'hidden',
    outline: '1px dashed #7bacbb',
    '&:hover': {
        backgroundColor: 'rgb(137 214 255 / 10%)',
    },
}));

const GridControlCell = styled(Box)<BoxProps>(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

interface IProps {
    gridData: IGridData;
    onAddCells: (side: GridSide) => void;
    onRemoveCells: (side: GridSide) => void;
}

export const SmallMapGrid = (props: IProps) => {
    const { gridData, onAddCells, onRemoveCells } = props;

    const innerColumnCount = gridData.maxColumnIndex - gridData.minColumnIndex + 1;
    const innerRowCount = gridData.maxRowIndex - gridData.minRowIndex + 1;
    const innerColumnOffset = 1;
    const innerRowOffset = 1;

    const { gridContainerWidth } = useGridContainerWidth({
        gridData,
        gridControlSize: GRID_CONTROL_SIZE,
        rootPadding: ROOT_PADDING,
    });

    return (
        <Stack sx={{ padding: `${ROOT_PADDING}px` }} direction="row" justifyContent="center">
            <Box
                sx={{
                    width: gridContainerWidth,
                }}
            >
                <GridContainer
                    sx={{
                        gridTemplateColumns: `${GRID_CONTROL_SIZE}px repeat(${innerColumnCount}, 1fr) ${GRID_CONTROL_SIZE}px`,
                        gridTemplateRows: `${GRID_CONTROL_SIZE}px repeat(${innerRowCount}, 1fr) ${GRID_CONTROL_SIZE}px`,
                    }}
                >
                    <GridControlCell sx={{ gridRow: `2 / ${2 + innerRowCount}` }}>
                        {/* LEFT */}
                        <Stack spacing={1}>
                            <IconButton color="primary" component="label" onClick={() => onAddCells('left')}>
                                <AddIcon />
                            </IconButton>
                            <IconButton color="primary" component="label" onClick={() => onRemoveCells('left')} disabled={innerColumnCount === 1}>
                                <RemoveIcon />
                            </IconButton>
                        </Stack>
                    </GridControlCell>
                    <GridControlCell sx={{ gridRow: `2 / ${2 + innerRowCount}`, gridColumn: innerColumnCount + 2 }}>
                        {/* RIGHT */}
                        <Stack spacing={1}>
                            <IconButton color="primary" component="label" onClick={() => onAddCells('right')}>
                                <AddIcon />
                            </IconButton>
                            <IconButton color="primary" component="label" onClick={() => onRemoveCells('right')} disabled={innerColumnCount === 1}>
                                <RemoveIcon />
                            </IconButton>
                        </Stack>
                    </GridControlCell>
                    <GridControlCell sx={{ gridColumn: `2 / ${2 + innerColumnCount}` }}>
                        {/* TOP */}
                        <Stack spacing={1} direction="row">
                            <IconButton color="primary" component="label" onClick={() => onAddCells('top')}>
                                <AddIcon />
                            </IconButton>
                            <IconButton color="primary" component="label" onClick={() => onRemoveCells('top')} disabled={innerRowCount === 1}>
                                <RemoveIcon />
                            </IconButton>
                        </Stack>
                    </GridControlCell>
                    <GridControlCell sx={{ gridRow: innerRowCount + 2, gridColumn: `2 / ${2 + innerColumnCount}` }}>
                        {/* BOTTOM */}
                        <Stack spacing={1} direction="row">
                            <IconButton color="primary" component="label" onClick={() => onAddCells('bottom')}>
                                <AddIcon />
                            </IconButton>
                            <IconButton color="primary" component="label" onClick={() => onRemoveCells('bottom')} disabled={innerRowCount === 1}>
                                <RemoveIcon />
                            </IconButton>
                        </Stack>
                    </GridControlCell>
                    {[...Array(innerRowCount)].flatMap((_r, ri) => {
                        const y = ri + gridData.minRowIndex;
                        return [...Array(innerColumnCount)].map((_c, ci) => {
                            const x = ci + gridData.minColumnIndex;
                            const id = `${x}/${y}`;
                            return (
                                <GridCell
                                    key={id}
                                    sx={{
                                        gridColumn: x - gridData.minColumnIndex + innerColumnOffset + 1,
                                        gridRow: y - gridData.minRowIndex + innerRowOffset + 1,
                                    }}
                                >
                                    {`(${x}/${y})`}
                                </GridCell>
                            );
                        })
                    })}
                </GridContainer>
            </Box >
        </Stack >
    );
};
