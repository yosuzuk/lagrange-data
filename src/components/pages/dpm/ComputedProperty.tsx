import Typography from '@mui/material/Typography';
import { formatNumber } from '../../../utils/numberUtils';
import { INumericOutputProperty, IOutputProperty } from './types/IOutputProperty';
import { getAdornmentForUnit } from './utils/unitUtils';

interface IProps {
    property: IOutputProperty | null;
}

export const ComputedProperty = (props: IProps) => {
    const { property } = props;

    // TODO show tooltip with filled formula

    return (
        <Typography variant="body2" color="text.secondary">
            {(() => {
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
            })()}
        </Typography>
    );
};
