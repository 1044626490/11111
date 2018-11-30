import Api from '~/until/api';
import wx from 'weixin-js-sdk'

export function jsSdkConfig() {
    Api.shareGetSign({host:"http://10s.times168.net"}).then((response) => {
            // if (response.data.code === 0) {
                /*配置微信jssdk*/
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: response.data.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
            timestamp: response.data.timestamp, // 必填，生成签名的时间戳（10位）
            nonceStr: response.data.nonceStr, // 必填，生成签名的随机串,注意大小写
            signature: response.data.signature,// 必填，签名，见附录1（通过https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign 验证）
            jsApiList: ['ready', 'onMenuShareTimeline', 'onMenuShareAppMessage' ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.error((res)=>{

        })
        wx.ready(() => { //分享给朋友
            wx.onMenuShareAppMessage({
                title: '快来和我一起挑战把', // 分享标题
                desc: '快来和我一起挑战把', // 分享描述
                link: 'http://10s.times168.net', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: '', // 分享图标
                type: 'link', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    // 用户确认分享后执行的回调函数
                    },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    }
            }) //分享到朋友圈

            wx.onMenuShareTimeline({
                title: '快来和我一起挑战把', // 分享标题
                link: 'http://10s.times168.net', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: '', // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    }
            })
        })
    }).catch(function (errors) {

    });
}
