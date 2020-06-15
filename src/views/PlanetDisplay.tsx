import React from 'react';
import {Canvas, useFrame, useThree, useLoader} from 'react-three-fiber';

import PxTx from '../textures/earth/cube/px.jpg';
import NxTx from '../textures/earth/cube/nx.jpg';
import PzTx from '../textures/earth/cube/pz.jpg';
import NzTx from '../textures/earth/cube/nz.jpg';
import PyTx from '../textures/earth/cube/py.jpg';
import NyTx from '../textures/earth/cube/ny.jpg';

//@ts-ignore
import EarthTexture from '../textures/earth/2k_earth_daymap_ground.jpg';
//@ts-ignore
import EarthCloudTexture from '../textures/earth/2k_earth_clouds_ground.jpg';
import THREE, {TextureLoader, CubeTextureLoader, Scene, PerspectiveCamera} from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import PlanetBuilder from '../components/builder/PlanetBuilder';
import CameraController from '../components/controls/OrbitalController';



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
const planetSizes = Object.values(meshSize);
// const TextureLoader = new THREE.TextureLoader();

// const AstroMesh = (props: any) => {
//     const mesh = React.useRef();
//     const texture = React.useMemo(() => new TextureLoader().load(EarthTexture), [EarthTexture]);
//     // const texture: any = useLoader(THREE.TextureLoader, require('../textures/earth/2k_earth_daymap_ground.jpg'));
//     // const tex = TextureLoader.load(EarthTexture);

//     return <mesh
//     {...props}
//     ref={mesh}
//     >
//         <sphereBufferGeometry attach="geometry" args={[4, 64, 64]} />
//         <meshPhongMaterial attach="material" map={texture} onUpdate={self => texture && (self.needsUpdate = true)}>
//             {/* <texture name="map"
//             image={EarthTexture} onUpdate={self => EarthTexture && (self.needsUpdate = true)} /> */}
//         </meshPhongMaterial>
        
        
            
//     </mesh>
// }

// const renderer = new THREE.WebGLRenderer();



const planets = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];

const PlanetDisplay: React.FC = () => {
    const [planet, setPlanet] = React.useState(5);
    // const {camera} = useThree();
  //   const bgTexture = React.useMemo(() => new CubeTextureLoader().load([
  //     PxTx, NxTx, PyTx, NyTx, PzTx, NzTx
  // ]), [PxTx, NxTx, PyTx, NyTx, PzTx, CubeTextureLoader]);

    const handleKeyDown = (event: {keyCode: number}) => {
      const [backward, forward] = [
        (event.keyCode === 65 || event.keyCode === 37),
        (event.keyCode === 68 || event.keyCode === 39)
      ];

      if (backward && planet > 0) setPlanet(planet - 1);
      if (forward && planets[planet + 1] !== undefined) setPlanet(planet + 1);
      // scene.background.;
    }
    

    
    // console.log(planetSizes[planet]);
    return <Canvas 
    concurrent 
    onKeyDown={handleKeyDown}
    style={{
      height: '100vh', 
      backgroundColor: 'black'
    }}

    gl={{antialias: true}}
    >
        {/* <texture attach="background" color="red" /> */}
        <CameraController/>
        <perspectiveCamera args={[100, window.innerWidth/window.innerHeight, 10, 100000 ]} />
        <pointLight position={[0, 0, 200]} intensity={0.5} />
        <pointLight position={[0, 10, 200]} castShadow shadowCameraFov={80} intensity={0.5} />
        <pointLight position={[0, -10, 200]}  intensity={0.5} />
        <PlanetBuilder position={[0, 0, 0]} type={planets[planet]} />
        {/* <cubeTexture attach="background" /> */}
 

    </Canvas>
}

export default PlanetDisplay;