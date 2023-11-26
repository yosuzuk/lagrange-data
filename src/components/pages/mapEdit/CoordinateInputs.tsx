import { useState, useEffect, Dispatch, SetStateAction, useRef } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { CoordinateInput } from './CoordinateInput';
import { IMapContent } from './types/IMapContent';
import { createTemporaryLocation, getPrimaryCoordinatesForMapContent } from './utils/mapContentUtils';
import { copyToClipboard } from '../../../utils/clipboardUtils';
import Stack from '@mui/material/Stack';
import Popper from '@mui/material/Popper';
import { MapContentSelection } from './MapContentSelection';
import { PrimaryButton } from './Button';
import { useMapInteraction } from './context/MapInteractionContext';

interface IProps {
    targetToMark: IMapContent | null;
}

export const CoordinateInputs = (props: IProps) => {
    const { targetToMark } = props;
    const [x, y] = (targetToMark && targetToMark.contentType !== 'temporaryLocation') ? getPrimaryCoordinatesForMapContent(targetToMark) : [null, null];
    const [localX, setLocalX] = useState<number | null>(x);
    const [localY, setLocalY] = useState<number | null>(y);
    const jumpedRef = useRef<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const { markTarget } = useMapInteraction();

    useEffect(() => {
        const [x, y] = (targetToMark && targetToMark.contentType !== 'temporaryLocation') ? getPrimaryCoordinatesForMapContent(targetToMark) : [null, null];
        if (x !== null && y !== null) {
            setLocalX(x);
            setLocalY(y);
        }
    }, [targetToMark]);

    const handleClickJump = () => {
        if (localX !== null && localY !== null) {
            markTarget(createTemporaryLocation(localX, localY));
            setLocalX(null);
            setLocalY(null);
            jumpedRef.current = true;
        }
    };

    const handleClickCopy = () => {
        copyToClipboard(`(${localX},${localY})`);
    };

    const handleClickAway = () => {
        if (jumpedRef.current) {
            markTarget(null);
            setLocalX(null);
            setLocalY(null);
            jumpedRef.current = false;
        }
    };

    return (
        <>
            <ClickAwayListener onClickAway={handleClickAway}>
                <Stack
                    ref={containerRef}
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{
                        backgroundColor: '#262626',
                        padding: '0 4px',
                        border: '1px solid grey',
                        marginLeft: '8px',
                        marginBottom: '4px',
                    }}
                >
                    <div>
                        <CoordinateInput
                            id="x-coordinate"
                            label="X"
                            value={localX}
                            setValue={setLocalX}
                        />
                    </div>
                    <div>
                        <CoordinateInput
                            id="y-coordinate"
                            label="Y"
                            value={localY}
                            setValue={setLocalY}
                        />
                    </div>
                    <PrimaryButton
                        id="btn-jump-to"
                        onClick={handleClickJump}
                        disabled={localX === null || localY === null}
                    >
                        JUMP
                    </PrimaryButton>
                    <PrimaryButton
                        id="btn-copy-coordinates"
                        onClick={handleClickCopy}
                        disabled={localX === null || localY === null}
                    >
                        COPY
                    </PrimaryButton>
                </Stack>
            </ClickAwayListener >
            {containerRef.current && targetToMark && (
                <Popper open={true} placement="top-start" anchorEl={containerRef.current}>
                    <MapContentSelection mapContent={targetToMark} />
                </Popper>
            )}
        </>
    );
};
