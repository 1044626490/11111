import React from "react"
import "./ActivityRoom.less"
import HeaderNav from "../../components/headerNav/headerNav";
import {Avatar, Button, Icon, message, Modal, Popconfirm} from "antd";
import OtherUserInfo from "../GameHome/component/OtherUserInfo";
import InviteFriend from "../GameHome/component/InviteFriend";
import Api from '~/until/api';
import $ from "jquery";
import connect from "react-redux/es/connect/connect";

let hiddenProperty = 'hidden' in document ? 'hidden' :
    'webkitHidden' in document ? 'webkitHidden' :
        'mozHidden' in document ? 'mozHidden' :
            null;
let visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
let onVisibilityChange = function(){
    if (!document[hiddenProperty]) {

    }else{
        window.location.href = "#/Dashboard/ChallengeMatch"
    }
};
document.addEventListener(visibilityChangeEvent, onVisibilityChange);
let setI2;
let homeId = null;
let tenSeconds = "0",
    millisecond = "0";
let timestamp1;
class ActivityRoom extends React.Component{
    constructor(props) {
        super(props);
        // this.ws = new WebSocket("ws://api.times168.net:8282");
        this.ws = new WebSocket("ws://47.99.198.85:8282");
        this.setI = null;
        this.setI1 = null;
        this.setI2 = null;
        this.setI3 = null;
        this.state = {
            isAddAdmission:true,
            isAddBet:false,
            userInfo:this.props.userInfo.data,
            homeId:null,
            userData:[],
            watchUserData:[],
            isHomeowner:false,
            isStartGame:false,
            isReadyGame:false,
            backTime:3,
            isStartTime:false,
            isOpenPlayer:false,
            playerInfo:[],
            level:"活动场",
            isOpenMask:false,
            otherPlayer:[],
            room_order:null,
            gameResult:[],
            userResult:[],
            isGameOver:false,
            NOme:0,
            areYouReady:[],
            amIReady:false,
            isAllReady:false,
            isInviteFriend:false,
            userType:"1",
            homeownerId:0,
            myGold:0,
            music:false,
            soundEffect:false,
            watch:false,
            shield:false,
            isInviteStranger:true,
            isOverGame:false,
            isLetGo:false,
            isG:false
        }
    }

    componentWillMount(){
        Api.getTime().then(res => {
            timestamp1 = res.data*1000;
        }).catch(err => {
            message.warning("网络延迟，获取时间失败");
            return false
        });
        let myDate = new Date();
        let day = myDate.getDate(); //获取当前日(1-31)
        let today = new Date(new Date().toLocaleDateString()).getTime();
        let next = 30;
        let month = myDate.getMonth()+1;
        let year = myDate.getFullYear();
        if(month === 2){
            if((year%4===0&&year%100!==0)||year%400===0){
                next = 28
            }else {
                next = 29
            }
        }
        if(day === 15&&day === next){
            if(!timestamp1 <= today + 75600000){
                window.location.href = "#/Dashboard/ChallengeMatch"
            }
        }else if(day === 16&&day === 1){
            if(!timestamp1 >= today + 72000000){
                window.location.href = "#/Dashboard/ChallengeMatch"
            }
        }
        this.getWebSocket();
        this.setI3 = setInterval(()=>{
            let data = JSON.stringify({"type":"ping"});
            this.ws.send(data)
        },9000)
    }

    //点击开始游戏按钮
    gameStart(){
        this.setState({
            isOpenMask:false
        })
    }

