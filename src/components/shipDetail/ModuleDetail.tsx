import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ISystemModule } from '../../types/ShipDefinition';
import { useColorMode } from '../../theme/context/ThemeProvider';
import { t, getCurrentLanguage, Language } from '../../i18n';
import { getModuleName } from '../../utils/shipDefinitionUtils';
import { EnhancementList } from './EnhancementList';
import { EnhancementType } from '../../enhancements/types/EnhancementType';

interface IProps {
    shipId: string;
    modules: ISystemModule[];
}

export const ModuleDetail = (props: IProps) => {
    const { shipId, modules } = props;
    const { mode } = useColorMode();

    const descriptionAvailable = getCurrentLanguage() === Language.JAPANESE;
    const partsAvailable = getCurrentLanguage() === Language.JAPANESE;

    return (
        <>
            {modules.map(module => {
                const expandEnabled = Number.isFinite(module.skillSlots)
                    || (module.effects ?? []).length > 0
                    || (module.skills ?? []).length > 0
                    || (module.flagshipEffects ?? []).length > 0
                    || (partsAvailable && module.parts?.some(part => !!part.text));

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
                                {module.category !== 'STATIC' ? (
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
                                <Stack spacing={1} direction="row">
                                    {module.mainSystem && (
                                        <Box pt={1}>
                                            <Chip
                                                variant="outlined"
                                                size="small"
                                                color="warning"
                                                label="M"
                                            />
                                        </Box>
                                    )}
                                    {module.flagshipEffects && module.flagshipEffects.length > 0 && (
                                        <Box pt={1}>
                                            <Chip
                                                variant="outlined"
                                                size="small"
                                                color="primary"
                                                label={t('enhancementType.flagshipEffect')}
                                            />
                                        </Box>
                                    )}
                                    {module.skills?.some(skill => skill.type === EnhancementType.STRATEGY) && (
                                        <Box pt={1}>
                                            <Chip
                                                variant="outlined"
                                                size="small"
                                                color="primary"
                                                label={t('enhancementType.strategy')}
                                            />
                                        </Box>
                                    )}
                                </Stack>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{
                                'backgroundColor': mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(229, 229, 229, 0.5)',
                            }}
                        >

                            <Stack spacing={2}>
                                {partsAvailable && module.parts !== undefined && module.parts.map((modulePart, index) => (
                                    <Stack key={`part${index}`} spacing={1}>
                                        {modulePart.text && (
                                            <Stack spacing={1} pb={1}>
                                                {toArray(modulePart.text).map((line, index) => (
                                                    <Typography variant="body2" key={`line_${index}`}>
                                                        {line}
                                                    </Typography>
                                                )) ?? null}
                                            </Stack>
                                        )}
                                    </Stack>
                                ))}
                                {module.effects && module.effects.length > 0 && (
                                    <>
                                        <Typography variant="body2" gutterBottom={true}>
                                            {t('shipDetail.staticEffectsColon')}
                                        </Typography>
                                        <EnhancementList enhancements={module.effects} />
                                    </>
                                )}
                                {module.flagshipEffects && module.flagshipEffects.length > 0 && (
                                    <>
                                        <Typography variant="body2" gutterBottom={true}>
                                            {t('shipDetail.flagshipEffectsColon')}
                                        </Typography>
                                        <EnhancementList enhancements={module.flagshipEffects} />
                                    </>
                                )}
                                {module.skills && module.skills.length > 0 && (
                                    <>
                                        <Typography variant="body2" gutterBottom={true}>
                                            {t('shipDetail.skillsColon')}
                                        </Typography>
                                        <EnhancementList enhancements={module.skills} />
                                    </>
                                )}
                                {Number.isFinite(module.skillSlots) && (
                                    <Typography variant="body2" gutterBottom={true}>
                                        {t('shipDetail.numberOfSkillSlots', {
                                            count: module.skillSlots,
                                        })}
                                    </Typography>
                                )}
                            </Stack>
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
