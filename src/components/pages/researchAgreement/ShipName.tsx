import Typography from '@mui/material/Typography';
import { useShipDetail } from '../../shipDetail/ShipDetailProvider';
import { ScriptedLink } from '../../link/ScriptedLink';
import { IShipDefinition } from '../../../types/ShipDefinition';

interface IProps {
    shipDefinition: IShipDefinition;
}

export const ShipName = (props: IProps) => {
    const { shipDefinition } = props;
    const { openShipDetailDialog } = useShipDetail();

    return (
        <Typography variant="body2" component="span">
            <ScriptedLink onClick={() => { openShipDetailDialog(shipDefinition.id); }}>
                {shipDefinition.name}
            </ScriptedLink>
        </Typography>
    );
};
