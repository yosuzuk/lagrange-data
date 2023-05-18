import { ShipFilterState } from '../../filter/types/ShipFilterState';
import { ShipTypeFilterButton } from '../../filter/ShipTypeFilterButton';
import { ActionBar } from '../../actionBar/ActionBar';

interface IProps {
    shipFilter: ShipFilterState;
    onFilterChange: (filter: ShipFilterState) => void;
}

export const TechPointConfigActionBar = (props: IProps) => {
    const {
        shipFilter,
        onFilterChange,
    } = props;

    return (
        <ActionBar
            left={buttonProps => (
                <>
                    <ShipTypeFilterButton
                        key="filter"
                        filter={shipFilter}
                        onChange={onFilterChange}
                        buttonProps={buttonProps}
                    />
                </>
            )}
        />
    );
}
