import React from "react"
import {message} from "antd";
import connect from "react-redux/es/connect/connect";
import "./Treas.less"

class Treas extends React.Component{
    constructor(props) {
        super(props);

    }

    render(){
        const userInfo = this.props.userInfo.data;
        return(
            <div className="treasure-box-headers">
                <span className="header-top"></span>
                <img onClick={()=>this.props.openInfoModal()} src={userInfo?userInfo.avatar:require("../../layouts/image/head.png")} alt=""/>
                <div className="my-info">
                    <span>{userInfo?userInfo.username:"请先登录"}</span>
                    <span className="my-vip"><img src={userInfo?userInfo.vip === 0?require("../../layouts/image/vip/no.png"):
                        userInfo.vip === 1?require("../../layouts/image/vip/normal.png"):
                            userInfo.vip === 2?require("../../layouts/image/vip/diamond.png"):require("../../layouts/image/vip/crown.png"):""} alt=""/></span>
                    <br/>
                    <span>ID:{userInfo?userInfo.uid:0}</span>
                </div>
                <div className="my-money-item">
                    <span>{userInfo?Number(userInfo.gold) >= 10000?(Number(userInfo.gold)/10000).toFixed(1)+"w":userInfo.gold:0}</span>
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
export default connect(mapStateToProps)(Treas)