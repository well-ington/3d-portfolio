import React from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
//@ts-ignore
import EarthTexture from '../textures/earth/2k_earth_daymap_ground.jpg';
//@ts-ignore
import EarthCloudTexture from '../textures/earth/2k_earth_clouds_ground.jpg';
//@ts-ignore
import MoonTexture from '../textures/earth/2k_moon_ground.jpg';
//@ts-ignore
import MarsTexture from '../textures/earth/2k_mars_ground.jpg';
//@ts-ignore
import SaturnTexture from '../textures/earth/2k_saturn_ground.jpg';
//@ts-ignore
import SaturnCloudsTexture from '../textures/earth/2k_saturn_clouds.jpg';
//@ts-ignore
import JupiterTexture from '../textures/earth/2k_jupiter_ground.jpg';
//@ts-ignore
import SaturnRingTexture from '../textures/earth/2k_saturn_ring_ground.jpg';
//@ts-ignore
import UranusTexture from '../textures/earth/2k_uranus_ground.jpg';
//@ts-ignore
import NeptuneTexture from '../textures/earth/2k_neptune_ground.jpg';
//@ts-ignore
import MercuryTexture from '../textures/earth/2k_mercury_ground.jpg';
//@ts-ignore
import VenusTexture from '../textures/earth/2k_venus_surface_ground.jpg';
//@ts-ignore
import VenusAtmosphereTexture from '../textures/earth/2k_venus_atmosphere_ground.jpg';
//@ts-ignore
import SunTexture from '../textures/earth/2k_sun_ground.jpg';
//@ts-ignore
import PxTx from '../textures/earth/cube/px.jpg';
//@ts-ignore
import NxTx from '../textures/earth/cube/nx.jpg';
//@ts-ignore
import PzTx from '../textures/earth/cube/pz.jpg';
//@ts-ignore
import NzTx from '../textures/earth/cube/nz.jpg';
//@ts-ignore
import PyTx from '../textures/earth/cube/py.jpg';
//@ts-ignore
import NyTx from '../textures/earth/cube/ny.jpg';
const distances = {
    mercury: 10359.65,
    venus: 17062.79,
    earth: 23485.08,
    mars: 35777.08,
    jupiter: 122213.5,
    saturn: 225117.74,
    uranus: 450706.44,
    neptune: 705651.49
};

const meshSize = {
    mercury: 0.383,
    venus: 0.95,
    earth: 1,
    mars: 0.53,
    jupiter: 10.975,
    saturn: 9.14,
    uranus: 3.98,
    neptune: 3.87
}

const cameraDistances = Object.values(distances);
const planetSizes = Object.values(meshSize);

