import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipSettingState } from '../../../userSettings/types/UserSettings';
import { MemoizedMyListShipEditCard } from './MyListShipEditCard';
import { PossessionState } from '../../../userSettings/types/PossessionState';
import { WishState } from '../../../userSettings/types/WishState';

interface IProps {
    id: string;
    title: string;
    shipDefinitions: IShipDefinition[];
    shipSetting: ShipSettingState;
    initiallyOpened: boolean;
    handlePossessionChange: (shipId: string, possession: PossessionState) => void;
    handleWishChange: (shipId: string, wish: WishState) => void;
    preRenderDetails?: boolean;
}

export const MyListEditAccordion = (props: IProps) => {
    const { id, title, shipDefinitions, shipSetting, initiallyOpened, handlePossessionChange, handleWishChange, preRenderDetails = false } = props;
    const [opened, setOpened] = useState<boolean>(initiallyOpened);

    const handleChangeExpand = (event: React.SyntheticEvent, isExpanded: boolean) => {
        setOpened(isExpanded);
    };

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
                            <MemoizedMyListShipEditCard
                                key={shipDefinition.id}
                                ship={shipDefinition}
                                possession={shipSetting[shipDefinition.id]?.possession ?? PossessionState.UNDEFINED}
                                wish={shipSetting[shipDefinition.id]?.wish ?? WishState.UNDEFINED}
                                onPossessionChange={handlePossessionChange}
                                onWishChange={handleWishChange}
                            />
                        ))}
                    </Stack>
                )}
            </AccordionDetails>
        </Accordion>
    );
}
