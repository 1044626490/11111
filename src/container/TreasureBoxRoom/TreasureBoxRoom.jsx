import React from "react"
import connect from "react-redux/es/connect/connect";
import Header from "./component/Header"
import TreasureBottom from "./component/TreasureBottom";
import {Avatar, Row, Col, message, Button, Modal} from "antd"
import "./TreasureBoxRoom.less"
import Api from '~/until/api';
import $ from "jquery"
import TreasureInfoModal from "../Index/TreasureBox/TreasureInfoModal";
import {fetchPostsGetUser} from '~/action/getUserInfo';

class TreasureBoxRoom extends React.Component{
    constructor(props) {
        super(props);
        this.webSocket = new WebSocket("ws://api.times168.net:8282");
        this.setT = null;
        this.setTs = null;
        this.setT1 = null;
        this.setMusic = null;
        this.state = {
            roomGold:this.props.match.params.gold,//房间金币
            isMedia:1,
            musicRed:"red",
            gameInfo:[],
            myGold:0,
            noMoney:false,
            mySetting:{},
            openSetting:false,
            openBoxSound:false
        }
    }

    componentDidMount(){
        if(!this.props.userInfo||this.props.userInfo.code !== "0000"){
            window.location.href = "#/Dashboard/index"
        }
        this.getRoom();
        this.getMySetting();
        this.getUserInfo();
        let TreasureBox = document.querySelector('.treasure-box-room-content');
        TreasureBox!== null?TreasureBox.scrollTop = TreasureBox.scrollHeight:null;
    }

    componentDidUpdate(){
        let TreasureBox = document.querySelector('.treasure-box-room-content');
        TreasureBox!== null?TreasureBox.scrollTop = TreasureBox.scrollHeight:null;
    }

    getUserInfo = () =>{
        this.props.dispatch(fetchPostsGetUser()).then((res) => {
        }).catch((err) => {
            message.error(err.msg)
        })
    };

    getRoom(){
        this.getMyGold();
        this.putGold();
        let gold = this.props.match.params.gold;
        let level = gold === "100"?1:gold === "500"? 2:gold === "1000"?3:gold === "5000"?4:gold === "10000"?5:1;
        this.webSocket.onopen = () => {
            this.webSocket.send(JSON.stringify({"type":"treasure_bind","uid":10655||this.props.userInfo.data.uid,"group_id":level}));
            this.setI3 = setInterval(()=>{
                this.webSocket.send(JSON.stringify({"type":"ping"}))
            },9000);
        };
        this.webSocket.onmessage = (e)=>{
            let data = JSON.parse(e.data);
            let userData = data.data;
            let type = data.type || "";
            switch (type) {
                case "bind":
                    break;case "ping":break;case "package":
                if(userData.type === 3){
                    this.getMyGold()
                }
                let data = this.state.gameInfo;
                data.push(userData);
                this.setState({
                    gameInfo:data
                });
                if(data.username === this.props.userInfo.data.username){
                    this.getMyGold();
                }
                break;
                default:
                    break;
            }
        }
    }

    componentWillUnmount(){
        this.webSocket.close();
        clearInterval(this.setI3);
        clearTimeout(this.setTs);
        clearTimeout(this.setT);
        clearTimeout(this.setMusic);
    }

    getMyGold(){
        Api.userGold().then(res => {
            this.setState({
                myGold:res.gold
            })
        })
    }

    putGold(){
        for(let i=1;i<17;i++){
            let math = Math.random().toFixed(2);
            let a = Number(Math.random() > 0.5? math*(-1):math);
            let b = Number(Math.random() > 0.5? math*(-1):math);
            $(".today-signs"+i).css({
                left: (49+a)+"%",
                top: (49+b)+"%"
            })
        }
    }

