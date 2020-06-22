import React from 'react';
import {useThree} from 'react-three-fiber';
import { CubeTextureLoader } from 'three';
import PxTx from '../../textures/earth/cube/px.jpg';
import NxTx from '../../textures/earth/cube/nx.jpg';
import PzTx from '../../textures/earth/cube/pz.jpg';
import NzTx from '../../textures/earth/cube/nz.jpg';
import PyTx from '../../textures/earth/cube/py.jpg';
import NyTx from '../../textures/earth/cube/ny.jpg';


const SetBackgroundCube: React.FC = () => {
    const { scene } = useThree();
    const cubeTexture = React.useMemo(() => new CubeTextureLoader().load([
      PxTx, NxTx, PyTx, NyTx, PzTx, NzTx
  ]),
  [ PxTx, NxTx, PyTx, NyTx, PzTx, NzTx, CubeTextureLoader]);
    React.useEffect(
      () => {
        scene.background = cubeTexture;
      },
      [scene]
      );
    return null;
  };

export default SetBackgroundCube;