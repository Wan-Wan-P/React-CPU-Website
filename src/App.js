import React from "react";
import './App.css';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import ListCpu from "./component/ListCpu";
import CpuFormUpdate from "./component/CpuFormUpdate";
import CpuFormCreate from "./component/CpuFormCreate";

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/createCpu">Create Cpu</Link>
                        </li>
                    </ul>
                </nav>

                <switch>
                    <Route path="/updateCpu/:id" exact={true}>
                        <CpuFormUpdate />
                    </Route>
                    <Route path="/createCpu" exact={true}>
                        <CpuFormCreate />
                    </Route>
                    <Route path="/" exact={true}>
                        <ListCpu />
                    </Route>
                </switch>
            </div>
        </Router>
    );
}

export default App;
