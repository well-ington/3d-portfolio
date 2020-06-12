import React from 'react';
import {Canvas, useFrame} from 'react-three-fiber';

const distances = {
    mercury: 10359.65,
    venus: 17062.79,
    earth: 23485.08,
    mars: 35777.08,
    jupiter: 122213.5,
    saturn: 225117.74,
    uranus: 450706.44,
    neptune: 705651.49
};

const meshSize = {
    mercury: 0.383,
    venus: 0.95,
    earth: 1,
    mars: 0.53,
    jupiter: 10.975,
    saturn: 9.14,
    uranus: 3.98,
    neptune: 3.87
}

const AstroMesh = (props: any) => {
    const mesh = React.useRef();
    return <mesh
    {...props}
    ref={mesh}
    >
        <sphereBufferGeometry attach="geometry" args={[2, 64, 64]}/>
        <meshPhongMaterial attach="material" color={`hotpink`} />
    </mesh>
}



const SolarFiber: React.FC = () => {
    return <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <AstroMesh position={[0, 0, 0]} />

    </Canvas>
}

export default SolarFiber;