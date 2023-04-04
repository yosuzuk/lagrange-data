import { useRef, useState } from 'react';
import { useFrame, MeshProps } from '@react-three/fiber';
import { Mesh } from 'three';

export const InteractiveExampleBox = (props: Partial<MeshProps>) => {
    // This reference will give us direct access to the mesh
    const mesh = useRef<Mesh>(null);

    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);

    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => {
        if (mesh.current) {
            mesh.current.rotation.x += delta;
        }
    });

    // Return view, these are regular three.js elements expressed in JSX
    return (
        <mesh
            {...props}
            ref={mesh}
            scale={active ? 1.5 : 1}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    );
};
