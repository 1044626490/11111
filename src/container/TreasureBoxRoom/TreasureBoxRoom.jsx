import React from "react"
import connect from "react-redux/es/connect/connect";
import Header from "./component/Header"
import TreasureBottom from "./component/TreasureBottom";
import { Avatar, Row, Col, message } from "antd"
import "./TreasureBoxRoom.less"
import Api from '~/until/api';

class TreasureBoxRoom extends React.Component{
    constructor(props) {
        super(props);
        this.webSocket = new WebSocket("ws://192.168.0.128:8282");
        this.state = {
            roomGold:this.props.match.params.gold,//房间金币
            gameInfo:[

            ]
        }
    }

    componentDidMount(){
        this.getRoom()
    }

    getRoom(){
        let gold = this.props.match.params.gold
        let level = gold === "100"?1:gold === "500"? 2:gold === "1000"?3:gold === "5000"?4:gold === "10000"?5:1;
        Api.treasureJoinGroup({level}).then(res => {
            this.getWebSocket(res.data);
            this.setI3 = setInterval(()=>{
                let data = JSON.stringify({"type":"ping"});
                this.webSocket.send(data)
            },9000)
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
                case "ping":
                    break;
                case "package":
                    let data = this.state.gameInfo;
                    data.push(userData);
                    this.setState({
                        gameInfo:data
                    });
                    break;
                default:
                    break;
            }
        }
    };

    componentWillUnmount(){
        clearInterval(this.setI3);
    }

    openBox(isOver,package_id){
        if(isOver){

        }else {
            Api.treasureGrabBag({package_id}).then(res => {
                message.info(res.msg)
            }).catch( err =>{
                message.info(err.msg)
            } )
        }
    }

    render(){
        return(
            <div className="treasure-box-room-wrap">
                <Header />
                <div className="treasure-box-room-content">
                    <ul>
                        {
                            this.state.gameInfo.map((item, index) => {
                                if(item.package_id){
                                    let img = require("../../layouts/image/index1/treasure/01.png");
                                    let box = true;
                                    if(index < this.state.gameInfo.length-1){
                                        for(let i = index;i<this.state.gameInfo.length;i++){
                                            if(this.state.gameInfo[i].package_id){
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
                                }
                            })
                        }
                    </ul>
                </div>
                <TreasureBottom />
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {userInfo} = state;
    return {userInfo}
};
export default connect(mapStateToProps)(TreasureBoxRoom)