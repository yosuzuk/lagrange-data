import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import { ShipFilterState } from '../../filter/types/ShipFilterState';
import { ShipTypeFilterButton } from '../../filter/ShipTypeFilterButton';
import { ActionBar } from '../../actionBar/ActionBar';
import { IColumnConfig } from '../../columns/types/IColumnConfig';
import { ColumnConfigButton } from '../../columns/ColumnConfigButton';
import { t } from '../../../i18n';
import { SharingButtonMenu } from './SharingButtonMenu';

interface IProps {
    shipFilter: ShipFilterState;
    columnConfig: IColumnConfig;
    onEdit: () => void;
    onCopyAsText: () => void;
    onFilter: (filter: ShipFilterState) => void;
    onColumnConfigChange: (columnConfig: IColumnConfig) => void;
}

export const MyListActionBar = (props: IProps) => {
    const {
        shipFilter,
        columnConfig,
        onEdit,
        onFilter,
        onCopyAsText,
        onColumnConfigChange,
    } = props;

    return (
        <ActionBar
            left={buttonProps => (
                <>
                    <ColumnConfigButton
                        key="columnConfig"
                        columnConfig={columnConfig}
                        onChange={onColumnConfigChange}
                        disableResearchAgreementOptions={true}
                        buttonProps={buttonProps}
                    />
                    <ShipTypeFilterButton
                        key="filter"
                        filter={shipFilter}
                        onChange={onFilter}
                        researchManufacturer={false}
                        researchStrategyTypes={false}
                        researchTacticTypes={false}
                        buttonProps={buttonProps}
                    />
                    <Button
                        key="edit"
                        variant="outlined"
                        startIcon={<SettingsIcon />}
                        onClick={onEdit}
                        {...buttonProps}
                    >
                        {t('myList.editMyList')}
                    </Button>
                </>
            )}
            right={buttonProps => (
                <>
                    <SharingButtonMenu onCopyAsText={onCopyAsText} buttonProps={buttonProps} />
                </>
            )}
        />
    );
}
