import { LabeledList } from '../../list/LabeledList';
import { FormControl } from './FormControl';
import { IDpmCalcEnhancementProperties, IInputProperty } from './types/IDpmCalcInput';

interface IProps {
    properties: IDpmCalcEnhancementProperties;
    onChange: (newInputProperty: IInputProperty) => void;
}

export const EnhancementPropertyForm = (props: IProps) => {
    const { properties, onChange } = props;

    return (
        <LabeledList
            rows={
                (Object.values(properties) as IInputProperty[])
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
