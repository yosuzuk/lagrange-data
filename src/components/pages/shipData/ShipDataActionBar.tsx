import { ShipFilterState } from '../../filter/types/ShipFilterState';
import { ShipTypeFilterButton } from '../../filter/ShipTypeFilterButton';
import { ColumnConfigButton } from '../../columns/ColumnConfigButton';
import { ActionBar } from '../../actionBar/ActionBar';
import { IColumnConfig } from '../../columns/types/IColumnConfig';

interface IProps {
    shipFilter: ShipFilterState;
    columnConfig: IColumnConfig;
    onFilterChange: (filter: ShipFilterState) => void;
    onColumnConfigChange: (columnConfig: IColumnConfig) => void;
}

export const ShipDataActionBar = (props: IProps) => {
    const {
        shipFilter,
        columnConfig,
        onFilterChange,
        onColumnConfigChange,
    } = props;

    return (
        <ActionBar
            left={(
                <>
                    <ColumnConfigButton
                        key="columnConfig"
                        columnConfig={columnConfig}
                        onChange={onColumnConfigChange}
                    />
                    <ShipTypeFilterButton
                        key="filter"
                        filter={shipFilter}
                        onChange={onFilterChange}
                    />
                </>
            )}
        />
    );
}
