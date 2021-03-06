import React from "react"
import {message} from "antd";
import connect from "react-redux/es/connect/connect";
import "./Header.less"
import Api from '~/until/api';

class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            myGold:0
        }
    }

    componentDidMount(){
        Api.userGold().then(res => {
            this.setState({
                myGold:res.gold
            })
        })
    }

    render(){
        const userInfo = this.props.userInfo.data;
        const gold = this.state.myGold
        return(
            <div className="treasure-box-header">
                <span className="header-top"></span>
                <img src={userInfo?userInfo.avatar:require("../../../layouts/image/head.png")} alt=""/>
                <div className="my-info">
                    <span>{userInfo?userInfo.username:"请先登录"}</span>
                    <span className="my-vip"><img src={userInfo?userInfo.vip === 0?require("../../../layouts/image/vip/no.png"):
                        userInfo.vip === 1?require("../../../layouts/image/vip/normal.png"):
                            userInfo.vip === 2?require("../../../layouts/image/vip/diamond.png"):require("../../../layouts/image/vip/crown.png"):""} alt=""/></span>
                    <br/>
                    <span>ID:{userInfo?userInfo.uid:0}</span>
                </div>
                <div className="my-money-item">
                    <span>{userInfo?Number(gold):0}</span>
                    <span className="my-money-item-pay" onClick={()=>{{if(this.props.userInfo&&this.props.userInfo.code === "0000"){
                        window.location.href = "#/Dashboard/Shopping/1"
                    }else {
                        message.info("请先登录")
                        this.setState({
                            isLogin:true
                        })
                    }}}}>{null}</span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {userInfo} = state;
    return {userInfo}
};
export default connect(mapStateToProps)(Header)