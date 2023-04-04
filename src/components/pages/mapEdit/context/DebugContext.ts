import { createContext, useContext } from 'react';

const DebugContext = createContext<boolean>(false);

export const DebugProvider = DebugContext.Provider;

export const useDebug = (): boolean => {
    return useContext(DebugContext);
}
