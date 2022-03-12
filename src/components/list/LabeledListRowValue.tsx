import { ReactNode } from 'react';
import { RoomPreferences } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { ScriptedLink } from '../link/ScriptedLink';
import { ILabeledListRow } from './types/ILabeledListRow';

interface IProps {
    row: ILabeledListRow;
    verticalAlignment: boolean;
}

export const LabeledListRowValue = (props: IProps) => {
    const { row, verticalAlignment } = props;

    const value: ReactNode = typeof row.value === 'function' ? row.value(verticalAlignment) : row.value;

    if (!value) {
        return (
            <div />
        );
    }

    return (
        <>
            {typeof value === 'string' || typeof value === 'number' ? (
                <>
                    {row.onClick ? (
                        <Typography variant="body2">
                            <ScriptedLink onClick={() => row.onClick?.()}>
                                {value}
                            </ScriptedLink>
                        </Typography>
                    ) : (
                        <Typography variant="body2">{value}</Typography>
                    )}
                </>
            ) : (
                <div onClick={row.onClick}>{value}</div>
            )}
        </>
    );
};
