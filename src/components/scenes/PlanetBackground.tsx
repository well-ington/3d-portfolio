import React from 'react';
import {Canvas, useFrame, useThree, useLoader} from 'react-three-fiber';
import CameraController from '../controls/OrbitalController';
import PlanetBuilder from '../builder/PlanetSceneBuilder';
import styled from 'styled-components';
import SetBackgroundCube from './SetBackgroundCube';
import SplitCameraController from '../controls/SplitCameraController';
import { PerspectiveCamera } from 'three';

interface IPlanetBackground {
    planet: string;
    preset?: number;
}



const PlanetBackground: React.FC<IPlanetBackground> = ({planet}) => {
    return <Canvas style={{
            height: '100%'
        }}>
            <PlanetBuilder satellite position={[0,0,0]} type={planet} />
            <directionalLight args={['#fff2bd', 1]} position={[0,4,10]} castShadow/>
            {/* <CameraController /> */}
            {/* <SetBackgroundCube /> */}
            {/* <SplitCameraController /> */}
        </Canvas>
}

export default PlanetBackground;