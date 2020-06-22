
import React from 'react';

import MovingPointCamera from '../controls/MovingPointCamera';

import MercuryTexture from '../../textures/earth/2k_mercury_ground.jpg';
import VenusTexture from '../../textures/earth/2k_venus_ground.jpg';
import VenusAtmosphereTexture from '../../textures/earth/2k_venus_atmosphere_ground.jpg';
import EarthTexture from '../../textures/earth/2k_earth_daymap_ground.jpg';
import EarthCloudTexture from '../../textures/earth/2k_earth_clouds_ground.jpg';
import MarsTexture from '../../textures/earth/2k_mars_ground.jpg';
import JupiterTexture from '../../textures/earth/2k_jupiter_ground.jpg';
import SaturnTexture from '../../textures/earth/2k_saturn_ground.jpg';
import UranusTexture from '../../textures/earth/2k_uranus_ground.jpg';
import NeptuneTexture from '../../textures/earth/2k_neptune_ground.jpg';

import DustRing from '../../textures/earth/2k_saturn_ring_ground.jpg';

import { 
    TextureLoader, 
    RingBufferGeometry, 
    Vector3, 
    MeshPhongMaterial,
    DoubleSide, 
    CylinderBufferGeometry
    } from 'three';
import { useFrame, useThree } from 'react-three-fiber';

interface IAstroMesh {
    player?: any;
    position?: number[];
    type: string;
    satellite?: boolean;
}

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

const planetSizes = Object.values(meshSize);
const planetNames = Object.keys(meshSize);


