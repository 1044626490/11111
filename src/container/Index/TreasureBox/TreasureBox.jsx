import React from "react"
import connect from "react-redux/es/connect/connect";
import "./TreasureBox.less"
import { message, Button, Modal } from "antd";
import TreasureHeader from "../../../components/Treasure/TreasureHeader"
import Treas from "../../../components/Treasure/Treas"
import {fetchPostsGetUser} from '~/action/getUserInfo';

class TreasureBox extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isOpenRule:false
        }
    }

    componentDidMount(){
        this.getUserInfo()
    }

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
                name:"大师",
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
                name:"地狱场",
                value:10000,
                backImg:require("../../../layouts/image/index1/treasure/bg05.png"),
                boxImg:require("../../../layouts/image/index1/treasure/box5.png"),
            }
        ];
        const rule = ["每个房间最多100人参与游戏",
            "参与游戏的玩家可以抢大于自身拥有的金币的宝箱，例如：拥有110金币可以抢100金币的宝箱，不能抢500金币的宝箱",
            "如果是新房间，则由系统先发一个宝箱，固定为100金币（该宝箱金币抢得的金币不计入个人账户）",
        "每次宝箱抢完后手气最差的人则发下一个宝箱","每次抢宝箱，则会扣除宝箱值的金币数，" +
            "直到宝箱领完且宝箱不为手气最差，则将领取的金币和扣除金币一起返还，抢宝箱后退出房间不影响游戏结果的判定，" +
            "红包领取完，即使不在房间内，不是手气最差的也会将金币返还，手气最差的依旧会扣除该宝箱价值发放下一个红包"];
        return(
            <div className="treasure-box-wrap">
                <Treas openInfoModal={()=>{
                    window.location.href = "#/Dashboard/TreasureList"
                }}/>
                <div className="treasure-box-content">
                    <div className="item-wrap">
                        {
                            data.map((item, index) => {
                                return <div key={index} className="box-item">
                                    <div className="box-one" onClick={()=>{window.location.href = "#/Dashboard/TreasureBoxRoom/"+item.value}}>
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
                <TreasureHeader openRule={()=>this.openRule()}/>
                <Modal entered={true} visible={this.state.isOpenRule} wrapClassName={"treasure-box"}
                       closable={false} destroyOnClose={true}
                >
                    <div className="treasure-rule-header">
                        <span>游戏规则</span>
                    </div>
                    <div className="rule-content">
                        <table>
                            {
                                rule.map((item, index) =>{
                                    return <tr>
                                        <td><span>{index+1}、</span></td>
                                        <td>{item}</td>
                                    </tr>
                                })
                            }
                        </table>
                    </div>
                    <Button onClick={()=>{this.setState({
                        isOpenRule:false
                    })}}>确定</Button>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {userInfo} = state;
    return {userInfo}
};
export default connect(mapStateToProps)(TreasureBox)