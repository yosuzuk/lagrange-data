import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import LanguageIcon from '@mui/icons-material/Language';
import { Language, reloadWithLanguage } from '../../i18n/i18n';

export const LanguagePicker = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton onClick={handleClick}>
                <LanguageIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                id="language-picker"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
                <MenuItem onClick={() => { reloadWithLanguage(Language.ENGLISH); }}>
                    {'English'}
                </MenuItem>
                <MenuItem onClick={() => { reloadWithLanguage(Language.JAPANESE); }}>
                    {'日本語'}
                </MenuItem>
                <MenuItem onClick={() => { reloadWithLanguage(Language.KEYS); }}>
                    {'Keys'}
                </MenuItem>
            </Menu>
        </>
    );
};
