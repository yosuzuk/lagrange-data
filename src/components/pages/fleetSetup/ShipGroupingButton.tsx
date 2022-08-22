import SortIcon from '@mui/icons-material/Sort';
import { ButtonProps } from '@mui/material/Button';
import { t } from '../../../i18n';
import { ButtonMenu } from '../../buttonMenu/ButtonMenu';
import { GroupAndSortOption } from './utils/shipGroupingUtils';

interface IProps {
    value: string;
    onChange: (value: string) => void;
    buttonProps?: ButtonProps;
}

export const ShipGroupingButton = (props: IProps) => {
    const { value, onChange, buttonProps } = props;

    return (
        <>
            <ButtonMenu
                icon={<SortIcon />}
                text={t('button.displayItems')}
                value={value}
                options={[
                    {
                        key: GroupAndSortOption.GROUP_BY_ROW_SORT_BY_TYPE_AND_NAME,
                        text: t('fleetSetup.groupByRowSortByShipTypeAndName'),
                        value: GroupAndSortOption.GROUP_BY_ROW_SORT_BY_TYPE_AND_NAME,
                    },
                    {
                        key: GroupAndSortOption.GROUP_BY_TYPE_SORT_BY_NAME,
                        text: t('fleetSetup.groupByShipTypeSortByName'),
                        value: GroupAndSortOption.GROUP_BY_TYPE_SORT_BY_NAME,
                    },
                    {
                        key: GroupAndSortOption.SORT_BY_TYPE_AND_NAME,
                        text: t('fleetSetup.sortByShipTypeAndName'),
                        value: GroupAndSortOption.SORT_BY_TYPE_AND_NAME,
                    },
                    {
                        key: GroupAndSortOption.SORT_BY_NAME,
                        text: t('fleetSetup.sortByName'),
                        value: GroupAndSortOption.SORT_BY_NAME,
                    },
                ]}
                onClick={onChange}
                buttonProps={buttonProps}
            />
        </>
    );
};
