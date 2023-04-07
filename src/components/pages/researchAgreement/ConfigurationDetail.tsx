import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { IResearchConfiguration, IShipTypeResearchChance } from './types/IResearchConfiguration';
import { LabeledList } from '../../list/LabeledList';
import { ShipName } from './ShipName';
import { hasWantedModule } from '../../../userSettings/utils/userSettingsUtils';
import { useUserSettings } from '../../../userSettings/context/UserSettingsContext';
import { isLanguageWithWhitespace, t } from '../../../i18n';
import { getModuleName } from '../../../utils/shipDefinitionUtils';
import { translateShipType } from '../../../utils/shipTypeUtils';
import { formatResearchTime } from './utils/researchTimeUtils';

interface IProps {
    configuration: IResearchConfiguration;
}

export const ConfigurationDetail = (props: IProps) => {
    const { configuration } = props;
    const { userSettings } = useUserSettings();

    return (
        <LabeledList
            rows={[
                {
                    key: `${configuration.id}.wishedShipChance`,
                    label: t('label.wantedBlueprint'),
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
                            {t('label.techPoints')}
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
                ...configuration.shipChances.flatMap(shipChance => {
                    const canGetModule = shipChance.possessed && shipChance.modules.length > 0;
                    const wished = shipChance.wished || hasWantedModule(shipChance.shipDefinition.id, userSettings);
                    return [
                        {
                            key: `${configuration.id}.${shipChance.shipDefinition.id}`,
                            label: (
                                <>
                                    <ShipName shipDefinition={shipChance.shipDefinition} />
                                    {isLanguageWithWhitespace() && (
                                        <span>&nbsp;</span>
                                    )}
                                    {canGetModule && (
                                        <Typography variant="body2" component="span">
                                            {t('label.additionalSystemModuleBrackets')}
                                        </Typography>
                                    )}
                                    {!canGetModule && shipChance.possessed && (
                                        <Typography variant="body2" component="span">
                                            {t('label.techPointsBrackets')}
                                        </Typography>
                                    )}
                                    {wished && (
                                        <Tooltip
                                            arrow={true}
                                            disableFocusListener={true}
                                            title={`${t('label.wantedBlueprint')}`}
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
                                            <Typography variant="body2" gutterBottom={true}>
                                                {`[${t('label.probabilityWeight')}] / [${t('label.total')}]`}
                                            </Typography>
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
                        },
                        ...(canGetModule ? shipChance.modules.map(moduleChance => ({
                            key: `${configuration.id}.${shipChance.shipDefinition.id}.${moduleChance.module.id}`,
                            label: (
                                <>
                                    <Typography variant="body2" component="span" color="text.secondary" sx={{ opacity: 0.5 }}>
                                        {`┗`}
                                    </Typography>
                                    {isLanguageWithWhitespace() && (
                                        <span>&nbsp;</span>
                                    )}
                                    <Typography variant="body2" component="span" color="text.secondary">
                                        {`${moduleChance.module.category}${moduleChance.module.categoryNumber} ${getModuleName(shipChance.shipDefinition.id, moduleChance.module)}`}
                                    </Typography>
                                    {moduleChance.wished && (
                                        <Tooltip
                                            arrow={true}
                                            disableFocusListener={true}
                                            title={`${t('label.wantedAdditionalSystemModule')}`}
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
                                            <Typography variant="body2" gutterBottom={true}>
                                                {`[${t('label.shipProbability')}] / [${t('label.remainingAdditionalSystemModules')}]`}
                                            </Typography>
                                            <Typography variant="body2">{moduleChance.formula}</Typography>
                                        </>
                                    )}
                                >
                                    <Typography variant="body2" color="text.secondary">
                                        {formatChance(moduleChance.chance)}
                                    </Typography>
                                </Tooltip>
                            ),
                        })) : []),
                    ];
                }),
                ...configuration.shipTypeChances.map((shipTypeChance: IShipTypeResearchChance, index: number) => ({
                    key: `${configuration.id}.${shipTypeChance.shipType}`,
                    label: translateShipType(shipTypeChance.shipType),
                    value: formatChance(shipTypeChance.chance, 1),
                    separatorBefore: index === 0,
                })),
                {
                    key: `${configuration.id}.duration`,
                    label: t('researchAgreement.researchTime'),
                    value: formatResearchTime(configuration.filterState),
                    separatorBefore: true,
                },
            ]}
            rowGap={1}
        />
    );
};

function formatChance(chance: number, fractionDigits: number = 3): string {
    return `${Number((chance * 100).toFixed(fractionDigits))} %`;
}
