import React from 'react';
import connect from "react-redux/es/connect/connect";
import HeaderNav from "../../components/headerNav/headerNav";
import BottomMenu from "../../components/bottomMenu/bottonMenu";
import {Button, Modal, message, Icon, Row} from "antd"
import {fetchPostsGetUser} from '~/action/getUserInfo';
import Api from '~/until/api';
import "./NewHome.less"

let isButton = true;
class NewHome extends React.Component {
    constructor(props) {
        super(props);
        this.home = this.props.match.params.id;
        this.checkBox = this.home === "1"?{value:[100,500,1000,2000],txt:["100","500","1k","2k"]}
            :this.home === "2"?{value:[5000,10000,20000,50000],txt:["5k","10k","20k","50k"]}:
                false;
        this.state = {
            header:"",
            level:"",
            userInfo:this.props.userInfo.data,
            isCreateHome:false,
            intoHomePwd:["","","","","",""],
            homePrice:this.checkBox?this.checkBox.value[0]:null,
            isGoingHome:false,
            createHome:false,
            bool: true,
        };
    }

    componentDidMount(){
        let id = this.props.match.params.id;
        let header = id === "0"?"初级房间":id === "1"?"中级房间":id === "2"?"高级房间":"";
        let level = 1+id*1;
        this.setState({
            header,
            level
        });
        if(localStorage.getItem("kick") === "isOK"){
            message.warning("由于您长时间未准备，已被房主移出房间！！！");
            localStorage.removeItem("kick")
        }
        this.getUserInfo()
    }

    //是否创建房间
    createHome = () => {
        this.setState({
            isCreateHome:true
        })
    };

    //打开创建房间弹框
    openModal = (isCreateHome) => {
        this.setState({
            isCreateHome
        })
    }

    getUserInfo(){
        this.props.dispatch(fetchPostsGetUser()).then((res) => {
            this.setState({
                userInfo:res.data
            })
        })
    }

    inputPwd = (index) => {
        let arr = this.state.intoHomePwd;
        arr[index] = "";
        this.setState({
            intoHomePwd:arr,
        })
    };

    //输入创建房间密码
    inputNumber = (button, indexs) => {
        let arr = this.state.intoHomePwd;
        let index = arr.indexOf("");
        index !== -1?arr[index] = button[indexs]:null;
        this.setState({
            intoHomePwd:arr
        })
    };

    //重置输入创建房间密码
    resetInput = () => {
        this.setState({
            intoHomePwd:["","","","","",""]
        })
    };

    //随机进入房间
    radomeHome = (price) =>{
        if(isButton){
            isButton = false;
            // let setT = setTimeout(()=>{
            //     isButton = true;
            //     clearTimeout(setT)
            // },1000)
            if(this.state.createHome){
                let params = {
                    level:this.state.level,
                    homePassword:this.state.intoHomePwd.join(""),
                    room_gold:price
                };
                Api.createRoom(params).then((res) => {
                    isButton = true;
                    message.info(res.msg);
                    window.location.href = "#/Dashboard/GameHome/"+res.data.room_id+"/1";
                }).catch((err) => {
                    isButton = true;
                    message.info(err.msg)
                });
            }else {
                Api.radomeJoinRoom({level:this.state.level,room_gold:price}).then((res)=>{
                    isButton = true;
                    message.success("加入房间成功");
                    window.location.href = "#/Dashboard/GameHome/"+res.data.room_id+"/1";
                }).catch((err) => {
                    isButton = true
                    message.info(err.msg)
                })
            }
        }
    };

    radomeHome1(createHome){
        if(createHome){
            let params = {
                level:this.state.level,
                homePassword:this.state.intoHomePwd.join(""),
                room_gold:100
            };
            Api.createRoom(params).then((res) => {
                isButton = true;
                message.info(res.msg);
                window.location.href = "#/Dashboard/GameHome/"+res.data.room_id+"/1";
            }).catch((err) => {
                isButton = true;
                message.info(err.msg)
            });
        }else {
            Api.radomeJoinRoom({level:this.state.level,room_gold:100}).then((res)=>{
                isButton = true;
                message.success("加入房间成功");
                window.location.href = "#/Dashboard/GameHome/"+res.data.room_id+"/1";
            }).catch((err) => {
                isButton = true
                message.info(err.msg)
            })
        }
    }

    //创建房间
    finHome = () =>{
        let intoHomePwd = this.state.intoHomePwd;
        if(intoHomePwd.indexOf("") === -1 || intoHomePwd.indexOf("") === 0){
            if(this.checkBox){
                this.setState({
                    isGoingHome:true,
                    createHome:true
                });
            }else {
                // this.setState({createHome:true})
                this.radomeHome1(true)
            }
        }else {
            message.warning("请输入完整的6位密码")
            return false
        }
    };

