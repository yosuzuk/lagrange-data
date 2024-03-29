import { useState, useRef, useEffect, useTransition } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Checkbox from '@mui/material/Checkbox';
import Button, { ButtonProps } from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Popper, { PopperProps } from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ShipFilterState, FilterKey } from './types/ShipFilterState';
import { IFilterOption } from './types/IFilterOption';
import { createShipFilterOptions, resetFilterState } from './filterUtils';
import { getMaxPopperHeight } from '../../utils/domUtils';
import { ShipType } from '../../types/ShipType';
import { ShipRow } from '../../types/ShipRow';
import { ResearchManufacturer } from '../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../types/ResearchTacticType';
import { t } from '../../i18n';
import { Manufacturer } from '../../types/Manufacturer';
import { ShipSource } from '../../types/ShipSource';

interface IProps {
    filter: ShipFilterState;
    onChange: (filter: ShipFilterState) => void;
    popperProps?: Partial<PopperProps>;
    shipTypes?: ShipType[];
    shipRows?: ShipRow[];
    manufacturer?: Manufacturer[];
    researchManufacturer?: ResearchManufacturer[] | false;
    researchStrategyTypes?: ResearchStrategyType[] | false;
    researchTacticTypes?: ResearchTacticType[] | false;
    shipSources?: ShipSource[];
    buttonProps?: ButtonProps;
}

export const ShipTypeFilterButton = (props: IProps) => {
    const { onChange, popperProps, shipRows, shipTypes, manufacturer, researchManufacturer, researchStrategyTypes, researchTacticTypes, shipSources, buttonProps } = props;
    const [filter, setFilter] = useState<ShipFilterState>(props.filter);
    const [opened, setOpened] = useState<boolean>(false);
    const [shipFilterOptions] = useState<IFilterOption[]>(() => createShipFilterOptions({
        shipRows,
        shipTypes,
        manufacturer,
        researchManufacturer,
        researchStrategyTypes,
        researchTacticTypes,
        shipSources,
    }));
    const anchorRef = useRef<HTMLDivElement>(null);
    const [isPending, startTransition] = useTransition();

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
        startTransition(() => {
            onChange(filter);
        });
    }, [filter, onChange]);

    const filterUsed = Object.values(filter).some(value => value);

    return (
        <>
            <ButtonGroup
                key="filter"
                variant="outlined"
                ref={anchorRef}
                fullWidth={buttonProps?.fullWidth}
                size={buttonProps?.size}
            >
                <Button
                    startIcon={<FilterAltIcon />}
                    onClick={() => setOpened(true)}
                    sx={{ flexShrink: 1 }}
                >
                    {t('button.filter')}
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
                {...popperProps}
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <div>
                            <ClickAwayListener onClickAway={() => setOpened(false)}>
                                <Paper>
                                    <Box component="div" sx={{ overflowY: 'auto', maxHeight: `${(getMaxPopperHeight(anchorRef.current) ?? 0) - 50}px` }}>
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
                                    </Box>
                                    <Divider />
                                    <Box component="div" p={1} display="flex" justifyContent="end">
                                        <Stack spacing={1} direction="row">
                                            <Button variant="outlined" onClick={handleClickFilterOff} disabled={!filterUsed}>
                                                {t('button.unselectAll')}
                                            </Button>
                                            <Button variant="outlined" onClick={() => setOpened(false)}>
                                                {t('button.close')}
                                            </Button>
                                        </Stack>
                                    </Box>
                                </Paper>
                            </ClickAwayListener>
                        </div>
                    </Grow>
                )}
            </Popper>
        </>
    );
};
