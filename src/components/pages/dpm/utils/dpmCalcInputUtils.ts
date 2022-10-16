import { IDpmCalcBaseProperties, IDpmCalcEnhancementProperties, IInputProperty, INumericInputProperty, ISelectInputProperty, Unit } from '../types/IDpmCalcInput';

export function createDpmCalcBaseProperties(): IDpmCalcBaseProperties {
    return {
        installation: createNumericInputProperty({
            id: 'installation',
            label: '設置数',
            value: 1,
            description: '武器情報画面内、左上に表示されるオレンジの数字（武器名の前）',
        }),
        damageType: createSelectInputProperty({
            id: 'damageType',
            label: 'ダメージタイプ',
            value: 'physicalDamage',
            options: [{
                id: 'physicalDamage',
                label: '実弾ダメージ',
                value: 'physicalDamage',
            }, {
                id: 'energyDamage',
                label: 'エネルギーダメージ',
                value: 'energyDamage',
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
            description: 'スキルをリセットしてから読み取ってください。数字が二つ表示される場合は左側の数字を入力してください。例えば「300+90.0」の場合は「300」です。',
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
            value: 0,
            description: 'モジュールステータスで確認できます。「--」と表示される場合は０秒です。',
            unit: Unit.SECONDS,
        }),
        rounds: createNumericInputProperty({
            id: 'rounds',
            label: '攻撃回数',
            description: 'モジュールステータスで確認できます。「攻撃回数」の最初の数値です。例えば「1 x 8」の場合は「1」です。この項目は実弾武器限定です。表示されない場合は「ダメージタイプ」を確認してください。',
            value: 1,
            min: 1,
        }),
        shotsPerRound: createNumericInputProperty({
            id: 'shotsPerRound',
            label: '連装数',
            description: 'モジュールステータスで確認できます。「攻撃回数」の最後の数値です。例えば「1 x 8」の場合は「8」です。この項目は実弾武器限定です。表示されない場合は「ダメージタイプ」を確認してください。',
            value: 1,
            min: 1,
        }),
        cooldown: createNumericInputProperty({
            id: 'cooldown',
            label: '冷却時間',
            description: 'モジュールステータスで確認できます。戦闘機の場合は「帰還冷却」とも呼ばれます。',
            unit: Unit.SECONDS,
        }),
        rounds2: createNumericInputProperty({
            id: 'rounds2',
            label: 'ダメージ頻度',
            description: 'モジュールステータスで確認できます。この項目はエネルギー武器限定です。表示されない場合は「ダメージタイプ」を確認してください。',
            value: 1,
            min: 1,
        }),
        shotsPerRound2: createNumericInputProperty({
            id: 'shotsPerRound2',
            label: '連装数',
            value: 1,
            description: 'エネルギー武器の連装数は武器の名前に隠されています。武器情報画面内、名前のアルファベット２文字と横線の後に「2x」とあれば２連装です。例えば「CI-2x700T型」の場合は「C」が企業、「I」が武器の種類、その後ろの「2x」が連装数です。',
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
            description: 'スキルとモジュールから反映されるダメージアップを合わせて入力してください',
            value: 0,
            unit: Unit.PERCENTAGE,
            min: 500,
        }),
        reduceDuration: createNumericInputProperty({
            id: 'reduceDuration',
            label: '持続時間ダウン',
            description: '逆にアップする場合はマイナスの数値を入力してください',
            value: 0,
            unit: Unit.PERCENTAGE,
            min: 500,
            max: 100,
        }),
        reduceCooldown: createNumericInputProperty({
            id: 'reduceCooldown',
            label: '冷却時間ダウン',
            description: '戦闘機の場合は帰還冷却ダウン',
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

export function isVisibleBaseProperty(property: IInputProperty, allProperties: IDpmCalcBaseProperties): boolean {
    switch (property.id) {
        case 'rounds':
        case 'shotsPerRound': {
            return allProperties.damageType.value === 'physicalDamage';
        }
        case 'rounds2':
        case 'shotsPerRound2': {
            return allProperties.damageType.value === 'energyDamage';
        }
        default: {
            return true;
        }
    }
}
