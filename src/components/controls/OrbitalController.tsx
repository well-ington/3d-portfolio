import React from 'react';
import {extend, useThree} from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {PerspectiveCamera} from 'three';



const CameraController: React.FC<{pos?: number}> = () => {
    React.useMemo(() => extend({OrbitControls}), [OrbitControls]);
    const { camera, gl } = useThree();

    React.useEffect(
      () => {
        // camera.type = "PerspectiveCamera";
        //@ts-ignore
        // camera.fov = 40;
        // scene.background = cubeTexture;
        // camera.quaternion.slerp(camera.quaternion, );
        //@ts-ignore
        // const controls = new OrbitControls(camera, gl.domElement);
        // camera.position.z = 2.5;
        // controls.minDistance = 0;
        // controls.maxDistance = 10000;
        // controls.enableKeys = false;
        // controls.enablePan = false;
        // controls.enableZoom = false;
        // controls.enablePan = false;
        
        // if (camera.position.)
        
        

        return () => {
          // controls.dispose();
        };
      },
      [camera, gl]
    );
    return null;
  };

export default CameraController;