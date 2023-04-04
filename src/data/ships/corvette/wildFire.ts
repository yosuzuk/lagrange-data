import { Manufacturer } from '../../../types/Manufacturer';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { modules } from '../../modules';
import { ShipId } from '../../shipIds';

export const wildFire: IShipDefinition[] = [
    {
        id: ShipId.WILD_FIRE_TE,
        name: 'ワイルドファイヤー-TE',
        translatedName: {
            en: 'Wildfire (TE) - Anti-Ship Type',
        },
        type: ShipType.CORVETTE,
        cost: 0,
        weight: 0,
        row: ShipRow.NONE,
        operationLimit: 10,
        source: ShipSource.DOCK_EFFECT,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        modules: [
            modules.static({
                id: 'w1',
                name: '攻撃魚雷システム',
                translatedName: {
                    en: 'Assault Torpedo System',
                },
                mainSystem: true,
                // TODO skills
                skillSlots: 5,
                dpmShip: 1858,
                dpmAntiAir: 0,
                dpmSiege: 483,
            }),
            // TODO skills and skillslots
            modules.commandSystem(),
            modules.armorSystem({
                // TODO skills
                skillSlots: 3,
            }),
            modules.propulsionSystem({
                // TODO skills
                skillSlots: 2,
            }),
        ],
        defaultStats: {
            hp: 4900,
            armor: 2,
            shield: 0,
            speed: 2500,
            warpSpeed: 12500,
            dpmShip: 1858,
            dpmAntiAir: 0,
            dpmSiege: 483,
        },
    },
];
