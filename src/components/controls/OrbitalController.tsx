import React from 'react';
import {extend, useThree} from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const CameraController: () => null = () => {
    React.useMemo(() => extend({OrbitControls}), [OrbitControls]);
    const { camera, gl } = useThree();
    React.useEffect(
      () => {
        const controls = new OrbitControls(camera, gl.domElement);
        
        controls.minDistance = 0;
        controls.maxDistance = 10000;
        controls.enableKeys = false;
        controls.enablePan = false;
        camera.position.z = 2.5;
        

        return () => {
          controls.dispose();
        };
      },
      [camera, gl]
    );
    return null;
  };

export default CameraController;