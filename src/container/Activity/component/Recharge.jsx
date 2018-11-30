import React from "react"
import "./Recharge.less"
import HeaderNav from "../../../components/headerNav/headerNav";
import TopCarousel from "../../../components/TopCarousel/TopCarousel";
import connect from "react-redux/es/connect/connect";
import Api from '~/until/api';
import {Button, Radio, message} from "antd";

const RadioGroup = Radio.Group;
let isWx;
let ua = navigator.userAgent.toLowerCase();//获取判断用的对象
if (ua.match(/MicroMessenger/i) == "micromessenger") {
    isWx = true
}else {
    isWx = false
}
class Recharge extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            value:0,
        }
    }

    componentWillMount(){
        Api.rechargeActive().then(res => {
            this.setState({
                data:res.data
            })
        }).catch(err => {

        })
    }

    recharge(item){
        window.location.href = "#/Dashboard/PayPage/"+item.id+"/"+item.money
        // if(this.state.value === 3){
        //     if(isWx){
        //         window.location.href = "http://api.times168.net/index/pay/jsapi_pay?uid="+this.props.userInfo.data.uid+"&price="+item.money+"&id="+item.id
        //     }else {
        //         window.location.href = "http://api.times168.net/index/pay/recharge?pay_type=pay_wechat&money="+item.money+"&uid="+this.props.userInfo.data.uid+"&id="+item.id
        //     }
        // }else if (this.state.value === 2){
        //     if(!isWx){
        //         window.location.href = "http://api.times168.net/index/pay/recharge?pay_type=pay_alipay&money="+item.money+"&uid="+this.props.userInfo.data.uid+"&id="+item.id
        //     }
        // }else {
        //     message.info("请先选择支付方式")
        // }
    }

    render(){
        const { data } = this.state;
        // const data = [
        //     {
        //         recharge:"300",
        //         add:"200",
        //         money:"3",
        //         type:1
        //     },{
        //         recharge:"1000",
        //         add:"60",
        //         money:"10",
        //         type:4
        //     },{
        //         recharge:"5000",
        //         add:"500",
        //         money:"50",
        //         type:4
        //     },{
        //         recharge:"10000",
        //         add:"1500",
        //         money:"100",
        //         type:2
        //     },{
        //         recharge:"30000",
        //         add:"5000",
        //         money:"300",
        //         type:3
        //     },{
        //         recharge:"50000",
        //         add:"10000",
        //         money:"500",
        //         type:3
        //     },
        // ];
        return(
            <div className="recharge-wrap">
                <HeaderNav name="挑战10秒"/>
                <ul>
                    {
                        data.map((item, index) =>{
                            return item.status?<li key={index}>
                                        <div className={item.type === 1?"recharge-item item1":item.type === 2?"recharge-item item2":item.type === 3?"recharge-item item3":"recharge-item"}>
                                            <p className="recharge-value">
                                                {item.gold}
                                                <p className="font-num">
                                                    {item.gold}
                                                </p>
                                            </p>
                                            <p className="recharge-value more">
                                                (+{item.gift_gold})
                                                <p className="font-num">
                                                    (+{item.gift_gold})
                                                </p>
                                            </p>
                                            <span onClick={()=>this.recharge(item)}>￥{item.money}</span>
                                        </div>
                                    </li>:null
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
export default connect(mapStateToProps)(Recharge)