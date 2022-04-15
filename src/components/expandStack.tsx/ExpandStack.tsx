import { useState, useCallback, memo } from 'react';
import Stack, { StackProps } from '@mui/material/Stack';
import { IExpandable } from './types/IExpandable';
import { ExpandStackItem } from './ExpandStackItem';

interface IProps {
    expandables: IExpandable[];
    unmount?: boolean;
    stackProps?: Partial<StackProps>;
}

const MemoizedExpandableStackItem = memo(ExpandStackItem);

export const ExpandStack = (props: IProps) => {
    const { expandables, unmount = true, stackProps } = props;

    const [openState, setOpenState] = useState<Record<string, boolean>>(() => {
        return expandables.reduce((acc: Record<string, boolean>, expandable: IExpandable) => ({
            ...acc,
            [expandable.id]: expandable.initiallyOpened,
        }), {} as Record<string, boolean>);
    });

    const handleToggleExpandable = useCallback((id: string) => {
        setOpenState(openState => ({
            ...openState,
            [id]: !openState[id],
        }));
    }, []);

    return (
        <Stack spacing={1} {...stackProps}>
            {expandables.filter(e => e.skip !== true).map(expandable => (
                <MemoizedExpandableStackItem
                    key={expandable.id}
                    expandable={expandable}
                    expanded={!!openState[expandable.id]}
                    onToggle={handleToggleExpandable}
                    unmount={unmount}
                />
            ))}
        </Stack>
    );
}
