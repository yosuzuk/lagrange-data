import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { translateResearchManufacturer } from '../../../utils/researchManufacturerUtils';
import { translateResearchStrategyType } from '../../../utils/researchStrategyTypeUtils';
import { translateResearchTacticType } from '../../../utils/researchTacticTypeUtils';
import { IResearchConfiguration, IResearchFilterState } from './types/IResearchConfiguration';
import { ExpandStack } from '../../expandStack.tsx/ExpandStack';
import { LabeledList } from '../../list/LabeledList';
import { ShipName } from './ShipName';

interface IProps {
    configurations: IResearchConfiguration[];
    filterState: IResearchFilterState;
}

export const ResearchAgreementShipsView = (props: IProps) => {
    const { configurations, filterState } = props;

    const phaseFilterUsed = !!filterState.manufacturerFilter || !!filterState.strategyTypeFilter || !!filterState.tacticTypeFilter;

    return (
        <ExpandStack
            expandables={configurations.map(configuration => ({
                id: configuration.id,
                initiallyOpened: phaseFilterUsed,
                summary: (
                    <Typography variant="body2">
                        {[
                            ...(configuration.filterState.manufacturerFilter !== null ? [
                                translateResearchManufacturer(configuration.filterState.manufacturerFilter),
                            ] : []),
                            ...(configuration.filterState.strategyTypeFilter !== null ? [
                                translateResearchStrategyType(configuration.filterState.strategyTypeFilter),
                            ] : []),
                            ...(configuration.filterState.tacticTypeFilter !== null ? [
                                translateResearchTacticType(configuration.filterState.tacticTypeFilter),
                            ] : []),
                            ...(!configuration.filterState.manufacturerFilter && !configuration.filterState.strategyTypeFilter && !configuration.filterState.tacticTypeFilter ? [
                                '無し',
                            ] : []),
                        ].map(t => `「${t}」`).join('+')}
                        {filterState.shipId === null && configuration.wishedShipChance > 0 && (
                            <Tooltip
                                arrow={true}
                                disableFocusListener={true}
                                title={`欲しい艦船が当たる確率：${formatChance(configuration.wishedShipChance)}`}
                            >
                                <Typography variant="body2" component="span" sx={{ color: '#ffc107', marginLeft: '4px' }}>
                                    {'★'}
                                </Typography>
                            </Tooltip>
                        )}
                        {filterState.shipId !== null && (
                            <Typography
                                variant="body2"
                                component="span"
                            >
                                {`　⇒　${formatChance(configuration.shipChances.find(shipChance => shipChance.shipDefinition.id === filterState.shipId)?.chance ?? 0)}`}
                            </Typography>
                        )}
                    </Typography>
                ),
                details: (
                    <LabeledList
                        rows={[
                            {
                                key: `${configuration.id}.wishedShipChance`,
                                label: '欲しい設計図',
                                value: formatChance(configuration.wishedShipChance),
                                separatorAfter: true,
                            },
                            ...(configuration.techPointChance > 0 ? [{
                                key: `${configuration.id}.techPointChance`,
                                label: (
                                    <Typography
                                        variant="body2"
                                        sx={configuration.techPointChance > 0 ? { color: 'red' } : undefined}
                                    >
                                        {'技術Pt ×５'}
                                    </Typography>
                                ),
                                value: (
                                    <Typography
                                        variant="body2"
                                        sx={configuration.techPointChance > 0 ? { color: 'red' } : undefined}
                                    >
                                        {formatChance(configuration.techPointChance)}
                                    </Typography>
                                ),
                                separatorAfter: true,
                            }] : []),
                            ...configuration.shipChances.map(shipChance => {
                                const canGetModule = shipChance.possessed && shipChance.shipDefinition.modules && shipChance.shipDefinition.modules.length > 0;
                                return {
                                    key: `${configuration.id}.${shipChance.shipDefinition.id}`,
                                    label: (
                                        <>
                                            <ShipName shipDefinition={shipChance.shipDefinition} />
                                            {canGetModule && (
                                                <Typography variant="body2" component="span">
                                                    {'（追加モジュール）'}
                                                </Typography>
                                            )}
                                            {!canGetModule && shipChance.possessed && (
                                                <Typography variant="body2" component="span">
                                                    {'（技術Pt）'}
                                                </Typography>
                                            )}
                                            {shipChance.wished && (
                                                <Tooltip
                                                    arrow={true}
                                                    disableFocusListener={true}
                                                    title={'欲しい艦船'}
                                                >
                                                    <Typography variant="body2" component="span" sx={{ color: '#ffc107', marginLeft: '4px' }}>
                                                        {'★'}
                                                    </Typography>
                                                </Tooltip>
                                            )}
                                        </>
                                    ),
                                    value: (
                                        <Tooltip
                                            arrow={true}
                                            disableFocusListener={true}
                                            title={(
                                                <>
                                                    <Typography variant="body2" gutterBottom={true}>{'確率の重み / 合計'}</Typography>
                                                    <Typography variant="body2">{shipChance.formula}</Typography>
                                                </>
                                            )}
                                        >
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: (!canGetModule && shipChance.possessed) ? 'red' : undefined,
                                                }}
                                            >
                                                {formatChance(shipChance.chance)}
                                            </Typography>
                                        </Tooltip>
                                    ),
                                };
                            }),
                        ]}
                        rowGap={1}
                    />
                ),
            }))}
            unmount={true}
        />
    );
};

function formatChance(chance: number): string {
    return `${Number((chance * 100).toFixed(3))} %`;
}
