import * as React from 'react';
import styled, {keyframes} from 'styled-components';
import PlanetBackground from '../components/scenes/PlanetBackground';


const StyledContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    &>.planet__container {
        position: absolute;
        left: 50vw;
        transform: translateX(-50%);
        border-radius: 50%;
        /* background-color: #eee; */
        cursor: pointer;
        &>.slice {
            height: 100%;
            border-radius: 50%;
            position: absolute;
            width: 100%;
            transition: 500ms;
            background-color: #eee;
            &::before {
                position: absolute;
                content: '';
                transition: 500ms;
                border-radius: 50%;
                width: 80%;
                height: 80%;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                opacity: 0;
                background-color: black;
            }

            &::after {
                /* position: absolute;
                content: '';
                transition: 500ms;
                border-radius: 50%;
                width: 76%;
                height: 76%;
                z-index: -1;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%); */
                /* opacity: 0; */
                /* background-color: blue; */
            }

            &:hover {
                /* clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
                z-index: 1; */

                &::before {
                    opacity: 1;
                }
            }
        }
        &>.first__planet {
            clip-path: polygon(0 0, 100% 0, 100% 100%);

            &::after {
                background-image: radial-gradient(white 60%, blue 100%);
            }
        }
        &>.second__planet {
            clip-path: polygon(0 0, 100% 100%, 0 100%);
            &::after {
                background-image: radial-gradient(white 60%, red 100%);
            }
        }
    }
    &>.comment {
        height: 50vh;
    }
`;

const Home: React.FC = () => {
    const [renderUnit, setRenderUnit] = React.useState(window.innerWidth > window.innerHeight ? 'h' : 'w');

    React.useEffect(() => {
        const resizeHandler = () => {
            const verif = window.innerWidth > window.innerHeight ? 'h' : 'w';
            if (verif !== renderUnit) setRenderUnit(verif);
        }
        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('resize', resizeHandler);
        }
    },[renderUnit, setRenderUnit])

    return <StyledContainer>
        <div className="planet__container" style={{
            height: `100v${renderUnit}`, width: `100v${renderUnit}`
        }}>
            <div className='slice first__planet'>
                <PlanetBackground planet='earth' preset={0} />            
            </div>
            <div className='slice second__planet'>
                <PlanetBackground planet='mars' preset={0} />
            </div>
        </div>    
        {/* <div className='main__topleft'>
                <h4>Hello there! I'm</h4>
                <h3>Wellington</h3>
                <h4 className='sub'>And I'm a creator</h4>
        </div> */}
        <div className="comment">
            ok there
        </div>
    </StyledContainer>
}

export default Home;