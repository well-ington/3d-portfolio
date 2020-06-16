import * as React from 'react';
import styled from 'styled-components';
import {Switch, Route, Redirect} from 'react-router';
import Home from './views/Home';
import PlanetDisplay from './views/PlanetDisplay';
import Market from './views/Market';
import { Link } from 'react-router-dom';
import SolarSystem from './views/SolarSystem';
// import SolarFiber from 'views/SolarFiber';

const AppContainer = styled.div`
    font-size: 10px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    >.app__bar {
        /* width: 100vw; */
        background-color: #333;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;

        >a.bar__element {
            text-decoration: none;
            text-transform: capitalize;
            font-size: 1.6em;
            padding: 0.5em;
            /* background-color: red; */
            color: white;            
            /* font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; */
            font-weight: 300;
            
            transition: all 500ms;
            &:hover {
                background-color: hsl(350, 70%, 30%);
            }
        }
    }
`;

const routes = ['/home', '/planet_display', '/market'];
const routeComponents = [<Home/>, <PlanetDisplay/>, <Market/>];

const App: React.FC = () => {
    return <AppContainer>
        <div className='app__bar'>
        {
            routes.map((e: string) => <Link className='bar__element' key={e} to={e}>{(e.substring(1, e.length)).replace(/_/, ' ')}</Link>)
        }
        </div>
       
        <Switch>
            {
                routes.map((name: string, index: number) =><Route path={name} key={name} exact render={() => <>{routeComponents[index]}</>} />)
            }
            <Route path={"/"} render={() => <Redirect to={routes[0]} />} />
        </Switch>
    </AppContainer>
}

export default App;