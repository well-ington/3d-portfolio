import React from 'react';
import {useThree, useFrame} from 'react-three-fiber';
import FPControls from '../controls/FPControls';
import PointerController from '../../components/controls/PointerController';


const MarketScene: React.FC = () => {
    const [loadingSetup, setLoadingSetup] = React.useState(false);
    const ground: any = React.useRef();
    const {camera} = useThree();

    // if (loadingSetup)
    React.useEffect(() => {
        if (!loadingSetup) {
            camera.type = 'PerspectiveCamera';

            setLoadingSetup(true);
        }
    }, [camera, loadingSetup, setLoadingSetup]);
    useFrame(() => {
        ground.current.rotation.x = -Math.PI/2;
        ground.current.position.y = -1;
    });
    return <>
    <group>
        <mesh ref={ground}>
            <planeBufferGeometry attach='geometry' args={[20,20,32,32]} />
            <meshLambertMaterial wireframe attach='material' color='#222' />
        </mesh>
    </group>
    <PointerController />
    {/* <FPControls /> */}
    </>
}

export default MarketScene;