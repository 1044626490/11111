import React from 'react';
import {Form, Icon, Modal, Tabs, Input, Button, message, Badge} from "antd";
import "./TenSen.less"
import connect from "react-redux/es/connect/connect";
import BottomMenu from "../../../components/bottomMenu/bottonMenu";
import HeaderNav from "../../../components/headerNav/headerNav";
import Api from '~/until/api';
import {fetchPostsIfNeeded} from '~/action/login';
import {fetchPostsGetUser} from '~/action/getUserInfo';
import MyInfoModal from "../../PersonalInformation/component/MyInfoModal";
import Sign from "./../Sign/Sign"
import MyTask from "./../MyTask/MyTask";
import $ from "jquery";

const TextArea = Input;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
class TenSen extends React.Component {
    constructor(props) {
        super(props);
        this.webSocket = new WebSocket("ws://api.times168.net:8282");
        this.setI = null;
        this.setI3 = null;
        this.state = {
            isOenModal:false,
            intoHomePwd:["","","","","",""],
            userInfo:false,
            isHomeNeedPwd:false,
            homeId:"",
            isResetMyInfo:false,
            isOpenModel:false,
            isOpenInfoModel:false,
            isOpenMask:false,
            isOpenSign:false,
            isOpenMyTask:false,
            myInvite:localStorage.getItem("inviteData")?localStorage.getItem("inviteData").split(";"):[],
            userNum:{high: 0,middle: 0,primary: 0},
            num:[],
            num1:{},
            msg:"",
            isSysMsg:false,
            isInvite:false,
            tabsValue:"2",
            isTalking:false,
            isHasTask:false
        };
    }

    componentDidMount(){
        if(window.location.hash.indexOf("#/Dashboard/TenSen") >= 0){
            if(this.props.userInfo.code !== "20009"){
                this.getUserInfo();
            }
        }
        let systemMessage = $(".system-message");
        let talkContainer = $(".talk-container");
        let inviteFriend = $(".invite-friend");
        systemMessage[0]?systemMessage[0].scrollTop = systemMessage[0].scrollHeight:null;
        talkContainer[0]?talkContainer[0].scrollTop = talkContainer[0].scrollHeight:null;
        inviteFriend[0]?inviteFriend[0].scrollTop = inviteFriend[0].scrollHeight:null;
    }

    componentDidUpdate(){
        let system = document.querySelector('.system-message');
        let talk = document.querySelector('.talk-container');
        let invite = document.querySelector('.invite-friend');
        system!== null?system.scrollTop = system.scrollHeight:null;
        talk!== null?talk.scrollTop = talk.scrollHeight:null;
        invite!== null?invite.scrollTop = invite.scrollHeight:null;
    }

    getWebsocket = (res) =>{
        if(window.location.hash.indexOf("#/Dashboard/TenSen") >= 0){
            this.setI3 = setInterval(() => {
                let data = JSON.stringify({"type": "ping"});
                this.webSocket.send(data)
            }, 9000);
            this.webSocket.onmessage = (e)=> {
                let data = JSON.parse(e.data);
                let userData = data.data;
                let type = data.type || "";
                switch (type) {
                    case "bind":
                        // localStorage.setItem("inviteData",this.state.myInvite);
                        break;
                    case 'invite':
                        userData.type = 1;
                        let arr = localStorage.getItem("inviteData");
                        if (arr&&arr.length > 0){
                            if(arr.indexOf(JSON.stringify(userData)) >= 0){
                                return false
                            }
                            if(arr.indexOf(";") > 0){
                                if(arr.split(";").length === 10){
                                    let arr1 = arr.concat(";"+JSON.stringify(userData));
                                    let arr2 = arr1.split(";");
                                    arr = arr2.slice(1,11);
                                    arr1 = arr.join(";");
                                    arr = arr1
                                }else {
                                    let arr1 = arr.concat(";"+JSON.stringify(userData))
                                    arr = arr1
                                }
                            }else {
                                let arr1 = [arr];
                                arr1.push(JSON.stringify(userData));
                                arr = arr1.join(";")
                            }
                        } else {
                            arr = JSON.stringify(userData);
                        }
                        localStorage.setItem("inviteData",arr);
                        if(arr.indexOf(";") < 0){
                            let arr1 = [arr];
                            arr = arr1
                        }else {
                            arr = arr.split(";")
                        }
                        if(this.state.tabsValue !== "3"){
                            this.setState({
                                isInvite:true
                            })
                        }
                        this.setState({
                            myInvite:arr
                        })
                        break;
                    case "sys_hint":
                        if(this.state.tabsValue !== "1"){
                            this.setState({
                                isSysMsg:true
                            })
                        }
                        this.Carousel(userData,"systemMsg");
                        break;
                    case "speak":
                        this.Carousel(userData,"speaking");
                    default:
                        break;
                }
            };
            if(window.location.hash.indexOf("#/Dashboard/TenSen") >= 0) {
                let data = JSON.stringify({
                    "type": "bind",
                    "uid": res.data.uid,
                });
                this.webSocket.send(data);
            }
        }
    };

