import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { IResearchConfiguration } from './types/IResearchConfiguration';
import { LabeledList } from '../../list/LabeledList';
import { ShipName } from './ShipName';

interface IProps {
    configuration: IResearchConfiguration;
}

export const ConfigurationDetail = (props: IProps) => {
    const { configuration } = props;
    return (
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
    );
};

function formatChance(chance: number): string {
    return `${Number((chance * 100).toFixed(3))} %`;
}
