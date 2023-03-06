import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ISystemModule } from '../../types/ShipDefinition';
import { useColorMode } from '../../theme/context/ThemeProvider';
import { t, getCurrentLanguage, Language } from '../../i18n';
import { getModuleName } from '../../utils/shipDefinitionUtils';
import { EnhancementList } from './EnhancementList';

interface IProps {
    shipId: string;
    modules: ISystemModule[];
}

export const ModuleDetail = (props: IProps) => {
    const { shipId, modules } = props;
    const { mode } = useColorMode();

    const descriptionAvailable = getCurrentLanguage() === Language.JAPANESE;
    const detailsAvailable = true; // getCurrentLanguage() === Language.JAPANESE;
    const partTextAvailable = getCurrentLanguage() === Language.JAPANESE;

    return (
        <>
            {modules.map(module => {
                const expandEnabled = detailsAvailable && !!module.parts && module.parts.some(x => {
                    return Number.isFinite(x.skillSlots)
                        || (x.skills ?? []).length > 0
                        || (x.flagshipEffects ?? []).length > 0
                        || (partTextAvailable && x.text);
                });
                return (
                    <Accordion
                        key={`module_${module.id}`}
                        expanded={!expandEnabled ? false : undefined}
                        sx={!expandEnabled ? { pointerEvents: 'none' } : undefined}
                    >
                        <AccordionSummary
                            expandIcon={expandEnabled && <ExpandMoreIcon />}
                        >
                            <div>
                                {module.category !== 'UNKNOWN' ? (
                                    <Typography variant="body2">
                                        {`${module.category}${module.categoryNumber} ${getModuleName(shipId, module)}`}
                                    </Typography>
                                ) : (
                                    <Typography variant="body2">
                                        {`${getModuleName(shipId, module)}`}
                                    </Typography>
                                )}
                                {descriptionAvailable && module.description && (
                                    <Typography variant="caption" color="text.secondary">
                                        {`${module.description}`}
                                    </Typography>
                                )}
                            </div>
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{
                                'backgroundColor': mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(229, 229, 229, 0.5)',
                            }}
                        >
                            {!module.parts && (
                                <Typography variant="body2">
                                    {t('shipDetail.detailsUnknown')}
                                </Typography>
                            )}
                            {module.parts !== undefined && (
                                <Stack spacing={2}>
                                    {module.parts.map((modulePart, index) =>
                                        <Stack key={`part${index}`} spacing={1}>
                                            {partTextAvailable && modulePart.text && (
                                                <Stack spacing={1}>
                                                    {toArray(modulePart.text).map((line, index) => (
                                                        <Typography variant="body2" key={`line_${index}`}>
                                                            {line}
                                                        </Typography>
                                                    )) ?? null}
                                                </Stack>
                                            )}
                                            {Number.isFinite(modulePart.skillSlots) && (
                                                <Typography variant="body2" gutterBottom={true}>
                                                    {t('shipDetail.numberOfSkillSlots', {
                                                        count: modulePart.skillSlots,
                                                    })}
                                                </Typography>
                                            )}
                                            {modulePart.skills && modulePart.skills.length > 0 && (
                                                <>
                                                    <Typography variant="body2" gutterBottom={true}>
                                                        {t('shipDetail.skillsColon')}
                                                    </Typography>
                                                    <EnhancementList enhancements={modulePart.skills} />
                                                </>
                                            )}
                                            {modulePart.flagshipEffects && modulePart.flagshipEffects.length > 0 && (
                                                <>
                                                    <Typography variant="body2" gutterBottom={true}>
                                                        {t('shipDetail.flagshipEffectsColon')}
                                                    </Typography>
                                                    <EnhancementList enhancements={modulePart.flagshipEffects} />
                                                </>
                                            )}
                                        </Stack>
                                    ) ?? null}
                                </Stack>
                            )}
                        </AccordionDetails>
                    </Accordion>
                );
            })}
        </>
    );
};

function toArray<T>(input: T | T[] | undefined): T[] {
    if (typeof input === 'undefined') {
        return [];
    }
    if (Array.isArray(input)) {
        return input as T[];
    }
    return [input];
}
