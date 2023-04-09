import { CSSProperties } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { ResponsiveDialog } from '../../dialog/ResponsiveDialog';
import { IParseMapContentError } from './types/IMapContent';
import { t } from '../../../i18n';

interface IProps {
    input: string;
    setInput: (input: string) => void;
    parseError: IParseMapContentError | null;
    onCancel: () => void;
    onApply: () => void;
}

export const MapEditDialog = (props: IProps) => {
    const { input, parseError, setInput, onCancel, onApply } = props;

    const textAreaStyles: CSSProperties = {
        backgroundColor: 'rgba(0,0,0,0.5)',
        color: 'white',
        width: '100%',
        height: '55vh',
    };

    return (
        <ResponsiveDialog
            maxWidth="md"
            backgroundColor="rgba(0,0,0,0.1)"
            content={(
                <Stack spacing={1}>
                    {parseError && (
                        <Alert severity="error">
                            <AlertTitle>{t('mapEdit.syntaxErrorInLine', { value: parseError.line })}</AlertTitle>
                            {parseError.message}
                        </Alert>
                    )}
                    <textarea
                        value={input}
                        style={textAreaStyles}
                        onChange={e => setInput(e.target.value)}
                    />
                </Stack>
            )}
            actions={(
                <>
                    <Button variant="outlined" onClick={onCancel}>
                        {t('button.cancel')}
                    </Button>
                    <Button variant="contained" onClick={onApply}>
                        {t('button.confirm')}
                    </Button>
                </>
            )}
        />
    );
};
