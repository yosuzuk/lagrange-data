import { Dispatch, SetStateAction } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import FormControl from '@mui/material/FormControl';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { ITechFile } from '../../../types/ITechFile';
import { techFiles, getTechFileById } from '../../../data/techFiles';
import { t } from '../../../i18n';

interface IProps {
    id: string;
    techFile: ITechFile;
    onChange: Dispatch<SetStateAction<ITechFile>>;
}

export const TechFileSelection = (props: IProps) => {
    const { id, techFile, onChange } = props;

    const handleChange = (event: SelectChangeEvent) => {
        onChange(getTechFileById(event.target.value as string));
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id={`${id}-label`}>{t('label.techFile')}</InputLabel>
            <Select
                labelId={`${id}-label`}
                id={`${id}-select`}
                value={techFile.id}
                label={t('label.techFile')}
                onChange={handleChange}
                autoWidth={true}
                renderValue={(value: string) => (
                    <Typography variant="body1" whiteSpace="normal">
                        {getTechFileById(value).name}
                    </Typography>
                )}
            >
                {techFiles.flatMap(techFile => [
                    <MenuItem key={techFile.id} value={techFile.id}>
                        <ListItemText
                            primary={(
                                <Typography variant="body1" gutterBottom={true} whiteSpace="normal">
                                    {techFile.name}
                                </Typography>
                            )}
                            secondary={(
                                <Typography variant="body1" color="text.secondary" whiteSpace="normal">
                                    {techFile.desciption}
                                </Typography>
                            )}
                        />
                    </MenuItem>,
                    <Divider key={`${techFile.id}-divider`} />
                ])}
            </Select>
        </FormControl>
    );
};
