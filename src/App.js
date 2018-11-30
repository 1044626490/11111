import React, {Component} from 'react';
import {HashRouter} from 'react-router-dom';
import Routes from './router';
import SpinLoading from '~/components/common/Spin';

class App extends Component {
    render() {
        return (
            <div>
                <SpinLoading/>
                <HashRouter>
                    <Routes/>
                </HashRouter>
            </div>
        );
    }
}

export default App;
