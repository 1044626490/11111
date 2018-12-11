import Api from '~/until/api';
import wx from 'weixin-js-sdk'

export function jsSdkConfig() {
    wx.closeWindow();
    // Api.shareGetSign({host:"http://10s.times168.net"}).then((response) => {
    //
    //         // if (response.data.code === 0) {
    //             /*配置微信jssdk*/
    //     // wx.config({
    //     //     debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //     //     appId: response.data.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
    //     //     timestamp: response.data.timestamp, // 必填，生成签名的时间戳（10位）
    //     //     nonceStr: response.data.nonceStr, // 必填，生成签名的随机串,注意大小写
    //     //     signature: response.data.signature,// 必填，签名，见附录1（通过https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign 验证）
    //     //     jsApiList: ['ready', 'onMenuShareTimeline', 'onMenuShareAppMessage' ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    //     // });
    //     // wx.error((res)=>{
    //     //
    //     // })
    //     wx.ready(() => { //分享给朋友
    //         wx.closeWindow();
    //     })
    // }).catch(function (errors) {
    //
    // });
}
