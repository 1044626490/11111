import React from 'react';
import {Input, Icon, Modal, Avatar, Progress, Badge, message, Button, Upload} from "antd";
import connect from "react-redux/es/connect/connect";
import BottomMenu from "../../components/bottomMenu/bottonMenu"
import HeaderNav from "../../components/headerNav/headerNav";
import "./PersonalInformation.less"
import {fetchPostsGetUser} from '~/action/getUserInfo';
import MyInfoModal from "./component/MyInfoModal";
import $ from "jquery"

class PersonalInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isResetName: false,
            myInfo: this.props.userInfo.data,
            isOpenModel:false,
            isResetMyInfo:false,

        }
    }

    componentDidMount(){
        this.getUserInfo()
    }

    getUserInfo = () =>{
        this.props.dispatch(fetchPostsGetUser()).then((res) => {
            let rate = 0;
            if(res.data.total_office !== 0){
                rate = Math.round(res.data.victory/res.data.total_office);
            }
            this.setState({
                myInfo:res.data,
                isOpenModel:false
            })
        }).catch((err) => {
            message.error(err.msg)
        })
    };

    openModal = (isOpen) => {
        this.setState({
            isOpenModel:isOpen
        })
    };

    componentDidUpdate(){
        if(this.state.myInfo&&this.state.myInfo.total_friends_request < 10){
            $(".ant-scroll-number-only").css({
                marginLeft: 0
            })
        }else {
            $(".ant-scroll-number-only:eq(0)").css({
                marginLeft: "-1.75vw"
            })
            $(".ant-scroll-number-only:eq(1)").css({
                marginLeft: 0
            })
        }
    }

    render(){
        const info = this.state.myInfo;
        return(
            <div className="my-info-container">
                {/*<HeaderNav name="挑战10秒"/>*/}
                <div className="my-info-wrap">
                    <div className="header-pic">
                            <div className="top-header">
                                <Avatar size={64} icon="user" src={info?info.avatar:require("../../layouts/image/head.png")} />
                                <div className="name-class">
                                    <p><span>账号：</span><span>
                                        <span className="my-name">{info?info.username:""}</span><span>({info?info.uid:""})</span>
                                        <span className="my-vip"><img onClick={()=>{window.location.href = "#/Dashboard/Shopping/2"}} src={info?info.vip === 0?
                                            require("../../layouts/image/vip/no.png"):
                                            info.vip === 1?require("../../layouts/image/vip/normal.png"):
                                                info.vip === 2?require("../../layouts/image/vip/diamond.png"):
                                                    require("../../layouts/image/vip/crown.png"):""} alt=""/>
                                        </span>&nbsp;&nbsp;
                                        <Icon type="edit" theme="outlined" onClick={()=>{this.setState({isResetMyInfo:true})}}/>
                                    </span>
                                    </p>
                                    <div className="my-level"><span className="class-rank">签名：</span>
                                        <span>
                                            {info?info.signature:""}
                                        </span>
                                        {/*<Progress successPercent={30} />&nbsp;&nbsp;&nbsp;lv{info?info.level:1}*/}
                                        </div>
                                </div>
                            </div>
                            <div className="bottom-header">
                                <ul className="bottom-header-list">
                                    <li>
                                        <p>{info?info.gold:0}</p>
                                        <span>金币</span>
                                    </li>
                                    <li>
                                        <p>{info?info.integral:0}</p>
                                        <span>积分</span>
                                    </li>
                                    <li onClick={()=>{window.location.href = "#/Dashboard/MyFriend/1"}}>
                                        <div>
                                            <Badge count={info?info.total_friends_request:0} dot={info?info.total_friends_request>99:false} overflowCount={99}>
                                                {info?info.total_friends:0}
                                            </Badge>
                                        </div>
                                        <span>好友</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    <div className="my-info-operation">
                        <div className="operation-list">
                            <ul>
                                <li onClick={()=>this.openModal(true)}>
                                    <p>个人信息</p><Icon type="right" theme="outlined" />
                                </li>
                                <li onClick={()=>{window.location.href = "#/Dashboard/Shopping/2"}}>
                                    {/*<p>意见或建议（敬请期待）</p><Icon type="right" theme="outlined" />*/}
                                    <p>我的会员</p><Icon type="right" theme="outlined" />
                                </li>
                                {/*<li onClick={()=>{window.location.href = "#/Dashboard/MyMedal"}}>*/}
                                    {/*<p>我的勋章</p><Icon type="right" theme="outlined" />*/}
                                {/*</li>*/}
                                <li onClick={()=>{window.location.href = "#/Dashboard/MyFriend/3"}}>
                                    <p>邀请好友</p><Icon type="right" theme="outlined" />
                                </li>
                                <li onClick={()=>{window.location.href = "https://fir.im/7xy6"}}>
                                    {/*<p>意见或建议（敬请期待）</p><Icon type="right" theme="outlined" />*/}
                                    <p>我要下载</p><Icon type="right" theme="outlined" />
                                </li>
                            </ul>
                        </div>
                        {/*<div onClick={()=>{window.location.href = "#/Dashboard/Setting"}} className="setting-operation">*/}
                            {/*<p>设置</p><Icon type="right" theme="outlined" />*/}
                        {/*</div>*/}
                    </div>
                </div>
                <BottomMenu />
                {
                    this.state.isResetMyInfo||this.state.isOpenModel?<MyInfoModal info={info} isResetMyInfo={this.state.isResetMyInfo} openModal={()=>this.openModal()}
                    changeHeader={()=>this.changeHeader()} isOpenModel={this.state.isOpenModel}
                    getUserInfo={()=>{
                    this.getUserInfo();
                    this.setState({
                    isResetMyInfo:false
                })
                }
                    }
                    />:null
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {loginReducer,userInfo} = state;
    return {loginReducer,userInfo}
};
export default connect(mapStateToProps)(PersonalInformation)