    render(){
        const button = [1,2,3,4,5,6,7,8,9,"重输",0,"确认"];
        const { userInfo } = this.state;
        let type = this.props.match.params.id;
        return (
            <div className="into-home-wrap">
                <HeaderNav name={this.state.header}/>
                <div>
                    <div className="head-wrap">
                        <img src={userInfo?userInfo.avatar:require("../../layouts/image/head.png")} alt=""/>
                        <div className="my-info">
                            <p>{userInfo?userInfo.username:""}<span className="my-vip"><img onClick={()=>{window.location.href = "#/Dashboard/Shopping/2"}} src={userInfo?userInfo.vip === 0?require("../../layouts/image/vip/no.png"):
                                userInfo.vip === 1?require("../../layouts/image/vip/normal.png"):
                                    userInfo.vip === 2?require("../../layouts/image/vip/diamond.png"):require("../../layouts/image/vip/crown.png"):""} alt=""/></span></p>
                            <p>ID:{userInfo?userInfo.uid:0}</p>
                        </div>
                        <div className={type === "0"?"my-silver-items":"my-money-items"}>
                            <span>{userInfo?type === "0"?userInfo.silver:userInfo.gold:0}</span>
                        </div>
                    </div>
                    <div className="go-home-button">
                        <div className="into-home-button">
                            <Button onClick={this.checkBox?()=>{this.setState({isGoingHome:true})}:()=>this.radomeHome1()}><p>随机匹配</p></Button>
                        </div>
                        <div className={"into-home-button into"+this.state.level}>
                            <Button onClick={()=>this.openModal(true)}><p>新建房间</p></Button>
                        </div>
                    </div>
                    <div className="game-rule">
                        <div className="game-rule-header">

                        </div>
                        <ul className="game-rule-item">
                            <li>[ 游戏规则 ]</li>
                            <li>1、金币可通过每日任务、每日签到、对战、充值获得。
                                {/*，破产后也可领取救济金*/}
                            </li>
                            <li>2、游戏3人以下对战，最接近10秒的玩家获胜；</li>
                            <li>3人以上，前三获胜（金币分配：第一名50%， 第二名30%，第三名20%，平局则并列平分该名次、金币）；</li>
                            <li>挑战十秒成功，独赢所有玩家。</li>
                            {/*<li>3.游戏结束后可选择直接退出，或者再来一局。</li>*/}
                            <li>3、房间设有观战模式，房主有权限将玩家T出房间。
                                {/*，对战玩家退出时也可抢座参与游戏*/}
                            </li>
                        </ul>
                    </div>
                </div>
                {/*<Modal entered={true} visible={this.state.isGoingHome} wrapClassName={"check-apply"}*/}
                       {/*closable={false} destroyOnClose={true} onCancel={()=>{this.setState({isGoingHome:false,createHome:false})}}*/}
                       {/*maskClosable={true} zIndex={99999}>*/}
                    {/*{*/}
                        {/*this.checkBox.value.map((item, index) =>{*/}
                            {/*return <i onClick={()=>{this.setState({homePrice:item})}} onDoubleClick={()=>this.radomeHome(item)}*/}
                                      {/*className={this.state.homePrice === item?"check-active":""}>{this.checkBox.txt[index]}</i>*/}
                        {/*})*/}
                    {/*}*/}
                {/*</Modal>*/}
                {
                    this.state.isGoingHome&&this.checkBox?<div onClick={()=>{this.setState({isGoingHome:false})}} className="mask-check-apply">
                    </div>:null
                }
                {
                    this.state.isGoingHome&&this.checkBox?<div className="check-apply">
                        {
                                this.checkBox.value.map((item, index) =>{
                                return <i key={index}
                                className={this.state.homePrice === item?"check-active":""}>
                                    <span onClick={this.state.homePrice === item?
                                        ()=>this.radomeHome(this.state.homePrice):
                                        ()=>{this.setState({homePrice:item})}
                                    }></span>
                                    {this.state.homePrice === item?"确定":this.checkBox.txt[index]}</i>
                            })
                        }
                        {/*<Button onClick={()=>this.radomeHome(this.state.homePrice)}>确定</Button>*/}
                    </div>:null
                }
                {/*<BottomMenu />*/}
                {
                    this.state.isCreateHome?<Modal entered={true} visible={this.state.isCreateHome} wrapClassName={"into-home-modals"}
                    closable={false} destroyOnClose={true}>
                    <div className="into-home">
                    <div className="into-home-header">
                    <p>创建房间
                    <span onClick={()=>this.openModal(false)}>
                    </span>
                    </p>
                    </div>
                    <div className="modal-content">
                    <div className="into-home-password">
                    <span>请设置口令</span>
                    {
                        this.state.intoHomePwd.map((item, index)=>{
                            return <span key={index} className="input-item" onClick={()=>this.inputPwd(index)}>{item}</span>
                        })
                    }
                    </div>
                    <div className="button-group">
                    {
                        button.map((item, index) => {
                            if(item === "重输"){
                                return <button key={index} onClick={()=>this.resetInput()}><img src={require("../../layouts/image/reset.png")} alt=""/></button>
                            }else if (item === "确认"){
                                return <button key={index} disabled={this.state.intoHomePwd.indexOf("") !== -1&&this.state.intoHomePwd.indexOf("") !== 0} onClick={()=>this.finHome()}>
                                    <img src={require("../../layouts/image/check.png")} alt=""/>
                                </button>
                            }
                            return <button key={index} onClick={()=>this.inputNumber(button, index)}>
                                <img src={require("../../layouts/image/"+item+".png")} alt=""/>
                            </button>
                        })
                    }
                    </div>
                    </div>
                    </div>
                    </Modal>:null
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {loginReducer,userInfo} = state;
    return {loginReducer,userInfo}
};
export default connect(mapStateToProps)(NewHome)