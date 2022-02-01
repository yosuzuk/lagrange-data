import {
    Table as MuiTable,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Paper,
} from '@mui/material';
import { DEFAULT_SORT_DIRECTION } from './utils/sorting';
import { ITable, ITableHeaderCell } from './types/ITable';

interface IProps {
    table: ITable;
    size?: 'small' | 'medium';
}

export const Table = (props: IProps) => {
    const { table, size = 'medium' } = props;
    return (
        <TableContainer component={Paper}>
            <MuiTable sx={{ minWidth: 650 }} size={size}>
                <TableHead>
                    <TableRow>
                        {table.header.map((headerCell: ITableHeaderCell) => (
                            <TableCell
                                key={headerCell.id}
                                sortDirection={headerCell.sortDirection ?? false}
                            >
                                {!!headerCell.toggleSort ? (
                                    <TableSortLabel
                                        active={!!headerCell.sortDirection}
                                        direction={headerCell.sortDirection ?? DEFAULT_SORT_DIRECTION}
                                        onClick={headerCell.toggleSort}
                                    >
                                        {headerCell.content}
                                    </TableSortLabel>
                                ) : (
                                    <>{headerCell.content}</>
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {table.rows.map(row => (
                        <TableRow key={row.id}>
                            {row.cells.map(cell => (
                                <TableCell component="th" scope="row" key={cell.id}>
                                    {cell.content}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </MuiTable>
        </TableContainer>
    );
};
