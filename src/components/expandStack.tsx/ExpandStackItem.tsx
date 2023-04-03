import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionActions from '@mui/material/AccordionActions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IExpandable } from './types/IExpandable';

interface IProps {
    expandable: IExpandable;
    expanded: boolean;
    onToggle: (id: string) => void;
    unmount?: boolean;
}

export const ExpandStackItem = (props: IProps) => {
    const { expandable, expanded, onToggle, unmount } = props;

    useEffect(() => {
        if (expandable.initiallyOpened !== expanded) {
            onToggle(expandable.id);
        }
    }, [expandable.initiallyOpened, onToggle]);

    return (
        <Box component="div" sx={{ flexGrow: 1 }}>
            <Accordion
                expanded={expanded}
                onChange={() => onToggle(expandable.id)}
            >
                <AccordionSummary
                    id={expandable.id}
                    expandIcon={expandable.expandIcon ?? <ExpandMoreIcon />}
                >
                    {expandable.summary}
                </AccordionSummary>
                <AccordionDetails>
                    {(!unmount || expanded) && (
                        <>{expandable.details}</>
                    )}
                </AccordionDetails>
                {expandable.actions && (
                    <AccordionActions>
                        {expandable.actions}
                    </AccordionActions>
                )}
            </Accordion>
        </Box>
    );
};
