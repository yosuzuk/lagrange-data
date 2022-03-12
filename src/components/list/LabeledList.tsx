import { Fragment } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { ILabeledListRow } from './types/ILabeledListRow';
import { ScriptedLink } from '../link/ScriptedLink';

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
                    <Typography variant="body2" color="text.secondary">{row.label}</Typography>
                    {typeof row.value === 'string' || typeof row.value === 'number' ? (
                        <>
                            {row.onClick ? (
                                <Typography variant="body2">
                                    <ScriptedLink onClick={() => row.onClick?.()}>
                                        {row.value}
                                    </ScriptedLink>
                                </Typography>
                            ) : (
                                <Typography variant="body2">{row.value}</Typography>
                            )}
                        </>
                    ) : (
                        <div onClick={row.onClick}>{row.value}</div>
                    )}
                </Fragment>
            ))}
        </Box>
    );
};
