import React from 'react';
import {Form, Icon, Modal, Tabs, Input, Button, message, Badge} from "antd";
import "./index.less"
import connect from "react-redux/es/connect/connect";
import BottomMenu from "../../components/bottomMenu/bottonMenu";
import HeaderNav from "../../components/headerNav/headerNav";
import Api from '~/until/api';
import {fetchPostsIfNeeded} from '~/action/login';
import {fetchPostsGetUser} from '~/action/getUserInfo';
import InfoModal from "./infoModal/infoModal";
import Sign from "./Sign/Sign"
import MyTask from "./MyTask/MyTask";
import { jsSdkConfig } from "../../constants/Share"
import $ from "jquery";

const TextArea = Input;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
class Index extends React.Component {
    constructor(props) {
        super(props);
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
            isHasTask:false,
            isFirst:false
        };
    }

    componentDidMount(){
        if(window.location.hash.indexOf("#/Dashboard/index") >= 0){
            if(this.props.userInfo.code !== "20009"){
                this.getUserInfo();
            }
        }
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
                        if(localStorage.getItem("uid")){
                            localStorage.removeItem("uid");
                            // window.location.href = "#"
                        }
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
            }else {
                if (localStorage.getItem("oid")) {
                    params = {openid: localStorage.getItem("oid")};
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

    back(){
        if(!this.state.isFirst) {
            this.setState({
                isFirst: true
            });
            message.info("再点一次关闭游戏");
            let setT = setTimeout(()=>{
                this.setState({
                    isFirst: false
                });
                clearTimeout(setT)
            },2000)
        }else {
            let ua = navigator.userAgent.toLowerCase();//获取判断用的对象
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                jsSdkConfig();
            }else {
                window.location.href="about:blank";
                window.close();
            }
        }
    }

    render(){
        const data = [
            {
                name:"挑战十秒",
                img:require("../../layouts/image/index1/bg01.png"),
                callbackfn:()=>{window.location.href = "#/Dashboard/TenSen"}
            },
            {
                name:"抢宝箱",
                img:require("../../layouts/image/index1/bg02.png"),
                callbackfn:()=>{
                    // message.info("正在开发中，敬请期待")
                    window.location.href = "#/Dashboard/TreasureBox"
                }
            }
        ];
        const userInfo = this.props.userInfo.data;
        return(
            <div className="index-container">
                {/*<HeaderNav name="挑战10秒"/>*/}
                {
                    this.state.isOpenMask?<div className="mask"></div>:null
                }
                {
                    this.state.isOpenSign?<Sign hasSign={this.state.userInfo.is_sign} closeSign={()=>{this.setState({isOpenSign:false})}}
                                                getUserInfo={()=>this.justUser()} isOpenSign={this.state.isOpenSign}/>:null
                }
                <div className="head-wrap">
                    <span className="header-top"></span>
                    <img onClick={()=>this.openInfoModal(true)} src={userInfo?userInfo.avatar:require("../../layouts/image/head.png")} alt=""/>
                    <div className="my-info">
                        <span>{userInfo?userInfo.username:"请先登录"}</span>
                        <span className="my-vip"><img onClick={()=>{if(this.props.userInfo&&this.props.userInfo.code === "0000"){
                            window.location.href = "#/Dashboard/Shopping/2"
                        }else {
                            message.info("请先登录")
                            this.setState({
                                isLogin:true
                            })
                        }}} src={userInfo?userInfo.vip === 0?require("../../layouts/image/vip/no.png"):
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
                <div className="index-container-wrap">
                    {
                        data.map((item ,index ) => {
                            let num = 0;
                            if(index === 0){
                                num = (Math.random()*100).toFixed(0);
                            }
                            return <div key={index} className="index-content-item"
                                        onClick={()=>{if(this.props.userInfo&&this.props.userInfo.code === "0000"){
                                            item.callbackfn()
                                        }else {
                                                message.info("请先登录")
                                                this.setState({
                                                    isLogin:true
                                                })
                                            }
                                        }}>
                                <img src={item.img} alt=""/>
                                <span>{item.name}</span>
                                <i>{num}人在玩</i>
                            </div>
                        })
                    }
                    <div  className="index-content-item">
                        <img src={require("../../layouts/image/index1/build.png")} alt=""/>
                        <span>拼命搭建中...</span>
                        {/*<span>{item.name}</span>*/}
                        {/*<i>0人在玩</i>*/}
                    </div>
                </div>
                <div className="buttom-index">
                    <Button onClick={()=>this.back()}>退出</Button>
                    <Button onClick={()=>{if(this.props.userInfo&&this.props.userInfo.code === "0000"){
                        this.setState({
                            isOpenInfoModel:true
                        })
                    }else {
                        message.info("请先登录")
                        this.setState({
                            isLogin:true
                        })
                    }}}>设置</Button>
                </div>
                {
                    this.state.isWxBindPhone?
                        <Modal entered={true} visible={this.state.isWxBindPhone}
                               maskStyle={{color: "rgba(0,0,0,0.3)"}}
                               wrapClassName={"into-home-modals bind-phone"}
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
                               maskStyle={{color: "rgba(0,0,0,0.3)"}}
                               wrapClassName={"into-home-modals bind-phone"}
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
                                                            placeholder={index === 1?"设置新密码（长度不能低于6位）":item.placeholder}
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
                <Modal entered={true} visible={this.state.isLogin} wrapClassName={"into-home-modals"}
                       closable={false} destroyOnClose={true}
                       maskStyle={{color: "rgba(0,0,0,0.3)"}}
                >
                    <div className="into-home">
                        <div className="into-home-header">
                            <p>用户登录
                                <Icon type="close" theme="outlined" onClick={()=>{this.setState({isLogin:false})}}
                                />
                            </p>
                        </div>
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
                                                            item.key === "code"? <Button onClick={()=>this.getKaptchald()} className="get-kaptchald" type="primary">获取验证码</Button>
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
                                                <Button onClick={()=>this.handleSubmit("loginForm")} onClick={()=>this.handleSubmit("loginForm")} className="check-button login-botton" type="primary">登录</Button>
                                                <a className="forgetPwd" onClick={()=>{this.setState({isForget:true})}}>忘记密码</a>
                                            </FormItem>
                                        </Form>
                                    </div>
                                </TabPane>
                            </Tabs>
                        </div>
                    </div>
                </Modal>
                {
                    this.props.userInfo.code === "0000"&&this.state.isOpenInfoModel?<InfoModal info={this.props.userInfo.data}
                                                                     isOpenModel={this.state.isOpenInfoModel}
                                                                     getUserInfo={()=>{
                                                                         this.justUser();
                                                                         this.setState({
                                                                             isOpenInfoModel:false
                                                                         })
                                                                     }}
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
export default connect(mapStateToProps)(Index)