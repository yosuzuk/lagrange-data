import { IResearchConfiguration, IResearchFilterState } from './types/IResearchConfiguration';
import { ExpandStack } from '../../expandStack.tsx/ExpandStack';
import { ConfigurationDetail } from './ConfigurationDetail';
import { ConfigurationSummary } from './ConfigurationSummary';

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
                    <ConfigurationSummary
                        configuration={configuration}
                        filterState={filterState}
                    />
                ),
                details: (
                    <ConfigurationDetail configuration={configuration} />
                ),
            }))}
            unmount={true}
        />
    );
};
