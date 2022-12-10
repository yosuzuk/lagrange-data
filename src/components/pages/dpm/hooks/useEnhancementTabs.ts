import { useState, useCallback, useRef, useEffect } from 'react';
import { IInputProperty } from '../types/IInputProperty';
import { IEnhancementTab } from '../types/ITab';
import { createWeaponEnhancementProperties } from '../utils/dpmCalcInputUtils';

const MAX_TAB_COUNT = 5;

export const useEnhancementTabs = () => {
    const [enhancementTabs, setEnhancementTabs] = useState<IEnhancementTab[]>(createInitialEnhancementTabs);
    const [enhancementTabIndex, setEnhancementTabIndex] = useState<number>(0);
    const tabIdToSelectRef = useRef<string | null>(null);

    const addEnhancementTab = useCallback(() => {
        const newTab = createEmptyTab();
        tabIdToSelectRef.current = newTab.id;
        setEnhancementTabs(tabs => tabs.length >= MAX_TAB_COUNT ? tabs : [...tabs, newTab]);
    }, []);

    const removeEnhancementTab = useCallback((id: string) => {
        setEnhancementTabIndex(0);
        setEnhancementTabs(tabs => tabs.filter(tab => tab.id !== id));
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

    // switch to newest tab
    useEffect(() => {
        if (tabIdToSelectRef.current === null) {
            return;
        }
        const targetIndex = enhancementTabs.findIndex(t => t.id === tabIdToSelectRef.current);
        if (enhancementTabIndex !== targetIndex) {
            setEnhancementTabIndex(targetIndex);
        }
        tabIdToSelectRef.current = null;
    }, [enhancementTabs, enhancementTabIndex]);

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
        defaultName: (index: number) => `設定${index + 1}`, // TODO translate
        properties: createWeaponEnhancementProperties(),
    };
}
