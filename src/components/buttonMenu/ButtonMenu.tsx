import { useState, useRef, ReactNode } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ListItemText from '@mui/material/ListItemText';
import GrainIcon from '@mui/icons-material/Grain';
import { getMaxPopperHeight } from '../../utils/domUtils';

export interface IButtonMenuOption {
    key: string;
    text: string;
    value: string;
}

interface IProps {
    options: IButtonMenuOption[];
    icon?: ReactNode;
    text: string;
    value: string;
    onChange: (value: string) => void;
    fullWidth?: boolean;
}

export const ButtonMenu = (props: IProps) => {
    const { options, icon, text, value, onChange, fullWidth } = props;
    const [opened, setOpened] = useState<boolean>(false);
    const anchorRef = useRef<HTMLDivElement>(null);

    const handleChange = (value: string) => {
        setOpened(false);
        onChange(value);
    };

    return (
        <>
            <ButtonGroup
                variant="outlined"
                fullWidth={fullWidth}
                ref={anchorRef}
            >
                <Button
                    startIcon={icon}
                    onClick={() => setOpened(true)}
                >
                    {text}
                </Button>
            </ButtonGroup>
            <Popper
                open={opened}
                anchorEl={anchorRef.current}
                role={undefined}
                transition={true}
                disablePortal={true}
                style={{ zIndex: 1 }}
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                        transformOrigin:
                            placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper
                            style={{
                                maxHeight: getMaxPopperHeight(anchorRef.current),
                                overflowY: 'auto',
                            }}
                        >
                            <ClickAwayListener onClickAway={() => setOpened(false)}>
                                <MenuList>
                                    {options.map((option: IButtonMenuOption) => (
                                        <MenuItem
                                            key={option.key}
                                            selected={option.value === value}
                                            onClick={() => handleChange(option.value)}
                                        >
                                            <ListItemText>
                                                {option.text}
                                            </ListItemText>
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
};
