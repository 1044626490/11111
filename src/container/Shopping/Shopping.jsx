import React from "react"
import {Button, Carousel, Col, Radio, Row, Tabs, message} from "antd"
import "./Shopping.less"
import HeaderNav from "../../components/headerNav/headerNav";
import connect from "react-redux/es/connect/connect";
import Api from '~/until/api';

const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
class Shopping extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            Carousels:[
                {
                    img:require("../../layouts/image/vip/banner_vip.png"),
                    callback:()=>{window.location.href = "#/Dashboard/Vip"}
                }
            ],
            data:[
                {
                    gold:"100",
                    price:"1",
                    callback:(item)=>{window.location.href = "#/Dashboard/PayPage/0/"+item.price},
                    img:require("../../layouts/image/vip/01.png"),
                },{
                    gold:"500",
                    price:"5",
                    img:require("../../layouts/image/vip/05.png"),
                    callback:(item)=>{window.location.href = "#/Dashboard/PayPage/0/"+item.price}
                },{
                    gold:"3000",
                    price:"30",
                    img:require("../../layouts/image/vip/030.png"),
                    callback:(item)=>{window.location.href = "#/Dashboard/PayPage/0/"+item.price}
                },{
                    gold:"10000",
                    price:"100",
                    img:require("../../layouts/image/vip/0100.png"),
                    callback:(item)=>{window.location.href = "#/Dashboard/PayPage/0/"+item.price}
                },{
                    gold:"30000",
                    price:"300",
                    img:require("../../layouts/image/vip/0300.png"),
                    callback:(item)=>{window.location.href = "#/Dashboard/PayPage/0/"+item.price}
                },{
                    gold:"50000",
                    price:"500",
                    img:require("../../layouts/image/vip/0500.png"),
                    callback:(item)=>{window.location.href = "#/Dashboard/PayPage/0/"+item.price}
                },{
                    gold:"100000",
                    price:"1000",
                    img:require("../../layouts/image/vip/01000.png"),
                    callback:(item)=>{window.location.href = "#/Dashboard/PayPage/0/"+item.price}
                },
            ],
            defaultActiveKey:this.props.match.params.id,
            month:[1,1,1],
            type:null,
            price:null,
            vip:this.props.userInfo.data.vip,
            time:null
        }
    }

    //跳转购买会员页面
    buyVip(index,type){
        if(type === 1||type === 2){
            this.setState({
                type:1+index/1,
                price:index === 0?50:index === 1?500:1000
            });
            let price = this.state.month[index]*(index === 0?50:index === 1?500:1000);
            window.location.href = "#/Dashboard/PayPage/00"+(index+1)+"/"+price
        }
    }

    withDraw(){
        if(this.props.userInfo.data.alipay&&this.props.userInfo.data.alipay !== ""){
            window.location.href = "#/Dashboard/PayPage/007/0"
        }else {
            message.warning("请先去个人中心编辑绑定个人支付宝账号")
        }
    }

    //查询个人会员信息
    componentDidMount(){
        Api.memberExpire().then(res => {
            let a = res.data.expire_time*1000;
            let year = new Date(a).getFullYear();
            let month = new Date(a).getMonth()+1 >= 10 ? new Date(a).getMonth()+1:"0"+(new Date(a).getMonth()+1);
            let day = new Date(a).getDate() >= 10 ? new Date(a).getDate():"0"+new Date(a).getDate();
            this.setState({
                vip:res.data.vip,
                time:year+"."+month+"."+day
            })
        })
    }

    render(){
        const { data, Carousels } = this.state;
        const userInfo = this.props.userInfo.data;
        const datas = [
            {
                name:"普通会员",
                img:require("../../layouts/image/vip/normal.png"),
                value:"5000金/月",
                info:["点亮会员图标","每日可领取1000银币","享受1.5倍积分加速，升级更快","会员存在24小时体验期，体验期内若反悔，可随时退款"],
            },
            {
                name:"钻石会员",
                img:require("../../layouts/image/vip/diamond.png"),
                value:"50000金/月",
                info:["点亮会员图标","每日可领取2000银币","享受2倍积分加速，升级更快","会员存在24小时体验期，体验期内若反悔，可随时退款"],
            },
            {
                name:"皇冠会员",
                img:require('../../layouts/image/vip/crown.png'),
                value:"100000金/月",
                info:["点亮会员图标","每日可领取5000银币","享受3倍积分加速，升级更快","会员存在24小时体验期，体验期内若反悔，可随时退款"],
            }
        ];
        return(
            <div className="shopping-mall-wrap">
                <HeaderNav name="商城"/>
                <Tabs activeKey={this.state.defaultActiveKey} onChange={(value)=>{this.setState({defaultActiveKey:value})}}>
                    <TabPane tab={<p className="recharge-value">账户充值<p className="font-num">账户充值</p></p>} key="1">
                        <div className="shopping-wrap">
                            <ul className="shopping-container">
                                {
                                    data.map((item, index) => {
                                        return <li key={index} className="shopping-item">
                                            <div onClick={item.callback.bind(this,item)}>
                                                <img src={item.img} alt=""/>
                                            </div>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    </TabPane>
                    <TabPane tab={<p className="recharge-value">会员购买<p className="font-num">会员购买</p></p>} key="2">
                        <div className="Carousel-wrap">
                        {/*<Carousel dots={false} autoplay={true} afterChange={null}>*/}
                            {/*{*/}
                                {/*Carousels.map((item, index) => {*/}
                                    {/*return <div key={index} onClick={item.callback.bind(this,item)}>*/}
                                        {/*<img src={item.img} alt=""/>*/}
                                    {/*</div>*/}
                                {/*})*/}
                            {/*}*/}
                        {/*</Carousel>*/}
                            <ul>
                                {
                                    this.state.vip > 0?
                                        <li className="my-vip-item">
                                            <div className="item-vip my-vip">
                                                <Row className="item-vip-container">
                                                    <Col className="vip vip1" span={7}>
                                                        <img src={userInfo.avatar} alt=""/>
                                                    </Col>
                                                    <Col  className="vip" span={12}>
                                                        <p className="item-name-value">
                                                            <span>{datas[this.state.vip-1].name}</span>
                                                            <span>到期时间：{this.state.time}</span>
                                                        </p>
                                                        <div className="item-info">
                                                            <ul>
                                                                {
                                                                    datas[this.state.vip-1].info.map((item ,index) =>{
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
                                    datas.map((item,index) =>{
                                        const img = item.img;
                                        if(this.state.vip > 0 && this.state.vip !== index+1){
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
                                                            index+1 === this.state.vip?<Button onClick={()=>this.buyVip(index,2)} className="back-price">续费</Button>
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
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {userInfo} = state;
    return {userInfo}
};
export default connect(mapStateToProps)(Shopping)
// export default Shopping