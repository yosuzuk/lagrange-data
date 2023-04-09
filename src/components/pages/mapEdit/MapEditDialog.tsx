import { CSSProperties } from 'react';
import Editor from 'react-simple-code-editor';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import { ResponsiveDialog } from '../../dialog/ResponsiveDialog';
import { IParseMapContentError } from './types/IMapContent';
import { t } from '../../../i18n';
import { hightlightCode } from './utils/hightlightCode';

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
            title={parseError && (
                <Alert severity="error">
                    <AlertTitle>{t('mapEdit.syntaxErrorInLine', { value: parseError.line })}</AlertTitle>
                    {parseError.message}
                </Alert>
            )}
            maxWidth="md"
            backgroundColor="rgba(0,0,0,0.1)"
            content={(
                <Editor
                    value={input}
                    onValueChange={code => setInput(code)}
                    highlight={hightlightCode}
                    padding={10}
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 12,
                        backgroundColor: 'rgba(0,0,0,0.75)'
                    }}
                />
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