    //连接websocket
    getWebSocket = () => {
        let NewHome = "#/Dashboard/NewHome/";
        this.ws.onopen = ()=>{
            let data = JSON.stringify({"type":"join_room","uid":this.props.userInfo.data.uid});//*/*/*/
            this.ws.send(data)
        };
        this.ws.onmessage = (e)=>{
            let data = JSON.parse(e.data);
            let userData = data.data;
            let type = data.type || "";
            switch (type) {
                case "ping":
                    break;
                case 'active':
                    if(userData){
                        if(userData.length){
                            let id = this.state.userInfo.uid;
                            for(let i=0;i<userData.length;i++){
                                if(id === userData[i].uid){
                                    this.setState({
                                        myGold:userData[i].gold,//*/*/*/*/*/*
                                        isHomeowner:userData[i].is_homeowner,
                                        music:userData[i].music,
                                        soundEffect:userData[i].sound_effect,
                                        watch:userData[i].watch,
                                        shield:userData[i].shield
                                    })
                                }
                                if(userData[i].is_homeowner){
                                    this.setState({
                                        homeownerId:userData[i].uid
                                    })
                                }
                            }
                            let arr1 = [];
                            let arr2 = [];
                            for(let i =0;i<userData.length;i++){
                                if(userData[i].user_type.toString() === "1"){
                                    arr1.push(userData[i])
                                }else {
                                    arr2.push(userData[i])
                                }
                            }
                            let length = arr1.length;
                            for(let i = length;i < 6;i++){
                                arr1.push({})
                            }
                            this.setState({
                                userData:arr1,
                                watchUserData:arr2,
                            })
                        }else {
                            let arr = [];
                            arr[0] = userData["0"];
                            arr[0].is_homeowner = userData.is_homeowner;
                            for(let i = 1;i < 6;i++){
                                arr.push({})
                            }
                            this.setState({
                                isHomeowner:true,
                                userData:arr
                            })
                        }
                    }
                    break;
                case 'join_room':
                    break;
                case 'leave':
                    if(userData){
                        if(userData.length){
                            let id = this.state.userInfo.uid;
                            for(let i=0;i<userData.length;i++){
                                if(id === userData[i].uid){
                                    this.setState({
                                        myGold:userData[i].gold,
                                        isHomeowner:userData[i].is_homeowner,
                                    })
                                }
                            }
                            let arr1 = [];
                            let arr2 = [];
                            for(let i =0;i<userData.length;i++){
                                if(userData[i].user_type.toString() === "1"){
                                    arr1.push(userData[i])
                                }else {
                                    arr2.push(userData[i])
                                }
                            }
                            let length = arr1.length;
                            for(let i = length;i < 6;i++){
                                arr1.push({})
                            }
                            this.setState({
                                userData:arr1,
                                watchUserData:arr2,
                            })
                        }else {
                            let arr = [];
                            arr[0] = userData["0"];
                            arr[0].is_homeowner = userData.is_homeowner;
                            for(let i = 1;i < 6;i++){
                                arr.push({})
                            }
                            this.setState({
                                isHomeowner:true,
                                userData:arr
                            })
                        }
                    }
                    break;
                case 'ready':
                    let amIReady;
                    let count = 0;
                    for(let i=0;i< userData.length;i++){
                        if(!userData[i].is_ready&&userData[i].uid !== this.state.homeownerId){
                            count++
                        }
                        if(userData[i].uid === this.state.userInfo.uid){
                            amIReady = userData[i].is_ready
                        }
                    }
                    this.setState({
                        areYouReady:userData,
                        amIReady,
                        isAllReady:!count&&userData.length > 1
                    })
                    break;
                case 'rank_result':
                    let NOme = this.state.NOme;
                    for(let j=0;j<userData.length-1;j++){
                        //两两比较，如果前一个比后一个大，则交换位置。
                        for(let i=0;i<userData.length-1-j;i++){
                            if(Math.abs(userData[i].result/1-1000) > Math.abs(userData[i+1].result/1-1000)){
                                let temp = userData[i];
                                userData[i] = userData[i+1];
                                userData[i+1] = temp;
                            }
                        }
                    }
                    for(let i=0;i<userData.length;i++){
                        if(this.state.userInfo.uid === userData[i].uid){
                            NOme = userData[i].is_win;
                        }
                    }
                    let count1 = 0;
                    this.setI1 = setInterval(()=>{
                        count1++;
                        if(count1 === 30){
                            this.returnHome()
                            clearInterval(this.setI1);
                        }
                    },1000)
                    let id = this.state.userInfo.uid;
                    for(let i=0;i<userData.length;i++){
                        if(id === userData[i].uid){
                            this.setState({
                                myGold:this.state.myGold*1+userData[i].win_gold*1,
                            })
                        }
                    }
                    this.setState({
                        gameResult:userData,
                        isGameOver:true,
                        NOme
                    });
                    break;
                case 'begin_game':
                    let setI = setTimeout(()=>{
                        this.setState({
                            isReadyGame:true,
                            isStartGame:true,
                            isOpenMask:false,
                            isOverGame:false,
                            isGameOver:false,
                            isOpenPlayer:false,
                            backTime:3,
                            room_order:data.room_order,
                            isG:false
                        });
                        clearTimeout(setI)
                    },100);
                    break;
                case 'user_result':
                    this.setState({
                        userResult:userData
                    });
                    break;
                case 'kick':
                    let roomId = this.state.homeId;
                    localStorage.setItem("kick","isOK");
                    window.location.href = "#/Dashboard/ChallengeMatch";
                    break;
                default:
                    break;
            }
        }
    };

