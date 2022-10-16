import { LabeledList } from '../../list/LabeledList';
import { FormControl } from './FormControl';
import { IDpmCalcBaseProperties, IInputProperty } from './types/IDpmCalcInput';
import { isVisibleBaseProperty } from './utils/dpmCalcInputUtils';


interface IProps {
    properties: IDpmCalcBaseProperties;
    onChange: (newInputProperty: IInputProperty) => void;
}

export const BasePropertyForm = (props: IProps) => {
    const { properties, onChange } = props;

    return (
        <LabeledList
            rows={
                (Object.values(properties) as IInputProperty[])
                    .filter(inputProperty => isVisibleBaseProperty(inputProperty, properties))
                    .map(inputProperty => ({
                        key: inputProperty.id,
                        label: inputProperty.label,
                        value: (
                            <FormControl
                                inputProperty={inputProperty}
                                onChange={onChange}
                            />
                        ),
                    }))
            }
        />
    );
};