    getTaskList = () => {
        Api.dailyTaskList().then(res => {
            let arr = res.data.task_list;
            let count = 0;
            for(let i=0;i<arr.length;i++){
                if(arr[i].cha_count >= arr[i].reach){
                    count++
                }
            }
            if(count > 0){
                this.setState({
                    isHasTask:true
                })
            }
        }).catch(err => {
        })
    }

    getUserInfo = () =>{
        this.props.dispatch(fetchPostsGetUser()).then((res) => {
            this.setState({
                userInfo: res.data
            });
            Api.onlineUser().then(res => {
                this.setState({
                    userNum: res.data
                })
            });
            this.setI = setInterval(() => {
                Api.onlineUser().then(res => {
                    this.setState({
                        userNum: res.data
                    })
                })
            }, 60000);
            this.getWebsocket(res);
        }).catch((err) => {

        })
    };

    inputPwd = (index) => {
        let arr = this.state.intoHomePwd;
        arr[index] = "";
        this.setState({
            intoHomePwd:arr,
        })
    };

    openModal = (isOk) => {
        this.setState({
            isOenModal:isOk,
            intoHomePwd:["","","","","",""]
        })
    };

    componentWillUnmount(){
        clearInterval(this.setI);
        clearInterval(this.setI3);
        this.webSocket.close();
    }

    inputNumber = (button, indexs) => {
        let arr = this.state.intoHomePwd;
        let index = arr.indexOf("");
        if(!this.state.isHomeNeedPwd){
            if(!isNaN(button[indexs])){
                if(index > 0){
                    index !== -1?arr[index] = button[indexs]:null;
                    this.setState({
                        intoHomePwd:arr
                    })
                }else if(this.state.intoHomePwd.indexOf("") === 0){
                    message.warning("请先输入房间等级“S”“M”“H”")
                }
            }else {
                if(index === 0){
                    index !== -1?arr[index] = button[indexs]:null;
                    this.setState({
                        intoHomePwd:arr
                    })
                }else {
                    message.warning("后5位只能为数字")
                }
            }
        }else {
            arr[index] = button[indexs];
            this.setState({
                intoHomePwd:arr
            })
        }
    };

    resetInput = () => {
        this.setState({
            intoHomePwd:["","","","","",""]
        })
    };

    intoHome(){
        if(this.state.isHomeNeedPwd){
            Api.confirmRoomPass({room_id:this.state.homeId,homePassword: this.state.intoHomePwd.join("")}).then((res)=>{
                window.location.href = "#/Dashboard/GameHome/"+this.state.homeId+"/1"
            }).catch((err)=>{
                message.info(err.msg)
            })
        }
        Api.joinRoomId({room_id: this.state.intoHomePwd.join("")}).then((res)=>{
            message.info(res.msg);
            if(res.code === "0000"){
                window.location.href = "#/Dashboard/GameHome/"+this.state.intoHomePwd.join("")+"/1"
            }
        }).catch((err)=>{
            message.info(err.msg);
            if(err.code === "30002"){
                message.info(err.msg)
                this.setState({
                    homeId:this.state.intoHomePwd.join(""),
                    intoHomePwd:["","","","","",""],
                    isHomeNeedPwd:true
                })
            }
        })
    }

