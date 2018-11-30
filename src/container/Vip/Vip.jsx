import React from "react"
import {Row, Col, Button, Radio, Input} from "antd"
import "./Vip.less"
import HeaderNav from "../../components/headerNav/headerNav";
import connect from "react-redux/es/connect/connect";

const RadioGroup = Radio.Group;
class Vip extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            month:[1,1,1],
            type:null,
            price:null
        }
    }

    buyVip(index,type){
        if(type === 1||type === 2){
            this.setState({
                type:1+index/1,
                price:index === 0?10:index === 1?100:1000
            });
            let price = this.state.month[index]*(index === 0?10:index === 1?100:1000);
            window.location.href = "#/Dashboard/PayPage/00"+(index+1)+"/"+price
        }
    }

    withDraw(){

    }

    render(){
        const userInfo = this.props.userInfo.data;
        const data = [
            {
                name:"普通会员",
                img:require("../../layouts/image/vip/normal.png"),
                value:"10元/月(或1000金/月)",
                info:["点亮会员图标","每日可领取1000银币","享受1.5倍积分加速，升级更快","会员存在24小时体验期，体验期内若反悔，可随时退款"],
            },
            {
                name:"钻石会员",
                img:require("../../layouts/image/vip/diamond.png"),
                value:"100元/月(或10000金/月)",
                info:["点亮会员图标","每日可领取2000银币","享受2倍积分加速，升级更快","会员存在24小时体验期，体验期内若反悔，可随时退款"],
            },
            {
                name:"皇冠会员",
                img:require('../../layouts/image/vip/crown.png'),
                value:"1000元/月(或100000金/月)",
                info:["点亮会员图标","每日可领取5000银币","享受3倍积分加速，升级更快","会员存在24小时体验期，体验期内若反悔，可随时退款"],
            }
        ];
        return(
            <div className="vip-wrap">
                <HeaderNav name="我的会员"/>
                <ul>
                    {
                        userInfo.vip > 0?
                            <li className="my-vip-item">
                                <div className="item-vip my-vip">
                                    <Row className="item-vip-container">
                                        <Col className="vip vip1" span={7}>
                                            <img src={userInfo.avatar} alt=""/>
                                        </Col>
                                        <Col  className="vip" span={12}>
                                            <p className="item-name-value">
                                                <span>{data[userInfo.vip-1].name}</span>
                                                <span>{data[userInfo.vip-1].value}</span>
                                            </p>
                                            <div className="item-info">
                                                <ul>
                                                    {
                                                        data[userInfo.vip-1].info.map((item ,index) =>{
                                                            return <li key={index}>
                                                                {
                                                                    item
                                                                }
                                                            </li>
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        </Col>
                                        <Col className="vip vip1" span={5}>
                                            <Button onClick={()=>{this.withDraw()}} className="back-price">退款</Button>
                                        </Col>
                                    </Row>
                                </div>
                            </li>:null
                    }
                    {
                        data.map((item,index) =>{
                            const img = item.img;
                            if(userInfo.vip > 0 && userInfo.vip !== index+1){
                                return false
                            }
                            return <li key={index}>
                                <div className="item-vip">
                                    <Row className="item-vip-container">
                                        <Col className="vip" span={1}></Col>
                                        <Col className="vip vip1" span={6}>
                                            <img src={item.img} alt=""/>
                                        </Col>
                                        <Col  className="vip" span={12}>
                                            <p className="item-name-value"><span>{item.name}</span><span>{item.value}</span></p>
                                            <div className="item-info">
                                                <ul>
                                                    {
                                                        item.info.map((item ,index) =>{
                                                            return <li key={index}>
                                                                    {
                                                                        item
                                                                    }
                                                            </li>
                                                        })
                                                    }
                                                </ul>
                                                <span>提示：退款需在充值24小时内进行，超时不予退款</span>
                                            </div>
                                        </Col>
                                        <Col className="vip" style={{textAlign: "center"}} span={5}>
                                            {
                                                index+1 === userInfo.vip?<Button onClick={()=>this.buyVip(index,2)} className="back-price">续费</Button>
                                                    :<Button onClick={()=>this.buyVip(index,1)}>购买</Button>
                                            }
                                            <RadioGroup style={{textAlign: "center"}} onChange={(value)=>{let month = this.state.month;month[index] = value.target.value;this.setState({month})}} defaultValue={this.state.month[index]}>
                                                <Radio value={1}>开通1个月</Radio>
                                                <Radio value={3}>开通3个月</Radio>
                                                <Radio value={6}>开通6个月</Radio>
                                            </RadioGroup>
                                        </Col>
                                    </Row>
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {userInfo} = state;
    return {userInfo}
};
export default connect(mapStateToProps)(Vip)
// export default Vip