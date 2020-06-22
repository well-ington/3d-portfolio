import React from 'react';
import {Vector3} from 'three';

const MovingPointCamera: (cameraObj: any, reference: any, player: any) => null = (cameraObj, reference, player) => {    
    cameraObj.lookAt(new Vector3(reference.x * (1 + player.coordinates[0]), reference.y * (1 - player.coordinates[1]), reference.z));    
    cameraObj.position.set((reference.x * (1.15 + player.coordinates[0])), (reference.y * (1.15 - player.coordinates[1])), (reference.z * 1.15));
    return null;
}

export default MovingPointCamera;