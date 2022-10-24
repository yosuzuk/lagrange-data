import { useState, useCallback } from 'react';
import { IInputProperty } from '../types/IDpmCalcInput';
import { IEnhancementTab } from '../types/ITab';
import { createDpmCalcEnhancementProperties } from '../utils/dpmCalcInputUtils';

const MAX_TAB_COUNT = 5;

export const useEnhancementTabs = () => {
    const [enhancementTabs, setEnhancementTabs] = useState<IEnhancementTab[]>(createInitialEnhancementTabs);
    const [enhancementTabIndex, setEnhancementTabIndex] = useState<number>(0);

    const addEnhancementTab = useCallback(() => {
        setEnhancementTabs(tabs => tabs.length >= MAX_TAB_COUNT ? tabs : [...tabs, createEmptyTab()]);
    }, []);

    const removeEnhancementTab = useCallback((id: string) => {
        setEnhancementTabs(tabs => tabs.filter(tab => tab.id !== id));
        setEnhancementTabIndex(0);
    }, []);

    const renameEnhancementTab = useCallback((id: string, name: string) => {
        setEnhancementTabs(tabs => tabs.map(tab => tab.id !== id ? tab : { ...tab, name }));
    }, []);

    const changeEnhancementProperty = useCallback((id: string, property: IInputProperty) => {
        setEnhancementTabs(tabs => tabs.map(tab => {
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

    return {
        enhancementTabIndex,
        canAddEnhancementTab: enhancementTabs.length < MAX_TAB_COUNT,
        enhancementTabs,
        setEnhancementTabIndex,
        addEnhancementTab,
        removeEnhancementTab,
        renameEnhancementTab,
        changeEnhancementProperty,
    };
};

function createInitialEnhancementTabs(): IEnhancementTab[] {
    return [
        createEmptyTab(),
    ];
}

let idCounter = 0;
function createEmptyTab(): IEnhancementTab {
    const idNumber = idCounter++;
    return {
        id: `enhancementTab${idNumber}`,
        name: '',
        defaultName: (index: number) => `スキル設定${index + 1}`, // TODO translate
        properties: createDpmCalcEnhancementProperties(),
    };
}
