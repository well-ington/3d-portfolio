import React from 'react';
import {Canvas, useFrame, useThree, useLoader} from 'react-three-fiber';
import PlanetBuilder from '../components/builder/PlanetBuilder';
import CameraController from '../components/controls/OrbitalController';


const planets = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];

const PlanetDisplay: React.FC = () => {
    const [planet, setPlanet] = React.useState(5);
 

    const handleKeyDown = (event: {keyCode: number}) => {
      const [backward, forward] = [
        (event.keyCode === 65 || event.keyCode === 37),
        (event.keyCode === 68 || event.keyCode === 39)
      ];

      if (backward && planet > 0) setPlanet(planet - 1);
      if (forward && planets[planet + 1] !== undefined) setPlanet(planet + 1);
    }
    
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
        <CameraController/>
        <directionalLight args={['#fff2bd', 1]} position={[0, 15,50]} castShadow/>
        <PlanetBuilder position={[0, 0, 0]} type={planets[planet]} />
 

    </Canvas>
}

export default PlanetDisplay;