    openBoxAnimate(res){
        if(res.code === 50003){
            $(".open-box-imgs").prop("src",require("../../layouts/image/index1/treasure/none.png"))
        }else if(res.code === "0000"){
            $(".open-box-imgs").prop("src",require("../../layouts/image/index1/treasure/open.png"))
        }
        $(".box-mask").css({
            display: "block",
        });
        $(".open-box-img").css({
            animation: "rot 300ms infinite"
        },600);
        $(".open-box").animate({
            width: "55vw",
            height: "61vw"
        },600);
        this.setT = setTimeout(()=>{
            // message.info(res.msg)
            $(".open-box-img").removeAttr("style").animate({
                opacity: 0
            },500);
            $(".open-box-imgs").animate({
                width: "100%",
                height: "100%"
            },500);
            if(res.code === "0000"){
                let count = 0;
                this.setState({
                    openBoxSound:true
                });
                let setI = setInterval(()=>{
                    count++;
                    let name = '.today-signs'+count;
                    const winHeight = $('.my-money-item-pay').offset().top - $(document).scrollTop();
                    const winWidth = $('.my-money-item-pay').offset().left - $(document).scrollLeft();
                    $(name).css({
                        display: "inline-block",
                    }).animate({
                        left:winWidth,
                        top: winHeight,
                    },600);
                    let setT = setTimeout(()=>{
                        $(name).css({
                            display: "none",
                            left: "49%",
                            top: "49%",
                        });
                        this.putGold();
                        clearTimeout(setT)
                    },700);
                    if(count === 17){
                        let setT = setTimeout(()=>{
                            this.setState({
                                openBoxSound:false
                            });
                            clearTimeout(setT)
                        },700);
                        clearInterval(setI)
                    }
                },50);
            }
            this.setTs = setTimeout(()=>{
                $(".box-mask").css({
                    display: "none"
                });
                $(".open-box-imgs").removeAttr("style");
                $(".open-box-img").removeAttr("style");
                $(".open-box").animate({
                    width: "40vw",
                    height: "44vw"
                },0);
                clearTimeout(this.setTs);
                this.getMyGold()
            },1000);
            clearTimeout(this.setT)
        },600);
    }

    openBox(isOver,package_id){
        Api.treasureGrabBag({package_id}).then(res => {
            this.openBoxAnimate(res)
        }).catch( err =>{
            if(err.code === 60001){
                message.info(err.msg)
            }else if(err.code === 50003){
                this.openBoxAnimate(err)
            }else if(err.code === 30006){
                this.setState({
                    noMoney:true
                })
            }
        })
    }

    getMySetting = () => {
        Api.setInfo().then(res => {
            this.setState({
                mySetting:res.data
            });
            this.musicChange();
        })
    };

    musicChange(){
        let time = this.state.musicRed === "red"?118000:105000;
        clearTimeout(this.setMusic);
        this.setMusic = setTimeout(()=>{
            if(time === 118000){
                this.setState({
                    musicRed:"red1"
                })
            }else {
                this.setState({
                    musicRed:"red"
                })
            }
            this.musicChange();
        },time)
    }

    openSetting(){
        this.setState({
            openSetting:true
        })
    }

