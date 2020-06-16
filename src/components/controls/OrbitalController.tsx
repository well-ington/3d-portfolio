import React from 'react';
import {extend, useThree} from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {PerspectiveCamera, CubeTextureLoader} from 'three';
import PxTx from '../../textures/earth/cube/px.jpg';
import NxTx from '../../textures/earth/cube/nx.jpg';
import PzTx from '../../textures/earth/cube/pz.jpg';
import NzTx from '../../textures/earth/cube/nz.jpg';
import PyTx from '../../textures/earth/cube/py.jpg';
import NyTx from '../../textures/earth/cube/ny.jpg';


const CameraController: () => null = () => {
    React.useMemo(() => extend({OrbitControls}), [OrbitControls]);
    const { camera, gl, scene } = useThree();
    const cubeTexture = React.useMemo(() => new CubeTextureLoader().load([
      PxTx, NxTx, PyTx, NyTx, PzTx, NzTx
  ]),
  [ PxTx, NxTx, PyTx, NyTx, PzTx, NzTx, CubeTextureLoader]);
    React.useEffect(
      () => {
        camera.type = "PerspectiveCamera";
        //@ts-ignore
        camera.fov = 40;
        scene.background = cubeTexture;
        //@ts-ignore
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