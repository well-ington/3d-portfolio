import React from 'react';
import {useThree} from 'react-three-fiber';
import {PerspectiveCamera, Vector3} from 'three';

const SplitCameraController = () => {
    const {camera} = useThree();
    
    // const [clicked, setClick] = React.useState(false);
    // const [baseClient, setClient] = React.useState([0,0]);
    // let vec = new Vector3();
    // const offset = new Vector3();
    // let mat = new Matrix4();
    // const spherical = new Spherical();
    React.useEffect(() => {
        // camera.type = 'PerspectiveCamera';
        // camera.position.z = 3;
        // camera.fov = 10;
        // camera.type = 'OrthographicCamera';
        // camera.position.z = 2;
        camera.position.set(0,0,2);
        // console.log(camera);
        // camera.position.set(0,0,-2);
        // camera.setRotationFromAxisAngle(new Vector3(0,0,1), 1);
        // camera.lookAt(new Vector3(0,0,0));
        // const quat = new Quaternion().setFromUnitVectors(camera.up, new Vector3(0,1,0));
   
        // const mouseHandler = (event: any) => {
        //     if(clicked) {
        //         const position = camera.position;
        //         offset.copy(position);
        //         offset.applyQuaternion(quat);
        //         console.log(offset);
        //         spherical.setFromVector3(offset);
        //         console.log(spherical);


        //     }
        // }

        // const handleClickDown = (event: any) => {
        //     setClient([event.clientX, event.clientY]);
        //     camera.getWorldDirection(vec);
        //     console.log(camera.matrix);
        //     setClick(true);
        // }

        // const handleClickUp = () => {
        //     setClick(false);
        // }

        // window.addEventListener('mousemove', mouseHandler);
        // window.addEventListener('mouseup', handleClickUp);
        // window.addEventListener('mousedown', handleClickDown);
        // return () => {
        //     window.removeEventListener('mousemove', mouseHandler);
        //     window.removeEventListener('mouseup', handleClickUp);
        //     window.removeEventListener('mousedown', handleClickDown);
        // }
    }, [camera, Vector3]);
    return <perspectiveCamera fov={10} position={[0,0,1]} />;
}

export default SplitCameraController;