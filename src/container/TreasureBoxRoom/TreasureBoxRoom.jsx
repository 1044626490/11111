import React from "react"
import connect from "react-redux/es/connect/connect";
import Header from "./component/Header"
import TreasureBottom from "./component/TreasureBottom";
import {Avatar, Row, Col, message, Button, Modal} from "antd"
import "./TreasureBoxRoom.less"
import Api from '~/until/api';
import $ from "jquery"

class TreasureBoxRoom extends React.Component{
    constructor(props) {
        super(props);
        this.webSocket = new WebSocket("ws://api.times168.net:8282");
        this.setT = null;
        this.setTs = null;
        this.setT1 = null;
        this.state = {
            roomGold:this.props.match.params.gold,//房间金币
            gameInfo:[
                // {
                //     type: 1,
                //     username: "娇媚的小坏蛋",
                //     package_id: 1
                // },
                // {
                //     type: 2,
                //     username: "ssss4",
                //     recipient: "娇媚的小坏蛋"
                // },
                // {
                //     type: 2,
                //     username: "ssss3",
                //     recipient: "娇媚的小坏蛋"
                // },
                // {
                //     type: 2,
                //     username: "sss2",
                //     recipient: "娇媚的小坏蛋"
                // },
                // {
                //     type: 2,
                //     username: "ssss1",
                //     recipient: "娇媚的小坏蛋"
                // },
                // {
                //     type: 2,
                //     username: "娇媚的小坏蛋ss",
                //     recipient: "娇媚的小坏蛋"
                // },
                // {
                //     type: 3,
                //     max_username: "娇媚的小坏蛋ss",
                //     max_gold: "32",
                //     min_username: "ssss1",
                //     min_gold: "10",
                //     package_id: 1
                // },
                // {
                //     type: 1,
                //     username: "娇媚的小坏蛋ss",
                //     package_id: 2
                // },
            ],
            myGold:0,
            noMoney:false
        }
    }

    componentWillMount(){
        // localStorage.removeItem("room_info")
        // debugger
        // let str = localStorage.getItem("room_info");
        // if(str&&str.length){
        //     if(str.indexOf(";") >= 0){
        //         let gameInfo = str.split(";");
        //         for(let i=0;i< gameInfo.length;i++){
        //             let json = gameInfo[i];
        //             gameInfo[i] = JSON.parse(gameInfo[i])
        //         }
        //         this.setState({
        //             gameInfo
        //         })
        //     }
        // }
        if(!this.props.userInfo||this.props.userInfo.code !== "0000"){
            window.location.href = "#/Dashboard/index"
        }
        this.getRoom();
        this.getMyGold();
        let TreasureBox = document.querySelector('.treasure-box-room-content');
        TreasureBox!== null?TreasureBox.scrollTop = TreasureBox.scrollHeight:null;
    }

    componentDidUpdate(){
        let TreasureBox = document.querySelector('.treasure-box-room-content');
        TreasureBox!== null?TreasureBox.scrollTop = TreasureBox.scrollHeight:null;
    }

    getRoom(){
        let gold = this.props.match.params.gold;
        let level = gold === "100"?1:gold === "500"? 2:gold === "1000"?3:gold === "5000"?4:gold === "10000"?5:1;
        Api.treasureJoinGroup({level}).then(res => {
            this.getWebSocket(res.data);
        })
    }

    //连接websocket
    getWebSocket = (homeId) => {
        let data = JSON.stringify({"type":"treasure_bind","uid":this.props.userInfo.data.uid,"group_id":homeId});
        this.webSocket.send(data)
        this.webSocket.onmessage = (e)=>{
            let data = JSON.parse(e.data);
            let userData = data.data;
            let type = data.type || "";
            switch (type) {
                case "bind":

                    break
                case "ping":
                    break;
                case "package":
                    if(this.state.gameInfo.length === 0){
                        clearInterval(this.setI3);
                        this.setI3 = setInterval(()=>{
                            let data = JSON.stringify({"type":"ping"});
                            this.webSocket.send(data)
                        },9000)
                    }
                    if(userData.type === 3){
                        this.getMyGold()
                    }
                    // alert(userData.type);
                    if($(".open-box").is(":animated")){
                        this.setT1 = setTimeout(()=>{
                            let data = this.state.gameInfo;
                            data.push(userData);
                            this.setState({
                                gameInfo:data
                            });
                            clearTimeout(this.setT1)
                        },2200)
                    }else {
                        let data = this.state.gameInfo;
                        data.push(userData);
                        this.setState({
                            gameInfo:data
                        });
                    }
                    // let roomInfo = localStorage.getItem("room_info")?localStorage.getItem("room_info"):"";
                    // let arr = roomInfo.split(";");
                    // if(arr[arr.length-1].type === userData.type&&arr[arr.length-1].username === userData.username){
                    //
                    // }else{
                    //     if(roomInfo.length === 0){
                    //         roomInfo = roomInfo.concat(JSON.stringify(userData))
                    //     }else {
                    //         roomInfo = roomInfo.concat(";" + JSON.stringify(userData))
                    //     }
                    // }
                    // localStorage.setItem("room_info",roomInfo);
                    if(data.username === this.props.userInfo.data.username){
                        this.getMyGold();
                    }
                    break;
                default:
                    break;
            }
        }
    };

    componentWillUnmount(){
        this.webSocket.close();
        clearInterval(this.setI3);
        clearTimeout(this.setTs);
        clearTimeout(this.setT);
    }

    getMyGold(){
        Api.userGold().then(res => {
            this.setState({
                myGold:res.gold
            })
        })
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
                message.info(res.msg)
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

    render(){
        const userInfo = this.props.userInfo.data;
        const gold = this.state.myGold;
        // alert(this.state.gameInfo.length);
        // for(let i=0;i<this.state.gameInfo.length;i++){
        //     alert(this.state.gameInfo[i].type)
        // }
        return(
            <div className="treasure-box-room-wrap">
                <div className="treasure-box-header">
                    <span className="header-top"></span>
                    <img src={userInfo?userInfo.avatar:require("../../layouts/image/head.png")} alt=""/>
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
                            message.info("请先登录")
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
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {userInfo} = state;
    return {userInfo}
};
export default connect(mapStateToProps)(TreasureBoxRoom)