import { useEffect, useMemo, useState } from 'react';
import { css } from '@emotion/css';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
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
import { IUserSettings } from '../../../userSettings/types/UserSettings';
import { TechFileChart } from './TechFileChart';
import { t } from '../../../i18n';

export const shipTypes: ShipType[] = [
    ShipType.FRIGATE,
    ShipType.DESTROYER,
    ShipType.CRUISER,
    ShipType.BATTLE_CRUISER,
    ShipType.AUXILIARY,
    ShipType.CARRIER,
    ShipType.FIGHTER,
    ShipType.CORVETTE,
];

const classes = {
    shipTypeCell: css`
        display: block;
        min-width: 4rem;
        @media (min-width: 600px) {
            min-width: 6rem;
        }
    `,
    shipTypeChanceCell: css`
        display: block;
        min-width: 5rem;
        @media (min-width: 600px) {
            min-width: 6.5rem;
        }
    `,
    blueprintChanceCell: css`
        display: block;
        min-width: 5rem;
        @media (min-width: 600px) {
            min-width: 7rem;
        }
    `,
    moduleChanceCell: css`
        display: block;
        min-width: 7.5rem;
        @media (min-width: 600px) {
            min-width: 11rem;
        }
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
    const userSettings = useMemo<IUserSettings>(() => getCurrentUserSettings(), []);

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
                <TechFileChart techFile={techFile} techFileChances={techFileChances} />
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
                            <Stack spacing={3} direction="row" flexWrap="wrap" rowGap={1}>
                                <Typography variant="body2" noWrap={true} className={classes.shipTypeCell}>
                                    {translateShipType(data.shipType as ShipType)}
                                </Typography>
                                <Typography variant="body2" noWrap={true} className={classes.shipTypeChanceCell}>
                                    {`${t('label.shipTypeProbabilityColon')}${formatChance(data.originalChance)}`}
                                </Typography>
                                <Typography variant="body2" noWrap={true} className={classes.blueprintChanceCell}>
                                    {`${t('label.blueprintColon')}${formatChance(data.blueprintChance)}`}
                                </Typography>
                                {data.hasModules && (
                                    <Typography variant="body2" noWrap={true} className={classes.moduleChanceCell}>
                                        {`${t('label.additionalSystemModuleColon')}${formatChance(data.moduleChance)}`}
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
            {(showZeroChance || (techFileChances.techOrResearchPointChance) > 0) && (
                <div>
                    <Accordion
                        expanded={techPointExpanded}
                        onChange={handleExpandTechPoint}
                    >
                        <AccordionSummary
                            id={`tech-point-accordion-summary`}
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Stack spacing={3} direction="row" flexWrap="wrap" rowGap={1}>
                                <Typography variant="body2" className={classes.shipTypeCell}>
                                    {t('label.techOrResearchPoints')}
                                </Typography>
                                <Typography variant="body2" className={classes.baseTechPointChanceCell}>
                                    {`${t('label.probabilityColon')}${formatChance(techFileChances.techOrResearchPointChance)}`}
                                </Typography>
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            {'-'}
                        </AccordionDetails>
                    </Accordion>
                </div>
            )}
            {(showZeroChance || techFileChances.baseTechPointChance > 0) && (
                <div>
                    <Accordion
                        expanded={techPointExpanded}
                        onChange={handleExpandTechPoint}
                    >
                        <AccordionSummary
                            id={`tech-point-accordion-summary`}
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Stack spacing={3} direction="row" flexWrap="wrap" rowGap={1}>
                                <Typography variant="body2" className={classes.shipTypeCell}>
                                    {t('label.techPoints')}
                                </Typography>
                                <Typography variant="body2" className={classes.baseTechPointChanceCell}>
                                    {`${t('label.probabilityColon')}${formatChance(techFileChances.baseTechPointChance)}`}
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
