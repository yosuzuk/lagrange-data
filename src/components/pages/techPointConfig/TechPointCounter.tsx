import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { t } from '../../../i18n';

const BIG_FONT_SIZE = '1.5rem';
const SMALL_FONT_SIZE = '1rem';

interface IProps {
    techPoints: number | null;
    maxTechPoints: number | null;
    incomplete: boolean;
    showZero?: boolean;
}

export const TechPointCounter = (props: IProps) => {
    const { techPoints, maxTechPoints, incomplete, showZero } = props;

    const showTechPoints = showZero || (techPoints !== null && techPoints > 0);
    const hasMax = maxTechPoints !== null && maxTechPoints > 0;

    return (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: '160px' }}>
            <Typography variant="body2" color="text.secondary" whiteSpace="nowrap">
                {t('techPointConfig.techPointShortColon')}
            </Typography>
            {showTechPoints && (
                <Typography
                    variant="body1"
                    textAlign="right"
                    sx={{ fontSize: BIG_FONT_SIZE }}
                >
                    {techPoints ?? 0} 
                </Typography>
            )}
            <Stack direction="row" alignItems="center">
                <Typography
                    variant="body1"
                    textAlign="right"
                    sx={{ fontSize: showTechPoints ? SMALL_FONT_SIZE : BIG_FONT_SIZE }}
                    color={(showTechPoints || !hasMax) ? 'text.secondary' : 'text.primary'}
                >
                { `${showTechPoints ? '/ ' : ''}${hasMax ? `${maxTechPoints}` : '?'}`} 
                </Typography>
                {hasMax && incomplete && (
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ fontSize: showTechPoints ? SMALL_FONT_SIZE : BIG_FONT_SIZE }}
                    >
                        {'+'}
                    </Typography>
                )}
            </Stack>
        </Stack>
    );
};
