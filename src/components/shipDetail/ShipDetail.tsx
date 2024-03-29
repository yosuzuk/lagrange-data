import { useMemo } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { isValidShipId } from '../../data/shipIds';
import { ShipType } from '../../types/ShipType';
import { getShipDefinitionById, getShipName } from '../../utils/shipDefinitionUtils';
import { translateShipRow } from '../../utils/shipRowUtils';
import { translateShipType } from '../../utils/shipTypeUtils';
import { LabeledList } from '../list/LabeledList';
import { translateShipSource } from '../../utils/shipSourceUtils';
import { ShipTag } from '../../types/ShipTag';
import { ShipSource } from '../../types/ShipSource';
import { ScriptedLink } from '../link/ScriptedLink';
import { ShipRow } from '../../types/ShipRow';
import { translateManufacturer } from '../../utils/manufacturerUtils';
import { translateResearchManufacturer } from '../../utils/researchManufacturerUtils';
import { translateResearchStrategyType } from '../../utils/researchStrategyTypeUtils';
import { translateResearchTacticType } from '../../utils/researchTacticTypeUtils';
import { ModuleDetail } from './ModuleDetail';
import { flags } from '../../utils/flags';
import { formatAccelerationTime, formatDpmAll, formatFlightTime, formatHp, formatSpeed, getShipStats } from '../../utils/shipStatsUtils';
import { isLanguageWithWhitespace, t } from '../../i18n';
import { ISystemModule } from '../../types/ShipDefinition';

interface IProps {
    shipId: string;
    onClickShip: (shipId: string) => void;
    hideName?: boolean;
}

