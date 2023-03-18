import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { GridSide, IGridData } from './types/IGridData';
import { useGridContainerWidth } from './hooks/useGridContainerWidth';
import { GridSideControl } from './GridSideControl';
import { useCellContent } from './hooks/useCellContent';
import { GridCellContent } from './GridCellContent';

const GRID_CONTROL_SIZE = 50;
const ROOT_PADDING = 8;

const GridContainer = styled(Box)<BoxProps>(({ theme }) => ({
    display: 'grid',
    gap: '1px',
    flexGrow: 1,
}));

const GridCell = styled(Box)<BoxProps>(({ theme }) => ({
    display: 'flex',
    aspectRatio: '1 / 1',
    overflow: 'hidden',
    outline: '1px dashed #7bacbb',
    '&:hover': {
        backgroundColor: 'rgb(137 214 255 / 10%)',
    },
    cursor: 'pointer',
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

    const innerColumnCount = gridData.maxX - gridData.minX + 1;
    const innerRowCount = gridData.maxY - gridData.minY + 1;
    const innerColumnOffset = 1;
    const innerRowOffset = 1;

    const { gridContainerWidth } = useGridContainerWidth({
        gridData,
        gridControlSize: GRID_CONTROL_SIZE,
        rootPadding: ROOT_PADDING,
    });

    const { cellContentById } = useCellContent({
        gridData,
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
                        <GridSideControl side="left" onAddCells={onAddCells} onRemoveCells={onRemoveCells} removeDisabled={innerColumnCount === 1} />
                    </GridControlCell>
                    <GridControlCell sx={{ gridRow: `2 / ${2 + innerRowCount}`, gridColumn: innerColumnCount + 2 }}>
                        <GridSideControl side="right" onAddCells={onAddCells} onRemoveCells={onRemoveCells} removeDisabled={innerColumnCount === 1} />
                    </GridControlCell>
                    <GridControlCell sx={{ gridColumn: `2 / ${2 + innerColumnCount}` }}>
                        <GridSideControl side="top" onAddCells={onAddCells} onRemoveCells={onRemoveCells} removeDisabled={innerRowCount === 1} />
                    </GridControlCell>
                    <GridControlCell sx={{ gridRow: innerRowCount + 2, gridColumn: `2 / ${2 + innerColumnCount}` }}>
                        <GridSideControl side="bottom" onAddCells={onAddCells} onRemoveCells={onRemoveCells} removeDisabled={innerRowCount === 1} />
                    </GridControlCell>
                    {[...Array(innerRowCount)].flatMap((_r, ri) => {
                        const y = ri + gridData.minY;
                        return [...Array(innerColumnCount)].map((_c, ci) => {
                            const x = ci + gridData.minX;
                            const id = `${x}/${y}`;
                            return (
                                <GridCell
                                    key={id}
                                    sx={{
                                        gridColumn: x - gridData.minX + innerColumnOffset + 1,
                                        gridRow: y - gridData.minY + innerRowOffset + 1,
                                    }}
                                >
                                    <GridCellContent id={id} x={x} y={y} content={cellContentById[id] ?? []} />
                                </GridCell>
                            );
                        })
                    })}
                </GridContainer>
            </Box >
        </Stack >
    );
};