    //断开websocket
    componentWillUnmount(){
        tenSeconds = "0";
        millisecond = "0";
        if(this.state.isStartGame&&!this.state.isOverGame){
            let params = {
                result:2000,
                room_id:this.state.homeId,
                uid:this.state.userInfo.uid,
                room_order:this.state.room_order,
            };
            if(this.state.homeId === "1"){
                params.type = "1"
            }
            Api.gameOver(params).then(res => {

            }).catch(err => {

            })
        }
        clearInterval(this.setI);
        clearInterval(this.setI3);
        clearInterval(this.setI1);
        clearInterval(this.setI2);
        this.ws.close()
    }

    //游戏开始
    startGame = () => {
        if(this.state.isG){
            return false
        }
        let userData = [];
        for(let i=0;i<6;i++){
            if(this.state.userData[i].uid){
                userData.push(this.state.userData[i].uid)
            }
        }
        let params = {
            uid:userData.join(","),
            room_id:this.state.homeId,
            type:this.props.match.params.homeId.indexOf("S") >= 0?"1":"2"
        };
        this.setState({
            isG:true
        });
        Api.beginGame(params).then((res) =>{
            this.setState({
                isG:false
            });
        }).catch(err => {
            message.info(err.msg);
            this.setState({
                isG:false
            });
        });
    };

    //3秒倒计时
    backTime = () =>{
        let backTime = 3;
        this.setI = setTimeout(()=>{
            $('.bg-cilcle').animate({
                transform:"rotate(360deg)"
            })
        },2000);
        let setI2 = setInterval(()=>{
            this.setState({
                backTime:--backTime
            });
            if(this.state.backTime <= -1 ){
                this.setState({
                    isOpenPlayer:false
                });
                clearInterval(setI2)
            }
        },1000);
    };

    timeGoOn = () =>{
        let milliseconds = Number(millisecond);
        let tenSecond = Number(tenSeconds);
        this.setState({
            isStartTime:true
        });
        this.setI2 = setInterval(()=>{
            milliseconds++;
            if(milliseconds === 100){
                milliseconds = 0
            }
            if(milliseconds === 0){
                tenSecond++
            }
            if(milliseconds < 10){
                millisecond = "0".concat(milliseconds)
            }else {
                millisecond = milliseconds.toString();
            }
            if(tenSecond < 10){
                tenSeconds = "0".concat(tenSecond)
            }else {
                tenSeconds = tenSecond.toString();
            }
            this.se.innerText = tenSeconds;
            this.mi.innerText = millisecond;
            if(tenSecond >= 5){
                $(".stop-games").css({
                    display: "inline-block"
                })
            }
            if(tenSecond === 20){
                this.gameOver();
                millisecond = "0";
                tenSeconds = "0";
                clearInterval(this.setI2)
            }
        },10)
    };

    //打开其他玩家信息
    openPlayerInfo = (isOpen,uid) => {
        if(isOpen){
            Api.otherUserInfo({uid}).then((res) => {
                this.setState({
                    otherPlayer:res.data,
                    isOpenPlayer:isOpen
                })
            });
        }else {
            this.setState({
                otherPlayer:[],
                isOpenPlayer:isOpen
            })
        }
    };

    //游戏结束回到房间
    returnHome = () =>{
        clearInterval(this.setI);
        let homeId = this.props.match.params.homeId;
        let level = homeId === "1"?"初级":homeId === "2"?"中级":"高级";
        clearInterval(this.setI1);
        clearInterval(this.setI2);
        tenSeconds = "0";
        millisecond = "0";
        this.setState({
            isAddAdmission:true,
            isAddBet:false,
            userInfo:this.props.userInfo.data,
            homeId:homeId,
            isStartGame:false,
            isReadyGame:false,
            backTime:3,
            isStartTime:false,
            isOpenPlayer:false,
            playerInfo:[],
            level:level,
            isOpenMask:false,
            otherPlayer:[],
            room_order:null,
            gameResult:[],
            userResult:[],
            isGameOver:false,
            NOme:0,
            amIReady:false,
            isOverGame:true,
            isG:false
        });
        if(this.state.isHomeowner){
            Api.userReadyHome({room_id:this.state.homeId}).then(res => {
            })
        }else {
            this.areYouReady()
        }
    };

