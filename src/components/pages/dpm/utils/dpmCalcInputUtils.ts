import { IDpmCalcBaseProperties, IDpmCalcEnhancementProperties, IInputProperty, INumericInputProperty, ISelectInputProperty, Unit } from '../types/IDpmCalcInput';

export function createDpmCalcBaseProperties(): IDpmCalcBaseProperties {
    return {
        installation: createNumericInputProperty({
            id: 'installation',
            label: '設置数',
            description: '（左上のオレンジの数字）',
        }),
        baseDpm: createNumericInputProperty({
            id: 'baseDpm',
            label: 'DPMの基本値',
            description: '（入力ミスを検知するために使います）',
            unit: Unit.DPM,
        }),
        damageType: createSelectInputProperty({
            id: 'damageType',
            label: 'ダメージタイプ',
            value: 'antiShipPhysicalDamage',
            options: [{
                id: 'antiShipPhysicalDamage',
                label: '対艦・実弾ダメージ',
                value: 'antiShipPhysicalDamage',
            }, {
                id: 'antiShipEnergyDamage',
                label: '対艦・エネルギーダメージ',
                value: 'antiShipEnergyDamage',
            }, {
                id: 'antiAirPhysicalDamage',
                label: '対空・実弾ダメージ',
                value: 'antiAirPhysicalDamage',
            }, {
                id: 'antiAirEnergyDamage',
                label: '対空・エネルギーダメージ',
                value: 'antiAirEnergyDamage',
            }, {
                id: 'siegePhysicalDamage',
                label: '攻城・実弾ダメージ',
                value: 'siegePhysicalDamage',
            }, {
                id: 'siegeEnergyDamage',
                label: '攻城・エネルギーダメージ',
                value: 'siegeEnergyDamage',
            }],
        }),
        targetPriority: createSelectInputProperty({
            id: 'targetPriority',
            label: '優先目標',
            value: 'largeShip',
            options: [{
                id: 'largeShip',
                label: '大型艦船',
                value: 'largeShip',
            }, {
                id: 'smallShip',
                label: '小型艦船',
                value: 'smallShip',
            }, {
                id: 'aircraft',
                label: '艦載機',
                value: 'aircraft',
            }],
        }),
        damagePerHit: createNumericInputProperty({
            id: 'damagePerHit',
            label: '単発ダメージ',
            description: '（スキルをリセットしてから読み取ってください。数字が二つ表示される場合は左側の数字を入力してください）',
            value: null,
        }),
        tune: createNumericInputProperty({
            id: 'tune',
            label: '武器チューン',
            value: 0,
            unit: Unit.PERCENTAGE,
            max: 30,
        }),
        duration: createNumericInputProperty({
            id: 'duration',
            label: '持続時間',
            description: '（「--」と表示される場合は０秒です）',
            unit: Unit.SECONDS,
        }),
        cooldown: createNumericInputProperty({
            id: 'cooldown',
            label: '冷却時間',
            description: '（戦闘機の場合は帰還冷却）',
            unit: Unit.SECONDS,
        }),
        rounds: createNumericInputProperty({
            id: 'rounds',
            label: 'ラウンド数',
            description: '（実弾の場合は「攻撃回数」の左の数字、エネルギー武器の場合は「ダメージ頻度」）',
            value: 1,
            min: 1,
        }),
        shotsPerRound: createNumericInputProperty({
            id: 'shotsPerRound',
            label: '１ラウンドの攻撃回数',
            description: '（実弾の場合は「攻撃回数」の右の数字、エネルギー武器の場合は名前を確認してください、例：「CI-2x700T型」の場合「2x」の部分）',
            value: 1,
            min: 1,
        }),
        lockOnTime: createNumericInputProperty({
            id: 'lockOnTime',
            label: 'ロックオン時間',
            unit: Unit.SECONDS,
        }),
    };
}

export function createDpmCalcEnhancementProperties(): IDpmCalcEnhancementProperties {
    return {
        increaseDamagePerHit: createNumericInputProperty({
            id: 'increaseDamagePerHit',
            label: 'ダメージアップ',
            description: '（スキルとモジュールから反映されるダメージアップを合わせて入力してください）',
            value: 0,
            unit: Unit.PERCENTAGE,
            min: 500,
        }),
        reduceDuration: createNumericInputProperty({
            id: 'reduceDuration',
            label: '持続時間ダウン',
            description: '（逆にアップする場合はマイナスの数値を入力してください）',
            value: 0,
            unit: Unit.PERCENTAGE,
            min: 500,
            max: 100,
        }),
        reduceCooldown: createNumericInputProperty({
            id: 'reduceCooldown',
            label: '冷却時間ダウン',
            description: '（戦闘機の場合は帰還冷却ダウン）',
            value: 0,
            unit: Unit.PERCENTAGE,
            min: 500,
            max: 100,
        }),
        reduceLockon: createNumericInputProperty({
            id: 'reduceLockon',
            label: 'ロックオン時間ダウン',
            value: 0,
            unit: Unit.PERCENTAGE,
            max: 100,
        }),
    };
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
            return {
                ...inputProperty,
                value: Number.isFinite(value) ? value as number : null,
            } as INumericInputProperty;
        }
        case 'select': {
            return {
                ...inputProperty,
                value: value === null ? null : `${value}`,
            } as ISelectInputProperty;
        }
        default: {
            throw new Error(`Unsupported input property type "${inputProperty.type}"`);
        }
    }
}

export function getAdornmentForUnit(unit: Unit) {
    switch (unit) {
        case Unit.PERCENTAGE:
            return '%';
        case Unit.SECONDS:
            return '秒';
        case Unit.DPM:
            return '/分';
    }
}
