import { IWeaponBaseProperties, IWeaponEnhancementProperties, IInputProperty, INumericInputProperty, ISelectInputProperty, WeaponBasePropertyId, WeaponEnhancementPropertyId, ITargetProperties, TargetPropertyId, IShipProperties, ShipPropertyId } from '../types/IInputProperty';
import { Unit } from '../types/Unit';
import { alignRecordIds } from './recordUtils';

export function createShipProperties(): IShipProperties {
    return alignRecordIds({
        [ShipPropertyId.TYPE]: createSelectInputProperty({
            label: 'タイプ',
            value: 'ship',
            options: [{
                id: 'ship',
                label: '艦船',
                value: 'ship',
            }, {
                id: 'corvette',
                label: '護送艦',
                value: 'corvette',
            }, {
                id: 'fighter',
                label: '戦闘機',
                value: 'fighter',
            }],
        }),
        [ShipPropertyId.SQUAD_SIZE]: createNumericInputProperty({
            label: '編隊サイズ',
            value: 1,
            unit: Unit.FIGHTER_COUNT,
            min: 1,
            max: 5,
            description: '詳細画面の右上に表示されます。１編隊毎の戦闘機の数です（例：ミストラルは４機）。',
        }),
        [ShipPropertyId.FIGHTER_ATTACK_PATTERN]: createSelectInputProperty({
            label: '攻撃パターン',
            value: 'rtb',
            options: [{
                id: 'rtb',
                label: '住複攻撃',
                value: 'rtb',
            }, {
                id: 'noRtb',
                label: '独立作戦',
                value: 'noRtb',
            }],
            description: '指令システムの詳細画面で確認できます。「住複攻撃」が記載されている艦載機は冷却時に空母へ帰還します。再出撃時には再度ロックオン時間が発生します。',
        }),
        [ShipPropertyId.CORVETTE_ATTACK_PATTERN]: createSelectInputProperty({
            label: '攻撃パターン',
            value: 'noRtb',
            options: [{
                id: 'noRtb',
                label: '独立作戦',
                value: 'noRtb',
            }, {
                id: 'rtb',
                label: '住複攻撃',
                value: 'rtb',
            }],
            description: '指令システムの詳細画面で確認できます。「住複攻撃」が記載されている艦載機は冷却時に空母へ帰還します。再出撃時には再度ロックオン時間が発生します。',
        }),
    });
}