const Earth: React.FC = () => {
    const [selectedMesh, selectMesh] = React.useState(5);
    const [mouseStatus, setMouse] = React.useState({
        dragging: false,
        initialPoint: [0,0]
    });
    React.useEffect(() => {
        
        // const distancesReal = {
        //     mercury: 10359.65,
        //     venus: 17062.79,
        //     earth: 23485.08,
        //     mars: 35777.08,
        //     jupiter: 122213.5,
        //     saturn: 225117.74,
        //     uranus: 450706.44,
        //     neptune: 705651.49
        // };
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            40,
            window.innerWidth / window.innerHeight,
            0.01,
            1000000
        );
        const domref: any = document.getElementById('earth-div');
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        const maxAnisontropy = renderer.getMaxAnisotropy();
        // const controls = new OrbitControls(camera, renderer.domElement);
        // @ts-ignore
        domref && domref.appendChild(renderer.domElement);
        const textureLoader = new THREE.TextureLoader();

        // textureLoader.load(BackgroundTexture, (texture) => {
        //     scene.background = texture;
        // });
        const cubeTexture = new THREE.CubeTextureLoader().load([
            PxTx, NxTx, PyTx, NyTx, PzTx, NzTx
        ]);
        scene.background = cubeTexture;

        const earthGeometry = new THREE.SphereBufferGeometry(1, 64, 64);
        const cloudGeometry = new THREE.SphereBufferGeometry(1.01, 64, 64);
        const earthDayMap = textureLoader.load(EarthTexture);

        earthDayMap.anisotropy = maxAnisontropy;

        const material = new THREE.MeshPhongMaterial({
            map: earthDayMap
            // normalScale: new THREE.Vector2( 0.85, -0.85 )

        });
        // material.shadowSide = true;
        // material.reflectivity = 0.5;
        const sphere = new THREE.Mesh(earthGeometry, material);

        sphere.receiveShadow = true;



        const cloudTexture: any = textureLoader.load(EarthCloudTexture);
        cloudTexture.anisotropy = maxAnisontropy;

        const cloudMaterial = new THREE.MeshPhongMaterial({ 
            alphaMap: cloudTexture, 
            alphaTest: 0,
            transparent: true,
            opacity: 0.9999 });

        const cloudSphere: any = new THREE.Mesh(cloudGeometry, cloudMaterial);
        // cloudSphere.castShadow = true;
        // cloudSphere.receiveShadow = true;
        // sphere.castShadow = true;
        // sphere.receiveShadow = true;
        sphere.position.set(0, 0, distances.earth);
        cloudSphere.position.set(0, 0, distances.earth);
        scene.add(sphere);
        scene.add(cloudSphere);

        //saturn
        const satGeo = new THREE.SphereGeometry(meshSize.saturn, 64, 64);
        const satCloudGeo = new THREE.SphereGeometry(9.17, 64, 64);

        const satLoadedTexture = textureLoader.load(SaturnTexture);
        const satLoadedCloudTexture = textureLoader.load(SaturnCloudsTexture);
        const satCloudMat = new THREE.MeshPhongMaterial({
            alphaMap: satLoadedCloudTexture,
            transparent: true,
            opacity: 0.5,

        });
        const satCloudMesh = new THREE.Mesh(satCloudGeo, satCloudMat);

        const satMat: any = new THREE.MeshPhongMaterial({
            map: satLoadedTexture,
            // emissive: "#222",
            // emissiveIntensity: 0.1,
        });
        //@ts-ignore
        // satMat.map.magFilter = THREE.NearestFilter;
        // satMat.map.warpS = THREE.RepeatWrapping;
        // satMat.map.repeat.x = 1;
        

        const satMesh = new THREE.Mesh(satGeo, satMat);
        satMesh.material.map.warpS = THREE.MirroredRepeatWrapping;
        satMesh.material.map.magFilter = THREE.NearestFilter;
        satMesh.material.map.repeat.x = 1;
        // satMesh.material.
        const satRingGeo = new THREE.RingBufferGeometry(10.14, 22.69, 128);
        const satRingTexture = textureLoader.load(SaturnRingTexture);
        const satRingMat = new THREE.MeshPhongMaterial({
            alphaMap: satRingTexture,
            alphaTest: 0,
            side: THREE.DoubleSide,
            // wireframe: true,
            transparent: true,
            // specular: 0xffffff,
            // emissive: 0xffffff,
            shininess: 120000
        });
        const pos: any = satRingGeo.attributes.position;
        let v3 = new THREE.Vector3();
        for (let i = 0; i < pos.count; i++) {
            v3.fromBufferAttribute(pos, i);
            satRingGeo.attributes.uv.setXY(i, v3.length() < 12 ? 0 : 1, 1);
        }

        const satRingMesh = new THREE.Mesh(satRingGeo, satRingMat);
        // satRingMesh.position.set(0, 0, distances.saturn);
        satRingMesh.rotation.set(Math.PI/2, 0, 0);
        satMesh.rotation.set(0, 0, 0);
        satRingMesh.receiveShadow = true;
        // satRingMesh.castShadow = true;
        satMesh.receiveShadow = true;
        satMesh.castShadow = true;
        // satMesh.position.set(0, 0, distances.saturn);
        // satCloudMesh.position.set(0, 0, distances.saturn);
        const satGroup = new THREE.Group();
        satGroup.position.set(0, 0, distances.saturn);
        satGroup.add(satMesh);
        satGroup.add(satRingMesh);
        scene.add(satGroup);
        // scene.add(satMesh);
        // scene.add(satCloudMesh);
        // scene.add(satRingMesh);

        // JUPITER
        const jupGeo = new THREE.SphereGeometry(meshSize.jupiter, 64, 64);
        const jupTex = textureLoader.load(JupiterTexture);
        const jupMat = new THREE.MeshPhongMaterial({ map: jupTex });
        const jupMesh = new THREE.Mesh(jupGeo, jupMat);

        jupMesh.position.set(0, 0, distances.jupiter);
        scene.add(jupMesh);

        // NEPTUNE
        const nepGeo = new THREE.SphereGeometry(meshSize.neptune, 64, 64);
        const nepTex = textureLoader.load(NeptuneTexture);
        const nepMat = new THREE.MeshPhongMaterial({ map: nepTex });
        const nepMesh = new THREE.Mesh(nepGeo, nepMat);
        nepMesh.position.set(0, 0, distances.neptune);

        scene.add(nepMesh);

        // URANUS

        const uraGeo = new THREE.SphereGeometry(meshSize.uranus, 64, 64);
        const uraTex = textureLoader.load(UranusTexture);
        const uraMat = new THREE.MeshPhongMaterial({ map: uraTex });
        const uraMesh = new THREE.Mesh(uraGeo, uraMat);

        const uraRingGeo = new THREE.RingBufferGeometry(6.57, 8.03, 128);
        const uraSecondRing = new THREE.RingBufferGeometry(10.57, 11.16, 128);
        const uraThirdRing = new THREE.RingBufferGeometry(15.34, 18.01, 128);
        const uraRingMat = new THREE.MeshPhongMaterial({
            alphaMap: satRingTexture,
            alphaTest: 0,
            side: THREE.DoubleSide,
            transparent: true,
            specular: 0xffffff,
            emissive: 0xffffff,
            shininess: 120000,
        });
        const uraSecRingMat = new THREE.MeshPhongMaterial({
            alphaMap: satRingTexture,
            alphaTest: 0,
            side: THREE.DoubleSide,
            transparent: true,
            specular: 0xffffff,
            emissive: 0xffffff,
            shininess: 120000,
        });
        const uraThirdRingMat = new THREE.MeshPhongMaterial({
            alphaMap: satRingTexture,
            alphaTest: 0.2,
            side: THREE.DoubleSide,
            transparent: true,
            emissiveIntensity: 0.1,
            emissive: 'hsl(225, 90%, 40%)',
            shininess: 0,
        });
        const uraPos: any = satRingGeo.attributes.position;
        let uraRingV3 = new THREE.Vector3();
        for (let i = 0; i < uraPos.count; i++) {
            uraRingV3.fromBufferAttribute(uraPos, i);
            uraRingGeo.attributes.uv.setXY(i, uraRingV3.length() < 12 ? 0 : 1, 1);
            uraSecondRing.attributes.uv.setXY(i, uraRingV3.length() < 12 ? 0 : 1, 1);
            uraThirdRing.attributes.uv.setXY(i, uraRingV3.length() < 12 ? 0 : 1, 1);
        }

        const uraRingMesh = new THREE.Mesh(uraRingGeo, uraRingMat);
        const uraSecondMesh = new THREE.Mesh(uraSecondRing, uraSecRingMat);
        const uraThirdMesh = new THREE.Mesh(uraThirdRing, uraThirdRingMat);

        uraRingMesh.position.set(0, 0, distances.uranus);
        uraSecondMesh.position.set(0, 0, distances.uranus);
        uraThirdMesh.position.set(0, 0, distances.uranus);
        uraRingMesh.rotation.set(0, -0.6, 0);
        uraSecondMesh.rotation.set(0, -0.6, 0);
        uraThirdMesh.rotation.set(0, -0.6, 0);

        uraMesh.position.set(0, 0, distances.uranus);


        scene.add(uraRingMesh);
        scene.add(uraSecondMesh);
        scene.add(uraThirdMesh);
        scene.add(uraMesh);

        //MERCURY

        const merGeo = new THREE.SphereGeometry(meshSize.mercury, 64, 64);
        const merTex = textureLoader.load(MercuryTexture);
        const merMat = new THREE.MeshPhongMaterial({ map: merTex });
        const merMesh = new THREE.Mesh(merGeo, merMat);

        merMesh.position.set(0, 0, distances.mercury);
        scene.add(merMesh);

        //VENUS

        const venGeo = new THREE.SphereGeometry(meshSize.venus, 64, 64);
        const venTex = textureLoader.load(VenusTexture);
        const venMat = new THREE.MeshPhongMaterial({ map: venTex });
        const venMesh = new THREE.Mesh(venGeo, venMat);

        const venAtGeo = new THREE.SphereGeometry(0.957, 64, 64);
        const venAtTex = textureLoader.load(VenusAtmosphereTexture);
        const venAtMat = new THREE.MeshPhongMaterial({ alphaMap: venAtTex, transparent: true, alphaTest: 0 });
        const venAtMesh = new THREE.Mesh(venAtGeo, venAtMat);

        venAtMesh.position.set(0, 0, distances.venus);
        venMesh.position.set(0, 0, distances.venus);
        scene.add(venAtMesh);
        scene.add(venMesh);

        //SUN
        const sunGeo = new THREE.SphereGeometry(109.32, 64, 64);
        const sunTex = textureLoader.load(SunTexture);
        const sunMat = new THREE.MeshBasicMaterial({
            map: sunTex,
        })
        const sunMesh = new THREE.Mesh(sunGeo, sunMat);
        sunMesh.position.set(0, 0, 0);
        scene.add(sunMesh);

        //MARS
        const marsGeometry = new THREE.SphereGeometry(meshSize.mars, 64, 64);
        const marsLoadedTexture = textureLoader.load(MarsTexture);
        const marsMaterial = new THREE.MeshPhongMaterial({ map: marsLoadedTexture });
        const marsMesh = new THREE.Mesh(marsGeometry, marsMaterial);

        marsMesh.position.set(0, 0, distances.mars);
        scene.add(marsMesh);



        //MOON

        const moonGeometry = new THREE.SphereBufferGeometry(0.273, 64, 64);

        const moonTexture = textureLoader.load(MoonTexture);
        const moonMaterial = new THREE.MeshPhongMaterial({ map: moonTexture });
        const theMoon = new THREE.Mesh(moonGeometry, moonMaterial);
        theMoon.position.set(4, 0, 0);
        theMoon.castShadow = true;
        theMoon.receiveShadow = true;
        // scene.add(theMoon);

        renderer.shadowMapType = THREE.PCFSoftShadowMap;
        // renderer.shado

        const dirLight = new THREE.PointLight(0xffffff, 1, 0, 2);
        dirLight.castShadow = true;
        dirLight.position.set(0, 0, cameraDistances[selectedMesh] - (planetSizes[selectedMesh] * 10));
        // dirLight.shadowMapHeight = 1024;
        // dirLight.shadowMapWidth = 1024;
        dirLight.shadowCameraFov = 80;
        // dirLight.shadowBias = 0.021;
        
        scene.add(dirLight);

        camera.lookAt(0, 0, cameraDistances[selectedMesh]);
        // controls.target = new Vector3( 0, 0, 0 );
        camera.position.z = cameraDistances[selectedMesh] - (planetSizes[selectedMesh] * 4);
        // const controls = new OrbitControls(camera, renderer.domElement);
        console.log(satMesh.material.map.offset);
        const animate = () => {
            requestAnimationFrame(animate);
            sphere.rotation.y += 0.0005;
            cloudSphere.rotation.y += 0.0007;
            marsMesh.rotation.y += 0.002;
            venMesh.rotation.y -= 0.0001;
            venAtMesh.rotation.y -= 0.005;
            // satMesh.rotation.y += 0.02;
            //@ts-ignore
  

            // satMesh.rotation.x = Math.cos(satMesh.rotation.y) * 0.235619;
            // satRingMesh.rotation.x = 1.57 + Math.sin(satMesh.rotation.y * 2) * 0.235619;
            // satRingMesh.rotation.y = Math.cos(satMesh.rotation.y) * 0.235619;
            // satRingMesh.rotation.set(1.57,1,0);
            // satRingMesh.rotation.y = 0;
            // satGroup.rotation.y += 0.05;
            satMesh.rotation.y += 0.05;
            // satMesh.material.map.offset.x += 0.002;
            // satMesh.material.map.offset.x = -((satGroup.rotation.y * 10)%0.67);
            const satFactor = (satMesh.rotation.y - 4800)/10000;
            const rotationCoordinates = [Math.sin(satFactor) * 0.2, -Math.cos(satFactor) * 0.2];
            [satGroup.rotation.x, satGroup.rotation.z] = rotationCoordinates;
            // [satRingMesh.rotation.x, satRingMesh.rotation.y ] = [(Math.PI/2) + rotationCoordinates[0], rotationCoordinates[1]];
            // satMesh.rotation.z = Math.cos(satFactor) * 0.2;
            // satRingMesh.rotation.x = (Math.PI/2) + Math.cos(satMesh.rotation.y);
            // satRingMesh.rotation.x = (Math.PI/2) + Math.sin(satFactor + 25000) * 0.2;
            // satRingMesh.rotation.y = -(Math.cos(satFactor) * 0.2);
            // satRingMesh.rotation.y += 0.008;
            // uraMesh.rotation.y += 0.02;
            


            merMesh.rotation.y += 0.02;
            nepMesh.rotation.y += 0.02;
            jupMesh.rotation.y += 0.02;
            
            const rotationFactor = 3;
            const moonCalcFactor = theMoon.rotation.y * 5 * (1 / rotationFactor);
            theMoon.position.x = Math.sin(moonCalcFactor) * 3;
            theMoon.position.z = Math.cos(moonCalcFactor) * 3;
            theMoon.position.y = Math.sin(moonCalcFactor) * 0.5;
            theMoon.rotation.y += (0.002 * rotationFactor);
            renderer.render(scene, camera);
        };

        animate();


        const handleMouseEvent = (event: any) => {
            
            // console.log(event.clientX, event.clientY);
            // if (!mouseStatus.dragging) setMouse({
            //     dragging: true,
            //     initialPoint: [event.clientX, event.clientY]
            // });
        }

        const handleMouseOver = (event: any) => {
            console.log(event);
        }

        const handleMouseUp = (event: any) => {
            console.log(event);
            setMouse({
                dragging: false,
                initialPoint: [0,0]
            });
        }
        
        // window.addEventListener('mousedown', handleMouseEvent);
        // window.addEventListener('mouseup', handleMouseEvent);
        
        // domref.addEventListener('mou', handleMouseEvent);

        return () => {
            // domref.removeEventListener();
            // window.removeEventListener('mousedown', handleMouseEvent);
            // window.removeEventListener('mouseup', handleMouseEvent);
        }


    }, [selectedMesh, mouseStatus, setMouse]);

    return <div id='earth-div'>
    </div>
}

export default Earth;
