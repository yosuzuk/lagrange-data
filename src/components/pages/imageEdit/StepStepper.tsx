import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { t } from '../../../i18n';

interface IProps {
    step: number;
}

export const StepStepper = (props: IProps) => {
    const { step } = props;

    return (
        <Paper>
            <Box p={1}>
                <Stepper activeStep={step}>
                    <Step>
                        <StepLabel>{t('imageEdit.chooseAndOrder')}</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>{t('imageEdit.cutAndMove')}</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>{t('imageEdit.previewAndConfirm')}</StepLabel>
                    </Step>
                </Stepper>
            </Box>
        </Paper>
    );
};
