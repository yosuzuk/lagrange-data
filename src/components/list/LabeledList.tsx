import { Fragment } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import { ILabeledListRow } from './types/ILabeledListRow';

interface IProps extends BoxProps {
    rows: ILabeledListRow[];
}

export const LabeledList = (props: IProps) => {
    const { rows, sx } = props;
    return (
        <Box
            sx={{
                display: 'inline-grid',
                gridTemplateColumns: 'auto auto',
                gap: 3,
                ...sx,
            }}
        >
            {rows.map(row => (
                <Fragment key={row.key}>
                    <Typography variant="body2">{row.label}</Typography>
                    <Typography variant="body2">{row.value}</Typography>
                </Fragment>
            ))}
        </Box>
    );
};