export const ShipDetail = (props: IProps) => {
    const { shipId, hideName = false, onClickShip } = props;
    if (!isValidShipId(shipId)) {
        throw new Error('Invalid ship ID');
    }

    const shipDefinition = getShipDefinitionById(shipId);

    const carryCorvettesModule = useMemo(() => shipDefinition.modules?.some(module => !!module.carryCorvette) === true, [shipDefinition]);
    const carryFightersModule = useMemo(() => shipDefinition.modules?.some(module => !!module.carryFighter) === true, [shipDefinition]);
    const carry = !!shipDefinition.carryCorvette || !!shipDefinition.carryFighter || carryCorvettesModule || carryFightersModule;

    const relatedSubModels = shipDefinition.baseModelId ? getShipDefinitionById(shipDefinition.baseModelId).subModelIds?.filter(id => id !== shipDefinition.id).map(getShipDefinitionById) ?? [] : [];
    const relatedShips = (shipDefinition.relatedShipIds ?? []).map(getShipDefinitionById);
    const related = relatedSubModels.length > 0 || relatedShips.length > 0;

    const obtainableThoughResearchAgreement = !!shipDefinition.researchManufacturer || !!shipDefinition.researchStrategyTypes || !!shipDefinition.researchTacticTypes;

    const shipStats = getShipStats(shipDefinition, null);

    const staticModules = useMemo<ISystemModule[]>(() => shipDefinition.modules?.filter(m => m.category === 'STATIC') ?? [], [shipDefinition]);
    const defaultVariableModules = useMemo<ISystemModule[]>(() => shipDefinition.modules?.filter(m => m.category !== 'STATIC' && m.defaultModule) ?? [], [shipDefinition]);
    const additionalVariableModules = useMemo<ISystemModule[]>(() => shipDefinition.modules?.filter(m => m.category !== 'STATIC' && !m.defaultModule) ?? [], [shipDefinition]);

    return (
        <Box component="div" p={1}>
            {!hideName && (
                <Box component="div" pb={1}>
                    <Typography variant="h6" gutterBottom={true}>
                        {getShipName(shipDefinition)}
                    </Typography>
                    <Divider />
                </Box>
            )}
            <LabeledList
                rowGap={2}
                separator={true}
                sx={{ width: '100%' }}
                rows={[
                    {
                        key: 'type',
                        label: t('label.shipType'),
                        value: translateShipType(shipDefinition.type, shipDefinition.subType),
                    },
                    ...(shipDefinition.row !== ShipRow.NONE ? [{
                        key: 'row',
                        label: t('label.rowPlacement'),
                        value: translateShipRow(shipDefinition.row),
                    }] : []),
                    ...(shipDefinition.cost > 0 ? [{
                        key: 'cost',
                        label: t('label.commandPoints'),
                        value: shipDefinition.cost,
                    }] : []),
                    {
                        key: 'operationLimit',
                        label: t('label.operationLimit'),
                        value: shipDefinition.operationLimit,
                    },
                    ...((shipStats) ? [
                        {
                            key: 'dpm',
                            label: t('label.dpm'),
                            value: formatDpmAll(shipStats),
                        },
                        {
                            key: 'hp',
                            label: t('label.hp'),
                            value: formatHp(shipStats),
                        },
                    ] : []),
                    ...((shipDefinition.defaultStats) ? [
                        {
                            key: 'armor',
                            label: t('label.armor'),
                            value: shipDefinition.defaultStats.armor,
                        },
                        {
                            key: 'shield',
                            label: t('label.shield'),
                            value: `${shipDefinition.defaultStats.shield}%`,
                        },
                    ] : []),
                    ...((shipStats) ? [
                        {
                            key: 'speed',
                            label: t('label.speed'),
                            value: formatSpeed(shipStats),
                        },
                        {
                            key: 'accelerationTime',
                            label: t('label.accelerationTime'),
                            value: formatAccelerationTime(shipStats),
                        },
                    ] : []),
                    ...((shipDefinition.defaultStats?.inboundTime && shipDefinition.defaultStats?.outboundTime) ? [
                        {
                            key: 'flightTime',
                            label: t('label.flightTime'),
                            value: formatFlightTime(shipDefinition.defaultStats.outboundTime, shipDefinition.defaultStats.inboundTime),
                        },
                    ] : []),
                    ...(carry ? [
                        {
                            key: 'carry',
                            label: t('shipType.aircraft'),
                            value: (
                                <>
                                    {!!shipDefinition.carryFighter && (
                                        <Typography variant="body2" gutterBottom={true}>
                                            {t('shipDetail.carriedShipCount', {
                                                shipSubType: translateShipType(ShipType.FIGHTER, shipDefinition.carryFighterType),
                                                count: shipDefinition.carryFighter,
                                            })}
                                        </Typography>
                                    )}
                                    {carryFightersModule && shipDefinition.modules?.filter(module => !!module.carryFighter).map(module => (
                                        <Typography key={module.id} variant="body2" gutterBottom={true}>
                                            {module.category !== 'STATIC'
                                                ? t('shipDetail.carriedShipCountOnModule', {
                                                    shipSubType: translateShipType(ShipType.FIGHTER, module.carryFighterType),
                                                    count: module.carryFighter,
                                                    module: `${module.category}${module.categoryNumber}`
                                                })
                                                : t('shipDetail.carriedShipCount', {
                                                    shipSubType: translateShipType(ShipType.FIGHTER, module.carryFighterType),
                                                    count: module.carryFighter,
                                                })
                                            }
                                        </Typography>
                                    ))}
                                    {!!shipDefinition.carryCorvette && (
                                        <Typography variant="body2" gutterBottom={true}>
                                            {t('shipDetail.carriedShipCount', {
                                                shipSubType: translateShipType(ShipType.CORVETTE),
                                                count: shipDefinition.carryCorvette,
                                            })}
                                        </Typography>
                                    )}
                                    {carryCorvettesModule && shipDefinition.modules?.filter(module => !!module.carryCorvette).map(module => (
                                        <Typography key={module.id} variant="body2" gutterBottom={true}>
                                            {module.category !== 'STATIC'
                                                ? t('shipDetail.carriedShipCountOnModule', {
                                                    shipSubType: translateShipType(ShipType.CORVETTE),
                                                    count: module.carryCorvette,
                                                    module: `${module.category}${module.categoryNumber}`
                                                })
                                                : t('shipDetail.carriedShipCount', {
                                                    shipSubType: translateShipType(ShipType.CORVETTE),
                                                    count: module.carryCorvette,
                                                })
                                            }
                                        </Typography>
                                    ))}
                                </>
                            ),
                        },
                    ] : []),
                    ...(staticModules.length > 0 ? [
                        {
                            key: 'staticModules',
                            label: t('label.staticSystemModules'),
                            value: (
                                <ModuleDetail shipId={shipDefinition.id} modules={staticModules} />
                            )
                        },
                    ] : []),
                    ...(defaultVariableModules.length > 0 ? [
                        {
                            key: 'modules',
                            label: t('label.defaultSystemModules'),
                            value: (
                                <ModuleDetail shipId={shipDefinition.id} modules={defaultVariableModules} />
                            )
                        },
                    ] : []),
                    ...(additionalVariableModules.length > 0 ? [
                        {
                            key: 'extraModules',
                            label: t('label.additionalSystemModules'),
                            value: (
                                <ModuleDetail shipId={shipDefinition.id} modules={additionalVariableModules} />
                            )
                        },
                    ] : []),
                    ...(shipDefinition.baseModelId ? [
                        {
                            key: 'baseModel',
                            label: t('label.baseShipVariant'),
                            value: getShipName(getShipDefinitionById(shipDefinition.baseModelId)),
                            onClick: () => onClickShip(shipDefinition.baseModelId!),
                        },
                    ] : []),
                    ...((shipDefinition.subModelIds && shipDefinition.subModelIds.length > 0) ? [
                        {
                            key: 'subModels',
                            label: t('label.subShipVariant'),
                            value: (
                                <>
                                    {shipDefinition.subModelIds.map(getShipDefinitionById).map(definition => (
                                        <Typography key={definition.id} variant="body2" gutterBottom={true}>
                                            <ScriptedLink onClick={() => onClickShip(definition.id)}>
                                                {getShipName(definition)}
                                            </ScriptedLink>
                                        </Typography>
                                    ))}
                                </>
                            ),
                        },
                    ] : []),
                    ...(related ? [
                        {
                            key: 'relatedShips',
                            label: t('label.relatedShips'),
                            value: (
                                <>
                                    {relatedSubModels.map(definition => (
                                        <Typography key={definition.id} variant="body2" gutterBottom={true}>
                                            <ScriptedLink onClick={() => onClickShip(definition.id)}>
                                                {getShipName(definition)}
                                            </ScriptedLink>
                                        </Typography>
                                    ))}
                                    {relatedShips.map(definition => (
                                        <Typography key={definition.id} variant="body2" gutterBottom={true}>
                                            <ScriptedLink onClick={() => onClickShip(definition.id)}>
                                                {getShipName(definition)}
                                            </ScriptedLink>
                                        </Typography>
                                    ))}
                                </>
                            )
                        },
                    ] : []),
                    {
                        key: 'source',
                        label: t('label.acquirableThrough'),
                        value: (
                            <>
                                {shipDefinition.source === ShipSource.STARTER_SHIP ? (
                                    <Typography variant="body2" gutterBottom={true}>
                                        {`${translateShipSource(ShipSource.TECH_FILE)}（${translateShipSource(shipDefinition.source)}）`}
                                    </Typography>
                                ) : (
                                    <Typography variant="body2" gutterBottom={true}>
                                        {`${translateShipSource(shipDefinition.source)}${isLanguageWithWhitespace() ? ' ' : ''}${shipDefinition.tags?.includes(ShipTag.PHASE_TWO_BLUEPRINT) ? t('label.reBrackets') : ''}`}
                                    </Typography>
                                )}
                                {obtainableThoughResearchAgreement && (
                                    <>
                                        <Typography variant="body2" gutterBottom={true}>
                                            {t('label.researchAgreement')}
                                        </Typography>
                                        {shipDefinition.researchManufacturer && (
                                            <Typography variant="body2" gutterBottom={true}>
                                                {`・${translateResearchManufacturer(shipDefinition.researchManufacturer)}`}
                                            </Typography>
                                        )}
                                        {shipDefinition.researchTacticTypes && shipDefinition.researchTacticTypes.length > 0 && (
                                            <Typography variant="body2" gutterBottom={true}>
                                                {`・${shipDefinition.researchTacticTypes.map(type => translateResearchTacticType(type)).join(' / ')}`}
                                            </Typography>
                                        )}
                                        {shipDefinition.researchStrategyTypes && shipDefinition.researchStrategyTypes.length > 0 && (
                                            <Typography variant="body2" gutterBottom={true}>
                                                {`・${shipDefinition.researchStrategyTypes.map(type => translateResearchStrategyType(type)).join(' / ')}`}
                                            </Typography>
                                        )}
                                    </>
                                )}
                            </>
                        ),
                    },
                    {
                        key: 'manufacturer',
                        label: t('label.manufacturer'),
                        value: translateManufacturer(shipDefinition.manufacturer),
                    },
                ]}
            />
        </Box>
    );
};
