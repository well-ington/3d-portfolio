import React from 'react';
import {extend, useThree, useFrame} from 'react-three-fiber';
import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls';
import { Vector3 } from 'three';


const PointerController = () => {
  // React.useMemo(() => extend({PointerLockControls}), [PointerLockControls]);
  // const [userControlAxis, setControlsAxis] = React.useState([0,0]);
  // const [savedTime, saveTime] = React.useState(performance.now());
  const {camera} = useThree();
  const controls = new PointerLockControls(camera, document.body);
  const velocity = new Vector3();
  const direction = new Vector3();
  let moveUp = 0;
  let moveRight = 0;
  let prevTime = performance.now();
  console.log('test');
  const animate = () => {
    requestAnimationFrame(animate);
    const time = performance.now();
    const delta = ( time - prevTime ) / 100000;
    // direction.x = userControlAxis[1];
    // direction.z = userControlAxis[0];
    velocity.x = moveRight;
    velocity.z = moveUp;
    // velocity.normalize();
    velocity.x *= 2.0 * delta;
    velocity.z *= 2.0 * delta;
    // console.log(velocity);
    // console.log(delta);
    // console.log()    
    // console.log(- velocity.x * delta);
    // console.log(delta);
    // console.log(delta);
    controls.moveRight( velocity.x );
    controls.moveForward( velocity.z );
    // moveRight !== 1 && moveRight !== -1 && moveRight !== 0 ? moveRight -= (0.1 * moveRight > 0 ? -1 : 1) : '';
    // moveUp !== 1 && moveUp !== -1 && moveUp !== 0 ? moveUp -= (0.1 * moveUp < 0 ? -1 : 1) : '';
    // moveRight = 0;
    // moveUp = 0;
    moveUp !== 0 ? moveUp += 0.05 * (moveUp > 0 ? -1 : 1) : '';
    moveRight !== 0 ? moveRight += 0.05 * (moveRight > 0 ? -1 : 1) : '';
   }
  React.useEffect(() => {   
    // prevTime = performance.now();
    const lockPointerHandler = () => {
      if(!controls.isLocked) controls.lock(); 
      
    }

    const keyPressHandler: (event: {keyCode: number}) => void  = ({keyCode}) => {
      const [left, right, up, down] = [
        keyCode === 65,
        keyCode === 68,
        keyCode === 38 || keyCode === 87,
        keyCode === 40 || keyCode === 83
        ];
      if(keyCode === 27 && controls.isLocked) controls.unlock();
      if(left || right || up || down) {
        // controls.moveRight( velocity.x * delta );
        // controls.moveForward( - velocity.z * delta );
        moveUp += 0.1 * (up ? 1 : down ? -1 : 0);
        moveRight = right? 1 : left? -1 : 0;
        // console.log('dildo')
        // setControlsAxis([up? 1 : down ? -1 : userControlAxis[0], right? 1 : left ? -1 : userControlAxis[1]]);
        // saveTime(performance.now());
        // prevTime = performance.now();
        // direction.z = up ? 1 : down ? -1 : 0;
        // controls.moveForward(1);
        // console.log(prevTime);
        // direction.x = right ? 1 : left ? -1 :0;
        // direction.normalize();
        // console.log(direction);
      }
    }
    const keyUpHandler: (event: {keyCode: number}) => void = ({keyCode}) => {
      // if (keyCode === 38 || keyCode === 87 || keyCode === 40 || keyCode === 83) moveUp = 0.9;
      // if (keyCode === 65 || keyCode === 68) moveRight = 0.9;
    }

    window.addEventListener('click', lockPointerHandler);
    window.addEventListener('keydown', keyPressHandler);
    window.addEventListener('keyup', keyUpHandler);

    // camera.position.y  
    prevTime = performance.now();
    animate();
    
    return () => {
      window.removeEventListener('click', lockPointerHandler);
      window.removeEventListener('keydown', keyPressHandler);
      window.removeEventListener('keyup', keyUpHandler);
    }

  }, [PointerLockControls, camera, controls, velocity, animate]);

  // useFrame(() => {
  //   const time = performance.now();
  //   const delta = ( time - savedTime ) / 1000;
  //   // direction.x = userControlAxis[1];
  //   // direction.z = userControlAxis[0];
  //   velocity.x = velocity.x * 10.0 * delta * userControlAxis[0];
  //   velocity.z = velocity.z * 10.0 * delta * userControlAxis[1];
  //   // console.log(delta);
  //   // console.log()    
  //   // console.log(- velocity.x * delta);
  //   // console.log(delta);
  //   // console.log(delta);
  //   controls.moveRight( moveUp * delta * 5 );
  //   controls.moveForward( moveRight * delta * 5 );
  // });


  return null;
}

export default PointerController;