import { useState, useRef, ReactNode } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { getMaxPopperHeight } from '../../utils/domUtils';

export interface IButtonMenuOption {
    key: string;
    icon?: ReactNode;
    text: string;
    value: string;
    disabled?: boolean;
}

interface IProps {
    options: IButtonMenuOption[];
    icon?: ReactNode;
    text: string;
    value?: string;
    onClick: (value: string) => void;
    fullWidth?: boolean;
    disabled?: boolean;
}

export const ButtonMenu = (props: IProps) => {
    const { options, icon, text, value, onClick, fullWidth, disabled } = props;
    const [opened, setOpened] = useState<boolean>(false);
    const anchorRef = useRef<HTMLDivElement>(null);

    const handleClickOption = (value: string) => {
        setOpened(false);
        onClick(value);
    };

    return (
        <>
            <ButtonGroup
                variant="outlined"
                fullWidth={fullWidth}
                ref={anchorRef}
                disabled={disabled}
            >
                <Button
                    startIcon={icon}
                    onClick={e => {
                        e.stopPropagation();
                        setOpened(true);
                    }}
                    disabled={disabled}
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
                style={{ zIndex: 2 }}
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
                                            onClick={e => {
                                                e.stopPropagation();
                                                handleClickOption(option.value);
                                            }}
                                            disabled={option.disabled}
                                        >
                                            {option.icon && (
                                                <ListItemIcon>
                                                    {option.icon}
                                                </ListItemIcon>
                                            )}
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
