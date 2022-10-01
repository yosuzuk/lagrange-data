import { useState, useCallback } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Settings';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { MyListShipEditCard } from './MyListShipEditCard';

interface IProps {
    id: string;
    title: string;
    shipDefinitions: IShipDefinition[];
    initiallyOpened: boolean;
    preRenderDetails?: boolean;
}

export const MyListEditAccordion = (props: IProps) => {
    const { id, title, shipDefinitions, initiallyOpened, preRenderDetails = false } = props;
    const [opened, setOpened] = useState<boolean>(initiallyOpened);

    const handleChangeExpand = useCallback((event: React.SyntheticEvent, isExpanded: boolean) => {
        setOpened(isExpanded);
    }, []);

    return (
        <Accordion
            expanded={opened}
            onChange={handleChangeExpand}
        >
            <AccordionSummary
                id={id}
                expandIcon={<SettingsIcon />}
            >
                <Typography variant="body1">
                    {title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                {(opened || preRenderDetails) && (
                    <Stack spacing={3}>
                        {shipDefinitions.map(shipDefinition => (
                            <MyListShipEditCard
                                key={shipDefinition.id}
                                ship={shipDefinition}
                            />
                        ))}
                    </Stack>
                )}
            </AccordionDetails>
        </Accordion>
    );
}
