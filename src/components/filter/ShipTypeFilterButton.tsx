import { useState, useRef, useEffect } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ShipFilterState, FilterKey } from './types/ShipFilterState';
import { IFilterOption } from './types/IFilterOption';
import { createShipFilterOptions, resetFilterState } from './filterUtils';
import { getMaxPopperHeight } from '../../utils/domUtils';

interface IProps {
    filter: ShipFilterState;
    onChange: (filter: ShipFilterState) => void;
    fullWidth?: boolean;
}

export const ShipTypeFilterButton = (props: IProps) => {
    const { onChange, fullWidth } = props;
    const [filter, setFilter] = useState<ShipFilterState>(props.filter);
    const [opened, setOpened] = useState<boolean>(false);
    const [shipFilterOptions] = useState<IFilterOption[]>(() => createShipFilterOptions());
    const anchorRef = useRef<HTMLDivElement>(null);

    const handleClickFilter = (filterKey: FilterKey) => {
        setFilter(filter => ({
            ...filter,
            [filterKey]: !filter[filterKey],
        }));
    };

    const handleClickFilterOff = () => {
        setFilter(filter => resetFilterState(filter));
    };

    useEffect(() => {
        const t = setTimeout(() => {
            onChange(filter);
        }, 0);
        return () => clearTimeout(t);
    }, [filter, onChange]);

    const filterUsed = Object.values(filter).some(value => value);

    return (
        <>
            <ButtonGroup
                key="filter"
                variant="outlined"
                fullWidth={fullWidth}
                ref={anchorRef}
            >
                <Button
                    startIcon={<FilterAltIcon />}
                    onClick={() => setOpened(true)}
                    sx={{ flexShrink: 1 }}
                >
                    {'フィルター'}
                </Button>
                {filterUsed && (
                    <Button size="small" onClick={handleClickFilterOff} sx={{ flexShrink: 3 }}>
                        <FilterAltOffIcon />
                    </Button>
                )}
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
                            transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
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
                                    {shipFilterOptions.map((option: IFilterOption) => (
                                        <MenuItem
                                            key={option.filterKey}
                                            selected={filter[option.filterKey]}
                                            onClick={() => handleClickFilter(option.filterKey)}
                                        >
                                            <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={filter[option.filterKey]}
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
