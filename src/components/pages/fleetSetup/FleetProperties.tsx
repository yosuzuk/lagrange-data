import { useMemo, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import Typography from '@mui/material/Typography';
import { IFleetSetup } from './types/IFleetSetup';
import { LabeledList } from '../../list/LabeledList';
import { getFleetShipCount } from './utils/fleetSetupUtils';
import { translateShipType } from '../../../utils/shipTypeUtils';
import { ShipType } from '../../../types/ShipType';
import { translateShipRow } from '../../../utils/shipRowUtils';
import { ShipRow } from '../../../types/ShipRow';

interface IProps {
    fleetSetup: IFleetSetup;
}

export const FleetProperties = (props: IProps) => {
    const { fleetSetup } = props;
    const [expanded, setExpanded] = useState<boolean>(false);

    const {
        shipCount,
        shipCountByType,
        shipCountByRow,
        reinforcementCount,
    } = useMemo(() => getFleetShipCount(fleetSetup), [fleetSetup]);

    return (
        <Accordion
            expanded={expanded}
            onChange={() => setExpanded(!expanded)}
        >
            <AccordionSummary
                expandIcon={shipCount > 0 ? (expanded ? <ExpandMoreIcon /> : <InfoIcon color="primary" />) : null}
            >
                <Typography variant="body1">
                    {fleetSetup.name}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                {expanded && (
                    <LabeledList
                        rows={[
                            {
                                key: 'reinforcementCount',
                                label: '増援',
                                value: reinforcementCount,
                            },
                            {
                                key: 'shipCount',
                                label: '艦船',
                                value: shipCount > 0 ? (
                                    <>
                                        <Typography variant="body2">{`合計　${shipCount}`}</Typography>
                                        {Object.keys(shipCountByType).filter(shipType => shipCountByType[shipType as ShipType] > 0).map(shipType => (
                                            <Typography key={shipType} variant="body2">
                                                {`${translateShipType(shipType as ShipType)}　${shipCountByType[shipType as ShipType]}`}
                                            </Typography>
                                        ))}
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
                                        <Typography variant="body2">{`${translateShipType(ShipType.FIGHTER)}　${shipCountByType[ShipType.FIGHTER]}`}</Typography>
                                        <Typography variant="body2">{`${translateShipType(ShipType.CORVETTE)}　${shipCountByType[ShipType.CORVETTE]}`}</Typography>
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
                        ]}
                    />
                )}
            </AccordionDetails>
        </Accordion>
    );
}