export function createWeaponBaseProperties(): IWeaponBaseProperties {
    return alignRecordIds({
        [WeaponBasePropertyId.INSTALLATION]: createNumericInputProperty({
            label: '設置数',
            value: 1,
            description: '武器情報画面内、左上に表示されるオレンジの数字（武器名の前）',
        }),
        [WeaponBasePropertyId.DAMAGE_TYPE]: createSelectInputProperty({
            label: 'ダメージタイプ',
            value: 'physicalDamage',
            options: [{
                id: 'physicalDamage',
                label: '実弾ダメージ',
                value: 'physicalDamage',
            }, {
                id: 'energyDamageIon',
                label: 'エネルギー（イオン）',
                value: 'energyDamageIon',
            }, {
                id: 'energyDamage',
                label: 'エネルギー（パルス、プラズマ）',
                value: 'energyDamage',
            }],
        }),
        [WeaponBasePropertyId.DAMAGE_PER_HIT]: createNumericInputProperty({
            label: '単発ダメージ',
            description: 'スキルをリセットしてから読み取ってください。チューン済みで数字が二つ表示される場合は左側の数字を入力してください。例えば「300+90.0」の場合は「300」です。初期状態でもモジュールによるダメージアップ効果が乗っている場合があります。その場合は、先に元の単発ダメージを逆算して入力してください（例：ルビー級の小型イオン砲は初期状態で単発ダメージが「316」と表示されますが、エネルギーシステムの15％が乗っている状態なので、元は「275」です）。',
            value: null,
        }),
        [WeaponBasePropertyId.TUNE]: createNumericInputProperty({
            label: '武器チューン',
            value: 0,
            unit: Unit.PERCENTAGE,
            max: 30,
        }),
        [WeaponBasePropertyId.DURATION]: createNumericInputProperty({
            label: '持続時間',
            value: 0,
            description: 'モジュールステータスで確認できます。「--」と表示される場合は０秒です。別名「出力時間」/「攻撃間隔」/「攻撃時間」',
            unit: Unit.SECONDS,
        }),
        [WeaponBasePropertyId.SHOTS_PER_ATTACK]: createNumericInputProperty({
            label: '弾数',
            description: [
                '１回の攻撃で同時に撃てる弾数',
                'モジュールステータスで確認できます。「攻撃回数」の左側の数値です。',
                '例えば「1 x 8」の場合は「1」です。',
                '項目が表示されない場合は「ダメージタイプ」を確認してください。',
            ],
            value: 1,
            min: 1,
        }),
        [WeaponBasePropertyId.ATTACKS_PER_ROUND]: createNumericInputProperty({
            label: '攻撃回数',
            description: [
                '１ラウンド毎の攻撃回数',
                'モジュールステータスで確認できます。「攻撃回数」の右側の数値です',
                '例えば「1 x 8」の場合は「8」です。',
                '項目が表示されない場合は「ダメージタイプ」を確認してください。',
            ],
            value: 1,
            min: 1,
        }),
        [WeaponBasePropertyId.COOLDOWN]: createNumericInputProperty({
            label: '冷却時間',
            description: 'モジュールステータスで確認できます。戦闘機の場合は「帰還冷却」とも呼ばれます。',
            unit: Unit.SECONDS,
        }),
        [WeaponBasePropertyId.ATTACKS_PER_ROUND_ION]: createNumericInputProperty({
            label: 'ダメージ頻度',
            description: 'モジュールステータスで確認できます。この項目はイオン砲限定です。表示されない場合は「ダメージタイプ」を確認してください。',
            value: 1,
            unit: Unit.ION_ATTACK_COUNT,
            min: 1,
        }),
        [WeaponBasePropertyId.SHOTS_PER_ATTACK_ION]: createNumericInputProperty({
            label: '弾数（イオン砲）',
            description: 'イオン砲が１回の攻撃で同時に撃つ弾数は武器の名前に隠されています。武器情報画面内、名前のアルファベット２文字と横線の後に「2x」とあれば２発です。例えば「CI-2x700T型」の場合は「C」が企業、「I」が武器の種類、その後ろの「2x」が弾数です。',
            value: 1,
        }),
        [WeaponBasePropertyId.LOCK_ON_TIME]: createNumericInputProperty({
            label: 'ロックオン時間',
            description: '別名「目標選択時間」',
            unit: Unit.SECONDS,
        }),
    });
}

export function createWeaponEnhancementProperties(): IWeaponEnhancementProperties {
    return alignRecordIds({
        [WeaponEnhancementPropertyId.INCREASE_DAMAGE_PER_HIT]: createNumericInputProperty({
            label: 'ダメージアップ',
            description: 'スキルとモジュールから反映されるダメージアップを合わせて入力してください（例：ルビー級の場合はスキルの２０％とエネルギーシステムの１５％で合計３５％です）',
            value: 0,
            unit: Unit.PERCENTAGE,
            min: -500,
        }),
        [WeaponEnhancementPropertyId.REDUCE_DURATION]: createNumericInputProperty({
            label: '持続時間ダウン',
            description: '別名「出力時間ダウン」/「攻撃間隔ダウン」/「攻撃時間ダウン」。逆にアップする場合はマイナスの数値を入力してください（例：カリストの「重弾薬」）',
            value: 0,
            unit: Unit.PERCENTAGE,
            min: -500,
            max: 100,
        }),
        [WeaponEnhancementPropertyId.REDUCE_COOLDOWN]: createNumericInputProperty({
            label: '冷却時間ダウン',
            description: '戦闘機の場合は帰還冷却ダウン',
            value: 0,
            unit: Unit.PERCENTAGE,
            min: -500,
            max: 100,
        }),
        [WeaponEnhancementPropertyId.REDUCE_LOCKON]: createNumericInputProperty({
            label: 'ロックオン時間ダウン',
            description: '別名「目標選択時間ダウン」',
            value: 0,
            unit: Unit.PERCENTAGE,
            min: -500,
            max: 100,
        }),
        [WeaponEnhancementPropertyId.INCREASE_ATTACKS_PER_ROUND]: createNumericInputProperty({
            label: '攻撃回数アップ',
            description: '１ラウンド毎の攻撃回数が増加する（例：ルビー級の「持続出力強化」）',
            value: 0,
            min: -10,
            max: 10,
        }),
    });
}

