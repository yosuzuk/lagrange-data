import { TargetPropertyId, WeaponBasePropertyId, WeaponEnhancementPropertyId } from '../types/IInputProperty';
import { INumericOutputProperty, IOutputProperties, IOutputProperty, IUpdateArguments, OutputPropertyId,  } from '../types/IOutputProperty';
import { alignRecordIds } from './recordUtils';

export function createOutputProperties(): IOutputProperties {
    return alignRecordIds({
        [OutputPropertyId.DAMAGE_PER_HIT_IN_STATUS]: createNumericOutputProperty({
            label: '単発ダメージ（ステータス）',
            description: 'スキル設定後の武器情報画面に表示される数値（攻撃対象の抵抗値/シールド値は考慮しない数値）',
            dependsOnInput: [
                WeaponBasePropertyId.DAMAGE_PER_HIT,
                WeaponEnhancementPropertyId.INCREASE_DAMAGE_PER_HIT,
            ],
            formula: {
                formula: ({ weaponBaseProperties, weaponEnhancementProperties }) => {
                    const xBase = weaponBaseProperties.damagePerHit.label;
                    const xEnhancement = weaponEnhancementProperties.increaseDamagePerHit.label;
                    return `[${xBase}] * [${xEnhancement}]`;
                },
            },
            update: ({ weaponBaseProperties, weaponEnhancementProperties }, self) => {
                const xBase = weaponBaseProperties.damagePerHit.value;
                const xEnhancement = weaponEnhancementProperties.increaseDamagePerHit.value;
                if (xBase === null || xEnhancement === null) {
                    return resetFilledFormula(self);
                }
                return {
                    ...self,
                    value: xBase * xEnhancement,
                    formula: self.formula ? {
                        ...self.formula,
                        filledFormula: `${round(xBase)} * ${round(xEnhancement)} => ${round(xBase * xEnhancement)}`,
                    } : undefined,
                };
            }
        }),
        [OutputPropertyId.DAMAGE_PER_HIT_IN_BATTLE]: createNumericOutputProperty({
            label: '単発ダメージ（戦闘時）',
            description: '攻撃対象の抵抗値/シールド値を考慮した数値',
            dependsOnInput: [
                WeaponBasePropertyId.DAMAGE_TYPE,
                WeaponBasePropertyId.DAMAGE_PER_HIT,
                WeaponEnhancementPropertyId.INCREASE_DAMAGE_PER_HIT,
                TargetPropertyId.ARMOR,
                TargetPropertyId.ENERGY_SHIELD,
            ],
        }),
        [OutputPropertyId.DURATION]: createNumericOutputProperty({
            label: '持続時間',
            dependsOnInput: [
                WeaponBasePropertyId.DURATION,
                WeaponEnhancementPropertyId.REDUCE_DURATION,
            ],
        }),
        [OutputPropertyId.COOLDOWN]: createNumericOutputProperty({
            label: '冷却時間',
            dependsOnInput: [
                WeaponBasePropertyId.COOLDOWN,
                WeaponEnhancementPropertyId.REDUCE_COOLDOWN,
            ],
        }),
        [OutputPropertyId.LOCK_ON_TIME]: createNumericOutputProperty({
            label: 'ロックオン時間',
            dependsOnInput: [
                WeaponBasePropertyId.LOCK_ON_TIME,
                WeaponEnhancementPropertyId.REDUCE_LOCKON,
            ],
        }),
        [OutputPropertyId.ROUND_TIME]: createNumericOutputProperty({
            label: 'ラウンド時間',
            dependsOnInput: [
                WeaponBasePropertyId.LOCK_ON_BEHAVIOUR,
            ],
            dependsOnOutput: [
                OutputPropertyId.DURATION,
                OutputPropertyId.COOLDOWN,
                OutputPropertyId.LOCK_ON_TIME,
            ],
        }),
        [OutputPropertyId.TIME_TO_DESTROY_TARGET]: createNumericOutputProperty({
            label: '対象の撃破時間',
            dependsOnInput: [
                TargetPropertyId.HP,
                // TODO add missing properties
            ],
        }),
    });
}

function createNumericOutputProperty(properties: Partial<INumericOutputProperty>): INumericOutputProperty {
    return {
        type: 'numeric',
        id: '[id]',
        label: '[label]',
        value: null,
        update: (_args: IUpdateArguments, self: INumericOutputProperty) => self,
        ...properties,
    };
}

function round(value: number): string {
    return `${Number(value.toFixed(2))}`;
}

function resetFilledFormula<T extends IOutputProperty>(outputProperty: T): T {
    return {
        ...outputProperty,
        formula: outputProperty.formula ? {
            ...outputProperty.formula,
            filledFormula: null,
        } : undefined,
    };
}
