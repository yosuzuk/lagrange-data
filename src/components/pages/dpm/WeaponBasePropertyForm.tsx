import { LabeledList } from '../../list/LabeledList';
import { FormControl } from './FormControl';
import { IWeaponBaseProperties, IInputProperty } from './types/IInputProperty';
import { isVisibleWeaponBaseProperty } from './utils/dpmCalcInputUtils';

interface IProps {
    properties: IWeaponBaseProperties;
    onChange: (newInputProperty: IInputProperty) => void;
}

export const WeaponBasePropertyForm = (props: IProps) => {
    const { properties, onChange } = props;

    return (
        <LabeledList
            rows={
                (Object.values(properties) as IInputProperty[])
                    .filter(inputProperty => isVisibleWeaponBaseProperty(inputProperty, properties))
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
