import Rating from '@mui/material/Rating';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface IProps {
    shipId: string;
    selected: boolean;
    onToggle: (shipId: string) => void;
}

export const ToggleFavorite = (props: IProps) => {
    const { shipId, selected, onToggle } = props;

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Rating
            name="toggle-favorite"
            size={matches ? 'medium' : 'small'}
            value={selected ? 1 : 0}
            onChange={() => {
                onToggle(shipId);
            }}
            max={1}
        />
    );
};
