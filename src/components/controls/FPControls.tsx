import React from 'react';
import {extend, useThree} from 'react-three-fiber';
import { Vector3, Spherical, Quaternion } from 'three';
// import {FirstPersonControls} from 'three/examples/jsm/controls/FirstPersonControls';


const offset = new Vector3();
const target = new Vector3();
const mouseSensitivity = 0.015;

const orientation = new Spherical();
const quaternion = new Quaternion();

const FPControls = () => {
    const {camera, gl} = useThree();
    const [viewPosition, setViewPosition] = React.useState([0,0]);
    const [clickedPosition, setClickedPosition] = React.useState([window.innerWidth/2,window.innerHeight/2]);
    const [playerCoordinates, setPlayerCoordinates] = React.useState([0,0,1])
    const update = () => {
        target.x = (Math.sin(viewPosition[0]) * 10) + camera.position.x;
        target.z = (Math.cos(viewPosition[0]) * 10) + camera.position.z;
        target.y = (-Math.sin(viewPosition[1]) * 10) + camera.position.y;    
        // camera.position.x = playerCoordinates[0];
        // camera.position.z = playerCoordinates[1];
        camera.position.y = playerCoordinates[2];
        camera.lookAt(target);
    }
    update();
    React.useEffect(() => {
        const keyHandler: (event: {keyCode: number}) => void = ({keyCode}) => {
            const [left, right, up, down] = [
                keyCode === 65,
                keyCode === 68,
                keyCode === 38 || keyCode === 87,
                keyCode === 40 || keyCode === 83
                ];

            if(left || right || up || down) {

                const nextStep = [playerCoordinates[0] + (target.x/20 * (up ? 1 : down ? -1 : 0)), playerCoordinates[1] + (target.z/20 * (up ? 1 : down ? -1 : 0))];
                // setPlayerCoordinates(nextStep);
                camera.position.x = nextStep[0];
                camera.position.z = nextStep[1];
                update();
                console.log('aha')
            }

        }

        const onMouseDownHandler: (event: {clientX: number, clientY: number}) => void = ({clientX, clientY}) => {
            setClickedPosition([clientX, clientY]);
        }

        const onMouseDragHandler: (event: {clientX: number, clientY: number}) => void = ({clientX, clientY}) => {
            if (clickedPosition[0] !== -1) {
                // if (clientX > clickedPosition[0]) {
                    
                // }
                // if (clientX < clickedPosition[0]) {
                    
                // }
                
                // if (clientY > clickedPosition[1]) {
                    
                // }
                // if (clientY < clickedPosition[1]) {
                    
                // }
                setViewPosition([
                    (viewPosition[0] + (clientX !== clickedPosition[0] ? mouseSensitivity * (clientX < clickedPosition[0] ? 1 : -1) : 0))%(Math.PI * 2), 
                (viewPosition[1] + (clientY !== clickedPosition[1] ? mouseSensitivity * (clientY > clickedPosition[1] ? 1 : -1) : 0))%(Math.PI/2)
            ])
            }
        }

        const onMouseUpHandler = () => {
            // console.log(camera.rotation.y);
            // console.log(camera);
            camera.rotation.y = camera.rotation.y%(Math.PI*2);
            setClickedPosition([-1,-1]);
        }

        window.addEventListener('keydown', keyHandler);
        // window.addEventListener('mousedown', onMouseDownHandler);
        window.addEventListener('mousemove', onMouseDragHandler);
        // window.addEventListener('mouseup', onMouseUpHandler);

        return () => {
            // controls.dispose();
            window.removeEventListener('keydown', keyHandler);
            // window.removeEventListener('mousedown', onMouseDownHandler);
            window.removeEventListener('mousemove', onMouseDragHandler);
            // window.removeEventListener('mouseup', onMouseUpHandler);
        }
    }, [camera, quaternion, gl, viewPosition, setViewPosition, clickedPosition, setClickedPosition, orientation, update]);
    return null;
}

export default FPControls;