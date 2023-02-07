import { useState, useCallback, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { ImagePartPreview } from './ImagePartPreview';

interface IProps {
    
}

export const ImageEditor = (props: IProps) => {
    const {  } = props;
    const imageInputRef = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<File[]>([]);

    const handleChangeImage = () => {
        if (imageInputRef.current?.files?.length) {
            setFiles(files => [...files, ...(imageInputRef.current?.files ?? [])]);
            imageInputRef.current.value = '';
        }
    };

    const moveFileUp = useCallback((index: number) => {
        setFiles(files => {
            const newFiles = [...files];
            newFiles[index] = files[index - 1];
            newFiles[index - 1] = files[index];
            return newFiles;
        });
    }, []);

    const moveFileDown = useCallback((index: number) => {
        setFiles(files => {
            const newFiles = [...files];
            newFiles[index] = files[index + 1];
            newFiles[index + 1] = files[index];
            return newFiles;
        });
    }, []);

    const removeFile = useCallback((index: number) => {
        setFiles(files => {
            const newFiles = [...files];
            newFiles.splice(index, 1);
            return newFiles;
        });
    }, []);

    return (
        <Stack spacing={1}>
            <div>
                <Button variant="contained" component="label">
                    Upload
                    <input
                        hidden={true}
                        ref={imageInputRef}
                        type="file"
                        id="imageUpload"
                        name="imageUpload"
                        multiple={true}
                        accept="image/jpeg"
                        onChange={handleChangeImage}
                    />
                </Button>
            </div>
            <Box>
                {files.map((file: File, index: number) => (
                    <Paper key={`imageRow_${index}`}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <ImagePartPreview
                                file={file}
                                index={index}
                                total={files.length}
                                moveFileUp={moveFileUp}
                                moveFileDown={moveFileDown}
                                removeFile={removeFile}
                            />
                        </Stack>
                    </Paper>
                ))}
            </Box>
        </Stack>
    );
};
