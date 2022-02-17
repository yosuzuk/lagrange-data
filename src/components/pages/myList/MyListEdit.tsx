import { useCallback, Dispatch, SetStateAction, useMemo } from 'react';
import Stack from '@mui/material/Stack';
import { shipDefinitions } from '../../../data/shipDefinitions';
import { ShipSettingState } from '../../../userSettings/types/UserSettings';
import { WishState } from '../../../userSettings/types/WishState';
import { PossessionState } from '../../../userSettings/types/PossessionState';
import { ShipFilterState } from '../../filter/types/ShipFilterState';
import { applyShipFilter, separateShipsBySource } from '../../filter/filterUtils';
import { applyPossessionStateToShipSettings } from '../../../userSettings/utils/userSettingsUtils';
import { ShipSource } from '../../../types/ShipSource';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { MyListEditAccordion } from './MyListEditAccordion';

interface IProps {
    shipSetting: ShipSettingState;
    shipFilter: ShipFilterState;
    onShipSettingChange: Dispatch<SetStateAction<ShipSettingState>>;
}

export const MyListEdit = (props: IProps) => {
    const { shipSetting, shipFilter, onShipSettingChange } = props;

    const shipsBySource = useMemo<Record<ShipSource, IShipDefinition[]>>(() => {
        const filteredShips = applyShipFilter(shipDefinitions, shipFilter);
        return separateShipsBySource(filteredShips);
    }, [shipFilter]);

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
        <Stack spacing={1}>
            <div>
                <MyListEditAccordion
                    id="tech-file-ships"
                    title={'技術ファイルから手に入る艦船/設計図'}
                    initiallyOpened={false}
                    preRenderDetails={true}
                    shipDefinitions={shipsBySource[ShipSource.TECH_FILE]}
                    shipSetting={shipSetting}
                    handlePossessionChange={handlePossessionChange}
                    handleWishChange={handleWishChange}
                />
            </div>
            <div>
                <MyListEditAccordion
                    id="city-trade-ships"
                    title={'都市で買える艦船'}
                    initiallyOpened={false}
                    shipDefinitions={shipsBySource[ShipSource.CITY_TRADE]}
                    shipSetting={shipSetting}
                    handlePossessionChange={handlePossessionChange}
                    handleWishChange={handleWishChange}
                />
            </div>
            <div>
                <MyListEditAccordion
                    id="dock-effect-ships"
                    title={'結合効果で手に入る艦船/臨時設計図'}
                    initiallyOpened={false}
                    shipDefinitions={shipsBySource[ShipSource.DOCK_EFFECT]}
                    shipSetting={shipSetting}
                    handlePossessionChange={handlePossessionChange}
                    handleWishChange={handleWishChange}
                />
            </div>
            <div>
                <MyListEditAccordion
                    id="starter-ships"
                    title={'初期配布で手に入る艦船/設計図'}
                    initiallyOpened={false}
                    shipDefinitions={shipsBySource[ShipSource.STARTER_SHIP]}
                    shipSetting={shipSetting}
                    handlePossessionChange={handlePossessionChange}
                    handleWishChange={handleWishChange}
                />
            </div>
        </Stack>
    );
};
