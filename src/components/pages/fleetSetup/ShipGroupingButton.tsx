import SortIcon from '@mui/icons-material/Sort';
import { ButtonMenu } from '../../buttonMenu/ButtonMenu';
import { GroupAndSortOption } from './utils/shipGroupingUtils';

interface IProps {
    value: string;
    onChange: (value: string) => void;
    fullWidth?: boolean;
}

export const ShipGroupingButton = (props: IProps) => {
    const { value, onChange, fullWidth } = props;

    return (
        <>
            <ButtonMenu
                icon={<SortIcon />}
                text={'表示'}
                value={value}
                options={[
                    {
                        key: GroupAndSortOption.GROUP_BY_ROW_SORT_BY_TYPE_AND_NAME,
                        text: '配置別、艦種→名前順',
                        value: GroupAndSortOption.GROUP_BY_ROW_SORT_BY_TYPE_AND_NAME,
                    },
                    {
                        key: GroupAndSortOption.GROUP_BY_TYPE_SORT_BY_NAME,
                        text: '艦種別、名前順',
                        value: GroupAndSortOption.GROUP_BY_TYPE_SORT_BY_NAME,
                    },
                    {
                        key: GroupAndSortOption.SORT_BY_TYPE_AND_NAME,
                        text: '艦種→名前順',
                        value: GroupAndSortOption.SORT_BY_TYPE_AND_NAME,
                    },
                    {
                        key: GroupAndSortOption.SORT_BY_NAME,
                        text: '名前順',
                        value: GroupAndSortOption.SORT_BY_NAME,
                    },
                ]}
                onClick={onChange}
                fullWidth={fullWidth}
            />
        </>
    );
};
