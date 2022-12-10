import { useCallback, Dispatch, SetStateAction, SyntheticEvent } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import { PropertyTabContent } from './PropertyTabContent';
import { IPropertyTab } from './types/ITab';
import { IInputProperty } from './types/IInputProperty';

interface IProps<T> {
    idPrefix: string;
    tabs: IPropertyTab<T>[];
    tabIndex: number;
    canAddTab: boolean;
    addTab: () => void;
    removeTab: (id: string) => void;
    renameTab: (id: string, name: string) => void;
    changeProperty: (id: string, property: IInputProperty) => void;
    setTabIndex: Dispatch<SetStateAction<number>>;
}

export const PropertyTabs = <T extends {}>(props: IProps<T>) => {
    const { idPrefix, tabs, tabIndex, canAddTab, addTab, removeTab, renameTab, changeProperty, setTabIndex } = props;

    const handleChangeTab = useCallback((_event: SyntheticEvent, newTabIndex: number) => {
        if (newTabIndex < tabs.length) {
            setTabIndex(newTabIndex);
        }
    }, [tabs, setTabIndex]);

    return (
        <>
            <Tabs
                value={tabIndex}
                onChange={handleChangeTab}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile={true}
            >
                {tabs.map((tab, index) => (
                    <Tab label={(
                        <Typography variant="body2">
                            {tab.name || tab.defaultName(index)}
                        </Typography>
                    )} key={tab.id} />
                ))}
                {canAddTab && (
                    <Tab label={<AddIcon />} onClick={addTab} />
                )}
            </Tabs>
            <Box p={1} pt={2}>
                {tabs.map((tab, index) => [tab, index] as const).filter(([_tab, index]) => index === tabIndex).map(([tab, index]) => (
                    <PropertyTabContent
                        idPrefix={idPrefix}
                        key={tab.id}
                        tab={tab}
                        tabIndex={index}
                        canDelete={tabs.length > 1}
                        canRename={tabs.length > 1}
                        onChangeProperty={changeProperty}
                        onDeleteTab={removeTab}
                        onRename={renameTab}
                    />
                ))}
            </Box>
        </>
    );
};
