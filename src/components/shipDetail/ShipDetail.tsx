import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { isValidShipId } from '../../data/shipIds';
import { ShipType } from '../../types/ShipType';
import { getShipDefinitionById } from '../../utils/shipDefinitionUtils';
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

    const carryCorvettesModule = shipDefinition.modules?.some(module => !!module.carryCorvette) === true;
    const carryFightersModule = shipDefinition.modules?.some(module => !!module.carryFighter) === true;
    const carry = !!shipDefinition.carryCorvette || !!shipDefinition.carryFighter || carryCorvettesModule || carryFightersModule;

    const relatedSubModels = shipDefinition.baseModelId ? getShipDefinitionById(shipDefinition.baseModelId).subModelIds?.filter(id => id !== shipDefinition.id).map(getShipDefinitionById) ?? [] : [];
    const relatedShips = (shipDefinition.relatedShipIds ?? []).map(getShipDefinitionById);
    const related = relatedSubModels.length > 0 || relatedShips.length > 0;

    const obtainableThoughResearchAgreement = !!shipDefinition.researchManufacturer || !!shipDefinition.researchStrategyTypes || !!shipDefinition.researchTacticTypes;

    return (
        <Box p={1}>
            {!hideName && (
                <Box pb={1}>
                    <Typography variant="h6" gutterBottom={true}>
                        {shipDefinition.name}
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
                        label: '??????',
                        value: translateShipType(shipDefinition.type, shipDefinition.subType),
                    },
                    ...(shipDefinition.row !== ShipRow.NONE ? [{
                        key: 'row',
                        label: '??????',
                        value: translateShipRow(shipDefinition.row),
                    }] : []),
                    ...(shipDefinition.cost > 0 ? [{
                        key: 'cost',
                        label: '????????????',
                        value: shipDefinition.cost,
                    }] : []),
                    {
                        key: 'operationLimit',
                        label: '????????????',
                        value: shipDefinition.operationLimit,
                    },
                    ...(carry ? [
                        {
                            key: 'carry',
                            label: '?????????',
                            value: (
                                <>
                                    {!!shipDefinition.carryFighter && (
                                        <Typography variant="body2" gutterBottom={true}>
                                            {`${translateShipType(ShipType.FIGHTER, shipDefinition.carryFighterType)} ??${shipDefinition.carryFighter}`}
                                        </Typography>
                                    )}
                                    {carryFightersModule && shipDefinition.modules?.filter(module => !!module.carryFighter).map(module => (
                                        <Typography key={module.id} variant="body2" gutterBottom={true}>
                                            {`${translateShipType(ShipType.FIGHTER, module.carryFighterType)} ??${module.carryFighter}???${module.category}${module.categoryNumber}???`}
                                        </Typography>
                                    ))}
                                    {!!shipDefinition.carryCorvette && (
                                        <Typography variant="body2" gutterBottom={true}>
                                            {`${translateShipType(ShipType.CORVETTE)} ??${shipDefinition.carryCorvette}`}
                                        </Typography>
                                    )}
                                    {carryCorvettesModule && shipDefinition.modules?.filter(module => !!module.carryCorvette).map(module => (
                                        <Typography key={module.id} variant="body2" gutterBottom={true}>
                                            {`${translateShipType(ShipType.CORVETTE)} ??${module.carryCorvette}???${module.category}${module.categoryNumber}???`}
                                        </Typography>
                                    ))}
                                </>
                            ),
                        },
                    ] : []),
                    ...((!shipDefinition.staticModules && shipDefinition.modules && shipDefinition.modules.length > 0) ? [
                        {
                            key: 'modules',
                            label: '??????????????????',
                            value: (
                                <ModuleDetail modules={shipDefinition.modules.filter(module => module.defaultModule)}/>
                            )
                        },
                        {
                            key: 'extraModules',
                            label: '??????????????????',
                            value: (
                                <ModuleDetail modules={shipDefinition.modules.filter(module => !module.defaultModule)}/>
                            )
                        },
                    ] : []),
                    ...((shipDefinition.staticModules && shipDefinition.modules && shipDefinition.modules.length > 0) ? [
                        {
                            key: 'staticModules',
                            label: '??????????????????',
                            value: (
                                <ModuleDetail modules={shipDefinition.modules} />
                            )
                        },
                    ] : []),
                    ...(shipDefinition.baseModelId ? [
                        {
                            key: 'baseModel',
                            label: '??????????????????',
                            value: getShipDefinitionById(shipDefinition.baseModelId).name,
                            onClick: () => onClickShip(shipDefinition.baseModelId!),
                        },
                    ] : []),
                    ...((shipDefinition.subModelIds && shipDefinition.subModelIds.length > 0) ? [
                        {
                            key: 'subModels',
                            label: '???????????????',
                            value: (
                                <>
                                    {shipDefinition.subModelIds.map(getShipDefinitionById).map(definition => (
                                        <Typography key={definition.id} variant="body2" gutterBottom={true}>
                                            <ScriptedLink onClick={() => onClickShip(definition.id)}>
                                                {definition.name}
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
                            label: '????????????',
                            value: (
                                <>
                                    {relatedSubModels.map(definition => (
                                        <Typography key={definition.id} variant="body2" gutterBottom={true}>
                                            <ScriptedLink onClick={() => onClickShip(definition.id)}>
                                                {definition.name}
                                            </ScriptedLink>
                                        </Typography>
                                    ))}
                                    {relatedShips.map(definition => (
                                        <Typography key={definition.id} variant="body2" gutterBottom={true}>
                                            <ScriptedLink onClick={() => onClickShip(definition.id)}>
                                                {definition.name}
                                            </ScriptedLink>
                                        </Typography>
                                    ))}
                                </>
                            )
                        },
                    ] : []),
                    {
                        key: 'source',
                        label: '????????????',
                        value: (
                            <>
                                {shipDefinition.source === ShipSource.STARTER_SHIP ? (
                                    <Typography variant="body2" gutterBottom={true}>
                                        {`${translateShipSource(ShipSource.TECH_FILE)}???${translateShipSource(shipDefinition.source)}???`}
                                    </Typography>
                                ) : (
                                    <Typography variant="body2" gutterBottom={true}>
                                        {`${translateShipSource(shipDefinition.source)}${shipDefinition.tags?.includes(ShipTag.PHASE_TWO_BLUEPRINT) ? '???????????????????????????' : ''}`}
                                    </Typography>
                                )}
                                {obtainableThoughResearchAgreement && (
                                    <>
                                        <Typography variant="body2" gutterBottom={true}>
                                            {'????????????'}
                                        </Typography>
                                        {shipDefinition.researchManufacturer && (
                                            <Typography variant="body2" gutterBottom={true}>
                                                {`???${translateResearchManufacturer(shipDefinition.researchManufacturer)}`}
                                            </Typography>
                                        )}
                                        {shipDefinition.researchStrategyTypes && shipDefinition.researchStrategyTypes.length > 0 && (
                                            <Typography variant="body2" gutterBottom={true}>
                                                {`???${shipDefinition.researchStrategyTypes.map(type => translateResearchStrategyType(type)).join(' / ')}`}
                                            </Typography>
                                        )}
                                        {shipDefinition.researchTacticTypes && shipDefinition.researchTacticTypes.length > 0 && (
                                            <Typography variant="body2" gutterBottom={true}>
                                                {`???${shipDefinition.researchTacticTypes.map(type => translateResearchTacticType(type)).join(' / ')}`}
                                            </Typography>
                                        )}
                                    </>
                                )}
                            </>
                        ),
                    },
                    {
                        key: 'manufacturer',
                        label: '??????',
                        value: translateManufacturer(shipDefinition.manufacturer),
                    },
                ]}
            />
        </Box>
    );
};
