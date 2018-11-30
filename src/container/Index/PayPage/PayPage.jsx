import React from "react"
import HeaderNav from "../../../components/headerNav/headerNav";
import { Radio, InputNumber, Button, Select, message  } from "antd"
import "./PayPage.less"
import connect from "react-redux/es/connect/connect";
import Api from '~/until/api';

const Option = Select.Option;
const RadioGroup = Radio.Group;
let isWx;
let ua = navigator.userAgent.toLowerCase();//获取判断用的对象
if (ua.match(/MicroMessenger/i) == "micromessenger") {
    isWx = true
}else {
    isWx = false
}
const url = "http://api.times168.net"
class PayPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            price:"1",
            value:0,
            id:null
        }
    }

    componentWillMount(){
        let id = this.props.match.params.id;
        let price = this.props.match.params.price;
        this.setState({id, price})
        if(id === "007"){
            Api.refundMoneyNum().then(res => {
                this.setState({
                    price:res.data/100
                })
            })
        }
        // if(id !== "0"&&price !== "0"){
        //     this.setState({id, price})
        // }else {
        //     this.setState({id})
        // }
    }

    payPrice(){
        if(this.state.id === "007"){
            Api.refundRequest().then(res => {
                message.success(res.msg);
                window.location.href = "#/Dashboard/index";
            }).catch(res => {
                message.warning(res.msg)
            })
        }else {
            if(this.state.id === "0"){
                if(this.state.price !== "1"&&this.state.price !== "5"&&this.state.price !== "30"&&
                    this.state.price !== "100"&&this.state.price !== "300"&&this.state.price !== "500"
                    &&this.state.price !== "1000"
                ){
                    message.warning("金额不符，请重新输入或退出页面重新进入");
                    return false
                }
                if(this.state.value === 3){
                    if(isWx){
                        window.location.href = url+"/index/pay/jsapi_pay?uid="+this.props.userInfo.data.uid+"&price="+this.state.price
                    }else {
                        window.location.href = url+"/index/pay/recharge?pay_type=pay_wechat&money="+this.state.price+"&uid="+this.props.userInfo.data.uid
                    }
                }else if (this.state.value.target.value === 2&&!isWx){
                    window.location.href = url+"/index/pay/recharge?pay_type=pay_alipay&money="+this.state.price+"&uid="+this.props.userInfo.data.uid
                }
            }else if(this.state.id === "001"||this.state.id === "002"||this.state.id === "003"){
                let month = 0;
                if(this.state.id === "001"){
                    month = Number(this.state.price)/10
                }else if(this.state.id === "002"){
                    month = Number(this.state.price)/100
                }else {
                    month = Number(this.state.price)/1000
                }
                if(this.state.value === 3){
                    if(isWx){
                        window.location.href = url+"/index/pay/jsapi_pay?uid="+this.props.userInfo.data.uid+"&price="+this.state.price+"&type="+this.state.id+"&month="+month
                    }else {
                        window.location.href = url+"/index/pay/recharge?pay_type=pay_wechat&money="+this.state.price+"&uid="+this.props.userInfo.data.uid+"&type="+this.state.id+"&month="+month
                    }
                }else if(this.state.value === 4){
                    //金币开通会员
                    console.log(this.state.price,this.props.userInfo.data.gold)
                    if(this.state.id === "001"){
                        month = Number(this.state.price)/5000
                    }else if(this.state.id === "002"){
                        month = Number(this.state.price)/50000
                    }else {
                        month = Number(this.state.price)/100000
                    }
                    if(this.state.price > this.props.userInfo.data.gold){
                        message.warning("金币不足")
                    }else {
                        Api.buyVip({month,type:this.state.id}).then(res => {
                            message.success(res.msg)
                            let setT = setTimeout(()=>{
                                window.location.href = "#/Dashboard/index";
                                clearTimeout(setT)
                            },500)
                        }).catch(res => {
                            message.warning(res.msg)
                        })
                    }
                }else if (this.state.value === 2&&!isWx){
                    window.location.href = url+"/index/pay/recharge?pay_type=pay_alipay&money="+this.state.price+"&uid="+this.props.userInfo.data.uid+"&type="+this.state.id+"&month="+month
                }
            }else {
                if(this.state.value === 3){
                    if(isWx){
                        window.location.href = url+"/index/pay/jsapi_pay?uid="+this.props.userInfo.data.uid+"&price="+this.state.price+"&id="+this.state.id
                    }else {
                        window.location.href = url+"/index/pay/recharge?pay_type=pay_wechat&money="+this.state.price+"&uid="+this.props.userInfo.data.uid+"&id="+this.state.id
                    }
                }else if (this.state.value === 2&&!isWx){
                    window.location.href = url+"/index/pay/recharge?pay_type=pay_alipay&money="+this.state.price+"&uid="+this.props.userInfo.data.uid+"&id="+this.state.id
                }
            }
        }
    }

    onChange(value) {
        if (value.target.value === 4) {
            this.setState({
                price: this.props.match.params.price * 100
            })
        } else {
            this.setState({
                price: this.props.match.params.price
            })
        }
        this.setState({
            value: value.target.value
        })
    }

    render(){
        const data = [
            {value:"1",key:"1",text:"1"},
            {value:"5",key:"5",text:"5"},
            {value:"30",key:"30",text:"30"},
            {value:"50",key:"50",text:"50"},
            {value:"100",key:"100",text:"100"},
            {value:"500",key:"500",text:"500"},
        ];
        const id = this.props.match.params.id;
        return(
            <div className="pay-wrap">
                <HeaderNav name="挑战10秒"/>
                <div className="pay-container">
                    <div className="pay-price">
                        <p>{id === "007"?"退款金额":"充值金额"}</p>
                        <span>{this.state.value === 4?"金":"￥"}<InputNumber disabled={true} value={this.state.price}/>
                            {/*{this.state.id === "0"?*/}
                                {/*<Select defaultValue={this.state.price} onChange={(value)=>{this.setState({price:value})}}>*/}
                                    {/*{*/}
                                        {/*data.map((item) => {*/}
                                            {/*return <Option key={item.key} value={item.value}>{item.text}</Option>*/}
                                        {/*})*/}
                                    {/*}*/}
                                {/*</Select>:*/}
                                {/*<InputNumber disabled={true} value={this.state.price}/>*/}
                            {/*}*/}
                        </span>
                    </div>
                    {
                        id === "007"?null:<RadioGroup onChange={(value)=>this.onChange(value)} defaultValue={this.state.value}>
                        <span>充值方式</span>
                        {/*<div className="pay">*/}
                        {/*<Radio value={1}><span className="pay-name pay1">快捷支付</span></Radio>*/}
                        {/*</div>*/}
                        {/*{*/}
                        {/*isWx?null:<div className="pay">*/}
                        {/*<Radio value={2}><span className="pay-name border-pay pay2">支付宝</span></Radio>*/}
                        {/*</div>*/}
                        {/*}*/}
                            {
                                id !== "001"||id !== "002"||id !== "003"?<div className="pay">
                                    <Radio value={3}><span className="pay-name pay3">微信支付</span></Radio>
                                </div>:null
                            }
                            {
                                id === "001"||id === "002"||id === "003"?<div className="pay">
                                    <Radio value={4}><span className="pay-name pay4">金币支付</span></Radio>
                                </div>:null
                            }
                        </RadioGroup>
                    }
                    <div className="button-operation">
                        <Button onClick={()=>this.payPrice()} className={(this.state.price >= 0.01&&this.state.value)
                        ||id === "007"?"":"disable"} disabled={(!this.state.price||!this.state.value)&&id !== "007"}>下一步</Button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {userInfo} = state;
    return {userInfo}
};
export default connect(mapStateToProps)(PayPage)
// export default PayPage