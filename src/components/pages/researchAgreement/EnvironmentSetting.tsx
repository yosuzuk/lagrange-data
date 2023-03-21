import { useCallback } from 'react';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { t } from '../../../i18n';
import { Season } from './types/Season';

interface IProps {
    season: Season;
    seasonDisabled: boolean;
    onChangeSeason: (season: Season) => void;
}

export const EnvironmentSetting = (props: IProps) => {
    const { season, seasonDisabled, onChangeSeason } = props;

    const handleChangeSeason = useCallback((event: SelectChangeEvent) => {
        onChangeSeason(event.target.value as Season);
    }, [onChangeSeason]);

    return (
        <Grid container={true} spacing={2}>
            <Grid item={true} xs={12} sm={8} md={4}>
                <FormControl fullWidth={true} size="small">
                    <Select
                        value={season}
                        label={null}
                        onChange={handleChangeSeason}
                        disabled={seasonDisabled}
                    >
                        <MenuItem value={Season.ONE}>{t('researchAgreement.seasonOne')}</MenuItem>
                        <MenuItem value={Season.TWO_PLUS}>{t('researchAgreement.seasonTwoPlus')}</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
};
