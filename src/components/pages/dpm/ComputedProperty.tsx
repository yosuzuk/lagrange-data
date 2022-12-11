import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { formatNumber } from '../../../utils/numberUtils';
import { INumericOutputProperty, IOutputProperty, IUpdateOutputPropertyArguments } from './types/IOutputProperty';
import { getAdornmentForUnit } from './utils/unitUtils';

interface IProps {
    property: IOutputProperty | null;
    referenceData: IUpdateOutputPropertyArguments;
}

export const ComputedProperty = (props: IProps) => {
    const { property, referenceData } = props;

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
        <Typography variant="body2" color="text.secondary">
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
                        {`= ${property.formula.formula(referenceData)}`}
                    </Typography>
                    <Divider />
                    <Typography variant="body2">
                        {`= ${property.formula.filledFormula}`}
                    </Typography>
                    <Divider />
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
