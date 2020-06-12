import * as React from 'react';
import styled from 'styled-components';
import {Switch, Route, Redirect} from 'react-router';
import Home from './views/Home';
import Earth from './views/Earth';
import SolarFiber from './views/SolarFiber';
import Market from './views/Market';
import { Link } from 'react-router-dom';
// import SolarFiber from 'views/SolarFiber';

const AppContainer = styled.div`

`;

const routes = ['/home', '/earth', '/market'];
const routeComponents = [<Home/>, <SolarFiber/>, <Market/>];

const App: React.FC = () => {
    return <AppContainer>
        I'm a main stateless component!
        {
            routes.map((e: string) => <Link to={e}>{e.substring(1, e.length)}</Link>)
        }
        <Switch>
            {
                routes.map((name: string, index: number) =><Route path={name} exact render={() => <>{routeComponents[index]}</>} />)
            }
            <Route path={"/"} render={() => <Redirect to={routes[0]} />} />
        </Switch>
    </AppContainer>
}

export default App;