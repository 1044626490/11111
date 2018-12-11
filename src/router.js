import {Route, Switch, Router, Redirect} from "react-router-dom";
import React, {Component} from "react";
import history from "./history";
import Loadable from 'react-loadable';
import MyLoadingComponent from '~/components/common/loadComponents';

// const Login = Loadable({
//     loader: () => import('~/container/Login/Login'),
//     loading: MyLoadingComponent
// });
const Dashboard = Loadable({
    loader: () => import('~/container/Dashboard/Dashboard'),
    loading: MyLoadingComponent
});

class Routes extends Component {
    render() {
        let system = {};
        let p = navigator.platform;
        let u = navigator.userAgent;
        system.win = p.indexOf("Win") == 0;
        system.mac = p.indexOf("Mac") == 0;
        system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
        let isPhone = true;
        if (system.win || system.mac || system.xll) {
            //如果是PC转
            if (u.indexOf('Windows Phone') > -1)
            {
                //win手机端
                // window.location.href = "http://www.baidu.com"
            }else {
                isPhone = false
            }
        }
        return (
            <div>
                <Router history={history}>
                    <Switch>
                        {/*<Route exact path="/" component={Dashboard}/>*/}
                        <Route path="/Dashboard" component={Dashboard}/>
                        {/*<Route exact path="/" component={Dashboard}/>*/}
                        {/*<Route path="/Dashboard" component={Dashboard}/>*/}
                        <Redirect to="/Dashboard/index"/>
                    </Switch>
                </Router>
                {/*{*/}
                    {/*isPhone?<Router history={history}>*/}
                        {/*<Switch>*/}
                            {/*/!*<Route exact path="/" component={Dashboard}/>*!/*/}
                            {/*<Route path="/Dashboard" component={Dashboard}/>*/}
                            {/*/!*<Route exact path="/" component={Dashboard}/>*!/*/}
                            {/*/!*<Route path="/Dashboard" component={Dashboard}/>*!/*/}
                            {/*<Redirect to="/Dashboard/index"/>*/}
                        {/*</Switch>*/}
                    {/*</Router>: <img src={require("./layouts/image/my-to.png")} style={{width: "100vw",height: "100vh"}} alt="请在电脑上登录"/>*/}
                {/*}*/}
            </div>
        )
    }
}

export default Routes