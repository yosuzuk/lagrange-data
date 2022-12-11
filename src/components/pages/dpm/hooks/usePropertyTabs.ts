import { useState, useCallback, useRef, useEffect } from 'react';
import { IInputProperty } from '../types/IInputProperty';
import { IPropertyTab } from '../types/ITab';

const MAX_TAB_COUNT = 5;

interface IHookArguments<T> {
    idPrefix: string;
    tabNamePrefix: string;
    propertyFactoryFn: () => T;
}

export const usePropertyTabs = <T>(args: IHookArguments<T>) => {
    const { idPrefix, tabNamePrefix, propertyFactoryFn } = args;

    const [tabs, setTabs] = useState<IPropertyTab<T>[]>(() => [
        createEmptyTab<T>(idPrefix, tabNamePrefix, propertyFactoryFn),
    ]);
    const [tabIndex, setTabIndex] = useState<number>(0);
    const tabIdToSelectRef = useRef<string | null>(null);

    const addTab = useCallback(() => {
        const newTab = createEmptyTab(idPrefix, tabNamePrefix, propertyFactoryFn);
        tabIdToSelectRef.current = newTab.id;
        setTabs(tabs => tabs.length >= MAX_TAB_COUNT ? tabs : [...tabs, newTab]);
    }, [idPrefix, tabNamePrefix, propertyFactoryFn]);

    const removeTab = useCallback((id: string) => {
        setTabIndex(0);
        setTabs(tabs => tabs.filter(tab => tab.id !== id));
    }, []);

    const renameTab = useCallback((id: string, name: string) => {
        setTabs(tabs => tabs.map(tab => tab.id !== id ? tab : { ...tab, name }));
    }, []);

    const changeProperty = useCallback((id: string, property: IInputProperty) => {
        setTabs(tabs => tabs.map(tab => {
            if (tab.id !== id) {
                return tab;
            }

            return {
                ...tab,
                properties: {
                    ...tab.properties,
                    [property.id]: property,
                },
            };
        }));
    }, []);

    // switch to newest tab
    useEffect(() => {
        if (tabIdToSelectRef.current === null) {
            return;
        }
        const targetIndex = tabs.findIndex(t => t.id === tabIdToSelectRef.current);
        if (tabIndex !== targetIndex) {
            setTabIndex(targetIndex);
        }
        tabIdToSelectRef.current = null;
    }, [tabs, tabIndex]);

    return {
        tabIndex,
        canAddTab: tabs.length < MAX_TAB_COUNT,
        tabs,
        setTabIndex,
        addTab,
        removeTab,
        renameTab,
        changeProperty,
    };
};

let idCounter = 0;
function createEmptyTab<T>(idPrefix: string, tabNamePrefix: string, propertyFactoryFn: (() => T)): IPropertyTab<T> {
    const idNumber = idCounter++;
    return {
        id: `${idPrefix}${idNumber}`,
        name: '',
        defaultName: (index: number) => `${tabNamePrefix}${index + 1}`, // TODO translate
        properties: propertyFactoryFn(),
    };
}