const PlanetBuilder: React.FC<IAstroMesh> = ({ type, position, satellite, player }) => {
    const {camera} = useThree();
    const mesh: any = React.useRef();
    const asset: any = React.useRef();
    const grouper: any = React.useRef();
    const sat: any = satellite ? React.useRef() : null;
    const [loaded, doLoad] = React.useState(false);
    let assetTexture: any;
    const texture = React.useMemo(() => {
        let textureReference: any;
        switch (type) {
            case 'mercury':
                textureReference = MercuryTexture;
                break;
            case 'venus':
                textureReference = VenusTexture;
                assetTexture = new TextureLoader().load(VenusAtmosphereTexture);
                break;
            case 'earth':
                textureReference = EarthTexture;
                assetTexture = new TextureLoader().load(EarthCloudTexture);
                break;
            case 'mars':
                textureReference = MarsTexture;
                break;
            case 'jupiter':
                textureReference = JupiterTexture;
                break;
            case 'saturn':
                textureReference = SaturnTexture;
                assetTexture = new TextureLoader().load(DustRing);
                break;
            case 'uranus':
                textureReference = UranusTexture;
                break;
            case 'neptune':
                textureReference = NeptuneTexture;
                break;
            default:
                break;
        }

        return new TextureLoader().load(textureReference);
    }, [
        MercuryTexture,
        VenusTexture,
        VenusAtmosphereTexture,
        EarthTexture,
        EarthCloudTexture,
        MarsTexture,
        SaturnTexture,
        JupiterTexture,
        UranusTexture,
        NeptuneTexture,
        EarthCloudTexture,
        DustRing,
        assetTexture,
        type
    ]);
    const assets = React.useMemo(() => {
        switch (type) {
            case 'venus':
                return <mesh ref={asset}>
                    <sphereBufferGeometry attach='geometry' args={[1.03, 64, 64]} />
                    <meshPhongMaterial transparent attach='material' alphaMap={assetTexture} onUpdate={self => assetTexture && (self.needsUpdate = true)}>
                    </meshPhongMaterial>
                </mesh>;
            case 'earth':
                return <mesh ref={asset}>
                    <sphereBufferGeometry attach='geometry' args={[1.01, 64, 64]} />
                    <meshPhongMaterial transparent attach='material' alphaMap={assetTexture} onUpdate={self => assetTexture && (self.needsUpdate = true)}>
                    </meshPhongMaterial>
                </mesh>;
            case 'saturn':
                const geo = new RingBufferGeometry(1.12, 2.37, 128);
                const pos: any = geo.attributes.position;
                let v3 = new Vector3();
                
                for (let i = 0; i < pos.count; i++) {
                    v3.fromBufferAttribute(pos, i);
                    geo.attributes.uv.setXY(i, v3.length() < 1.5 ? 0 : 1, 1);
                }
         

                return <mesh 
                rotation={[Math.PI / 2, 0, 0]} 
                ref={asset} 
                geometry={geo} 
                receiveShadow
                // castShadow
                >

                    <meshPhongMaterial attach='material' alphaMap={assetTexture} transparent alphaTest={0} side={DoubleSide} emissive={0xfff2bd} emissiveIntensity={0.2}/>
                </mesh>;
            default:
                return <></>;
        }
    }, [type]);

    const satAsset = satellite ? React.useMemo(() => {
        switch (type) {
            case 'earth':
                // const satGeometry = new CylinderBufferGeometry(0.05, 0.05, 0.2, 16, 16, true);
                // satGeometry.openEnded = true;
                // satGeometry.
                // const satMaterial = new MeshPhongMaterial({color: 'limegreen'});
                // satMaterial.side = DoubleSide;
                // satMaterial.openEnded = true;
                // const 
                return <group ref={sat}>
                    {/* <mesh>
                        <sphereGeometry args={[0.05, 64, 64]} attach="geometry" />
                        <meshPhongMaterial color={'green'} attach="material" />
                    </mesh> */}
                    <mesh>
                        <cylinderBufferGeometry args={[0.05, 0.05, 0.2, 16, 16, true]} attach="geometry"/>
                        <meshPhongMaterial color={'limegreen'} side={DoubleSide} attach="material" />
                    </mesh>
                </group>
            case 'mars':
                return <group ref={sat}>
                <mesh>
                    <sphereGeometry args={[0.05, 64, 64]} attach="geometry" />
                    <meshPhongMaterial color={'green'} attach="material" />
                </mesh>
            </group>
            default:
                return null;
        }
    }, [type, sat]) : null;
    
    useFrame(() => {
        if(!loaded) grouper.current.position.set(...position);
        switch (type) {
            case 'venus':
                mesh.current.rotation.y -= 0.001;
                asset.current.rotation.y -= 0.0019;
                break;
            case 'earth':
                mesh.current.rotation.y += 0.001;
                asset.current.rotation.y += 0.00075;                
                if (satellite) {
                    sat.current.position.z = Math.sin(mesh.current.rotation.y * 5) * 0.15;
                    sat.current.position.y = Math.cos(mesh.current.rotation.y * 5) * 1.15;
                    sat.current.position.x = Math.sin(mesh.current.rotation.y * 5) * 1.15;
                    if(sat.current.rotation.z > -1) sat.current.rotation.z -= Math.PI/2;
                    sat.current.rotation.z -= 0.005;
                    // camera.lookAt(new Vector3(sat.current.position.x + player.target[0], sat.current.position.y + player.target[1], sat.current.position.z + player.target[2]));
                    // // camera.rotation.x += 0.01;
                    
                    // camera.position.set((sat.current.position.x * 1.15) + player.coordinates[0], (sat.current.position.y * 1.15), (sat.current.position.z * 1.15) + player.coordinates[2]);
                }
                break;
            case 'mars':
                mesh.current.rotation.y += 0.0001;
                if (satellite) {
                    sat.current.position.z = Math.sin(mesh.current.rotation.y * 10) * 0.15;
                    sat.current.position.y = Math.cos(mesh.current.rotation.y * 20) * 1.15;
                    sat.current.position.x = Math.sin(mesh.current.rotation.y * 20) * 1.15;
                    // camera.lookAt(new Vector3(sat.current.position.x + player.target[0], sat.current.position.y + player.target[1], sat.current.position.z + player.target[2]));
                    // // camera.rotation.x += 0.01;
                    
                    // camera.position.set((sat.current.position.x * 1.15) + player.coordinates[0], (sat.current.position.y * 1.15), (sat.current.position.z * 1.15) + player.coordinates[2]);
                }
                break;
            case 'jupiter':
                mesh.current.rotation.y += 0.001;
                grouper.current.rotation.x = 0;
                grouper.current.rotation.z = 0;
                break;
            case 'saturn':
                mesh.current.rotation.y += 0.001;
                grouper.current.rotation.x = 0.07;
                grouper.current.rotation.z = 0.23;
                asset.current.rotation.z = 0.1;
                break;
            default:
                mesh.current.rotation.y += 0.001;
                break;
        }
        if(!loaded) doLoad(true);

        if(satellite) {
            MovingPointCamera(camera, sat.current.position, player)
        }
    });

    return <group ref={grouper}>
        <mesh
            ref={mesh}
            castShadow
            receiveShadow
        >
            <sphereBufferGeometry attach='geometry' args={[ 1, 64, 64]} />
            <meshLambertMaterial attach='material'  map={texture} onUpdate={self => texture && (self.needsUpdate = true)}>
            </meshLambertMaterial>
        </mesh>
        {
            assets
        }

        {
            satellite && satAsset
        }
    </group>
}

export default PlanetBuilder;