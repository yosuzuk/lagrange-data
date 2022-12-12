import { LabeledList } from '../../list/LabeledList';
import { FormControl } from './FormControl';
import { IInputProperty } from './types/IInputProperty';

interface IProps<T> {
    properties: T;
    onChange: (newInputProperty: IInputProperty) => void;
    isVisibleProperty: (property: IInputProperty, allProperties: T) => boolean;
}

export const PropertiesForm = <T extends {}>(props: IProps<T>) => {
    const { properties, onChange, isVisibleProperty } = props;

    return (
        <LabeledList
            rows={
                (Object.values(properties) as IInputProperty[])
                    .filter(inputProperty => isVisibleProperty(inputProperty, properties))
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
