import { useCallback, Dispatch, SetStateAction, useMemo } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { shipDefinitions } from '../../../data/shipDefinitions';
import { ShipSettingState } from '../../../userSettings/types/UserSettings';
import { WishState } from '../../../userSettings/types/WishState';
import { MemoizedMyListShipEditCard } from './MyListShipEditCard';
import { PossessionState } from '../../../userSettings/types/PossessionState';
import { ShipFilterState } from '../../filter/types/ShipFilterState';
import { applyShipFilter } from '../../filter/filterUtils';
import { applyPossessionStateToShipSettings } from '../../../userSettings/utils/userSettingsUtils';

interface IProps {
    shipSetting: ShipSettingState;
    shipFilter: ShipFilterState;
    onShipSettingChange: Dispatch<SetStateAction<ShipSettingState>>;
}

export const MyListEdit = (props: IProps) => {
    const { shipSetting, shipFilter, onShipSettingChange } = props;

    const filteredShipDefinitions = useMemo(() => applyShipFilter(shipDefinitions, shipFilter), [shipFilter]);

    const handlePossessionChange = useCallback((shipId: string, possession: PossessionState) => {
        onShipSettingChange(state => applyPossessionStateToShipSettings(state, shipId, possession))
    }, [onShipSettingChange]);

    const handleWishChange = useCallback((shipId: string, wish: WishState) => {
        onShipSettingChange(state => ({
            ...state,
            [shipId]: { ...state[shipId], wish }
        }));
    }, [onShipSettingChange]);

    return (
        <Paper>
            <Box p={1}>
                <Stack spacing={3}>
                    {filteredShipDefinitions.map(shipDefinition => (
                        <MemoizedMyListShipEditCard
                            key={shipDefinition.id}
                            shipId={shipDefinition.id}
                            shipName={shipDefinition.name}
                            possession={shipSetting[shipDefinition.id]?.possession ?? PossessionState.UNDEFINED}
                            wish={shipSetting[shipDefinition.id]?.wish ?? WishState.UNDEFINED}
                            onPossessionChange={handlePossessionChange}
                            onWishChange={handleWishChange}
                        />
                    ))}
                </Stack>
            </Box>
        </Paper>            
    );
};
