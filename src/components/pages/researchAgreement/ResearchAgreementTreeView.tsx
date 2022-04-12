import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { translateResearchManufacturer } from '../../../utils/researchManufacturerUtils';
import { translateResearchStrategyType } from '../../../utils/researchStrategyTypeUtils';
import { translateResearchTacticType } from '../../../utils/researchTacticTypeUtils';
import { IResearchConfiguration, IShipResearchChance } from './types/IResearchConfiguration';
import { ExpandStack } from '../../expandStack.tsx/ExpandStack';
import { LabeledList } from '../../list/LabeledList';

interface IProps {
    configurations: IResearchConfiguration[];
}

export const ResearchAgreementTreeView = (props: IProps) => {
    const { configurations } = props;

    const filtered = true;

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
                        rows={configuration.shipChances.map(shipChance => ({
                            key: `${configuration.id}.${shipChance.shipDefinition.id}`,
                            label: (
                                <>
                                    <Typography variant="body2" component="span">
                                        {shipChance.shipDefinition.name}
                                    </Typography>
                                    {shipChance.possessed && shipChance.shipDefinition.modules && shipChance.shipDefinition.modules.length > 0 && (
                                        <Typography variant="body2" component="span">
                                            {'（追加モジュール）'}
                                        </Typography>
                                    )}
                                    {shipChance.wished && (
                                        <Typography variant="body2" component="span" sx={{ color: 'yellow' }}>
                                            {' ★'}
                                        </Typography>
                                    )}
                                </>
                            ),
                            value: formatChance(shipChance.chance)
                        }))}
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
