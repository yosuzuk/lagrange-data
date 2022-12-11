import { formatNumber } from '../../../../utils/numberUtils';
import { IInputProperty, INumericInputProperty, ISelectInputProperty, ITargetProperties, IWeaponBaseProperties, IWeaponEnhancementProperties, TargetPropertyId, WeaponBasePropertyId, WeaponEnhancementPropertyId } from '../types/IInputProperty';
import { DependsOn, INumericOutputProperty, IOutputProperties, IOutputProperty, IUpdateOutputPropertyArguments, OutputPropertyId,  } from '../types/IOutputProperty';
import { IPropertyTab } from '../types/ITab';
import { Unit } from '../types/Unit';
import { alignRecordIds } from './recordUtils';
import { toDecreasingFactor, toDecreasingPercentageForFormula, toIncreasingFactor, toIncreasingPercentageForFormula } from './unitUtils';

export function createOutputProperties(): IOutputProperties {
    return alignRecordIds({
        [OutputPropertyId.DAMAGE_PER_HIT_IN_STATUS]: createNumericOutputProperty({
            label: '単発ダメージ（ステータス）',
            description: 'スキル設定後の武器情報画面に表示される数値（攻撃対象の抵抗値/シールド値は考慮しない数値）',
            dependsOn: {
                weaponBaseProperties: [WeaponBasePropertyId.DAMAGE_PER_HIT, WeaponBasePropertyId.TUNE],
                weaponEnhancementProperties: [WeaponEnhancementPropertyId.INCREASE_DAMAGE_PER_HIT],
            },
            update: ({ weaponBaseProperties, weaponEnhancementProperties }, self) => {
                const { damagePerHit, tune } = weaponBaseProperties;
                const { increaseDamagePerHit } = weaponEnhancementProperties;
                if (damagePerHit.value === null || increaseDamagePerHit.value === null || tune.value === null) {
                    return resetFilledFormula(self);
                }
                return {
                    ...self,
                    value: damagePerHit.value * toIncreasingFactor(increaseDamagePerHit.value) * toIncreasingFactor(tune.value),
                    formula: {
                        formula: `([${damagePerHit.label}] * (100% + [${increaseDamagePerHit.label}])) + ([${damagePerHit.label}] * [${tune.label}] * (100% + [${increaseDamagePerHit.label}]))`,
                        filledFormula: [
                            `(${formatNumber(damagePerHit.value)} * (${toIncreasingPercentageForFormula(increaseDamagePerHit.value)})) + (${formatNumber(damagePerHit.value)} * ${tune.value}% * (${toIncreasingPercentageForFormula(increaseDamagePerHit.value)})))`,
                            `${damagePerHit.value * toIncreasingFactor(increaseDamagePerHit.value)} + ${damagePerHit.value * (tune.value / 100) * toIncreasingFactor(increaseDamagePerHit.value)}`,
                        ],
                    },
                };
            },
        }),
        [OutputPropertyId.DAMAGE_PER_HIT_IN_BATTLE]: createNumericOutputProperty({
            label: '単発ダメージ（戦闘時）',
            description: '攻撃対象の抵抗値/シールド値を考慮した数値',
            dependsOn: {
                weaponBaseProperties: [WeaponBasePropertyId.DAMAGE_TYPE],
                targetProperties: [TargetPropertyId.ARMOR, TargetPropertyId.ENERGY_SHIELD],
                outputProperties: [OutputPropertyId.DAMAGE_PER_HIT_IN_STATUS],
            },
            update: ({ weaponBaseProperties, targetProperties, outputProperties }, self) => {
                const { damagePerHitInStatus } = outputProperties;
                const { armor, energyShield } = targetProperties;
                if (damagePerHitInStatus.value === null) {
                    return resetFilledFormula(self);
                }
                if (weaponBaseProperties.damageType.value === 'physicalDamage') {
                    if (armor.value === null) {
                        return resetFilledFormula(self);
                    }
                    return {
                        ...self,
                        value: Math.max(damagePerHitInStatus.value - armor.value, Math.floor(damagePerHitInStatus.value * 0.1)),
                        formula: {
                            formula: `max([${damagePerHitInStatus.label}] - [${armor.label}], trunc([${damagePerHitInStatus.label}] * 10%))`,
                            filledFormula: `max(${formatNumber(damagePerHitInStatus.value)} - ${formatNumber(armor.value)}, trunc(${formatNumber(damagePerHitInStatus.value)} * 0.1))`,
                        },
                    };
                } else {
                    if (energyShield.value === null) {
                        return resetFilledFormula(self);
                    }
                    return {
                        ...self,
                        value: damagePerHitInStatus.value * toDecreasingFactor(energyShield.value),
                        formula: {
                            formula: `[${damagePerHitInStatus.label}] * (100% - [${energyShield.label}])`,
                            filledFormula: `${formatNumber(damagePerHitInStatus.value)} * (${toDecreasingPercentageForFormula(energyShield.value)})`,
                        },
                    };
                }
            },
        }),
        [OutputPropertyId.DURATION]: createNumericOutputProperty({
            label: '持続時間',
            unit: Unit.SECONDS,
            dependsOn: {
                weaponBaseProperties: [WeaponBasePropertyId.DURATION],
                weaponEnhancementProperties: [WeaponEnhancementPropertyId.REDUCE_DURATION],
            },
        }),
        [OutputPropertyId.COOLDOWN]: createNumericOutputProperty({
            label: '冷却時間',
            unit: Unit.SECONDS,
            dependsOn: {
                weaponBaseProperties: [WeaponBasePropertyId.COOLDOWN],
                weaponEnhancementProperties: [WeaponEnhancementPropertyId.REDUCE_COOLDOWN],
            },
        }),
        [OutputPropertyId.LOCK_ON_TIME]: createNumericOutputProperty({
            label: 'ロックオン時間',
            unit: Unit.SECONDS,
            dependsOn: {
                weaponBaseProperties: [WeaponBasePropertyId.LOCK_ON_TIME],
                weaponEnhancementProperties: [WeaponEnhancementPropertyId.REDUCE_LOCKON],
            },
        }),
        [OutputPropertyId.ROUND_TIME]: createNumericOutputProperty({
            label: 'ラウンド時間',
            unit: Unit.SECONDS,
            dependsOn: {
                weaponBaseProperties: [WeaponBasePropertyId.LOCK_ON_BEHAVIOUR],
                outputProperties: [OutputPropertyId.DURATION, OutputPropertyId.COOLDOWN, OutputPropertyId.LOCK_ON_TIME],
            },
        }),
        [OutputPropertyId.TIME_TO_DESTROY_TARGET]: createNumericOutputProperty({
            label: '対象の撃破時間',
            unit: Unit.SECONDS,
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

    return Object.values(OutputPropertyId)
        .map(id => id as OutputPropertyId)
        .reduce((acc, propertyId) => {
            const currentProperty = outputProperties[propertyId];

            if (hasUnmetDepenencies(currentProperty, { ...args, outputProperties: acc })) {
                return {
                    ...acc,
                    [propertyId]: resetOutputProperty(currentProperty),
                };
            }

            if (currentProperty.type === 'numeric') {
                const numericProperty = currentProperty as INumericOutputProperty;
                return {
                    ...acc,
                    [propertyId]: numericProperty.update({
                        weaponBaseProperties,
                        weaponEnhancementProperties,
                        targetProperties,
                        outputProperties: acc,
                    }, numericProperty),
                };
            }

            // unsupported type, for now skip
            return acc;
        }, { ...outputProperties });
}

function hasUnmetDepenencies(property: IOutputProperty, allProperties: IUpdateOutputPropertyArguments): boolean {
    if (!property.dependsOn) {
        return false;
    }

    let unmetDependency = false;

    if (property.dependsOn.weaponBaseProperties) {
        unmetDependency = unmetDependency || !!property.dependsOn.weaponBaseProperties.find(propertyId => {
            return !isInputPropertySet(allProperties.weaponBaseProperties[propertyId]);
        });
    }

    if (property.dependsOn.weaponEnhancementProperties) {
        unmetDependency = unmetDependency || !!property.dependsOn.weaponEnhancementProperties.find(propertyId => {
            return !isInputPropertySet(allProperties.weaponEnhancementProperties[propertyId]);
        });
    }

    if (property.dependsOn.targetProperties) {
        unmetDependency = unmetDependency || !!property.dependsOn.targetProperties.find(propertyId => {
            return !isInputPropertySet(allProperties.targetProperties[propertyId]);
        });
    }

    if (property.dependsOn.outputProperties) {
        unmetDependency = unmetDependency || !!property.dependsOn.outputProperties.find(propertyId => {
            return !isOutputPropertySet(allProperties.outputProperties[propertyId]);
        });
    }

    return unmetDependency;
}

function isInputPropertySet(property: IInputProperty): boolean {
    switch (property.type) {
        case 'numeric': {
            return (property as INumericInputProperty).value !== null;
        }
        case 'select': {
            return !!(property as ISelectInputProperty).value;
        }
        default: {
            throw new Error(`Cannot determine whether "${property.label}" is set`);
        }
    }
}

function isOutputPropertySet(property: IOutputProperty): boolean {
    switch (property.type) {
        case 'numeric': {
            return (property as INumericOutputProperty).value !== null;
        }
        default: {
            throw new Error(`Cannot determine whether "${property.label}" is set, unsupported property type`);
        }
    }
}

function resetOutputProperty(property: IOutputProperty): IOutputProperty {
    switch (property.type) {
        case 'numeric': {
            const numericProperty = (property as INumericOutputProperty);
            return {
                ...numericProperty,
                value: null,
                formula: numericProperty.formula ? {
                    ...numericProperty.formula,
                    filledFormula: null,
                } : undefined,
            } as IOutputProperty;
        }
        default: {
            throw new Error(`Cannot reset "${property.label}", unsupported property type`);
        }
    }
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
