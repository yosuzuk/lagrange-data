import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { IResearchConfiguration } from './types/IResearchConfiguration';
import { LabeledList } from '../../list/LabeledList';
import { ShipName } from './ShipName';
import { hasWantedModule } from '../../../userSettings/utils/userSettingsUtils';
import { useUserSettings } from '../../../userSettings/context/UserSettingsContext';

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
                    label: '欲しい艦船',
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
                            {'技術Pt'}
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
                                    {canGetModule && (
                                        <Typography variant="body2" component="span">
                                            {'（追加システム）'}
                                        </Typography>
                                    )}
                                    {!canGetModule && shipChance.possessed && (
                                        <Typography variant="body2" component="span">
                                            {'（技術Pt）'}
                                        </Typography>
                                    )}
                                    {wished && (
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
                        },
                        ...(canGetModule ? shipChance.modules.map(moduleChance => ({
                            key: `${configuration.id}.${shipChance.shipDefinition.id}.${moduleChance.module.id}`,
                            label: (
                                <>
                                    <Typography variant="body2" component="span" color="text.secondary" sx={{ opacity: 0.5 }}>
                                        {`┗`}
                                    </Typography>
                                    <Typography variant="body2" component="span" color="text.secondary">
                                        {`${moduleChance.module.category}${moduleChance.module.categoryNumber} ${moduleChance.module.name}`}
                                    </Typography>
                                    {moduleChance.wished && (
                                        <Tooltip
                                            arrow={true}
                                            disableFocusListener={true}
                                            title={'欲しい追加システム'}
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
                                            <Typography variant="body2" gutterBottom={true}>{'艦船確率 / 残りシステム数'}</Typography>
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
            ]}
            rowGap={1}
        />
    );
};

function formatChance(chance: number): string {
    return `${Number((chance * 100).toFixed(3))} %`;
}
