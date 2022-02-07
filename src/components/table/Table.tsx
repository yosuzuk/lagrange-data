import {
    Table as MuiTable,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Typography,
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
            <MuiTable size={size}>
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
                                        {typeof headerCell.content === 'string' ? (
                                            <Typography variant="body2">{headerCell.content}</Typography>
                                        ) : (
                                            <>{headerCell.content}</>
                                        )}
                                    </TableSortLabel>
                                ) : (
                                    <>
                                        {typeof headerCell.content === 'string' ? (
                                            <Typography variant="body2">{headerCell.content}</Typography>
                                        ) : (
                                            <>{headerCell.content}</>
                                        )}
                                    </>
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
                                    {typeof cell.content === 'string' ? (
                                        <Typography variant="body2">{cell.content}</Typography>
                                    ) : (
                                        <>{cell.content}</>
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </MuiTable>
        </TableContainer>
    );
};
