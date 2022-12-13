import { useCallback } from 'react';
import { LabeledList } from '../../list/LabeledList';
import { FormControl } from './FormControl';
import { IInputProperty } from './types/IInputProperty';

interface IProps<T> {
    tabId: string;
    properties: T;
    onChange: (tabId: string, newInputProperty: IInputProperty) => void;
}

export const PropertyTabForm = <T extends {}>(props: IProps<T>) => {
    const { tabId, properties, onChange } = props;

    const handleChange = useCallback((newInputProperty: IInputProperty) => {
        onChange(tabId, newInputProperty);
    }, [onChange, tabId]);

    return (
        <LabeledList
            sx={{ alignItems: 'center' }}
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
