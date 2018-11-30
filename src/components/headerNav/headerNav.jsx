import {Icon} from "antd";
import React from "react";
import history from "~/history";
import { Carousel, Button } from "antd"
import "./headerNav.less"
import $ from "jquery"
import connect from "react-redux/es/connect/connect";
import {fetchPostsGetUser} from '~/action/getUserInfo';
import Api from '~/until/api';

// let num = [1];
// let num1 = 1;
class HeaderNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            // num:["玩家阿狸大大获得百胜成就"],
            // num1:"玩家阿狸大大获得百胜成就",
        }
    }

    goBackHistory(e){
        let hash = window.location.hash;
        hash === "#/Dashboard/index"?window.location.href = "#/Dashboard/index":hash.indexOf("NewHome") !== -1?window.location.href = "#/Dashboard/index":window.history.back();
    }

    // componentWillMount(){
    //     if(this.props.userInfo.code !== "0000"&&window.location.hash.indexOf("#/Dashboard/index") === -1) {
    //         this.props.dispatch(fetchPostsGetUser()).then((res) => {
    //             window.location.reload()
    //         }).catch((err) => {
    //             window.location.href = "#/Dashboard/index"
    //         })
    //     }else {
    //         if(window.location.hash.indexOf("#/Dashboard/index") === -1){
    //             Api.getUserInfo().then((res) => {
    //
    //             }).catch((err) => {
    //
    //                 window.location.href = "#/Dashboard/index"
    //             })
    //         }
    //     }
    // }

    render() {
        return (
            <div className="top-header">
                <div className="top-name">
                    {
                        window.location.hash.indexOf("#/Dashboard/index") >= 0?null:<span onClick={(e)=>this.goBackHistory(e)}></span>
                    }
                    <i>
                        {this.props.name}
                    </i>
                </div>
                {/*<button style={{marginTop:30}} onClick={()=>this.Carousel()}>123</button>*/}
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {userInfo} = state;
    return {userInfo}
};
export default connect(mapStateToProps)(HeaderNav)