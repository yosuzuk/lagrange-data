import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ISystemModule } from '../../types/ShipDefinition';
import { useColorMode } from '../../theme/context/ThemeProvider';
import { t } from '../../i18n';
import { getModuleName } from '../../utils/shipDefinitionUtils';
import { flags } from '../../utils/flags';

interface IProps {
    shipId: string;
    modules: ISystemModule[];
}

export const ModuleDetail = (props: IProps) => {
    const { shipId, modules } = props;
    const { mode } = useColorMode();

    return (
        <>
            {modules.map(module => {
                const expandEnabled = flags.enableModuleDescription && !!module.parts;
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
                                <Typography variant="body2">
                                    {`${module.category}${module.categoryNumber} ${getModuleName(shipId, module)}`}
                                </Typography>
                                {flags.enableModuleDescription && module.description && (
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
                            {module.parts && (
                                <Stack spacing={1}>
                                    {module.parts.map((modulePart, index) =>
                                        <Stack key={`part${index}`} spacing={1}>
                                            {modulePart.text && (
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
                                            {modulePart.skills && (
                                                <Typography variant="body2" gutterBottom={true}>
                                                    {t('shipDetail.skillsColon')}
                                                </Typography>
                                            )}
                                            {modulePart.skills?.map((skill, index) => (
                                                <Box key={`skill_${index}`}>    
                                                    <Typography variant="body2">
                                                        {`・${skill.effect}`}
                                                    </Typography>
                                                    {toArray(skill.properties).map((line, index) => (
                                                        <Typography variant="body2" color="text.secondary" key={`line_${index}`}>
                                                            {`　${line}`}
                                                        </Typography>
                                                    ))}
                                                </Box>
                                            )) ?? null}
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
