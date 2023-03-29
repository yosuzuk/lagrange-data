import { ReactNode } from 'react';

interface IProps {
    children: ReactNode;
}

export const Wireframe = (props: IProps) => {
    const { children } = props;

    return (
        <lineSegments>
            <wireframeGeometry>
                {children}
            </wireframeGeometry>
        </lineSegments>
    );
};
