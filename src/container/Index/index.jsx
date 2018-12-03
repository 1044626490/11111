import React from 'react';
import {Form, Icon, Modal, Tabs, Input, Button, message, Badge} from "antd";
import "./index.less"
import connect from "react-redux/es/connect/connect";
import BottomMenu from "../../components/bottomMenu/bottonMenu";
import HeaderNav from "../../components/headerNav/headerNav";
import Api from '~/until/api';
import {fetchPostsIfNeeded} from '~/action/login';
import {fetchPostsGetUser} from '~/action/getUserInfo';
import MyInfoModal from "../PersonalInformation/component/MyInfoModal";
import Sign from "./Sign/Sign"
import MyTask from "./MyTask/MyTask";
import $ from "jquery";

const TextArea = Input;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
// let browser = {
//     versions: function () {
//         let u = navigator.userAgent, app = navigator.appVersion;
//         return {         //移动终端浏览器版本信息
//             trident: u.indexOf('Trident') > -1, //IE内核
//             presto: u.indexOf('Presto') > -1, //opera内核
//             webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
//             gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
//             mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
//             ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
//             android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
//             iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
//             iPad: u.indexOf('iPad') > -1, //是否iPad
//             webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
//         };
//     }(),
//     language: (navigator.browserLanguage || navigator.language).toLowerCase()
// }
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.webSocket = new WebSocket("ws://api.times168.net:8282");
        this.setI = null;
        this.setI3 = null;
        this.state = {
            isOenModal:false,
            intoHomePwd:["","","","","",""],
            // isNeedLogin:false,
            progress:0,
            login:{
                tel:localStorage.getItem("phoneNum")||null,
                password:localStorage.getItem("pwd")||null
            },
            register:{
                tel:null,
                password:null,
                newpassword:null,
                code:null
            },
            loginForm:[
                {
                    key:"tel",
                    name:"tel",
                    required:true,
                    message:"请输入电话号码",
                    placeholder:"电话号码",
                    before:<Icon className="before-icon" type="user" theme="outlined" />,
                    re:/^1[3456789]\d{9}$/,
                    isOk:"",
                },
                {
                    key:"password",
                    name:"password",
                    required:true,
                    message:"请输入用户密码",
                    placeholder:"用户密码(长度不能低于6位)",
                    isOk:"",
                    re:/^.{6,}$/,
                    before:<Icon className="before-icon" type="lock" theme="outlined" />
                }
            ],
            Register:[
                {
                    key:"tel",
                    name:"tel",
                    required:true,
                    message:"请输入电话号码",
                    placeholder:"电话号码",
                    isOk:"",
                    before:<Icon className="before-icon" type="user" theme="outlined" />,
                    re:/^1[3456789]\d{9}$/,
                },
                {
                    key:"password",
                    name:"password",
                    required:true,
                    message:"请输入用户密码",
                    placeholder:"用户密码(长度不能低于6位)",
                    isOk:"",
                    re:/^.{6,}$/,
                    before:<Icon className="before-icon" type="lock" theme="outlined" />
                },
                {
                    key:"newpassword",
                    name:"newpassword",
                    required:true,
                    message:"请确认密码",
                    placeholder:"确认密码",
                    isOk:"",
                    before:<Icon className="before-icon" type="lock" theme="outlined" />
                },
                {
                    key:"code",
                    name:"code",
                    required:true,
                    message:"请输入验证码",
                    placeholder:"验证码",
                    isOk:"",
                    before:<Icon className="before-icon" type="safety-certificate" theme="outlined" />
                }
            ],
            userInfo:false,
            isLogin:false,
            isHomeNeedPwd:false,
            homeId:"",
            isResetMyInfo:false,
            isOpenModel:false,
            isOpenInfoModel:false,
            isOpenMask:false,
            loginLocation:"2",
            isOpenSign:false,
            isOpenMyTask:false,
            myInvite:localStorage.getItem("inviteData")?localStorage.getItem("inviteData").split(";"):[],
            userNum:{high: 0,middle: 0,primary: 0},
            isWxBindPhone:false,
            isForget:false,
            num:[
                // {username:"阿狸大大",type: "获得",name:"百战成就"}
            ],
            num1:{},
            msg:"",
            isSysMsg:false,
            isInvite:false,
            tabsValue:"2",
            isTalking:false,
            isHasTask:false
            // talkMsg:["123123","少时诵诗书所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所"]
            // inputIndex:0,
        };
    }

    componentDidMount(){
        if(window.location.hash.indexOf("#/Dashboard/index") >= 0){
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
                    // let smt = {
                    //     username:userData[0],
                    //     type: userData[1],
                    //     name:userData[2]
                    // };
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
        if(window.location.hash.indexOf("#/Dashboard/index") >= 0) {
            let data = JSON.stringify({
                "type": "bind",
                "uid": res.data.uid,
            });
            this.webSocket.send(data);
        }
    };

    // shouldComponentUpdate(nextProps,nextState){
    //     if(this.props === nextProps&&this.state === nextState){
    //         return false
    //     }else {
    //         return true
    //     }
    // }
    getTaskList = () => {
        Api.dailyTaskList().then(res => {
            let arr = res.data.task_list;
            let count = 0;
            for(let i=0;i<arr.length;i++){
                if(arr[i].cha_count >= arr[i].reach){
                    count++
                    // if(arr[i].name === "参加10局游戏"){
                    //     if(res.data.join_game_num >= 10){
                    //         count++
                    //     }
                    // }else {
                    //     if(res.data.today_win >= arr[i].reach){
                    //         count++
                    //     }
                    // }
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

    getUserInfo = () => {
        let ua = navigator.userAgent.toLowerCase();//获取判断用的对象
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            let hash = window.location.hash;
            let reg2 = /([^oid=]+)$/;
            let params = null;
            let code = this.props.userInfo.code;
            if (hash.indexOf("oid=") >= 0) {
                let oid = hash.split("=")
                let openid = oid[oid.length-1];
                params = {openid: openid};
                localStorage.setItem("oid",openid)
                if(localStorage.getItem("uid")){
                    params = {
                        openid: openid,
                        refer_id: localStorage.getItem("uid")
                    }
                }
            }else {
                if (localStorage.getItem("oid")) {
                    params = {openid: localStorage.getItem("oid")}
                    if(localStorage.getItem("uid")){
                        params = {
                            openid:localStorage.getItem("oid"),
                            refer_id: localStorage.getItem("uid")
                        }
                    }
                }
            }
            if (hash.indexOf("#/Dashboard/index") >= 0) {
                if(!this.props.userInfo.data){
                    this.props.dispatch(fetchPostsGetUser(params)).then((res) => {
                        this.setState({
                            isLogin: false,
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
                        if(localStorage.getItem("uid")){
                            localStorage.removeItem("uid");
                            // window.location.href = "#"
                        }

                        this.getWebsocket(res);
                    }).catch((err) => {
                        if (this.props.userInfo.code === "0000"||this.props.userInfo.data){

                        }else if(this.props.userInfo.code === 20009){
                            this.setState({
                                isWxBindPhone:true
                            });
                        }else {
                            window.location.href = 'http://api.times168.net/index/wxlogin/login'
                        }
                    })
                }
            }
        }else {
            this.props.dispatch(fetchPostsGetUser()).then((res) => {
                this.setState({
                    isLogin: false,
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
                this.props.userInfo.code === "0000" ? null :
                    this.setState({
                        isLogin: true,
                    })
            })
        }
    }

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

    changeInput = (e, item, index, name1) => {
        let value =e.target.value;
        let arr = name1 === "login"?this.state.loginForm:this.state.Register;
        let name2 = name1 === "login"?"loginForm":"Register";
        let name = item.key;
        let form = this.state[name1];
        if(item.re){
            if(item.re.test(value)){
                arr[index].isOk = "success";
                form[name] = value;
            }else {
                arr[index].isOk = "error";
            }
        }else {
            if(value === ""||!value){
                arr[index].isOk = "error";
            }else {
                form[name] = value;
                arr[index].isOk = "success";
            }
        }
        if(item.key === "newpassword"){
            if(value !== this.state.register.password){
                arr[index].isOk = "error";
            }else {
                arr[index].isOk = "success";
            }
        }
        this.setState({
            [name2]:arr,
            [name1]:form
        })
    };

    handleSubmit = (name) => {
        let count = 0;
        if(name === "bindPhone"){
            this.state.Register.map((item, index)=>{
                if(item.isOk === "error"){
                    count ++
                }
            });
        }else if(name === "forgetPWD"){
            this.state.Register.map((item, index)=>{
                if(item.isOk === "error"){
                    count ++
                }
            });
        }else {
            this.state[name].map((item, index)=>{
                if(item.isOk === "error"){
                    count ++
                }
            });
        }
        if(count > 0){
            message.error("信息填写错误");
            return false
        }
        let params = name === "loginForm"?this.state.login:this.state.register;
        if(name === "Register"){
            params.refer_id = localStorage.getItem("uid")
        }else if(name === "bindPhone"){
            params.openid = localStorage.getItem("oid")
        }
        name === "loginForm"?this.props.dispatch(fetchPostsIfNeeded(params)).then((res) => {
            if(res.code ==="0000"){
                localStorage.setItem("phoneNum",this.state.login.tel)
                localStorage.setItem("pwd",this.state.login.password)
                message.success(res.msg);
                sessionStorage.setItem("key",'2');
                this.getUserInfo()
            }
            localStorage.removeItem("uid")
        }).catch((err) => {
            message.error(err.msg);
        }):name === "Register"?Api.register(params).then((res)=>{
            message.success(res.msg);
            this.setState({
                loginLocation:"2"
            })
            localStorage.removeItem("uid")
        }).catch((err)=>{
            message.error(err.msg)
        }):name === "bindPhone"?Api.bindPhone(params).then(res => {
            message.success(res.msg)
            this.setState({
                isWxBindPhone:false
            })
            this.getUserInfo()
        }).catch(err => {
            message.warning(err.msg)
        }):Api.forgetPassword(params).then(res => {
            message.success((res.msg));
            this.setState({
                isForget:false
            })
        }).catch(err=>{
            message.warning(err.msg)
        })
        //bindPhone
    };

    getKaptchald(isBind){
        let tel = this.state.register.tel;
        let re = /^1[345789]\d{9}$/;
        if(isBind === "bindPhone"){
            Api.bindSendVerifiCode({tel}).then((res)=>{
                message.success(res.msg);
            }).catch((res)=>{
                message.error(res.msg);
            })
        }else if(isBind === "forgetPWD"){
            Api.forgetSendVerifiCode({tel}).then((res)=>{
                message.success(res.msg);
            }).catch((res)=>{
                message.error(res.msg);
            })
        }else {
            if(re.test(tel)){
                Api.sendVerifiCode({tel}).then((res)=>{
                    message.success(res.msg);
                }).catch((res)=>{
                    message.error(res.msg);
                })
            }
        }
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
        // this.setState({
        //     num,
        // });
        //
        // // let setT = setTimeout(()=>{
        // //     this.refresh(name);
        // //     clearTimeout(setT)
        // // },220);
        // // if(!$(".carousel-item").is(":animated")){
        // //     num.push(num1);
        // //     this.setState({
        // //         num,
        // //     });
        // //     $(".carousel-item").animate(
        // //         {
        // //             marginTop:-20
        // //         },200);
        // //     let setT = setTimeout(()=>{
        // //         this.refresh();
        // //         clearTimeout(setT)
        // //     },220);
        // // }else {
        // //     let setT = setTimeout(()=>{
        // //         num.push(num1);
        // //         this.setState({
        // //             num,
        // //         });
        // //         $(".carousel-item").animate(
        // //             {
        // //                 marginTop:-20
        // //             },300);
        // //         let setT1 = setTimeout(()=>{
        // //             this.refresh();
        // //             clearTimeout(setT1)
        // //         },320);
        // //         clearTimeout(setT)
        // //     },300)
        // // }
        // // let num = localStorage.getItem(name).split(";");
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

    // refresh(name){
    //     let num = localStorage.getItem(name).split(";");
    //     if(name === "speaking"){
    //         if(num.length > 100){
    //             localStorage.setItem(name,num.slice(1,num.length).join(";"));
    //             this.setState({
    //                 num
    //             })
    //         }
    //     }else {
    //         if(num.length > 10){
    //             localStorage.setItem(name,num.slice(1,num.length).join(";"));
    //             this.setState({
    //                 num
    //             })
    //         }
    //     }
    //     if(name === "speaking"?num.length > 100:num.length > 10){
    //         localStorage.setItem(name,num.slice(1,num.length).join(";"));
    //         this.setState({
    //             num
    //         })
    //     }
    //     // if(num.length === 1){
    //     //     let setT = setTimeout(()=>{
    //     //         $('.carousel-item').animate(
    //     //             {
    //     //                 marginTop:-20
    //     //             },300);
    //     //         // num.splice(0,1);
    //     //         clearTimeout(setT)
    //     //     },3000);
    //     //     let setTT = setTimeout(()=>{
    //     //         this.setState({
    //     //             num
    //     //         });
    //     //         clearTimeout(setTT)
    //     //     },3320);
    //     // }
    //     $('.carousel-item').animate(
    //         {
    //             marginTop:0
    //         },0)
    // }

    justUser(){
        let ua = navigator.userAgent.toLowerCase();//获取判断用的对象
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            let hash = window.location.hash;
            let reg2 = /([^oid=]+)$/;
            let params = null;
            let code = this.props.userInfo.code;
            if (hash.indexOf("oid=") >= 0) {
                let oid = hash.split("=")
                let openid = oid[oid.length-1];
                params = {openid: openid};
                localStorage.setItem("oid",openid)
                if(localStorage.getItem("uid")){
                    params = {
                        openid: openid,
                        refer_id: localStorage.getItem("uid")
                    }
                }
            }else {
                if (localStorage.getItem("oid")) {
                    params = {openid: localStorage.getItem("oid")};
                    if(localStorage.getItem("uid")){
                        params = {
                            openid:localStorage.getItem("oid"),
                            refer_id: localStorage.getItem("uid")
                        }
                    }
                }
            }
            if (hash.indexOf("#/Dashboard/index") >= 0) {
                if(!this.props.userInfo.data){
                    this.props.dispatch(fetchPostsGetUser(params)).then((res) => {
                        this.setState({
                            isLogin: false,
                            userInfo: res.data
                        });
                    }).catch((err) => {
                        if (this.props.userInfo.code === "0000"||this.props.userInfo.data){

                        }else if(this.props.userInfo.code === 20009){
                            this.setState({
                                isWxBindPhone:true
                            });
                        }else {
                            window.location.href = 'http://api.times168.net/index/wxlogin/login'
                        }
                    })
                }
            }
        }else {
            this.props.dispatch(fetchPostsGetUser()).then((res) => {
                this.setState({
                    isLogin: false,
                    userInfo: res.data
                });
            }).catch((err) => {
                this.props.userInfo.code === "0000" ? null :
                    this.setState({
                        isLogin: true,
                    })
            })
        }
    }

    render(){
        let systemMsg = localStorage.getItem("systemMsg")?localStorage.getItem("systemMsg").split(";"):[];
        let speaking = localStorage.getItem("speaking")?localStorage.getItem("speaking").split(";"):[];
        let arr = [];
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
        // let ua = navigator.userAgent.toLowerCase();//获取判断用的对象
        return(
            <div className="index-container">
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
                <div className="head-wrap">
                    <img onClick={()=>this.openInfoModal(true)} src={userInfo?userInfo.avatar:require("../../layouts/image/head.png")} alt=""/>
                    <div className="my-info">
                        <span>{userInfo?userInfo.username:""}</span>
                        <span className="my-vip"><img onClick={()=>{window.location.href = "#/Dashboard/Shopping/2"}} src={userInfo?userInfo.vip === 0?require("../../layouts/image/vip/no.png"):
                            userInfo.vip === 1?require("../../layouts/image/vip/normal.png"):
                                userInfo.vip === 2?require("../../layouts/image/vip/diamond.png"):require("../../layouts/image/vip/crown.png"):""} alt=""/></span>
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
                                {/*{item !== "输入房号"?<span>{index === 0?this.state.userNum.primary:index === 1?this.state.userNum.middle:this.state.userNum.high}</span>:null}*/}
                                {item !== "输入房号"?<i onClick={(e)=>this.watchGame(e,index)} className="eyes-game">
                                    {/*<span>观战</span>*/}
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
                                    {/*<li>*/}
                                        {/*<span>[2018.11.24 12:12:12]：  玩家是是是抢得500金币大红包</span>*/}
                                    {/*</li>*/}
                                    {
                                        systemMsg.length > 0?systemMsg.map((item, index) => {
                                            return <li>
                                                <span>[{item[3]}]:玩家{item[0]}{item[1]}{item[2]}</span>
                                            </li>
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
                                                    ({JSON.parse(item).room_gold}金币场) {JSON.parse(item).type?
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
                {
                    this.state.isWxBindPhone?
                        <Modal entered={true} visible={this.state.isWxBindPhone}
                               wrapClassName={"into-home-modal bind-phone"}
                               closable={false} destroyOnClose={true}>
                            <div className="into-home">
                                <div className="into-home-header">
                                    <p>绑定手机号</p>
                                </div>
                                <div className="modal-content">
                                    <div className="login-register">
                                        <div>
                                            <Form>
                                                {
                                                    this.state.Register.map((item, index) => {
                                                        return <FormItem
                                                            required
                                                            hasFeedback
                                                            validateStatus={item.key !== "code" ? item.isOk : ""}
                                                            help={item.isOk === "error" ? item.message : null}
                                                            key={index}
                                                        >
                                                            {item.before}<Input
                                                            type={item.key === "password" || item.key === "newpassword" ? "password" : "text"}
                                                            className={item.key === "code" ? "kaptchald" : null}
                                                            onChange={(e) => this.changeInput(e, item, index, "register")}
                                                            placeholder={item.placeholder}
                                                            id={item.isOk}/>
                                                            {
                                                                item.key === "code" ?
                                                                    <Button onClick={() => this.getKaptchald("bindPhone")}
                                                                            className="get-kaptchald" type="primary">获取验证码</Button>
                                                                    : null
                                                            }
                                                        </FormItem>
                                                    })
                                                }
                                                <FormItem>
                                                    <Button onClick={() => this.handleSubmit("bindPhone")} className="check-button"
                                                            type="primary">绑定</Button>
                                                </FormItem>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal> : null
                }
                {
                    this.state.isForget?
                        <Modal entered={true} visible={this.state.isForget}
                               wrapClassName={"into-home-modal bind-phone"}
                               closable={false} destroyOnClose={true}>
                            <div className="into-home">
                                <div className="into-home-header">
                                    <p>忘记密码</p>
                                </div>
                                <div className="modal-content">
                                    <div className="login-register">
                                        <div>
                                            <Form>
                                                {
                                                    this.state.Register.map((item, index) => {
                                                        return <FormItem
                                                            required
                                                            hasFeedback
                                                            validateStatus={item.key !== "code" ? item.isOk : ""}
                                                            help={item.isOk === "error" ? item.message : null}
                                                            key={index}
                                                        >
                                                            {item.before}<Input
                                                            type={item.key === "password" || item.key === "newpassword" ? "password" : "text"}
                                                            className={item.key === "code" ? "kaptchald" : null}
                                                            onChange={(e) => this.changeInput(e, item, index, "register")}
                                                            placeholder={item.placeholder}
                                                            id={item.isOk}/>
                                                            {
                                                                item.key === "code" ?
                                                                    <Button onClick={() => this.getKaptchald("forgetPWD")}
                                                                            className="get-kaptchald" type="primary">获取验证码</Button>
                                                                    : null
                                                            }
                                                        </FormItem>
                                                    })
                                                }
                                                <FormItem>
                                                    <Button onClick={() => this.handleSubmit("forgetPWD")} className="check-button forget-check"
                                                            type="primary">提交</Button>
                                                    <Button onClick={() =>{this.setState({isForget:false})}} className="check-button forget-check1"
                                                            type="primary">取消</Button>
                                                </FormItem>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal> : null
                }
                <Modal entered={true} visible={this.state.isOenModal||this.state.isLogin} wrapClassName={"into-home-modal"}
                       closable={false} destroyOnClose={true}
                >
                    <div className="into-home">
                        <div className="into-home-header">
                            <p>{
                                this.state.isLogin?"用户登录":"加入房间"
                            }
                                {
                                    this.state.isLogin?null:
                                        <span onClick={()=>this.openModal(false)}>
                                            </span>
                                }
                            </p>
                        </div>
                        {
                            this.state.isLogin?
                                <div className="login-register">
                                    <Tabs activeKey={this.state.loginLocation} animated={false} onTabClick={(value)=>{this.setState({loginLocation:value})}} onChange={(value)=>{this.setState({loginLocation:value})}}>
                                        <TabPane tab="新用户注册" key="1">
                                            <div>
                                                <Form>
                                                    {
                                                        this.state.Register.map((item, index)=>{
                                                            return <FormItem
                                                                required
                                                                hasFeedback
                                                                validateStatus={item.key !== "code"?item.isOk:""}
                                                                help={item.isOk === "error"?item.message:null}
                                                                key={index}
                                                            >
                                                                {item.before}<Input type={item.key === "password"||item.key === "newpassword"?"password":"text"} className={item.key === "code"?"kaptchald":null}
                                                                                    onChange={(e)=>this.changeInput(e,item,index,"register")}
                                                                                    placeholder={item.placeholder}
                                                                                    id={item.isOk}/>
                                                                {
                                                                    item.key === "code"?
                                                                        <Button onClick={()=>this.getKaptchald()} className="get-kaptchald" type="primary">获取验证码</Button>
                                                                        :null
                                                                }
                                                            </FormItem>
                                                        })
                                                    }
                                                    <FormItem>
                                                        <Button onClick={()=>this.handleSubmit("Register")} className="check-button" type="primary">注册</Button>
                                                    </FormItem>
                                                </Form>
                                            </div>
                                        </TabPane>
                                        <TabPane tab="老用户登录" key="2">
                                            <div>
                                                <Form>
                                                    {
                                                        this.state.loginForm.map((item, index)=>{
                                                            return <FormItem
                                                                required
                                                                hasFeedback
                                                                validateStatus={item.key !== "code"?item.isOk:""}
                                                                help={item.isOk === "error"?item.message:null}
                                                                key={index}
                                                            >
                                                                {item.before}<Input type={item.key === "password"?"password":"text"}
                                                                                    onChange={(e)=>this.changeInput(e,item,index,"login")}
                                                                                    defaultValue={item.key === "password"?localStorage.getItem("pwd")||"":localStorage.getItem("phoneNum")||""}
                                                                                    placeholder={item.placeholder}
                                                                                    id={item.isOk}/>
                                                            </FormItem>
                                                        })
                                                    }
                                                    <FormItem>
                                                        <Button onClick={()=>this.handleSubmit("loginForm")} onClick={()=>this.handleSubmit("loginForm")} className="check-button" type="primary">登录</Button>
                                                        <a className="forgetPwd" onClick={()=>{this.setState({isForget:true})}}>忘记密码</a>
                                                    </FormItem>
                                                </Form>
                                            </div>
                                        </TabPane>
                                    </Tabs>
                                </div>
                                :<div className="modal-content">
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
                                            button.map((item, index) => {
                                                if(item === "重输"){
                                                    return <button key={index} onClick={()=>this.resetInput()}><img src={require("../../layouts/image/reset.png")} alt=""/></button>
                                                }else if (item === "确认"){
                                                    return <button key={index} disabled={this.state.intoHomePwd.indexOf("") !== -1} onClick={()=>this.intoHome()}>
                                                        <img src={require("../../layouts/image/check.png")} alt=""/>
                                                    </button>
                                                }
                                                if(!this.state.isHomeNeedPwd){
                                                    return <button key={index} onClick={()=>this.inputNumber(button, index)}>
                                                        <img src={require("../../layouts/image/"+item+".png")} alt=""/>
                                                    </button>
                                                }else {
                                                    if(index > 2){
                                                        return <button key={index} onClick={()=>this.inputNumber(button, index)}>
                                                            <img src={require("../../layouts/image/"+item+".png")} alt=""/>
                                                        </button>
                                                    }
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                        }
                    </div>
                </Modal>
                {
                    this.props.userInfo.code === "0000"?<MyInfoModal info={this.props.userInfo.data} isResetMyInfo={this.state.isResetMyInfo} openModal={()=>this.openInfoModal()}
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
    const {loginReducer,userInfo} = state;
    return {loginReducer,userInfo}
};
export default connect(mapStateToProps)(Index)