import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { NavigationBar } from '../../navigation/NavigationBar';
import { PageContent } from '../../pageStructure/PageContent';
import { PageFooter } from '../../pageStructure/PageFooter';
import { ImageEditor } from './ImageEditor';

interface IProps {
    
}

const ImageEditPage = (props: IProps) => {
    const {  } = props;

    // add action bar
    // TODO toggle slider modes
    // measure container size in ImageEditor to align all previews
    // fix resize
    // improve react key handling

    return (
        <>
            <NavigationBar currentRoute="/imageEdit" />
            <PageContent>
                <Box p={1}>
                    <ImageEditor />
                </Box>
            </PageContent>
            <PageFooter />
        </>
    );
};

export default ImageEditPage;