    //打开个人信息
    openInfoModal = (isOpen) => {
        this.setState({
            isOpenInfoModel:isOpen
        })
    };

    //接受邀请
    inviteFriend(index,item){
        Api.inviteFriendJoin({room_id:item.room_id}).then(res => {
            let arr = this.state.myInvite;
            arr.splice(index,1);
            localStorage.setItem("inviteData",arr.join(";"));
            message.success(res.msg);
            // this.webSocket.close();
            window.location.href = "#/Dashboard/GameHome/"+res.data.room_id+"/1"
        }).catch(err =>{
            let arr = this.state.myInvite;
            let arrs = JSON.parse(arr[index]);
            arrs.type = 0;
            arr[index] = JSON.stringify(arrs);
            this.setState({
                myInvite:arr
            });
            localStorage.setItem("inviteData",arr.join(";"));
            message.info(err.msg)
        })
    }

    //观战
    watchGame(e,level){
        e.stopPropagation();
        e.cancelBubble = true;
        Api.watchGame({room_level:level+1}).then(res =>{
            window.location.href = "#/Dashboard/GameHome/"+res.data.room_id+"/0"
        }).catch(err =>{
            message.info(err.msg)
            return false
        })
    }

    //拒绝邀请
    refuseInvite = (index) => {
        let arr = this.state.myInvite;
        arr.splice(index,1);
        this.setState({
            myInvite:arr
        });
        localStorage.setItem("inviteData",arr.join(";"));
    };

    Carousel(num1,name){
        let num = localStorage.getItem(name)?localStorage.getItem(name).split(";"):[];
        num.push(num1.join("-"));
        if(name === "speaking"){
            if(num.length > 100){
                localStorage.setItem(name,num.slice(1,num.length).join(";"));
                this.setState({
                    num
                });
                return false
            }
        }else {
            if(num.length > 10){
                localStorage.setItem(name,num.slice(1,num.length).join(";"));
                this.setState({
                    num
                })
            }
            return false
        }
        if(name === "speaking"?num.length > 100:num.length > 10){
            localStorage.setItem(name,num.slice(1,num.length).join(";"));
            this.setState({
                num
            })
            return false
        }
        localStorage.setItem(name,num.join(";"));
        this.setState({
            num
        })
    }

    justUser(){
        this.props.dispatch(fetchPostsGetUser()).then((res) => {
            this.setState({
                userInfo: res.data
            });
        }).catch((err) => {

        })
    }

