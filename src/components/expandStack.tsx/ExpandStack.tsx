import { useState, ReactNode } from 'react';
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface IExpandable {
    id: string;
    initiallyOpened: boolean;
    expandIcon?: ReactNode;
    summary: ReactNode;
    details: ReactNode;
    skip?: boolean;
}

interface IProps {
    expandables: IExpandable[];
    unmount?: boolean;
}

export const ExpandStack = (props: IProps) => {
    const { expandables, unmount = true } = props;

    const [openState, setOpenState] = useState<Record<string, boolean>>(() => {
        return expandables.reduce((acc: Record<string, boolean>, expandable: IExpandable) => ({
            ...acc,
            [expandable.id]: expandable.initiallyOpened,
        }), {} as Record<string, boolean>);
    });

    const handleToggleExpandable = (id: string) => {
        setOpenState(openState => ({
            ...openState,
            [id]: !openState[id],
        }));
    };

    return (
        <Stack spacing={1}>
            {expandables.filter(e => e.skip !== true).map(expandable => (
                <div key={expandable.id}>
                    <Accordion
                        expanded={openState[expandable.id]}
                        onChange={() => handleToggleExpandable(expandable.id)}
                    >
                        <AccordionSummary
                            id={expandable.id}
                            expandIcon={expandable.expandIcon ?? <ExpandMoreIcon />}
                        >
                            {expandable.summary}
                        </AccordionSummary>
                        <AccordionDetails>
                            {(!unmount || openState[expandable.id]) && (
                                <>{expandable.details}</>
                            )}
                        </AccordionDetails>
                    </Accordion>
                </div>
            ))}
        </Stack>
    );
}
