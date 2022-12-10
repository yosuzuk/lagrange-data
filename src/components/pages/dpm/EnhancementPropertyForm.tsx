import { useCallback } from 'react';
import { LabeledList } from '../../list/LabeledList';
import { FormControl } from './FormControl';
import { IWeaponEnhancementProperties, IInputProperty } from './types/IInputProperty';

interface IProps {
    tabId: string;
    properties: IWeaponEnhancementProperties;
    onChange: (tabId: string, newInputProperty: IInputProperty) => void;
}

export const EnhancementPropertyForm = (props: IProps) => {
    const { tabId, properties, onChange } = props;

    const handleChange = useCallback((newInputProperty: IInputProperty) => {
        console.log(newInputProperty);
        onChange(tabId, newInputProperty);
    }, [onChange, tabId]);

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
