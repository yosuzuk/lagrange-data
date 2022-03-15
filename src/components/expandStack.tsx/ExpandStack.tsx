import { useState, ReactNode } from 'react';
import Stack, { StackProps } from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionActions from '@mui/material/AccordionActions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface IExpandable {
    id: string;
    initiallyOpened: boolean;
    expandIcon?: ReactNode;
    summary: ReactNode;
    details: ReactNode;
    actions?: ReactNode;
    skip?: boolean;
}

interface IProps {
    expandables: IExpandable[];
    unmount?: boolean;
    stackProps?: Partial<StackProps>;
}

export const ExpandStack = (props: IProps) => {
    const { expandables, unmount = true, stackProps } = props;

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
        <Stack spacing={1} {...stackProps}>
            {expandables.filter(e => e.skip !== true).map(expandable => (
                <Box key={expandable.id} sx={{ flexGrow: 1 }}>
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
                        {expandable.actions && (
                            <AccordionActions>
                                {expandable.actions}
                            </AccordionActions>
                        )}
                    </Accordion>
                </Box>
            ))}
        </Stack>
    );
}
