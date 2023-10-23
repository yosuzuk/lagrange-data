import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { ResponsiveDialog } from '../../dialog/ResponsiveDialog';
import { t } from '../../../i18n';
import { ShipRow } from '../../../types/ShipRow';
import { ShipType } from '../../../types/ShipType';
import { IShipDefinition } from '../../../types/ShipDefinition';

export interface IProps {
    shipDefinition: IShipDefinition;
    rowOverride?: ShipRow;
    costOverride?: number;
    onChange: (shipId: string, row: ShipRow, cost: number) => void;
    onClose: () => void;
}

export const SystemTuneDialog = (props: IProps) => {
    const { shipDefinition, rowOverride, costOverride, onChange, onClose } = props;
    const defaultRow = shipDefinition.row;
    const defaultCost = shipDefinition.cost;

    const [row, setRow] = useState<ShipRow>(rowOverride ?? defaultRow);
    const [cost, setCost] = useState<number>(costOverride ?? defaultCost);

    const handleClickApply = () => {
        onChange(shipDefinition.id, row, cost);
        onClose();
    };

    return (
        <ResponsiveDialog
            title={t('fleetSetup.systemTune')}
            content={(
                <Stack spacing={3}>
                    <Paper>
                        <Stack spacing={1} pl={1} pr={1}>
                            <Typography variant="body1">
                                {t('fleetSetup.overrideRow')}
                            </Typography>
                            <FormControl>
                                <RadioGroup
                                    name="rowOverride"
                                    value={row}
                                    onChange={(_event, value) => setRow(value as ShipRow)}
                                >
                                    <FormControlLabel
                                        label={`${defaultRow === ShipRow.FRONT ? t('fleetSetup.frontRowDefault') : t('rowPlacement.frontRow')}`}
                                        value={ShipRow.FRONT}
                                        control={<Radio />}
                                    />
                                    <FormControlLabel
                                        label={`${defaultRow === ShipRow.MIDDLE ? t('fleetSetup.middleRowDefault') : t('rowPlacement.middleRow')}`}
                                        value={ShipRow.MIDDLE}
                                        control={<Radio />}
                                    />
                                    <FormControlLabel
                                        label={`${defaultRow === ShipRow.BACK ? t('fleetSetup.backRowDefault') : t('rowPlacement.backRow')}`}
                                        value={ShipRow.BACK}
                                        control={<Radio />}
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Stack>
                    </Paper>
                    <Paper>
                        <Stack spacing={1} pl={1} pr={1}>
                            <Typography variant="body1">
                                {t('fleetSetup.commandPoints')}
                            </Typography>
                            <FormControl>
                                <RadioGroup
                                    name="costOverride"
                                    value={cost}
                                    onChange={(_event, value) => setCost(Number(value))}
                                >
                                    <FormControlLabel
                                        label={`${t('fleetSetup.costDefault', { cost: defaultCost })}`}
                                        value={shipDefinition.cost}
                                        disabled={shipDefinition.type !== ShipType.CRUISER}
                                        control={<Radio />}
                                    />
                                    <FormControlLabel
                                        label={`${defaultCost - 2}`}
                                        value={`${shipDefinition.cost - 2}`}
                                        disabled={shipDefinition.type !== ShipType.CRUISER}
                                        control={<Radio />}
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Stack>
                    </Paper>
                </Stack>
            )}
            actions={(
                <>
                    <Button variant="outlined" onClick={onClose}>
                        {t('button.cancel')}
                    </Button>
                    <Button variant="contained" onClick={handleClickApply}>
                        {t('button.confirm')}
                    </Button>
                </>
            )}
            onClose={onClose}
        />
    );
};
