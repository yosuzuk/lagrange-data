import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MemoizedMyListTable } from './MyListTable';
import { IShipListState } from './types/IShipListState';

interface IAccordionState {
    possessed: boolean;
    wished: boolean;
    unwishedByUser: boolean;
    unwishedByData: boolean;
}

interface IProps {
    shipListState: IShipListState;
}

export const MyListView = (props: IProps) => {
    const { shipListState } = props;

    const [expandedAccordion, setExpandedAccordion] = useState<IAccordionState>({
        possessed: true,
        wished: false,
        unwishedByUser: false,
        unwishedByData: false,
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
                        <Typography variant="body1">
                            {'所持している艦船/設計図'}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <MemoizedMyListTable shipDefinitions={shipListState.possessed} />
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
                        <Typography variant="body1">
                            {'欲しい設計図'}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <MemoizedMyListTable shipDefinitions={shipListState.wished} />
                    </AccordionDetails>
                </Accordion>
            </div>
            <div>
                <Accordion
                    expanded={expandedAccordion.unwishedByUser}
                    onChange={handleAccordionChange('unwishedByUser')}
                >
                    <AccordionSummary
                        id="unwished-by-user-ships"
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Typography variant="body1">
                            {'欲しくない設計図'}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <MemoizedMyListTable shipDefinitions={shipListState.unwishedByUser} />
                    </AccordionDetails>
                </Accordion>
            </div>
            <div>
                <Accordion
                    expanded={expandedAccordion.unwishedByData}
                    onChange={handleAccordionChange('unwishedByData')}
                >
                    <AccordionSummary
                        id="unwished-by-data-ships"
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Typography variant="body1">
                            {'被って欲しくない艦船'}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <MemoizedMyListTable shipDefinitions={shipListState.unwishedByData} />
                        <Box pt={1}>
                            <Typography variant="caption" align="right" paragraph={true}>
                                {'※被りで技術ポイントか「出て欲しくない」サブモデルになる艦船が自動的に表示されます'}
                            </Typography>
                        </Box>
                    </AccordionDetails>
                </Accordion>
            </div>
            <Typography variant="caption" align="right" paragraph={true}>
                {'※設定データはブラウザのローカルストレージに保存されています。'}
            </Typography>
        </Stack>
    );
}
