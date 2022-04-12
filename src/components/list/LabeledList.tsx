import { Fragment } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { ILabeledListRow } from './types/ILabeledListRow';
import { LabeledListRowValue } from './LabeledListRowValue';

interface IProps extends BoxProps {
    rows: ILabeledListRow[];
    offsetValue?: boolean;
    rowGap?: number;
    columnCount?: number;
    separator?: boolean;
}

export const LabeledList = (props: IProps) => {
    const { rows, sx, offsetValue = true, rowGap = 3, columnCount = 1, separator } = props;
    const theme = useTheme();
    const verticalAlignment = useMediaQuery(theme.breakpoints.down('sm'));

    if (verticalAlignment) {
        return (
            <Stack spacing={rowGap}>
                {rows.map((row, index) => (
                    <Stack spacing={1} key={row.key}>
                        {separator && index > 0 && (
                            <Divider />
                        )}
                        {(typeof row.label === 'string' || typeof row.label === 'number') ? (
                            <Typography variant="body2" color="text.secondary">{row.label}</Typography>
                        ) : (
                            <div>{row.label}</div>
                        )}
                        <Box pl={offsetValue ? 1 : 0}>
                            <LabeledListRowValue row={row} verticalAlignment={verticalAlignment} />
                        </Box>
                    </Stack>
                ))}
            </Stack>
        );
    }

    return (
        <Box
            sx={{
                display: 'inline-grid',
                gridTemplateColumns: 'auto auto '.repeat(columnCount).trim(),
                gap: rowGap,
                ...sx,
            }}
        >
            {rows.map((row, index) => (
                <Fragment key={row.key}>
                    {separator && index > 0 && index % columnCount === 0 && (
                        <Divider sx={{ gridColumn: `span ${columnCount * 2}` }} />
                    )}
                    {(typeof row.label === 'string' || typeof row.label === 'number') ? (
                        <Typography variant="body2" color="text.secondary">{row.label}</Typography>
                    ) : (
                        <div>{row.label}</div>
                    )}
                    <LabeledListRowValue row={row} verticalAlignment={verticalAlignment} />
                </Fragment>
            ))}
        </Box>
    );
};
