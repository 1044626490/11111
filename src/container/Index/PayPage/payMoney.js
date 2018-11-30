// let WeixinJSBridge = undefined;
// import WeixinJSBridge from 'weixin-js-sdk'
export default function callpay(data)
{
    if (typeof WeixinJSBridge == "undefined"){
        if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
        }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', jsApiCall);
            document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
        }
    }else{
        jsApiCall(data);
    }
}

function jsApiCall(data)
{
    WeixinJSBridge.invoke(
        'getBrandWCPayRequest', data,
        function(res){
            WeixinJSBridge.log(res.err_msg);
            //alert('err_code:'+res.err_code+'err_desc:'+res.err_desc+'err_msg:'+res.err_msg);
            //alert(res.err_desc);

            if(res.err_msg == "get_brand_wcpay_request:ok"){
                alert("支付成功!");
                window.location.href="{:url('home/user/my_info')}";
            }else if(res.err_msg == "get_brand_wcpay_request:cancel"){
                window.location.href="{:url('home/user/member_center')}";
            }else{
                alert("支付失败!");
                window.location.href="{:url('home/user/member_center')}";
            }
        }
    );
}