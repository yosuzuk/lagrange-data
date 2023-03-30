import { ReactNode, createContext, useState, useMemo, useCallback, useContext } from 'react';

interface ICursorControlContextValue {
    setCursorToPointer: () => void;
    setCursorToDefault: () => void;
}

const CursorControlContext = createContext<ICursorControlContextValue>({
    setCursorToPointer: () => { },
    setCursorToDefault: () => { },
});

const CursorValueContext = createContext('default');

export const CursorProvider = ({ children }: { children: ReactNode }) => {
    const [cursor, setCursor] = useState<string>('default');

    const setCursorToPointer = useCallback(() => {
        setCursor('pointer');
    }, []);

    const setCursorToDefault = useCallback(() => {
        setCursor('default');
    }, []);

    const contextValue = useMemo<ICursorControlContextValue>(() => ({
        setCursorToPointer,
        setCursorToDefault,
    }), [setCursorToPointer, setCursorToDefault]);

    return (
        <CursorControlContext.Provider value={contextValue} >
            <CursorValueContext.Provider value={cursor}>
                {children}
            </CursorValueContext.Provider>
        </CursorControlContext.Provider>
    );
};

export const useCursorControl = () => {
    return useContext(CursorControlContext);
};

export const useCursorValue = () => {
    return useContext(CursorValueContext);
};
