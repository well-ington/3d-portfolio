import * as React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
`;

const Home: React.FC = () => {
    return <StyledContainer>
        <div className="title__container">
            <h3 className="title__text">
                Hi there! I'aaaaaa
            </h3>
        </div>
        <div className="description__container">
            <p className="description__text">
                I make web applications using JavaScript frameworks, such as React and Express.
            </p>
        </div>
    </StyledContainer>
}

export default Home;