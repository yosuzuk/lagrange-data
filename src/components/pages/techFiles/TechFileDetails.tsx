import { useEffect, useState } from 'react';
import { css } from '@emotion/css';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ITechFile } from '../../../types/ITechFile';
import { ShipType } from '../../../types/ShipType';
import { translateShipType } from '../../../utils/shipTypeUtils';
import { formatChance, getTechFileChances, hasPositiveChance } from './utils/techFileUtils';
import { ITechFileChances, IShipChance } from './types/IBlueprintChance';
import { TechFileContentTable } from './TechFileContentTable';
import { getCurrentUserSettings } from '../../../userSettings/utils/userSettingsUtils';
import { UserSettings } from '../../../userSettings/types/UserSettings';
import { TechFileChart } from './TechFileChart';

export const shipTypes: ShipType[] = [
    ShipType.FRIGATE,
    ShipType.DESTROYER,
    ShipType.CRUISER,
    ShipType.BATTLE_CRUISER,
    ShipType.CARRIER,
    ShipType.FIGHTER,
    ShipType.CORVETTE,
];

const classes = {
    shipTypeCell: css`
        display: block;
        min-width: 3rem;
    `,
    shipTypeChanceCell: css`
        display: block;
        min-width: 5rem;
    `,
    blueprintChanceCell: css`
        display: block;
        min-width: 5rem;
    `,
    moduleChanceCell: css`
        display: block;
        min-width: 7.5rem;
    `,
    baseTechPointChanceCell: css`
        display: block;
        min-width: 5rem;
    `,
    finalTechPointChanceCell: css`
        display: block;
        min-width: 5rem;
    `,
};

interface IProps {
    techFile: ITechFile;
}

export const TechFileDetails = (props: IProps) => {
    const { techFile } = props;

    const [expandedAccordion, setExpandedAccordion] = useState<Record<ShipType, boolean>>(createInitialAccordionState);
    const [techPointExpanded, setTechPointExpanded] = useState<boolean>(false);
    const [techFileChances, setTechFileChances] = useState<ITechFileChances | null>(null);
    const [showZeroChance, setShowZeroChance] = useState<boolean>(false);
    const [userSettings, setUserSettings] = useState<UserSettings>(getCurrentUserSettings);

    useEffect(() => {
        setExpandedAccordion(createInitialAccordionState());
        setTechFileChances(getTechFileChances(techFile, userSettings));
    }, [techFile, userSettings]);

    const handleAccordionChange = (shipType: ShipType) => {
        setExpandedAccordion({
            ...expandedAccordion,
            [shipType]: !expandedAccordion[shipType],
        });
    };

    const handleExpandTechPoint = () => {
        setTechPointExpanded(expanded => !expanded);
    };

    if (!techFileChances) {
        return null;
    }

    return (
        <Stack spacing={1}>
            <Paper>
                <Box height="300px">
                    <TechFileChart techFileChances={techFileChances} />
                </Box>
            </Paper>
            {techFileChances.shipTypeChances.filter(data => showZeroChance || hasPositiveChance(data)).map(data => (
                <div key={data.shipType}>
                    <Accordion
                        expanded={expandedAccordion[data.shipType] === true}
                        onChange={() => handleAccordionChange(data.shipType)}
                    >
                        <AccordionSummary
                            id={`${data.shipType}-accordion-summary`}
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Stack spacing={3} direction="row" flexWrap="wrap">
                                <Typography variant="body2" noWrap={true} className={classes.shipTypeCell}>
                                    {translateShipType(data.shipType as ShipType)}
                                </Typography>
                                <Typography variant="body2" noWrap={true} className={classes.shipTypeChanceCell}>
                                    {`艦種確率：${formatChance(data.originalChance)}`}
                                </Typography>
                                <Typography variant="body2" noWrap={true} className={classes.blueprintChanceCell}>
                                    {`設計図：${formatChance(data.blueprintChance)}`}
                                </Typography>
                                {data.hasModules && (
                                    <Typography variant="body2" noWrap={true} className={classes.moduleChanceCell}>
                                        {`追加モジュール：${formatChance(data.moduleChance)}`}
                                    </Typography>
                                )}
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            {expandedAccordion[data.shipType] && (
                                <TechFileContentTable
                                    blueprintChances={data.shipChances}
                                    hasModules={data.hasModules}
                                />
                            )}
                        </AccordionDetails>
                    </Accordion>
                </div>
            ))}
            {(showZeroChance || techFile.chanceForTechPoint > 0) && (
                <div>
                    <Accordion
                        expanded={techPointExpanded}
                        onChange={handleExpandTechPoint}
                    >
                        <AccordionSummary
                            id={`tech-point-accordion-summary`}
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Stack spacing={3} direction="row" flexWrap="wrap">
                                <Typography variant="body2" className={classes.shipTypeCell}>
                                    {'技術Ｐｔ'}
                                </Typography>
                                <Typography variant="body2" className={classes.baseTechPointChanceCell}>
                                    {`初期確率：${formatChance(techFileChances.baseTechPointChance)}`}
                                </Typography>
                                <Typography variant="body2" className={classes.finalTechPointChanceCell}>
                                    {`最終確率：${formatChance(techFileChances.finalTechPointChance)}`}
                                </Typography>
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            {'-'}
                        </AccordionDetails>
                    </Accordion>
                </div>
            )}
        </Stack>
    );
};

function createInitialAccordionState(): Record<ShipType, boolean> {
    return shipTypes.reduce((result, shipType) => ({
        ...result,
        [shipType]: false,
    }), {} as Record<ShipType, boolean>);
}

function createInitialBlueprintChances(): Record<ShipType, IShipChance[]> {
    return shipTypes.reduce((result, shipType) => ({
        ...result,
        [shipType]: [],
    }), {} as Record<ShipType, IShipChance[]>);
}
