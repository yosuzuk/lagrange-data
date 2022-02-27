import { createContext, ReactNode, useCallback, useState, useContext } from 'react';
import { isValidShipId } from '../../data/shipIds';
import { ShipDetailDialog } from './ShipDetailDialog';

interface IShipDetailContextValue {
    openShipDetailDialog: (shipId: string) => void;
    closeShipDetailDialog: () => void;
}

const ShipDetailContext = createContext<IShipDetailContextValue | null>(null);

interface IProps {
    children: ReactNode;
}

export const ShipDetailProvider = (props: IProps) => {
    const { children } = props;
    const [shipId, setShipId] = useState<string | null>(null);

    const openShipDetailDialog = useCallback((shipId: string) => {
        if (!isValidShipId(shipId)) {
            throw new Error(`Invalid ship ID "${shipId}"`);
        }
        setShipId(shipId);
    }, []);

    const closeShipDetailDialog = useCallback(() => {
        setShipId(null);
    }, []);

    return (
        <ShipDetailContext.Provider value={{
            openShipDetailDialog,
            closeShipDetailDialog
        }}>
            {children}
            {shipId && (
                <ShipDetailDialog shipId={shipId} onClose={closeShipDetailDialog} />
            )}
        </ShipDetailContext.Provider>
    );
};

export const useShipDetail = (): IShipDetailContextValue => {
    const contextValue = useContext(ShipDetailContext);
    if (!contextValue) {
        throw new Error('Missing ship detail context value');
    }
    return contextValue;
};
