import { Fragment } from 'react';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { formatNumber } from '../../../utils/numberUtils';
import { INumericOutputProperty, IOutputProperty, IUpdateOutputPropertyArguments } from './types/IOutputProperty';
import { getAdornmentForUnit } from './utils/unitUtils';

interface IProps {
    property: IOutputProperty | null;
}

export const ComputedProperty = (props: IProps) => {
    const { property } = props;

    const value: string = (() => {
        if (!property) {
            return '-';
        }
        if (property.type === 'numeric') {
            const value = (property as INumericOutputProperty).value;
            if (value === null) {
                return '-';
            }
            const unit = (property as INumericOutputProperty).unit;
            if (!unit) {
                return formatNumber(value);
            }
            return `${formatNumber(value)} ${getAdornmentForUnit(unit)}`;
        }
        return '?';
    })();

    const valueNode = (
        <Typography component="span" variant="body2" color="text.secondary">
            {value}
        </Typography>
    );

    if (property?.formula?.formula && property?.formula?.filledFormula) {
        return (
            <Tooltip title={(
                <Stack spacing={1}>
                    <Typography variant="body2">
                        {`[${property.label}]`}
                    </Typography>
                    <Divider />
                    <Typography variant="body2">
                        {`= ${property.formula.formula}`}
                    </Typography>
                    <Divider />
                    {Array.isArray(property.formula.filledFormula) ? (
                        <>
                            {(property.formula.filledFormula as string[]).map((filledFormula, index) => (
                                <Fragment key={`filledFormula_${index}`}>
                                    <Typography variant="body2">
                                        {`= ${filledFormula}`}
                                    </Typography>
                                    <Divider />
                                </Fragment>
                            ))}
                        </>
                    ) : (
                        <>
                            <Typography variant="body2">
                                {`= ${property.formula.filledFormula}`}
                            </Typography>
                            <Divider />
                        </>
                    )}
                    <Typography variant="body2">
                        {`= ${value}`}
                    </Typography>
                    {property.formula.description && (
                        <>
                            <Divider />
                            <Typography variant="body2">
                                {property.formula.description}
                            </Typography>
                        </>
                    )}
                </Stack>
            )}>
                {valueNode}
            </Tooltip>
        );
    }

    return valueNode;
};
