import React from 'react';
import {Canvas, useFrame, useThree, useLoader} from 'react-three-fiber';
import {Spherical} from 'three';
// import MovingPointCamera from '../components/'
import PlanetBuilder from '../components/builder/PlanetSceneBuilder';
import CameraController from '../components/controls/OrbitalController';
// import PointerController from '../components/controls/PointerController';
import SetBackgroundCube from '../components/scenes/SetBackgroundCube';

const planets = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];

const PlanetDisplay: React.FC = () => {
    const [planet, setPlanet] = React.useState(2);
    const [playerCoordinates, setPlayerCoordinates] = React.useState([0,0]);
    const [playerRotation, setPlayerRotation] = React.useState([0,0]);
    const spherical = new Spherical();
    const {camera} = useThree();
    const [playerTarget, setPlayerTarget] = React.useState([0,0,0]);
    // const [ ]
    const playerObject = {
      coordinates: [...playerCoordinates],
      target: [...playerTarget]
    }

    const handleKeyDown = (event: {keyCode: number}) => {
      const [backward, forward] = [
        (event.keyCode === 37),
        (event.keyCode === 39)
      ];

      // console.log(event.keyCode);
      if (event.keyCode === 65) setPlayerCoordinates([playerCoordinates[0], playerCoordinates[1] + 0.001]);
      
      if (event.keyCode === 68) setPlayerCoordinates([playerCoordinates[0], playerCoordinates[1] - 0.001]);
      if (event.keyCode === 87) setPlayerCoordinates([playerCoordinates[0] + 0.001, playerCoordinates[1]]);
      if (event.keyCode === 83)  setPlayerCoordinates([playerCoordinates[0] - 0.001, playerCoordinates[1]]);
      if (backward && planet > 0) setPlanet(planet - 1);
      if (forward && planets[planet + 1] !== undefined) setPlanet(planet + 1);
    }

    React.useEffect(() => {
      // spherical.clone(camera.position.setFromSpherical)

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);

      }
    }, [playerCoordinates, setPlayerCoordinates, playerTarget, setPlayerTarget, spherical, camera])
    
    return <Canvas 
    concurrent 
    onKeyDown={handleKeyDown}
    
    style={{
      height: '100vh',
      // backgroundColor: 'black'
    }}
    shadowMap
    
    gl={{antialias: true}}

    >
        <PlanetBuilder player={playerObject} position={[0,0,0]} type={planets[planet]} satellite />
        <directionalLight args={['#fff2bd', 1]} position={[0, 15,50]} castShadow/>
        {/* <CameraController/> */}
        <SetBackgroundCube />

    </Canvas>
}

export default PlanetDisplay;