export function createTargetProperties(): ITargetProperties {
    return alignRecordIds({
        [TargetPropertyId.HP]: createNumericInputProperty({
            label: 'HP',
            min: 1,
            max: 1000000,
        }),
        [TargetPropertyId.ARMOR]: createNumericInputProperty({
            label: 'ダメージ抵抗',
            value: 0,
            min: 0,
            max: 10000,
        }),
        [TargetPropertyId.ENERGY_SHIELD]: createNumericInputProperty({
            label: 'シールド値',
            value: 0,
            unit: Unit.PERCENTAGE,
            min: 0,
            max: 100,
        }),
    });
}

function createNumericInputProperty(properties: Partial<INumericInputProperty>): INumericInputProperty {
    return {
        id: '[id]',
        label: '[label]',
        type: 'numeric',
        value: null,
        min: 0,
        ...properties,
    };
}

function createSelectInputProperty(properties: Partial<ISelectInputProperty>): ISelectInputProperty {
    return {
        id: '[id]',
        label: '[label]',
        type: 'select',
        value: '',
        options: [],
        ...properties,
    };
}

export function applyPropertyChange(value: number | string | null, inputProperty: IInputProperty): IInputProperty {
    switch (inputProperty.type) {
        case 'numeric': {
            const newValue = Number.isFinite(value) ? value as number : null;
            if ((inputProperty as INumericInputProperty).value === newValue) {
                return inputProperty;
            }
            return {
                ...inputProperty,
                value: newValue,
            } as INumericInputProperty;
        }
        case 'select': {
            const newValue = value === null ? null : `${value}`;
            if ((inputProperty as ISelectInputProperty).value === newValue) {
                return inputProperty;
            }
            return {
                ...inputProperty,
                value: newValue,
            } as ISelectInputProperty;
        }
        default: {
            throw new Error(`Unsupported input property type "${inputProperty.type}"`);
        }
    }
}

export function isVisibleShipProperty(property: IInputProperty, allProperties: IShipProperties): boolean {
    switch (property.id as ShipPropertyId) {
        case ShipPropertyId.SQUAD_SIZE:
        case ShipPropertyId.FIGHTER_ATTACK_PATTERN: {
            return allProperties.type.value === 'fighter';
        }
        case ShipPropertyId.CORVETTE_ATTACK_PATTERN: {
            return allProperties.type.value === 'corvette';
        }
        default: {
            return true;
        }
    }
}

export function isVisibleWeaponBaseProperty(property: IInputProperty, allProperties: IWeaponBaseProperties): boolean {
    switch (property.id as WeaponBasePropertyId) {
        case WeaponBasePropertyId.ATTACKS_PER_ROUND:
        case WeaponBasePropertyId.SHOTS_PER_ATTACK: {
            return allProperties.damageType.value === 'physicalDamage' || allProperties.damageType.value === 'energyDamage';
        }
        case WeaponBasePropertyId.ATTACKS_PER_ROUND_ION:
        case WeaponBasePropertyId.SHOTS_PER_ATTACK_ION: {
            return allProperties.damageType.value === 'energyDamageIon';
        }
        default: {
            return true;
        }
    }
}
