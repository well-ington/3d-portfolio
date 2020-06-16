import * as React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
    &>.title__container {
        &>h3 {
            /* color: red; */
            text-align: center;
            font-size: 3em;
        }
    }

    &>.description__container {
        font-size: 2em;
    }

`;

const Home: React.FC = () => {
    return <StyledContainer>
        <div className="title__container">
            <h4>
                Hi, I'm Wellington
            </h4>
            <h3 className="title__text">
                Web Developer
            </h3>
        </div>
        <div className="description__container">
            <p className="description__text">
                I design some things
            </p>
        </div>
    </StyledContainer>
}

export default Home;