    render(){
        let systemMsg = localStorage.getItem("systemMsg")?localStorage.getItem("systemMsg").split(";"):[];
        let speaking = localStorage.getItem("speaking")?localStorage.getItem("speaking").split(";"):[];
        let arr = [
            ["12.03 18:00","挑战十秒正式公测"],
            ["12.03 18:00","12月3号到12月9号，每晚8:00、8:15、8:30各一场红包雨，进入活动页面查看详情"]
        ];
        let arr1 = [];
        for(let i=0;i<systemMsg.length;i++){
            arr.push(systemMsg[i].split("-"))
        }
        for(let i=0;i<speaking.length;i++){
            arr1.push(speaking[i].split("-"))
        }
        systemMsg = arr;
        speaking = arr1;
        const button = ["S","M","H","1","2","3","4","5","6","7","8","9","重输","0","确认"];
        const userInfo = this.props.userInfo.data;
        const item = ["体验场","普通场","高级场","输入房号"];
        return(
            <div className="tensen-container">
                <HeaderNav name="挑战10秒"/>
                {/*<HeaderNav name="挑战10秒"/>*/}
                {/*{*/}
                {/*this.props.userInfo&&this.props.userInfo.code === "0000"?<div className="carousel-info-wrap">*/}
                {/*{*/}
                {/*this.state.num.map((item, index) => {*/}
                {/*return <p className={index === 0?"carousel-item":""} key={index}>*/}
                {/*<span className="trumpet"></span>*/}
                {/*<span>玩家</span>*/}
                {/*<span style={{color:"rgba(222,204,53,0.7)"}}>{item.username}</span>*/}
                {/*<span>{item.type}{item.name}</span>*/}
                {/*</p>*/}
                {/*})*/}
                {/*}*/}
                {/*</div>:null*/}
                {/*}*/}
                {
                    this.state.isOpenMask?<div className="mask"></div>:null
                }
                {
                    this.state.isOpenSign?<Sign hasSign={this.state.userInfo.is_sign} closeSign={()=>{this.setState({isOpenSign:false})}}
                                                getUserInfo={()=>this.justUser()} isOpenSign={this.state.isOpenSign}/>:null
                }
                {/*<div className="random-invite">*/}
                {/*{*/}
                {/*!this.state.isOpenMask?<Badge dot={this.state.myInvite&&this.state.myInvite.length?true:false}>*/}
                {/*<span onClick={()=>this.setState({isOpenMask:true})} className="invite-hide">*/}
                {/*</span>*/}
                {/*</Badge>:<span onClick={()=>this.setState({isOpenMask:false})} className="invite-close">*/}
                {/*</span>*/}
                {/*}*/}
                {/*</div>*/}
                {/*{*/}
                {/*this.state.isOpenMask?<div className="random-invite-info">*/}
                {/*{*/}
                {/*this.state.myInvite.length?this.state.myInvite.map((item, index) =>{*/}
                {/*return <p key={index}><span className={JSON.parse(item).is_friend?"message friend-message":"message"}>[{JSON.parse(item).room_id}]</span>*/}
                {/*: {JSON.parse(item).is_friend?"好友":"玩家"}“{JSON.parse(item).username}”邀请你入房*/}
                {/*<span onClick={()=>this.inviteFriend(index,JSON.parse(item))} className="message">接受</span>*/}
                {/*<span onClick={()=>this.refuseInvite(index)}>拒绝</span></p>*/}
                {/*}):<p>*/}
                {/*<span>暂无消息...</span>*/}
                {/*</p>*/}
                {/*}*/}
                {/*</div>:null*/}
                {/*}*/}
                <div className="head-wraps">
                    <img onClick={()=>this.openInfoModal(true)} src={userInfo?userInfo.avatar:require("../../../layouts/image/head.png")} alt=""/>
                    <div className="my-info">
                        <span>{userInfo?userInfo.username:""}</span>
                        <span className="my-vip"><img onClick={()=>{window.location.href = "#/Dashboard/Shopping/2"}} src={userInfo?userInfo.vip === 0?require("../../../layouts/image/vip/no.png"):
                            userInfo.vip === 1?require("../../../layouts/image/vip/normal.png"):
                                userInfo.vip === 2?require("../../../layouts/image/vip/diamond.png"):require("../../../layouts/image/vip/crown.png"):""} alt=""/></span>
                        <br/>
                        <span>ID:{userInfo?userInfo.uid:0}</span>
                    </div>
                    <div className="my-money-item">
                        <span>{userInfo?Number(userInfo.gold) >= 10000?(Number(userInfo.gold)/10000).toFixed(1)+"w":userInfo.gold:0}</span>
                        <span className="my-money-item-pay" onClick={()=>{window.location.href = "#/Dashboard/Shopping/1"}}>{null}</span>
                        <span onClick={()=>{window.location.href = "#/Dashboard/RankList"}} className="my-trophy">{null}</span>
                        <span onClick={()=>{this.setState({isOpenMyTask:true})}} className={this.state.isHasTask?"my-trophy my-task has-task":"my-trophy my-task"}>{null}</span>
                        {/*<span className="my-trophy relief-payment">{null}</span>*/}
                        <span onClick={()=>{this.setState({isOpenSign:true})}} className={this.state.userInfo.is_sign?"my-trophy sign-in has-sign":"my-trophy sign-in not-sign"}>{null}</span>
                    </div>
                    <div className="my-sliver-item">
                        <span>{userInfo?Number(userInfo.silver) >= 10000?(Number(userInfo.silver)/10000).toFixed(1)+"w":userInfo.silver:0}</span>
                        <span className="my-money-item-pay" onClick={()=>{window.location.href = "#/Dashboard/Activity"}}>{null}</span>
                    </div>
                </div>
                <div className="index-container-wrap">
                    {
                        item.map((item, index) => {
                            return <div key={index} className="index-content-item"
                                        onClick={item === "输入房号"?()=>this.openModal(true):
                                            ()=>{window.location.href = "#/Dashboard/NewHome/"+index}}>
                                {item !== "输入房号"?<i onClick={(e)=>this.watchGame(e,index)} className="eyes-game">
                                </i>:null}
                                <p className="type-item">{item}</p>
                                <p className={"item item"+index}>{index < 3?"底金：":""}{index === 0?"100银币":index=== 1?"100金币起":index === 2?"5000金币起":""}</p>
                            </div>
                        })
                    }
                </div>
                <div className="message-index-wrap">
                    <Tabs activeKey={this.state.tabsValue} onChange={(value)=>{this.setState({tabsValue:value})}} type="card">
                        <TabPane tab={<span  title="系统消息" onClick={()=>{this.setState({isSysMsg:false})}} className={this.state.isSysMsg&&this.state.tabsValue !== "1"?"has-msg tabs-span":"tabs-span"}>系统消息</span>} key="1">
                            <div ref={system => this.system = system} className="system-message">
                                <ul>
                                    {
                                        systemMsg.length > 0?systemMsg.map((item, index) => {
                                            if(index > 1){
                                                return <li key={index}>
                                                    <span>[{item[3]}]:玩家{item[0]}{item[1]}{item[2]}</span>
                                                </li>
                                            }else {
                                                return <li key={index}>
                                                    <span>[{item[0]}]:{item[1]}</span>
                                                </li>
                                            }
                                        }):<li className="no-message">
                                            <p>暂无消息...</p>
                                        </li>
                                    }
                                </ul>
                            </div>
                        </TabPane>
                        <TabPane tab={<span  title="聊天大厅" onClick={()=>{this.setState({isTalking:false});}} className="tabs-span">聊天大厅</span>} key="2">
                            <div className="you-talk-with-me">
                                <div ref={talk => this.talk = talk} className="talk-container">
                                    <ul>
                                        {/*<li>*/}
                                        {/*<span>[阿狸大大]：啊哈哈或或或</span>*/}
                                        {/*</li>*/}
                                        {
                                            speaking.length > 0?speaking.map((item, index)=>{
                                                return <li key={index}>
                                                    <span>[{item[0]}]:{item[1]}</span>
                                                </li>
                                            }):<li className="no-message">
                                                <p>暂无消息...</p>
                                            </li>
                                        }
                                    </ul>
                                </div>
                                <div className="talk">
                                    <span className="talk-name">{userInfo?userInfo.username:"我"}:</span>
                                    <TextArea style={{width: 70 - (userInfo?userInfo.username.length * 3.25:3.25)+"vw"}} className="textarea-input" value={this.state.msg} onChange={(e)=>{e.target.value.length <= 50?this.setState({msg:e.target.value}):null}} placeholder="我要输入"/>
                                    <Button onClick={()=>{this.state.msg.length?Api.pushRoomSpeak({msg:this.state.msg}).then(res => {this.setState({
                                        isTalking:true, msg:""});$(".textarea-input").val("");}):null}}>发送</Button>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab={<span title="邀请信息" className={this.state.isInvite&&this.state.tabsValue !== "3"?"has-msg tabs-span":"tabs-span"}  onClick={()=>{this.setState({isInvite:false})}}>好友邀请</span>} key="3">
                            <div ref={invite => this.invite = invite} className="invite-friend">
                                <ul className="random-invite-info">
                                    {
                                        this.state.myInvite.length?this.state.myInvite.map((item, index) =>{
                                            return <li key={index}>
                                                <span>
                                                    <span className="invite-invite">[{JSON.parse(item).is_friend?"好友邀请":"随机邀请"}]：</span>
                                                    <span className="invite-info"><span>{JSON.parse(item).is_friend?"好友":"玩家"}“</span>
                                                    <span className="invite-name">{JSON.parse(item).username}</span><span>”邀请你进入{JSON.parse(item).room_id}</span>&nbsp;
                                                        ({JSON.parse(item).room_gold}{JSON.parse(item).room_id.indexOf("S") >= 0?"体验场":"金币场"}) {JSON.parse(item).type?
                                                            <span className="invite">
                                                        <span onClick={()=>this.inviteFriend(index,JSON.parse(item))}>接受</span>
                                                        <span onClick={()=>this.refuseInvite(index)}>拒绝</span>
                                                    </span>:
                                                            <span  className="invite-pass">已过期</span>}
                                                    </span>
                                                </span>
                                                <br style={{float: "left",width :"100%",clear :"both"}}/>
                                            </li>
                                        }):<li className="no-message">
                                            <p>暂无消息...</p>
                                        </li>
                                    }
                                </ul>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
                <BottomMenu />
                <Modal entered={true} visible={this.state.isOenModal} wrapClassName={"into-home-modal"}
                       closable={false} destroyOnClose={true}
                >
                    <div className="into-home">
                        <div className="into-home-header">
                            <p>加入房间
                                <span onClick={()=>this.openModal(false)}>
                                </span>
                            </p>
                        </div>
                        <div className="modal-content">
                            <div className={this.state.isHomeNeedPwd?"into-home-password input-commad":"into-home-password"}>
                                <span>{this.state.isHomeNeedPwd?"请输入口令":"请输入房间号"}</span>
                                {
                                    this.state.intoHomePwd.map((item, index)=>{
                                        return <span key={index} className="input-item" onClick={()=>this.inputPwd(index)}>{item}</span>
                                    })
                                }
                                </div>
                            <div className="button-group">
                                {
                                    button.map((item, index) => {if(item === "重输"){
                                        return <button key={index} onClick={()=>this.resetInput()}><img src={require("../../../layouts/image/reset.png")} alt=""/></button>
                                    }else if (item === "确认"){
                                        return <button key={index} disabled={this.state.intoHomePwd.indexOf("") !== -1} onClick={()=>this.intoHome()}>
                                            <img src={require("../../../layouts/image/check.png")} alt=""/>
                                        </button>
                                    }
                                    if(!this.state.isHomeNeedPwd){
                                        return <button key={index} onClick={()=>this.inputNumber(button, index)}>
                                            <img src={require("../../../layouts/image/"+item+".png")} alt=""/>
                                        </button>
                                    }else {
                                        if(index > 2){
                                            return <button key={index} onClick={()=>this.inputNumber(button, index)}>
                                                <img src={require("../../../layouts/image/"+item+".png")} alt=""/>
                                            </button>
                                        }
                                    }
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </Modal>
                {
                    this.props.userInfo.code === "0000"&&this.state.isOpenInfoModel?<MyInfoModal info={this.props.userInfo.data} isResetMyInfo={this.state.isResetMyInfo} openModal={()=>this.openInfoModal()}
                                                                                                 isOpenModel={this.state.isOpenInfoModel}
                                                                                                 getUserInfo={()=>{
                                                                                                     this.justUser();
                                                                                                     this.setState({
                                                                                                         isResetMyInfo:false
                                                                                                     })
                                                                                                 }}
                    />:null
                }
                {
                    this.state.isOpenMyTask?<MyTask isOpenMyTask={this.state.isOpenMyTask}
                                                    justUser={()=>this.justUser()}
                                                    closeMyTask={()=>{this.setState({isOpenMyTask:false})}}/>:null
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {userInfo} = state;
    return {userInfo}
};
export default connect(mapStateToProps)(TenSen)