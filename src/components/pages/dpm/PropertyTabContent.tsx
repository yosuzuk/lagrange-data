import { useEffect, useState, useTransition } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { PropertyTabForm } from './PropertyTabForm';
import { IInputProperty } from './types/IInputProperty';
import { IPropertyTab } from './types/ITab';

const NAME_MAX_LENGTH = 20;

interface IProps<T> {
    idPrefix: string;
    tab: IPropertyTab<T>;
    tabIndex: number;
    canDelete: boolean;
    canRename: boolean;
    onChangeProperty: (tabId: string, property: IInputProperty) => void;
    onDeleteTab: (tabId: string) => void;
    onRename: (tabId: string, name: string) => void;
}

export const PropertyTabContent = <T extends {}>(props: IProps<T>) => {
    const { idPrefix, tab, tabIndex, canDelete, canRename, onChangeProperty, onDeleteTab, onRename } = props;
    const [name, setName] = useState<string>(tab.name);
    const [_isPending, startTransition] = useTransition();

    useEffect(() => {
        startTransition(() => {
            if (tab.name !== name) {
                onRename(tab.id, name);
            }
        });
    }, [tab, name, onRename]);

    return (
        <Stack spacing={3}>
            <Stack direction="row" alignItems="center" flexWrap="wrap" sx={{ gap: '8px' }}>
                {canRename && (
                    <Box component="div" sx={{ flexGrow: 1 }}>
                        <TextField
                            id={`${idPrefix}_name_${tab.id}`}
                            size="small"
                            required={true}
                            type="text"
                            value={name}
                            placeholder={tab.defaultName(tabIndex)}
                            InputProps={{
                                inputProps: {
                                    maxLength: NAME_MAX_LENGTH,
                                },
                            }}
                            onChange={event => setName(event.target.value.trim())}
                            fullWidth={true}
                        />
                    </Box>
                )}
                {canDelete && (
                    <div>
                        <Button
                            onClick={() => onDeleteTab(tab.id)}
                            startIcon={<DeleteIcon />}
                            variant="outlined"
                        >
                            <Typography noWrap={true} variant="button">
                                {'設定を削除'}
                            </Typography>
                        </Button>
                    </div>
                )}
            </Stack>
            <PropertyTabForm
                tabId={tab.id}
                properties={tab.properties}
                onChange={onChangeProperty}
            />
        </Stack>
    );
};
