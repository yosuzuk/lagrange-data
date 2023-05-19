import { ShipFilterState } from '../../filter/types/ShipFilterState';
import { ShipTypeFilterButton } from '../../filter/ShipTypeFilterButton';
import { ActionBar } from '../../actionBar/ActionBar';
import { ShipType } from '../../../types/ShipType';

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
                        shipRows={[]}
                        manufacturer={[]}
                        researchManufacturer={false}
                        researchStrategyTypes={false}
                        researchTacticTypes={false}
                        shipSources={[]}
                        shipTypes={[
                            ShipType.AUXILIARY,
                            ShipType.CARRIER,
                            ShipType.BATTLE_CRUISER,
                            ShipType.CRUISER,
                            ShipType.CORVETTE,
                        ]}
                    />
                </>
            )}
        />
    );
}
