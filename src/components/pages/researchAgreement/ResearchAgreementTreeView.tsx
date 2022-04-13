import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { translateResearchManufacturer } from '../../../utils/researchManufacturerUtils';
import { translateResearchStrategyType } from '../../../utils/researchStrategyTypeUtils';
import { translateResearchTacticType } from '../../../utils/researchTacticTypeUtils';
import { IResearchConfiguration } from './types/IResearchConfiguration';
import { ExpandStack } from '../../expandStack.tsx/ExpandStack';
import { LabeledList } from '../../list/LabeledList';
import { ShipName } from './ShipName';

interface IProps {
    configurations: IResearchConfiguration[];
}

export const ResearchAgreementTreeView = (props: IProps) => {
    const { configurations } = props;

    const filtered = true; // TODO set

    return (
        <ExpandStack
            expandables={configurations.filter(configuration => !!configuration.filterState.manufacturerFilter || !!configuration.filterState.strategyTypeFilter || !!configuration.filterState.tacticTypeFilter).map(configuration => ({
                id: configuration.id,
                initiallyOpened: filtered,
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
                    </Typography>
                ),
                details: (
                    <LabeledList
                        rows={[
                            {
                                key: `${configuration.id}.wishedShipChance`,
                                label: '欲しい設計図',
                                value: formatChance(configuration.wishedShipChance),
                            },
                            ...(configuration.techPointChance > 0 ? [{
                                key: `${configuration.id}.techPointChance`,
                                label: '技術Pt',
                                value: formatChance(configuration.techPointChance),
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
                                                <Typography variant="body2" component="span" sx={{ color: '#ffc107', marginLeft: '4px' }}>
                                                    {'★'}
                                                </Typography>
                                            )}
                                        </>
                                    ),
                                    value: formatChance(shipChance.chance),
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
