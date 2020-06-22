import React from 'react';

interface ISatellite {
    type: string;
}

const SatelliteBuilder: React.FC<ISatellite> = (type) => {
    const mesh = React.useRef();
    return <mesh ref={mesh}>

    </mesh>
}

export default SatelliteBuilder;