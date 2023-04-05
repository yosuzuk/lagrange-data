import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import TableRowsIcon from '@mui/icons-material/TableRows';

export type ViewMode = 'ships' | 'table';

interface IProps {
    mode: ViewMode;
    onChange: (mode: ViewMode) => void;
}

export const ViewModeSelection = (props: IProps) => {
    const { mode, onChange } = props;

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        mode: string | null,
    ) => {
        onChange(mode as ViewMode);
    };

    return (
        <ToggleButtonGroup
            value={mode}
            exclusive={true}
            onChange={handleChange}
            size="small"
            aria-label="view mode"
        >
            <ToggleButton value="ships" aria-label="ships">
                <AccountTreeIcon />
            </ToggleButton>
            <ToggleButton value="table" aria-label="table">
                <TableRowsIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    );
};
