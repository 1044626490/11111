import React from "react"
import "whatwg-fetch";
import "./PayPriceOver.less"
import fetchJsonp from "fetch-jsonp"

let ua = navigator.userAgent.toLowerCase();//获取判断用的对象
class PayPriceOver extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            price:this.props.match.params.price,
        }
    }

    componentDidMount(){
        this.setState({
            price:this.props.match.params.price,
            id:this.props.match.params.id
        });
        this.payPrice(this.props.match.params.price,this.props.match.params.id)
    }

    payPrice = async (price,uid) =>{
        // console.log(price,uid)
        if(window.location.hash.indexOf("#/Dashboard/PayPriceOver") >= 0){
            let formData = new FormData();
            let params = {price,uid:10052};
            for (let key in params) {
                (typeof params[key]) === 'object' && key !== 'file' ? params[key] = JSON.stringify(params[key]) : params[key];
                params[key] !== undefined && formData.append(key, params[key]);
            }
            let promise = await fetchJsonp("http://api.times168.net/jsapi_pay?uid="+uid+"&price="+price,
                {
                    jsonpCallbackFunction: 'portraitCallBack'
                });
            let data = promise.json();
            data.then(data => {
                localStorage.setItem("payInfo",JSON.parse(data))
            }).catch(err => {
            })
        }
        //调用微信JS api 支付
    }

    render(){
        return(
            <div className="pay-over-wrap">
                <div>
                    <p>支付订单创建成功，1分钟内支付有效</p>
                </div>
            </div>
        )
    }
}

export default PayPriceOver