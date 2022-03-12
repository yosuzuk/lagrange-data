import { Fragment } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { ILabeledListRow } from './types/ILabeledListRow';
import { LabeledListRowValue } from './LabeledListRowValue';

interface IProps extends BoxProps {
    rows: ILabeledListRow[];
    offsetValue?: boolean;
    rowGap?: number;
}

export const LabeledList = (props: IProps) => {
    const { rows, sx, offsetValue = true, rowGap = 3 } = props;
    const theme = useTheme();
    const verticalAlignment = useMediaQuery(theme.breakpoints.down('sm'));

    if (verticalAlignment) {
        return (
            <Stack spacing={rowGap}>
                {rows.map(row => (
                    <Stack spacing={1} key={row.key}>
                        <Typography variant="body2" color="text.secondary">{row.label}</Typography>
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
                gridTemplateColumns: 'auto auto',
                gap: rowGap,
                ...sx,
            }}
        >
            {rows.map(row => (
                <Fragment key={row.key}>
                    <Typography variant="body2" color="text.secondary">{row.label}</Typography>
                    <LabeledListRowValue row={row} verticalAlignment={verticalAlignment} />
                </Fragment>
            ))}
        </Box>
    );
};
