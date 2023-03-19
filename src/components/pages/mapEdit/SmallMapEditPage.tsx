import { useState, useCallback, useMemo, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { SmallMapGrid } from './SmallMapGrid';
import { useGridData } from './hooks/useGridData';

const SmallMapEditPage = () => {
    const { openedCellId, gridData, addCells, removeCells, toggleCell } = useGridData();

    return (
        <>
            {!openedCellId && (
                <SmallMapGrid gridData={gridData} onToggleCell={toggleCell} onAddCells={addCells} onRemoveCells={removeCells} />
            )}
            {openedCellId && (
                <button onClick={() => toggleCell(openedCellId)}>Clear</button>
            )}
            <div>AA</div>
            <div>AA</div>
            <div>AA</div>
            <div>AA</div>
            <div>AA</div>
            <div>AA</div>
            <div>AA</div>
            <div>AA</div>
            <div>AA</div>
            <div>AA</div>
            <div>AA</div>
            <div>AA</div>
            <div>AA</div>
            <div>AA</div>
            <div>AA</div>
            <div>AA</div>
            <div>AA</div>
            <div>AA</div>
            <div>AA</div>
            <div>AA</div>
            <div>AA</div>
            <div>AA</div>
            <div>AA</div>
            <div>AA</div>
            <div>AA</div>
            <div>AA</div>
            <div>AA</div>
            <div>AA</div>
            <div>AA</div>
            <div>AA</div>
            <div>AA</div>
            <div>AA</div>
            <div>AA</div>
            <div>AA</div>
            <div>AA</div>
            <div>AA</div>
            <div>AA</div>
            <div>AA</div>
            <div>AA</div>
            <div>AA</div>
            <div>AA</div>
        </>
    );
};

export default SmallMapEditPage;
