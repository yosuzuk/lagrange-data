import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { t } from '../../../i18n';

const BIG_FONT_SIZE = '1.5rem';
const SMALL_FONT_SIZE = '1rem';

interface IProps {
    techPoints: number | null;
    maxTechPoints: number | null;
    unlockCost: number | null;
    selected?: boolean;
    incomplete: boolean;
    showZero?: boolean;
}

export const TechPointCounter = (props: IProps) => {
    const { techPoints, maxTechPoints, unlockCost, selected, incomplete, showZero } = props;

    const includeUnlockCost = (selected === true && unlockCost !== null && unlockCost > 0);

    const numberLeft = (techPoints ?? 0) + (includeUnlockCost ? (unlockCost ?? 0) : 0);
    const numberRight = (maxTechPoints ?? 0) + (includeUnlockCost ? (unlockCost ?? 0) : 0);
    const showNumberLeft = selected === true || showZero || (techPoints !== null && techPoints > 0);
    const showNumberRight = includeUnlockCost || (maxTechPoints !== null && maxTechPoints > 0);

    return (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: '160px' }}>
            <Typography variant="body2" color="text.secondary" whiteSpace="nowrap">
                {t('techPointConfig.techPointShortColon')}
            </Typography>
            {showNumberLeft && (
                <Typography
                    variant="body1"
                    textAlign="right"
                    sx={{ fontSize: BIG_FONT_SIZE }}
                >
                    {`${numberLeft}`}
                </Typography>
            )}
            <Stack direction="row" alignItems="center">
                <Typography
                    variant="body1"
                    textAlign="right"
                    sx={{ fontSize: showNumberLeft ? SMALL_FONT_SIZE : BIG_FONT_SIZE }}
                    color={(showNumberLeft || !showNumberRight) ? 'text.secondary' : 'text.primary'}
                >
                { `${showNumberLeft ? '/ ' : ''}${showNumberRight ? `${numberRight}` : '?'}`} 
                </Typography>
                {showNumberRight && incomplete && (
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ fontSize: showNumberLeft ? SMALL_FONT_SIZE : BIG_FONT_SIZE }}
                    >
                        {'+'}
                    </Typography>
                )}
            </Stack>
        </Stack>
    );
};
