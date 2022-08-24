import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { t } from '../../../i18n';
import { translateResearchManufacturer } from '../../../utils/researchManufacturerUtils';
import { translateResearchStrategyType } from '../../../utils/researchStrategyTypeUtils';
import { translateResearchTacticType } from '../../../utils/researchTacticTypeUtils';
import { IResearchConfiguration, IResearchFilterState } from './types/IResearchConfiguration';

interface IProps {
    configuration: IResearchConfiguration;
    filterState: IResearchFilterState;
}

export const ConfigurationSummary = (props: IProps) => {
    const { configuration, filterState } = props;

    return (
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
                    t('label.notSelected'),
                ] : []),
            ].map(t => `「${t}」`).join('+')}
            {filterState.shipId === null && configuration.wishedShipChance > 0 && (
                <Tooltip
                    arrow={true}
                    disableFocusListener={true}
                    title={`${t('label.probabilityForWantedBlueprintColon')}${formatChance(configuration.wishedShipChance)}`}
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
    );
};

function formatChance(chance: number): string {
    return `${Number((chance * 100).toFixed(3))} %`;
}