    //游戏结束
    gameOver(){
        clearInterval(this.setI2);
        let resultTen = tenSeconds;
        let resultMil = millisecond;
        let result = Number(resultTen)*100+Number(resultMil);
        let params = {
            result:result.toString(),
            room_id:this.state.homeId,
            uid:this.state.userInfo.uid,
            room_order:this.state.room_order,
        };
        if(this.state.homeId === "1"){
            params.type = "1"
        }
        this.setState({
            isOverGame:true
        });
        Api.gameOver(params).then(res => {
        }).catch(err => {
        })
    }

    //准备
    areYouReady = () => {
        Api.areYouReady({uid:this.state.userInfo.uid,room_id:this.state.homeId}).then(res => {
        }).catch(err => {
            message.info(err.msg);
        })
    };

    inviteFriend = (isOpen) =>{
        this.setState({
            isInviteFriend:isOpen
        })
    };

    inviteStranger = () => {
        Api.stranger({room_id:this.state.homeId}).then(res => {
            message.success(res.msg)
            localStorage.setItem("backTime","0");
            this.setState({
                isInviteStranger:false
            })
            let setI = setInterval(()=>{
                let count = localStorage.getItem("backTime")/1
                count++;
                if(count === 30){
                    localStorage.removeItem("backTime")
                    this.setState({
                        isInviteStranger:true
                    })
                    clearInterval(setI)
                }else {
                    localStorage.setItem("backTime",count.toString())
                }
            },1000)
        }).catch(err =>{})
    }
    render(){
        if(!this.state.isStartTime&&this.state.isStartGame&&
            this.state.backTime <= -1&&millisecond === "0"&&tenSeconds === "0"){
            this.timeGoOn()
        }
        return(
            <div className="game-home-wrap">
                <HeaderNav name={"["+this.state.homeId+"]"}/>
                {
                    this.state.music&&!this.state.isStartGame?<audio className="game-audio game-audio1"
                                                                     src={require("../../layouts/video/bg2.mp3")}
                                                                     autoPlay={true}
                                                                     loop={true} style={{width: 0}}>
                        {/*{*/}
                        {/*this.state.music&&!this.state.isStartGame?()=>{*/}
                        {/*if (ua.match(/MicroMessenger/i) == "micromessenger") {*/}
                        {/*document.addEventListener("WeixinJSBridgeReady", function () {*/}
                        {/*document.querySelector('game-audio1').play();*/}
                        {/*// document.getElementById('video').play();*/}
                        {/*}, false);*/}
                        {/*}*/}
                        {/*}:null*/}
                        {/*}*/}
                    </audio>:null
                }
                {
                    this.state.soundEffect&&this.state.isStartGame&&this.state.backTime <= -1&&!this.state.isOverGame?
                        <audio className="game-audio game-audio2"
                               src={require("../../layouts/video/20s.mp3")}
                               autoPlay={true}
                               loop={false} style={{width: 0}}>
                        </audio>:null
                }
                {
                    this.state.soundEffect&&this.state.isStartGame&&this.state.backTime > -1?
                        <audio className="game-audio game-audio3"
                               src={require("../../layouts/video/3s.mp3")}
                               autoPlay={true}
                               loop={false} style={{width: 0}}>
                        </audio>:null
                }
                {
                    this.state.isStartGame?<div className="bg-cilcle"></div>:null
                }
                <div className={"my-sliver-item"}>
                    <span>{this.state.myGold?this.state.myGold:0}</span>
                </div>
                {
                    !this.state.isReadyGame?
                        <div>
                            {
                                this.state.isOpenMask?<div className="mask"></div>:null
                            }
                            <div className="game-home-header">
                                <Avatar icon="user" src={this.props.userInfo.code === "0000"?this.props.userInfo.data.avatar||require("../../layouts/image/head.png"):""} alt=""/>
                                <p>
                                    <span>{this.state.userInfo.username}{this.state.isHomeowner?<span className="is-homeowner">房主</span>:null}</span>
                                </p>
                                {
                                    this.state.userData.length&&this.state.userData[5].uid?null:
                                        this.state.isHomeowner?
                                            <Button onClick={this.state.isInviteStranger?()=>this.inviteStranger():null}
                                                    className={this.state.isInviteStranger?"start-game-yess":"start-game-nos"}>随机邀请</Button>:null
                                }
                            </div>
                            <div className="game-menber">
                        <span className="game-menber-header">
                            <span>
                                {this.state.homeId}
                            </span>
                        </span>
                                <div className="game-menber-content">
                                    <ul>
                                        {
                                            this.state.userData&&this.state.userData.map((item ,index) => {
                                                return <li key={index} className={item.is_homeowner === 1?"home":""}>
                                                    {
                                                        this.state.areYouReady.map((item1, index1)=>{
                                                            return item.is_homeowner !== 1&&item.uid === item1.uid&&item1.is_ready === 1?<span key={index1} className="are-you-ready"><Icon type="check-circle" theme="outlined" /></span>:null
                                                        })
                                                    }
                                                    <Avatar onClick={!item.uid?()=>this.inviteFriend(true):()=>this.openPlayerInfo(true,item.uid)} icon="user" src={item.avatar||require("../../layouts/image/sc.png")} alt=""/>
                                                    {item.is_homeowner === 1?<span className="is-homeowner">房主</span>:null}
                                                    {/*{this.state.isHomeowner&&item.is_homeowner !== 1?<span  className="is-homeowner">踢出</span>:null}*/}
                                                    <p>{item.username&&item.username.length >4?item.username.slice(0,4)+"...":item.username}{item.uid?<span className="my-vip">
                                                        <img src={require(item.vip === 0?"../../layouts/image/vip/no.png":
                                                            item.vip === 1?"../../layouts/image/vip/normal.png":
                                                                item.vip === 2?"../../layouts/image/vip/diamond.png":
                                                                    "../../layouts/image/vip/crown.png")} alt=""/>
                                                    </span>:null}</p>
                                                </li>
                                            })
                                        }
                                    </ul>
                                    <div className="start-game-pop">
                                        {
                                            this.state.isHomeowner?
                                                <Popconfirm overlayClassName={this.state.userData.length&&!
                                                    this.state.userData[1].uid?"dis-none-pop start-game-pop":this.state.isAllReady?"start-game-pop":"dis-none-pop start-game-pop"}
                                                            placement="top" title={"确认开始"}
                                                            onCancel={this.state.userData.length&&!
                                                                this.state.userData[1].uid?true:this.state.isAllReady?()=>this.startGame():true}
                                                            onVisibleChange={()=>this.gameStart()}
                                                            onConfirm={()=>this.gameStart()}
                                                            okText="取消"
                                                            cancelText="确认">
                                                    <Button className={this.state.userData.length&&!
                                                        this.state.userData[1].uid?"start-game-no":this.state.isAllReady?"start-game-yes":"start-game-no"}
                                                            disabled={this.state.userData.length&&!
                                                                this.state.userData[1].uid?true:this.state.isAllReady?false:true}
                                                    >开始游戏</Button>
                                                </Popconfirm>:
                                                <Button key={Math.random()} onClick={()=>this.areYouReady()} className="start-game-yes">
                                                    {this.state.amIReady?"取消准备":"准备"}
                                                </Button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        :<div>
                            <div className="game-start-menber-content">
                                <div className="time-goeson">
                                    <span ref={point => this.point = point} className="point"><span  ref={se => this.se =se} className="se">00</span><span className="p">:</span><span ref={mi => this.mi =mi} className="mi">00</span></span>
                                    <p className="stop-game">
                                        <Button className="stop-games" ref={stop => this.stop = stop} style={{display:"none"}} onClick={()=>this.gameOver()}>停止</Button>
                                    </p>
                                </div>
                                {
                                    this.state.isStartGame&&this.state.backTime === 3?this.backTime():null
                                }
                                {
                                    this.state.isStartGame&&this.state.backTime > 0?<div className="game-back-time">
                                        <img className={"game-back-time"+this.state.backTime} src={require("../../layouts/image/back"+
                                            this.state.backTime+".png")} alt=""/>
                                    </div>:null
                                }
                                <ul className={this.state.isStartGame?"game-start":null}>
                                    {
                                        this.state.userData&&this.state.userData.map((item ,index) => {
                                            // if(item.is_homeowner === 1){
                                            return <li key={index} className={item.is_homeowner === 1?"home":""}>
                                                {
                                                    this.state.userResult.map((item1, index1)=>{
                                                        return Number(item1.uid) === item.uid?
                                                            <i key={index1} className="user-mask">
                                                                {item1.result.slice(0,-2)}:{item1.result.slice(-2,item1.result.length)}
                                                            </i>:null
                                                    })
                                                }
                                                <Avatar onClick={item.uid?()=>this.openPlayerInfo(true,item.uid):null}
                                                        icon="user" src={item.avatar||require("../../layouts/image/sc.png")} alt=""/>
                                                {
                                                    item.is_homeowner === 1?<span className="is-homeowner game-start-homeoener">房主</span>:null
                                                }
                                            </li>
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                }
                {/*<Drawer*/}
                {/*title=""*/}
                {/*maskClosable={false}*/}
                {/*closable={false}*/}
                {/*onClose={this.onClose}*/}
                {/*visible={false}*/}
                {/*className="bottom-pour"*/}
                {/*placement="bottom"*/}
                {/*>*/}
                {/*<p className="up">*/}
                {/*<span></span>*/}
                {/*</p>*/}
                {/*<p className="home-name"><span>{this.state.level}房间</span></p>*/}
                {/*<p className="into-home-price"><img className="into-home-price-icon" src={require("../../layouts/image/homePage_icon.png")}/><span>入场费：</span><span>100金币</span></p>*/}
                {/*<div className="button-operation">*/}
                {/*<Button>进入房间</Button>*/}
                {/*<Button>前往押注</Button>*/}
                {/*</div>*/}
                {/*</Drawer>*/}
                {
                    this.state.isOpenPlayer?<OtherUserInfo info={this.state.otherPlayer}
                                                           myId={this.props.userInfo.data.uid}
                                                           isOpenPlayer={this.state.isOpenPlayer}
                                                           openPlayerInfo={this.openPlayerInfo.bind(this)}
                                                           isHomeowner={this.state.isHomeowner}
                                                           isStartGame={this.state.isStartGame}
                    />:null
                }
                {
                    this.state.isInviteFriend?<InviteFriend homeId={this.state.homeId} isInviteFriend={this.state.isInviteFriend} inviteFriend={()=>this.inviteFriend()}/>:null
                }
                {
                    this.state.isGameOver?<Modal entered={true} visible={this.state.isGameOver}
                                                 wrapClassName={"all-modal game-over"}
                                                 closable={false} destroyOnClose={true}>
                        {
                            this.state.NOme === 1?<div className="twinkle-little-star win">
                                <div className="star1"><span>
                                </span></div>
                                <div className="star2"><span>
                                </span></div>
                                <div className="star3"><span>
                                </span></div>
                                <div className="star4"><span>
                                </span></div>
                                <div className="win-pc">
                                </div>
                            </div>:<div className="lose"></div>
                        }
                        <Icon className="close-modal" onClick={()=>{this.setState({isGameOver:false})}} type="close" theme="outlined" />
                        <div className="player-info">
                            <div className="game-over-header">
                                <Avatar icon="user" src={this.props.userInfo.data.avatar||""}/>
                                <p>
                                    {this.props.userInfo.data.username}
                                </p>
                            </div>
                            <div className="game-info">
                                <table>
                                    <tbody>
                                    {this.state.gameResult.map((item ,index) =>{
                                        return <tr key={index} className={item.is_win?"win-tr":""}>
                                            <td><span>No.{index+1}：</span></td>
                                            <td><div>{item.username},{item.result.slice(0,-2)}.{item.result.slice(-2,item.result.length)}s,钻石:{item.win_gold >= 0&&this.state.homeId !== "1"?"+"+item.win_gold:item.win_gold},积分+{item.this_integral}</div></td>
                                        </tr>
                                    })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="button-operation">
                                <Button onClick={()=>{window.location.href = "#/Dashboard/ChallengeMatch"}}>退出房间</Button>
                                <Button onClick={()=>this.returnHome()}>再来一次</Button>
                            </div>
                        </div>
                    </Modal>:null
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {userInfo} = state;
    return {userInfo}
};
export default connect(mapStateToProps)(ActivityRoom)