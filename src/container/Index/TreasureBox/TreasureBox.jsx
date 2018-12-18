import React from "react"
import connect from "react-redux/es/connect/connect";
import "./TreasureBox.less"
import {message, Button, Modal, Row, Col, Icon} from "antd";
import TreasureHeader from "../../../components/Treasure/TreasureHeader"
import Treas from "../../../components/Treasure/Treas"
import {fetchPostsGetUser} from '~/action/getUserInfo';
import Api from '~/until/api';
import TreasureInfoModal from "./TreasureInfoModal"

class TreasureBox extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isOpenRule: false,
            openSetting: false,
            mySetting:{},
            musicSet:false
        }
    }

    componentDidMount(){
        this.getUserInfo();
        this.getMySetting()
    }

    getMySetting = () => {
        Api.setInfo().then(res => {
            this.setState({
                mySetting:res.data
            })
        })
    };

    getUserInfo = () =>{
        this.props.dispatch(fetchPostsGetUser()).then((res) => {

        }).catch((err) => {
            message.error(err.msg)
        })
    };

    openRule(){
        this.setState({
            isOpenRule:true
        })
    }

    openSetting(){
        this.setState({
            openSetting:true
        })
    }

    openTwo = () =>{
        this.setState({
            openTwo:true
        })
    }

    render(){
        const data = [
            {
                name:"体验场",
                value:100,
                backImg:require("../../../layouts/image/index1/treasure/bg01.png"),
                boxImg:require("../../../layouts/image/index1/treasure/box1.png")
            },
            {
                name:"普通场",
                value:500,
                backImg:require("../../../layouts/image/index1/treasure/bg02.png"),
                boxImg:require("../../../layouts/image/index1/treasure/box2.png")
            },
            {
                name:"大师场",
                value:1000,
                backImg:require("../../../layouts/image/index1/treasure/bg03.png"),
                boxImg:require("../../../layouts/image/index1/treasure/box3.png")
            },
            {
                name:"宗师场",
                value:5000,
                backImg:require("../../../layouts/image/index1/treasure/bg04.png"),
                boxImg:require("../../../layouts/image/index1/treasure/box4.png")
            },
            {
                name:"炼狱场",
                value:10000,
                backImg:require("../../../layouts/image/index1/treasure/bg05.png"),
                boxImg:require("../../../layouts/image/index1/treasure/box5.png"),
            }
        ];
        const rule = ["每个房间最多100人参与游戏。",
            "参与游戏的玩家只可以抢小于自身拥有的金币的宝箱（例如：拥有110金币可以抢100金币的宝箱，不能抢500金币的宝箱）。",
            "如果是新房间，则由系统先发一个宝箱，固定为100金币（该宝箱抢得的金币不计入个人账户），每个宝箱扣除10%的房费。",
        "每次宝箱抢完后手气最差的玩家系统自动代发下一个宝箱。","每次抢宝箱，则会扣除宝箱值的金币数，" +
            "直到宝箱领完且宝箱不为手气最差，则将领取的金币和扣除金币一起返还。抢宝箱后退出房间不影响游戏结果的判定，" +
            "宝箱领取完，即使不在房间内，不是手气最差的也会将金币返还；手气最差的，依旧会扣除该宝箱价值发放下一个宝箱。"];
        return(
            <div className="treasure-box-wrap">
                <Treas openInfoModal={()=>this.openSetting()}/>
                {
                    this.state.openTwo?<div className="my-two-dimension-sode" onClick={()=>{
                        this.setState({
                            openTwo:false
                        })
                    }
                    }>
                        <div className="content-container">
                            <img src={"" ||this.props.userInfo.data.promote} alt=""/>
                        </div>
                    </div>:null
                }
                <div className="treasure-box-content">
                    <img onClick={()=>this.openRule()} src={require("../../../layouts/image/index1/treasure/rr.png")} alt=""/>
                    <div className="item-wrap">
                        {
                            data.map((item, index) => {
                                return <div key={index} className="box-item">
                                    <div className="box-one" onClick={()=>{
                                        let level = item.value === 100?1:item.value === 500?2:item.value === 1000?
                                            3:item.value === 5000?4:item.value === 10000?5:1;
                                        Api.treasureJoinGroup({level}).then(res => {
                                            window.location.href = "#/Dashboard/TreasureBoxRoom/"+item.value
                                        })
                                    }
                                    }>
                                        <img className="box-bg" src={item.backImg} alt=""/>
                                        <img className="box" src={item.boxImg} alt=""/>
                                        <div className="box-info">
                                            <b>{item.name}</b>
                                            <span>{item.value}金币/5个</span>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
                <TreasureHeader musicSet={()=>{this.setState({musicSet:true})}}/>
                <Modal entered={true} visible={this.state.isOpenRule} wrapClassName={"treasure-box"}
                       closable={false} destroyOnClose={true}
                >
                    <div className="treasure-rule-header">
                        <span>游戏规则</span>
                    </div>
                    <div className="rule-content">
                        <ul>
                            {
                                rule.map((item, index) =>{
                                    return <li key={index}>
                                        <Row>
                                            <Col span={2}><span>{index+1}</span></Col>
                                            <Col span={22}>{item}</Col>
                                        </Row>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                    <Button onClick={()=>{this.setState({
                        isOpenRule:false
                    })}}>确定</Button>
                </Modal>
                {
                    this.props.userInfo.code === "0000"&&this.state.openSetting?<TreasureInfoModal info={this.props.userInfo.data}
                                                                                               isOpenModel={this.state.openSetting}
                                                                                               mySetting={this.state.mySetting}
                                                                                               openTwo={()=>this.openTwo()}
                                                                                               getUserInfo={()=>{
                                                                                                   this.getMySetting();
                                                                                                   // this.openSetting();
                                                                                                   this.setState({
                                                                                                       openSetting:false
                                                                                                   })
                                                                                               }}
                    />:null
                }
                {
                    this.state.musicSet?<Modal entered={true} visible={this.state.musicSet} wrapClassName={"treasure-set-modal"}
                                         maskStyle={{backgroundColor: "rgba(255,255,255,0.8)"}}
                                         closable={false} destroyOnClose={true}>
                        <p className="reset-my-info-container">设置
                            <Icon type="close" theme="outlined" onClick={()=>{
                                this.getMySetting();
                                this.setState({
                                    musicSet:false
                                })
                            }}
                            />
                        </p>
                        <div className="music-setting">
                            <Row>
                                <Col span={5}>音乐：</Col>
                                <Col span={7}><span onClick={
                                    ()=>{
                                        let mySetting = this.state.mySetting;
                                        mySetting.music = !this.state.mySetting.music;
                                        this.setState({
                                            mySetting
                                        })
                                    }
                                }>
                                    {
                                        this.state.mySetting.music?
                                            <img
                                                onClick={
                                                    (e)=>{
                                                        let mySetting = this.state.mySetting;
                                                        mySetting.music = !this.state.mySetting.music;
                                                        this.setState({
                                                            mySetting
                                                        });
                                                        e.stopPropagation()
                                                    }
                                                }
                                                src={require("../../../layouts/image/index1/treasure/confirm.png")} alt=""/>
                                            :null
                                    }
                                </span></Col>
                                <Col span={5}>音效：</Col>
                                <Col span={7}><span onClick={
                                    ()=>{
                                        let mySetting = this.state.mySetting;
                                        mySetting.sound_effect = !this.state.mySetting.sound_effect;
                                        this.setState({
                                            mySetting
                                        })
                                    }
                                }>
                                    {
                                        this.state.mySetting.sound_effect?
                                            <img onClick={
                                                (e)=>{
                                                    let mySetting = this.state.mySetting;
                                                    mySetting.sound_effect = !this.state.mySetting.sound_effect;
                                                    this.setState({
                                                        mySetting
                                                    });
                                                    e.stopPropagation()
                                                }
                                            }
                                                 src={require("../../../layouts/image/index1/treasure/confirm.png")} alt=""/>
                                            :null
                                    }
                                </span></Col>
                            </Row>
                        </div>
                        <Button onClick={()=>{
                            Api.setMusic({status:this.state.mySetting.music?1:0})
                                .then(res => {message.info(res.msg);this.getMySetting()})
                                .catch(res =>{message.info(res.msg);this.getMySetting()});
                            Api.setSoundEffect({status:this.state.mySetting.sound_effect?1:0})
                                .then(res => {message.info(res.msg);this.getMySetting()})
                                .catch(res =>{message.info(res.msg);this.getMySetting()})
                            this.setState({
                                musicSet:false
                            })
                            }
                        } className="save-reset">
                            保存
                        </Button>
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
export default connect(mapStateToProps)(TreasureBox)