    render(){
        const userInfo = this.props.userInfo.data;
        const gold = this.state.myGold;
        // alert(this.state.gameInfo.length);
        // for(let i=0;i<this.state.gameInfo.length;i++){
        //     alert(this.state.gameInfo[i].type)
        // }
        return(
            <div className="treasure-box-room-wrap">
                <span className="today-signs1"></span>
                <span className="today-signs2"></span>
                <span className="today-signs3"></span>
                <span className="today-signs4"></span>
                <span className="today-signs5"></span>
                <span className="today-signs6"></span>
                <span className="today-signs7"></span>
                <span className="today-signs8"></span>
                <span className="today-signs9"></span>
                <span className="today-signs10"></span>
                <span className="today-signs11"></span>
                <span className="today-signs13"></span>
                <span className="today-signs12"></span>
                <span className="today-signs14"></span>
                <span className="today-signs15"></span>
                <span className="today-signs17"></span>
                <span className="today-signs16"></span>
                <div className="treasure-box-header">
                    {
                        this.state.mySetting.music?<audio className="audio-treasure" src={require("../../layouts/video/"+this.state.musicRed+".mp3")} autoPlay={true} loop={true}>
                        </audio>:null
                    }
                    {
                        this.state.mySetting.sound_effect&&this.state.openBoxSound?<audio className="audio-sound_effect" src={require("../../layouts/video/red2.mp3")} autoPlay={true} loop={true}>
                        </audio>:null
                    }
                    <span className="header-top"></span>
                    <img onClick={()=>this.openSetting()} src={userInfo?userInfo.avatar:require("../../layouts/image/head.png")} alt=""/>
                    <div className="my-info">
                        <span>{userInfo?userInfo.username:"请先登录"}</span>
                        <span className="my-vip"><img src={userInfo?userInfo.vip === 0?require("../../layouts/image/vip/no.png"):
                            userInfo.vip === 1?require("../../layouts/image/vip/normal.png"):
                                userInfo.vip === 2?require("../../layouts/image/vip/diamond.png"):require("../../layouts/image/vip/crown.png"):""} alt=""/></span>
                        <br/>
                        <span>ID:{userInfo?userInfo.uid:0}</span>
                    </div>
                    <div className="my-money-item">
                        <span>{userInfo?Number(gold) >= 10000?(Number(gold)/10000).toFixed(1)+"w":gold:0}</span>
                        <span className="my-money-item-pay" onClick={()=>{{if(this.props.userInfo&&this.props.userInfo.code === "0000"){
                            window.location.href = "#/Dashboard/Shopping/1"
                        }else {
                            message.info("请先登录");
                            this.setState({
                                isLogin:true
                            })
                        }}}}>{null}</span>
                    </div>
                </div>
                <div className="treasure-box-room-content">
                    <ul>
                        {
                            this.state.gameInfo.map((item, index) => {
                                if(item.type === 1){
                                    let img = require("../../layouts/image/index1/treasure/01.png");
                                    let box = true;
                                    if(index < this.state.gameInfo.length-1){
                                        for(let i = index+1;i<this.state.gameInfo.length;i++){
                                            if(this.state.gameInfo[i].type === 1){
                                                img = require("../../layouts/image/index1/treasure/none.png");
                                                box = false;
                                                break
                                            }
                                        }
                                    }
                                    return <li key={index}>
                                        <Row>
                                            <Col span={2}><Avatar icon="user" src={item.avatar}/></Col>
                                            <Col span={4}>
                                                <Row><p>{item.username}</p></Row>
                                                <Row><img src={img} onClick={()=>this.openBox(box,item.package_id)} alt=""/></Row>
                                            </Col>
                                        </Row>
                                    </li>
                                }else if(item.type === 2){
                                    return <li className="get-gold" key={index}>
                                        <i><span>{item.username}</span>&nbsp;领取了&nbsp;<span>{item.recipient}</span>&nbsp;派发的宝箱{item.uid === this.props.userInfo.data.uid?<span>({item.gold}金币)</span>:""}</i>
                                    </li>
                                }else if(item.type === 3){
                                    return <li className="get-result" key={index}>
                                        <span>
                                            <i>手气最佳:&nbsp;&nbsp;{item.max_username}&nbsp;({item.max_gold}金币)</i>
                                            <i>手气最差:&nbsp;&nbsp;{item.min_username}&nbsp;({item.min_gold}金币)</i>
                                            <i><a href={"#/Dashboard/BoxRecord/"+item.package_id+"/"+this.state.roomGold}>查看领取结果 ></a></i>
                                        </span>
                                        <span>3秒后发出下一个宝箱，准备开抢</span>
                                        {/*<i><span>{item.username}</span>领取了<span>{item.recipient}</span>派发的宝箱</i>*/}
                                    </li>
                                }
                            })
                        }
                    </ul>
                </div>
                <TreasureBottom />
                <div className="box-mask">
                    <div className="open-box">
                        <img className="open-box-img" src={require("../../layouts/image/index1/treasure/put.png")} alt=""/>
                        <img className="open-box-imgs" src={require("../../layouts/image/index1/treasure/open.png")} alt=""/>
                    </div>
                </div>
                <Modal entered={true} visible={this.state.noMoney} wrapClassName={"treasure-box-no"}
                       closable={false} destroyOnClose={true}
                >
                    <div className="treasure-rule-header">
                        <span>游戏规则</span>
                    </div>
                    <div className="has-no-money">
                        <table>
                            <tr>
                                <td><span>为确保游戏正常进行，参与游戏的玩家，余额需大于{this.state.roomGold}金币</span></td>
                            </tr>
                        </table>
                    </div>
                    <Button onClick={()=>{this.setState({
                        noMoney:false
                    })}}>继续围观</Button>
                    <Button onClick={()=>{window.location.href = "#/Dashboard/Shopping/1"}}>立即充值</Button>
                </Modal>
                {
                    this.props.userInfo.code === "0000"&&this.state.openSetting?<TreasureInfoModal info={this.props.userInfo.data}
                                                                                                   isOpenModel={this.state.openSetting}
                                                                                                   mySetting={this.state.mySetting}
                                                                                                   getUserInfo={()=>{
                                                                                                       this.getMySetting();
                                                                                                       this.getUserInfo();
                                                                                                       this.setState({
                                                                                                           openSetting:false
                                                                                                       })
                                                                                                   }}
                    />:null
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {userInfo} = state;
    return {userInfo}
};
export default connect(mapStateToProps)(TreasureBoxRoom)