import { useMemo, useState } from 'react';
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import ErrorIcon from '@mui/icons-material/Error';
import Typography from '@mui/material/Typography';
import { IFleetSetup } from './types/IFleetSetup';
import { LabeledList } from '../../list/LabeledList';
import { getFleetShipCount } from './utils/shipCounter';
import { translateShipType } from '../../../utils/shipTypeUtils';
import { ShipType } from '../../../types/ShipType';
import { translateShipRow } from '../../../utils/shipRowUtils';
import { ShipRow } from '../../../types/ShipRow';
import { validateFleetSetupForShipWarnings } from './utils/fleetSetupValidation';
import { getShipDefinitionById, getShipName } from '../../../utils/shipDefinitionUtils';
import { getFleetStats } from './utils/fleetStats';
import { formatDpmAll, formatHp, formatSpeed } from '../../../utils/shipStatsUtils';
import { flags } from '../../../utils/flags';
import { t, isLanguageWithWhitespace } from '../../../i18n';

interface IProps {
    fleetSetup: IFleetSetup;
}

export const FleetProperties = (props: IProps) => {
    const { fleetSetup } = props;
    const [expanded, setExpanded] = useState<boolean>(false);

    const {
        totalCost,
        shipCount,
        shipCountByType,
        shipCountByRow,
    } = useMemo(() => getFleetShipCount(fleetSetup.ships), [fleetSetup.ships]);

    const fleetStats = useMemo(() => getFleetStats(fleetSetup.ships), [fleetSetup.ships]);

    const exceedingCost = totalCost > fleetSetup.maxCost;
    const exceedingReinforcement = fleetSetup.totalReinforcementCount > fleetSetup.maxReinforcement;

    const warnings = useMemo<string[]>(() => {
        const errorMap = validateFleetSetupForShipWarnings(fleetSetup);
        return Object.keys(errorMap).map(key => {
            const [shipId, owner] = key.split('#');
            const shipDefinition = getShipDefinitionById(shipId);
            const shipName = getShipName(shipDefinition);
            const errorText = errorMap[key];
            switch (owner) {
                case 'self': {
                    return t('fleetSetup.reinforcementShipWithValidationError', {
                        shipName,
                        reinforcementType: t('fleetSetup.reinforcement'),
                        errorText,
                    });
                }
                case 'ally': {
                    return t('fleetSetup.reinforcementShipWithValidationError', {
                        shipName,
                        reinforcementType: t('fleetSetup.orgReinforcementA'),
                        errorText,
                    });
                }
                case 'ally2': {
                    return t('fleetSetup.reinforcementShipWithValidationError', {
                        shipName,
                        reinforcementType: t('fleetSetup.orgReinforcementB'),
                        errorText,
                    });
                }
                case 'ally3': {
                    return t('fleetSetup.reinforcementShipWithValidationError', {
                        shipName,
                        reinforcementType: t('fleetSetup.orgReinforcementC'),
                        errorText,
                    });
                }
                default: {
                    return t('fleetSetup.shipWithValidationError', {
                        shipName,
                        errorText,
                    });
                }
            }
        });
    }, [fleetSetup]);

    const hasIssue = exceedingCost || exceedingReinforcement || warnings.length > 0;
    const expandIcon = hasIssue ? <ErrorIcon color="error" /> : <InfoIcon color="primary" />;

    return (
        <Accordion
            expanded={expanded}
            onChange={() => setExpanded(!expanded)}
        >
            <AccordionSummary
                expandIcon={expanded ? <ExpandMoreIcon /> : expandIcon}
            >
                <Stack spacing={1}>
                    <Typography variant="body1">
                        {fleetSetup.name}
                    </Typography>
                    {!expanded && (
                        <div>
                            <Typography variant="body2" color="text.secondary" component="span">
                                {t('fleetSetup.reinforcementColon')}
                                {isLanguageWithWhitespace() ? ' ' : ''}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" component="span" sx={exceedingReinforcement ? { color: 'red' } : {}}>
                                {`${fleetSetup.totalReinforcementCount} / ${fleetSetup.maxReinforcement}`}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" component="span">
                                {t('fleetSetup.commaCommandPointColon')}
                                {isLanguageWithWhitespace() ? ' ' : ''}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" component="span" sx={exceedingCost ? { color: 'red' } : {}}>
                                {`${totalCost} / ${fleetSetup.maxCost}`}
                            </Typography>
                        </div>
                    )}
                </Stack>
            </AccordionSummary>
            <AccordionDetails>
                {expanded && (
                    <LabeledList
                        rows={[
                            {
                                key: 'reinforcementCount',
                                label: t('fleetSetup.reinforcement'),
                                value: (
                                    <Typography variant="body2" sx={exceedingReinforcement ? { color: 'red' } : {}}>
                                        {`${fleetSetup.totalReinforcementCount} / ${fleetSetup.maxReinforcement}`}
                                    </Typography>
                                ),
                            },
                            {
                                key: 'cost',
                                label: t('fleetSetup.totalFleetCommandPoints'),
                                value: (
                                    <Typography variant="body2" sx={exceedingCost ? { color: 'red' } : {}}>
                                        {`${totalCost} / ${fleetSetup.maxCost}`}
                                    </Typography>
                                ),
                            },
                            ...(flags.enableStats ? [
                                {
                                    key: 'dpm',
                                    label: t('fleetSetup.totalFleetDpm'),
                                    value: (
                                        <>
                                            <Typography variant="body2">
                                                {formatDpmAll(fleetStats)}
                                            </Typography>
                                            {fleetStats.incomplete && (
                                                <Typography variant="caption" color="text.secondary">
                                                    {t('fleetSetup.inaccurateDueToMissingDataBrackets')}
                                                </Typography>
                                            )}
                                        </>
                                    ),
                                },
                                {
                                    key: 'hp',
                                    label: t('fleetSetup.totalFleetHp'),
                                    value: (
                                        <>
                                            <Typography variant="body2">
                                                {formatHp(fleetStats)}
                                            </Typography>
                                            {fleetStats.incomplete && (
                                                <Typography variant="caption" color="text.secondary">
                                                    {t('fleetSetup.inaccurateDueToMissingDataBrackets')}
                                                </Typography>
                                            )}
                                        </>
                                    ),
                                },
                                {
                                    key: 'speed',
                                    label: t('label.speed'),
                                    value: (
                                        <>
                                            <Typography variant="body2">
                                                {formatSpeed(fleetStats)}
                                            </Typography>
                                            {fleetStats.incomplete && (
                                                <Typography variant="caption" color="text.secondary">
                                                    {t('fleetSetup.inaccurateDueToMissingDataBrackets')}
                                                </Typography>
                                            )}
                                        </>
                                    ),
                                },
                            ] : []),
                            {
                                key: 'shipCount',
                                label: t('label.ships'),
                                value: shipCount > 0 ? (
                                    <>
                                        <Typography variant="body2">{t('fleetSetup.totalShipCountValue', { value: shipCount })}</Typography>
                                        {Object.keys(shipCountByType)
                                            .filter(shipType => shipCountByType[shipType as ShipType] > 0 && shipType !== ShipType.CORVETTE && shipType !== ShipType.FIGHTER)
                                            .map(shipType => (
                                                <Typography key={shipType} variant="body2">
                                                    {t('fleetSetup.countPerKind', {
                                                        kind: translateShipType(shipType as ShipType),
                                                        value: shipCountByType[shipType as ShipType],
                                                    })}
                                                </Typography>
                                            ))
                                        }
                                    </>
                                ) : (
                                    <Typography variant="body2">{'-'}</Typography>
                                ),
                            },
                            {
                                key: 'carriedShipCount',
                                label: t('shipType.aircraft'),
                                value: (shipCountByType[ShipType.FIGHTER] + shipCountByType[ShipType.CORVETTE]) > 0 ? (
                                    <>
                                        {shipCountByType[ShipType.FIGHTER] > 0 && (
                                            <Typography variant="body2">
                                                {t('fleetSetup.countPerKind', {
                                                    kind: translateShipType(ShipType.FIGHTER),
                                                    value: shipCountByType[ShipType.FIGHTER],
                                                })}
                                            </Typography>
                                        )}
                                        {shipCountByType[ShipType.CORVETTE] > 0 && (
                                            <Typography variant="body2">
                                                {t('fleetSetup.countPerKind', {
                                                    kind: translateShipType(ShipType.CORVETTE),
                                                    value: shipCountByType[ShipType.CORVETTE],
                                                })}
                                            </Typography>
                                        )}
                                    </>
                                ) : (
                                    <Typography variant="body2">{'-'}</Typography>
                                ),
                            },
                            {
                                key: 'rowCount',
                                label: t('label.rowPlacement'),
                                value: shipCount > 0 ? (
                                    <>
                                        {Object.keys(shipCountByRow).filter(shipRow => shipRow !== ShipRow.NONE && shipCountByRow[shipRow as ShipRow] > 0).map(shipRow => (
                                            <Typography key={shipRow} variant="body2">
                                                {t('fleetSetup.countPerKind', {
                                                    kind: translateShipRow(shipRow as ShipRow),
                                                    value: shipCountByRow[shipRow as ShipRow],
                                                })}
                                            </Typography>
                                        ))}
                                    </>
                                ) : (
                                    <Typography variant="body2">{'-'}</Typography>
                                ),
                            },
                            ...(warnings.length > 0 ? [{
                                key: 'warnings',
                                label: t('label.warning'),
                                value: warnings.map((warning: string, index: number) => (
                                    <Typography key={`warning_${index}`} variant="body2" sx={{ color: 'red' }}>
                                        {warning}
                                    </Typography>
                                )),
                            }] : []),
                        ]}
                    />
                )}
            </AccordionDetails>
        </Accordion>
    );
}
