import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { isValidShipId } from '../../data/shipIds';
import { ShipType } from '../../types/ShipType';
import { getShipDefinitionById } from '../../utils/shipDefinitionUtils';
import { translateShipRow } from '../../utils/shipRowUtils';
import { translateShipType } from '../../utils/shipTypeUtils';
import { LabeledList } from '../list/LabeledList';
import { obtainableFromResearchAgreement, translateShipSource } from '../../utils/shipSourceUtils';
import { ShipTag } from '../../types/ShipTag';
import { ShipSource } from '../../types/ShipSource';
import { ScriptedLink } from '../link/ScriptedLink';

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
                rows={[
                    {
                        key: 'type',
                        label: '艦種',
                        value: translateShipType(shipDefinition.type, shipDefinition.subType),
                    },
                    {
                        key: 'row',
                        label: '配置',
                        value: translateShipRow(shipDefinition.row),
                    },
                    {
                        key: 'cost',
                        label: 'コスト',
                        value: shipDefinition.cost,
                    },
                    {
                        key: 'operationLimit',
                        label: '稼働上限',
                        value: shipDefinition.operationLimit,
                    },
                    ...(carry ? [
                        {
                            key: 'carry',
                            label: '艦載機',
                            value: (
                                <>
                                    {!!shipDefinition.carryFighter && (
                                        <Typography variant="body2" gutterBottom={true}>
                                            {`${translateShipType(ShipType.FIGHTER, shipDefinition.carryFighterType)} ×${shipDefinition.carryFighter}`}
                                        </Typography>
                                    )}
                                    {carryFightersModule && shipDefinition.modules?.filter(module => !!module.carryFighter).map(module => (
                                        <Typography key={module.id} variant="body2" gutterBottom={true}>
                                            {`${translateShipType(ShipType.FIGHTER, module.carryFighterType)} ×${module.carryFighter}（${module.category}${module.categoryNumber}）`}
                                        </Typography>
                                    ))}
                                    {!!shipDefinition.carryCorvette && (
                                        <Typography variant="body2" gutterBottom={true}>
                                            {`${translateShipType(ShipType.CORVETTE)} ×${shipDefinition.carryCorvette}`}
                                        </Typography>
                                    )}
                                    {carryCorvettesModule && shipDefinition.modules?.filter(module => !!module.carryCorvette).map(module => (
                                        <Typography key={module.id} variant="body2" gutterBottom={true}>
                                            {`${translateShipType(ShipType.CORVETTE)} ×${module.carryCorvette}（${module.category}${module.categoryNumber}）`}
                                        </Typography>
                                    ))}
                                </>
                            ),
                        },
                    ] : []),
                    ...((!shipDefinition.staticModules && shipDefinition.modules && shipDefinition.modules.length > 0) ? [
                        {
                            key: 'modules',
                            label: '初期モジュール',
                            value: (
                                <>
                                    {shipDefinition.modules.filter(module => module.defaultModule).map(module => (
                                        <Typography key={module.id} variant="body2" gutterBottom={true}>
                                            {`${module.category}${module.categoryNumber} ${module.name}`}
                                        </Typography>
                                    ))}
                                </>
                            )
                        },
                        {
                            key: 'extraModules',
                            label: '追加モジュール',
                            value: (
                                <>
                                    {shipDefinition.modules.filter(module => !module.defaultModule).map(module => (
                                        <Typography key={module.id} variant="body2" gutterBottom={true}>
                                            {`${module.category}${module.categoryNumber} ${module.name}`}
                                        </Typography>
                                    ))}
                                </>
                            )
                        },
                    ] : []),
                    ...((shipDefinition.staticModules && shipDefinition.modules && shipDefinition.modules.length > 0) ? [
                        {
                            key: 'staticModules',
                            label: '固定モジュール',
                            value: (
                                <>
                                    {shipDefinition.modules.map(module => (
                                        <Typography key={module.id} variant="body2" gutterBottom={true}>
                                            {`${module.category}${module.categoryNumber} ${module.name}`}
                                        </Typography>
                                    ))}
                                </>
                            )
                        },
                    ] : []),
                    ...(shipDefinition.baseModelId ? [
                        {
                            key: 'baseModel',
                            label: 'ベースモデル',
                            value: getShipDefinitionById(shipDefinition.baseModelId).name,
                            onClick: () => onClickShip(shipDefinition.baseModelId!),
                        },
                    ] : []),
                    ...((shipDefinition.subModelIds && shipDefinition.subModelIds.length > 0) ? [
                        {
                            key: 'subModels',
                            label: 'サブモデル',
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
                            label: '関連艦船',
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
                        label: '入手方法',
                        value: (
                            <>
                                {shipDefinition.source === ShipSource.STARTER_SHIP ? (
                                    <Typography variant="body2" gutterBottom={true}>
                                        {`${translateShipSource(ShipSource.TECH_FILE)}（${translateShipSource(shipDefinition.source)}）`}
                                    </Typography>
                                ) : (
                                    <Typography variant="body2" gutterBottom={true}>
                                        {`${translateShipSource(shipDefinition.source)}${shipDefinition.tags?.includes(ShipTag.PHASE_TWO_BLUEPRINT) ? '（フェーズ２以降）' : ''}`}
                                    </Typography>
                                )}
                                {obtainableFromResearchAgreement(shipDefinition.source) && (
                                    <Typography variant="body2" gutterBottom={true}>
                                        {'研究協定'}
                                    </Typography>
                                )}
                            </>
                        ),
                    },
                ]}
            />
        </Box>
    );
};
