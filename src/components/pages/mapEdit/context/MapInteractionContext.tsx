import { createContext, useContext } from 'react';
import { IMapContent } from '../types/IMapContent';

export interface IMapInteractionContextValue {
    markTarget: (content: IMapContent | null) => void;
    editContent: (content: IMapContent) => void;
    removeContent: (content: IMapContent) => void;
}

const MapInteractionContext = createContext<IMapInteractionContextValue>({
    markTarget: () => {},
    editContent: () => {},
    removeContent: () => {},
});

export const MapInteractionContextProvider = MapInteractionContext.Provider;

export const useMapInteraction = (): IMapInteractionContextValue => {
    const contextValue = useContext(MapInteractionContext);
    if (!contextValue) {
        throw new Error('MapInteractionContext not set');
    }
    return contextValue;
};
