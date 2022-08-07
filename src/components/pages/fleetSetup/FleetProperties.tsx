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
import { getShipDefinitionById } from '../../../utils/shipDefinitionUtils';
import { getFleetStats } from './utils/fleetStats';
import { formatDpmAll, formatHp, formatSpeed } from '../../../utils/shipStatsUtils';
import { flags } from '../../../utils/flags';

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
            switch (owner) {
                case 'self': {
                    return `${shipDefinition.name}：${errorMap[key]}`;
                }
                case 'ally': {
                    return `${shipDefinition.name}（ユニオン増援Ａ）：${errorMap[key]}`;
                }
                case 'ally2': {
                    return `${shipDefinition.name}（ユニオン増援Ｂ）：${errorMap[key]}`;
                }
                case 'ally3': {
                    return `${shipDefinition.name}（ユニオン増援Ｃ）：${errorMap[key]}`;
                }
                default: {
                    return `${shipDefinition.name}：${errorMap[key]}`;
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
                                {'増援：'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" component="span" sx={exceedingReinforcement ? { color: 'red' } : {}}>
                                {`${fleetSetup.totalReinforcementCount} / ${fleetSetup.maxReinforcement}`}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" component="span">
                                {'、司令Pt：'}
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
                                label: '増援',
                                value: (
                                    <Typography variant="body2" sx={exceedingReinforcement ? { color: 'red' } : {}}>
                                        {`${fleetSetup.totalReinforcementCount} / ${fleetSetup.maxReinforcement}`}
                                    </Typography>
                                ),
                            },
                            {
                                key: 'cost',
                                label: '艦隊司令Pt',
                                value: (
                                    <Typography variant="body2" sx={exceedingCost ? { color: 'red' } : {}}>
                                        {`${totalCost} / ${fleetSetup.maxCost}`}
                                    </Typography>
                                ),
                            },
                            ...(flags.enableStats ? [
                                {
                                    key: 'dpm',
                                    label: '合計DPM',
                                    value: (
                                        <>
                                            <Typography variant="body2">
                                                {formatDpmAll(fleetStats)}
                                            </Typography>
                                            {fleetStats.incomplete && (
                                                <Typography variant="caption" color="text.secondary">
                                                    {'（データが欠落しているため不正確）'}
                                                </Typography>
                                            )}
                                        </>
                                    ),
                                },
                                {
                                    key: 'hp',
                                    label: '合計HP',
                                    value: (
                                        <>
                                            <Typography variant="body2">
                                                {formatHp(fleetStats)}
                                            </Typography>
                                            {fleetStats.incomplete && (
                                                <Typography variant="caption" color="text.secondary">
                                                    {'（データが欠落しているため不正確）'}
                                                </Typography>
                                            )}
                                        </>
                                    ),
                                },
                                {
                                    key: 'speed',
                                    label: '速度',
                                    value: (
                                        <>
                                            <Typography variant="body2">
                                                {formatSpeed(fleetStats)}
                                            </Typography>
                                            {fleetStats.incomplete && (
                                                <Typography variant="caption" color="text.secondary">
                                                    {'（データが欠落しているため不正確）'}
                                                </Typography>
                                            )}
                                        </>
                                    ),
                                },
                            ] : []),
                            {
                                key: 'shipCount',
                                label: '艦船',
                                value: shipCount > 0 ? (
                                    <>
                                        <Typography variant="body2">{`合計　${shipCount}`}</Typography>
                                        {Object.keys(shipCountByType)
                                            .filter(shipType => shipCountByType[shipType as ShipType] > 0 && shipType !== ShipType.CORVETTE && shipType !== ShipType.FIGHTER)
                                            .map(shipType => (
                                                <Typography key={shipType} variant="body2">
                                                    {`${translateShipType(shipType as ShipType)}　${shipCountByType[shipType as ShipType]}`}
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
                                label: '艦載機',
                                value: (shipCountByType[ShipType.FIGHTER] + shipCountByType[ShipType.CORVETTE]) > 0 ? (
                                    <>
                                        {shipCountByType[ShipType.FIGHTER] > 0 && (
                                            <Typography variant="body2">{`${translateShipType(ShipType.FIGHTER)}　${shipCountByType[ShipType.FIGHTER]}`}</Typography>
                                        )}
                                        {shipCountByType[ShipType.CORVETTE] > 0 && (
                                            <Typography variant="body2">{`${translateShipType(ShipType.CORVETTE)}　${shipCountByType[ShipType.CORVETTE]}`}</Typography>
                                        )}
                                    </>
                                ) : (
                                    <Typography variant="body2">{'-'}</Typography>
                                ),
                            },
                            {
                                key: 'rowCount',
                                label: '配置',
                                value: shipCount > 0 ? (
                                    <>
                                        {Object.keys(shipCountByRow).filter(shipRow => shipRow !== ShipRow.NONE).map(shipRow => (
                                            <Typography key={shipRow} variant="body2">
                                                {`${translateShipRow(shipRow as ShipRow)}　${shipCountByRow[shipRow as ShipRow]}`}
                                            </Typography>
                                        ))}
                                    </>
                                ) : (
                                    <Typography variant="body2">{'-'}</Typography>
                                ),
                            },
                            ...(warnings.length > 0 ? [{
                                key: 'warnings',
                                label: '警告',
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
