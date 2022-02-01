import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MemoizedMyListTable } from './MyListTable';
import { ShipDefinition } from '../../../types/ShipDefinition';

interface IAccordionState {
    possessed: boolean;
    wished: boolean;
    unwished: boolean;
}

interface IProps {
    possessedShips: ShipDefinition[];
    wishedShips: ShipDefinition[];
    unwishedShips: ShipDefinition[];
}

export const MyListView = (props: IProps) => {
    const { possessedShips, wishedShips, unwishedShips } = props;

    const [expandedAccordion, setExpandedAccordion] = useState<IAccordionState>({
        possessed: true,
        wished: false,
        unwished: false,
    });

    const handleAccordionChange = (key: keyof IAccordionState) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedAccordion(state => ({ ...state, [key]: isExpanded }));
    };

    return (
        <Stack spacing={1}>
            <div>
                <Accordion
                    expanded={expandedAccordion.possessed}
                    onChange={handleAccordionChange('possessed')}
                >
                    <AccordionSummary
                        id="possessed-ships"
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Typography variant="body2">
                            {'所持している艦船/設計図'}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <MemoizedMyListTable shipDefinitions={possessedShips} />
                    </AccordionDetails>
                </Accordion>
            </div>
            <div>
                <Accordion
                    expanded={expandedAccordion.wished}
                    onChange={handleAccordionChange('wished')}
                >
                    <AccordionSummary
                        id="wished-ships"
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Typography variant="body2">
                            {'ガチャで欲しい艦船'}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <MemoizedMyListTable shipDefinitions={wishedShips} />
                    </AccordionDetails>
                </Accordion>
            </div>
            <div>
                <Accordion
                    expanded={expandedAccordion.unwished}
                    onChange={handleAccordionChange('unwished')}
                >
                    <AccordionSummary
                        id="unwished-ships"
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Typography variant="body2">
                            {'出て欲しくない艦船'}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <MemoizedMyListTable shipDefinitions={unwishedShips} />
                        <Box pt={1}>
                            <Typography variant="caption" align="right" paragraph={true}>
                                {'※個別に「出て欲しくない」と設定した艦船以外にサブモデルや追加モジュールが残っていない艦船も表示されています'}
                            </Typography>
                        </Box>
                    </AccordionDetails>
                </Accordion>
            </div>
        </Stack>
    );
}
