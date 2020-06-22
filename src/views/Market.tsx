import * as React from 'react';

import {Canvas, useThree, useLoader} from 'react-three-fiber';
import { DoubleSide } from 'three';
import MarketScene from '../components/scenes/MarketScene';


const Market: React.FC = () => {
  const planeref: any = React.useRef();


    return <Canvas
    style={{
        height: '100vh',
      }}
    >
{/* 
      <mesh ref={planeref}>
        <planeBufferGeometry args={[10,10,32]} attach="geometry" />
        <meshLambertMaterial side={DoubleSide} attach="material" color="black" />
      </mesh> */}
      <MarketScene />
    </Canvas>
}

export default Market;
