import { useState, Fragment } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import { IImageSelection } from './types/IImageSelection';
import { ResponsiveDialog } from '../../dialog/ResponsiveDialog';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Breakpoint, useTheme } from '@mui/material/styles';
import { t } from '../../../i18n';

interface IProps {
    imageSelections: IImageSelection[];
    onMoveUp: (index: number) => void;
    onMoveDown: (index: number) => void;
    onRemove: (index: number) => void;
}

export const ReorderList = (props: IProps) => {
    const { imageSelections, onMoveUp, onMoveDown, onRemove } = props;
    const [selectedForZoom, setSelectedForZoom] = useState<IImageSelection | null>(null);
    const theme = useTheme();
    const enableZoom = useMediaQuery(theme.breakpoints.down('sm'));

    if (imageSelections.length === 0) {
        return null;
    }

    return (
        <Paper>
            <Box p={1}>
                <Stack spacing={1}>
                    {imageSelections.map((selection, index) => (
                        <Fragment key={selection.id}>
                            <Typography variant="caption" color="text.secondary" noWrap={true}>
                                {selection.file.name}
                            </Typography>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ minHeight: '90px' }}>
                                <Box sx={{ flexGrow: 1, position: 'relative' }}>
                                    <img
                                        src={selection.dataUrl}
                                        alt={selection.file.name}
                                        style={{
                                            width: '100%',
                                            cursor: enableZoom ? 'zoom-in' : 'default',
                                        }}
                                        onClick={enableZoom ? () => setSelectedForZoom(selection) : undefined}
                                    />
                                </Box>
                                <Stack spacing={1}>
                                    <div>
                                        <IconButton onClick={() => onMoveUp(index)} disabled={index === 0}>
                                            <KeyboardArrowUpIcon />
                                        </IconButton>
                                    </div>
                                    <div>
                                        <IconButton onClick={() => onMoveDown(index)} disabled={index === imageSelections.length - 1}>
                                            <KeyboardArrowDownIcon />
                                        </IconButton>
                                    </div>
                                </Stack>
                                <div>
                                    <IconButton onClick={() => onRemove(index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            </Stack>
                        </Fragment>
                    ))}
                </Stack>
            </Box>
            {selectedForZoom !== null && (
                <ResponsiveDialog
                    title={(
                        <Typography variant="body2" noWrap={true}>
                            {selectedForZoom.file.name}
                        </Typography>
                    )}
                    content={
                        <Stack spacing={1}>
                            <div>
                                <img
                                    src={selectedForZoom.dataUrl}
                                    alt={selectedForZoom.file.name}
                                    style={{ scale: 0.5 }}
                                />
                            </div>
                        </Stack>
                    }
                    onClose={() => setSelectedForZoom(null)}
                    actions={(
                        <Button
                            key="share"
                            variant="outlined"
                            onClick={() => setSelectedForZoom(null)}
                        >
                            {t('button.close')}
                        </Button>
                    )}
                    maxWidth={false}
                />
            )}
        </Paper>
    );
};
