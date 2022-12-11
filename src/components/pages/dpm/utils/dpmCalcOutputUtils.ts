import { ITargetProperties, IWeaponBaseProperties, IWeaponEnhancementProperties, TargetPropertyId, WeaponBasePropertyId, WeaponEnhancementPropertyId } from '../types/IInputProperty';
import { DependsOn, INumericOutputProperty, IOutputProperties, IOutputProperty, IUpdateOutputPropertyArguments, OutputPropertyId,  } from '../types/IOutputProperty';
import { IPropertyTab } from '../types/ITab';
import { alignRecordIds } from './recordUtils';

export function createOutputProperties(): IOutputProperties {
    return alignRecordIds({
        [OutputPropertyId.DAMAGE_PER_HIT_IN_STATUS]: createNumericOutputProperty({
            label: '単発ダメージ（ステータス）',
            description: 'スキル設定後の武器情報画面に表示される数値（攻撃対象の抵抗値/シールド値は考慮しない数値）',
            dependsOn: {
                weaponBaseProperties: [WeaponBasePropertyId.DAMAGE_PER_HIT],
                weaponEnhancementProperties: [WeaponEnhancementPropertyId.INCREASE_DAMAGE_PER_HIT],
            },
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
            dependsOn: {
                weaponBaseProperties: [WeaponBasePropertyId.DAMAGE_TYPE, WeaponBasePropertyId.DAMAGE_PER_HIT],
                weaponEnhancementProperties: [WeaponEnhancementPropertyId.INCREASE_DAMAGE_PER_HIT],
                targetProperties: [TargetPropertyId.ARMOR, TargetPropertyId.ENERGY_SHIELD],
            },
        }),
        [OutputPropertyId.DURATION]: createNumericOutputProperty({
            label: '持続時間',
            dependsOn: {
                weaponBaseProperties: [WeaponBasePropertyId.DURATION],
                weaponEnhancementProperties: [WeaponEnhancementPropertyId.REDUCE_DURATION],
            },
        }),
        [OutputPropertyId.COOLDOWN]: createNumericOutputProperty({
            label: '冷却時間',
            dependsOn: {
                weaponBaseProperties: [WeaponBasePropertyId.COOLDOWN],
                weaponEnhancementProperties: [WeaponEnhancementPropertyId.REDUCE_COOLDOWN],
            },
        }),
        [OutputPropertyId.LOCK_ON_TIME]: createNumericOutputProperty({
            label: 'ロックオン時間',
            dependsOn: {
                weaponBaseProperties: [WeaponBasePropertyId.LOCK_ON_TIME],
                weaponEnhancementProperties: [WeaponEnhancementPropertyId.REDUCE_LOCKON],
            },
        }),
        [OutputPropertyId.ROUND_TIME]: createNumericOutputProperty({
            label: 'ラウンド時間',
            dependsOn: {
                weaponBaseProperties: [WeaponBasePropertyId.LOCK_ON_BEHAVIOUR],
                outputProperties: [OutputPropertyId.DURATION, OutputPropertyId.COOLDOWN, OutputPropertyId.LOCK_ON_TIME],
            },
        }),
        [OutputPropertyId.TIME_TO_DESTROY_TARGET]: createNumericOutputProperty({
            label: '対象の撃破時間',
            dependsOn: {
                targetProperties: [TargetPropertyId.HP],
                // TODO add missing properties (dpm?)
            },
        }),
    });
}

interface IUpdateOutputPropertiesForAllTabsArguments {
    weaponBaseProperties: IWeaponBaseProperties;
    enhancementTabs: IPropertyTab<IWeaponEnhancementProperties>[];
    attackTargetTabs: IPropertyTab<ITargetProperties>[];
    baseOutputProperties: Readonly<IOutputProperties>;
}

export function createOutputPropertiesForTabs(args: IUpdateOutputPropertiesForAllTabsArguments): Record<string, Record<string, IOutputProperties>> {
    const { weaponBaseProperties, enhancementTabs, attackTargetTabs, baseOutputProperties } = args;
    const result: Record<string, Record<string, IOutputProperties>> = {};

    enhancementTabs.forEach(enhancementTab => {
        attackTargetTabs.forEach(targetTab => {
            if (!result[enhancementTab.id]) {
                result[enhancementTab.id] = {};
            }

            result[enhancementTab.id][targetTab.id] = updateOutputProperties({
                weaponBaseProperties,
                weaponEnhancementProperties: enhancementTab.properties,
                targetProperties: targetTab.properties,
                outputProperties: baseOutputProperties,
            });
        });
    });

    return result;
}

function updateOutputProperties(args: IUpdateOutputPropertyArguments): IOutputProperties {
    const { weaponBaseProperties, weaponEnhancementProperties, targetProperties, outputProperties } = args;

    return {
        ...outputProperties,
    };
}

function createNumericOutputProperty(properties: Partial<INumericOutputProperty>): INumericOutputProperty {
    return {
        type: 'numeric',
        id: '[id]',
        label: '[label]',
        value: null,
        update: (_args: IUpdateOutputPropertyArguments, self: INumericOutputProperty) => self,
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

export function dependsOn(outputProperty: IOutputProperty, propertyKind: keyof DependsOn, allOutputProperties: IOutputProperties): boolean {
    if ((outputProperty.dependsOn?.[propertyKind]?.length ?? 0) > 0) {
        return true;
    }

    if ((outputProperty.dependsOn?.outputProperties?.length ?? 0) > 0) {
        return !!outputProperty.dependsOn?.outputProperties?.find(dependencyId => {
            return (allOutputProperties[dependencyId].dependsOn?.[propertyKind]?.length ?? 0) > 0;
        });
    }

    return false;
}
