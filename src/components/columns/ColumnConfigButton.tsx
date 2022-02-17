import { useState, useRef, useEffect } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { IColumnConfigOption } from './types/IColumnConfig';
import { createColumnConfigOptions } from './columnConfigUtils';
import { IColumnConfig } from './types/IColumnConfig';
import { getMaxPopperHeight } from '../../utils/domUtils';

interface IProps {
    columnConfig: IColumnConfig;
    onChange: (columnConfig: IColumnConfig) => void;
}

export const ColumnConfigButton = (props: IProps) => {
    const { onChange } = props;
    const [columnConfig, setColumnConfig] = useState<IColumnConfig>(props.columnConfig);
    const [opened, setOpened] = useState<boolean>(false);
    const [columnConfigOptions] = useState<IColumnConfigOption[]>(() => createColumnConfigOptions());
    const anchorRef = useRef<HTMLDivElement>(null);

    const handleClickOption = (columnKey: keyof IColumnConfig) => {
        setColumnConfig(config => ({
            ...config,
            [columnKey]: !config[columnKey],
        }));
    };

    useEffect(() => {
        const t = setTimeout(() => {
            onChange(columnConfig);
        }, 0);
        return () => clearTimeout(t);
    }, [columnConfig, onChange]);

    return (
        <>
            <ButtonGroup
                key="columnConfig"
                variant="outlined"
                ref={anchorRef}
            >
                <Button
                    startIcon={<ViewColumnIcon />}
                    onClick={() => setOpened(true)}
                >
                    {'表示項目'}
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
                                <MenuList id="split-button-menu">
                                    {columnConfigOptions.map((option: IColumnConfigOption) => (
                                        <MenuItem
                                            key={option.columnKey}
                                            selected={columnConfig[option.columnKey]}
                                            onClick={() => handleClickOption(option.columnKey)}
                                        >
                                            <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={columnConfig[option.columnKey]}
                                                tabIndex={-1}
                                                disableRipple={true}
                                            />
                                            </ListItemIcon>
                                            <ListItemText>
                                                {option.name}
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
