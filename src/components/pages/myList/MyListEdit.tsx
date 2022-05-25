import { useMemo } from 'react';
import Stack from '@mui/material/Stack';
import { shipDefinitions } from '../../../data/shipDefinitions';
import { ShipFilterState } from '../../filter/types/ShipFilterState';
import { applyShipFilter, separateShipsBySource } from '../../filter/filterUtils';
import { ShipSource } from '../../../types/ShipSource';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { MyListEditAccordion } from './MyListEditAccordion';

interface IProps {
    shipFilter: ShipFilterState;
}

export const MyListEdit = (props: IProps) => {
    const { shipFilter } = props;

    const shipsBySource = useMemo<Record<ShipSource, IShipDefinition[]>>(() => {
        const filteredShips = applyShipFilter(shipDefinitions, shipFilter);
        return separateShipsBySource(filteredShips);
    }, [shipFilter]);    

    return (
        <Stack spacing={1}>
            <div>
                <MyListEditAccordion
                    id="tech-file-ships"
                    title={'技術ファイルから手に入る艦船/設計図'}
                    initiallyOpened={false}
                    preRenderDetails={true}
                    shipDefinitions={shipsBySource[ShipSource.TECH_FILE]}
                />
            </div>
            <div>
                <MyListEditAccordion
                    id="city-trade-ships"
                    title={'都市で買える艦船'}
                    initiallyOpened={false}
                    shipDefinitions={shipsBySource[ShipSource.CITY_TRADE]}
                />
            </div>
            <div>
                <MyListEditAccordion
                    id="dock-effect-ships"
                    title={'結合効果で手に入る艦船/臨時設計図'}
                    initiallyOpened={false}
                    shipDefinitions={shipsBySource[ShipSource.DOCK_EFFECT]}
                />
            </div>
            <div>
                <MyListEditAccordion
                    id="starter-ships"
                    title={'初期配布で手に入る艦船/設計図'}
                    initiallyOpened={false}
                    shipDefinitions={shipsBySource[ShipSource.STARTER_SHIP]}
                />
            </div>
        </Stack>
    );
};
