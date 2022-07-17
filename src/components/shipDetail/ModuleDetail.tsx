import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ISystemModule } from '../../types/ShipDefinition';

interface IProps {
    modules: ISystemModule[];
}

export const ModuleDetail = (props: IProps) => {
    const { modules } = props;
    return (
        <>
            {modules.map(module => (
                <Accordion
                    key={`module_${module.id}`}
                    expanded={!module.parts ? false : undefined}
                    sx={!module.parts ? { pointerEvents: 'none' } : undefined}
                >
                    <AccordionSummary
                        expandIcon={!!module.parts && <ExpandMoreIcon />}
                    >
                        <div>
                            <Typography variant="body2">
                                {`${module.category}${module.categoryNumber} ${module.name}`}
                            </Typography>
                            {module.description && (
                                <Typography variant="caption" color="text.secondary">
                                    {`${module.description}`}
                                </Typography>
                            )}
                        </div>
                    </AccordionSummary>
                    <AccordionDetails sx={{ 'backgroundColor': 'rgba(229, 229, 229, 0.5)' }}>
                        {!module.parts && (
                            <Typography variant="body2">
                                {'詳細不明'}
                            </Typography>
                        )}
                        {module.parts && (
                            <Stack spacing={1}>
                                {module.parts.map((modulePart, index) =>
                                    <div key={`part${index}`}>
                                        {modulePart.text && (
                                            <Box pb={1}>
                                                {toArray(modulePart.text).map((line, index) => (
                                                    <Typography variant="body2" gutterBottom={true} key={`line_${index}`}>
                                                        {line}
                                                    </Typography>
                                                )) ?? null}
                                            </Box>
                                        )}
                                        {Number.isFinite(modulePart.slots) && (
                                            <Typography variant="body2" gutterBottom={true}>
                                                {`スキル枠：${modulePart.slots}`}
                                            </Typography>
                                        )}
                                        {modulePart.skills?.map((skill, index) => (
                                            <Box pb={1} key={`skill_${index}`}>
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
                                    </div>
                                ) ?? null}
                            </Stack>
                        )}
                    </AccordionDetails>
                </Accordion>
            ))}
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
