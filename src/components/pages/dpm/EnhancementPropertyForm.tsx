import { useCallback } from 'react';
import { LabeledList } from '../../list/LabeledList';
import { FormControl } from './FormControl';
import { IDpmCalcEnhancementProperties, IInputProperty } from './types/IDpmCalcInput';

interface IProps {
    settingIndex: number;
    properties: IDpmCalcEnhancementProperties;
    onChange: (newInputProperty: IInputProperty, settingIndex: number) => void;
}

export const EnhancementPropertyForm = (props: IProps) => {
    const { settingIndex, properties, onChange } = props;

    const handleChange = useCallback((newInputProperty: IInputProperty) => {
        console.log(newInputProperty);
        onChange(newInputProperty, settingIndex);
    }, [onChange, settingIndex]);

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
                                onChange={handleChange}
                            />
                        ),
                    }))
            }
        />
    );
};
