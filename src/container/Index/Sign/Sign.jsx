import React from "react"
import {Icon, Modal, Progress, message} from "antd";
import "./Sign.less"
import $ from "jquery";
import Api from '~/until/api';

class Sign extends React.Component{
    constructor(props) {
        super(props);
        this.setI = null;
        this.state = {
            num:3,
            signInfo:{},
            signDay:[],
            isGetGold:false
        }
    }

    componentDidMount() {
        if(!this.props.hasSign){
            let setT = setTimeout(() => {
                $(".fireworks_f").toggleClass("fireworks-active")
                let count = 2;
                let setI = setInterval(() => {
                    if (count === 0) {
                        $(".fireworks_f").removeClass("fireworks-active")
                        clearInterval(setI)
                    }
                    $(".fireworks_f").toggleClass("fireworks-active")
                    count--;
                    setTimeout(() => {
                        $(".fireworks_f").toggleClass("fireworks-active")
                    }, 100)
                }, 2000);
                clearTimeout(setT)
            }, 0);
            let setT1 = setTimeout(() => {
                $(".fireworks_s").toggleClass("fireworks-actives")
                let count = 2;
                let setI1 = setInterval(() => {
                    if (count === 0){
                        $(".fireworks_s").removeClass("fireworks-actives")
                        clearInterval(setI1)
                    }
                    $(".fireworks_s").css({

                    })
                    $(".fireworks_s").toggleClass("fireworks-actives")
                    count--;
                    setTimeout(() => {
                        $(".fireworks_s").toggleClass("fireworks-actives")
                    }, 100)
                }, 1500);
                clearTimeout(setT1)
            }, 500);
            let setT2 = setTimeout(() => {
                $(".fireworks_t").toggleClass("fireworks-active")
                let count = 2;
                let setI2 = setInterval(() => {
                    if (count === 0) {
                        $(".fireworks_t").removeClass("fireworks-active")
                        clearInterval(setI2)
                    }
                    $(".fireworks_t").toggleClass("fireworks-active")
                    count--;
                    setTimeout(() => {
                        $(".fireworks_t").toggleClass("fireworks-active")
                    }, 100)
                }, 2000);
                clearTimeout(setT2)
            }, 1000);
            let setT3 = setTimeout(() => {
                $(".fireworks_fo").toggleClass("fireworks-active")
                let count = 2;
                let setI3 = setInterval(() => {
                    if (count === 0) {
                        $(".fireworks_fo").removeClass("fireworks-active")
                        clearInterval(setI3)
                    }
                    $(".fireworks_fo").toggleClass("fireworks-active")
                    count--;
                    setTimeout(() => {
                        $(".fireworks_fo").toggleClass("fireworks-active")
                    }, 100)
                }, 2000);
                clearTimeout(setT3)
            }, 1500);
        }
        // $(".fireworks_f,.fireworks_s,.fireworks_t,.fireworks_fo").animate(
        //     {
        //         transform:"scale(1)"
        //     },300).delay(500).animate()
        Api.signList().then(res => {
            let signDay = res.data.sign_data.map((item) => {
                return item.date
            });
            this.setState({
                signInfo:res.data,
                signDay
            });
            // if($('.today-sign').offset().top !== undefined){
                const winHeight = $('.today-sign').length >0?$('.today-sign').offset().top - $(document).scrollTop():0;
                const winWidth = $('.today-sign').length >0?$('.today-sign').offset().left - $(document).scrollLeft():0;
                if(winHeight !== 0 && winWidth !== 0){
                    for(let i=1;i<18;i++){
                        let left = winWidth + Math.random()*20;
                        let top = winHeight + Math.random()*20;
                        let name = '.today-signs'+i;
                        $(name).css({
                            left,
                            top
                        })
                    }
                }
                $('.get-golds').css({
                    left: winWidth,
                    top: winHeight-20
                })
            // }
        })
    }

    signToday = () => {
        let count = 0;
        let setI = setInterval(()=>{
            count++;
            let name = '.today-signs'+count;
            const winHeight = $('.my-money-item-pay').offset().top - $(document).scrollTop();
            const winWidth = $('.my-money-item-pay').offset().left - $(document).scrollLeft();
            $(name).css({
                display: "inline-block",
            }).animate({
                left:winWidth,
                top: winHeight,
            },600);
            let setT = setTimeout(()=>{
                $(name).css({
                    display: "none"
                });
                clearTimeout(setT)
            },700);
            if(count === 17){
                Api.userSign().then( res =>{
                    // message.info(res.msg);
                    // let signInfo = this.state.signInfo;
                    // signInfo.is_sign = 1;
                    // this.setState({
                    //     signInfo
                    // })
                    $('.get-golds').text("+"+res.data.gold)
                        .delay(100).animate({
                        marginTop:"-8vw",
                        opacity: 1,
                    },1000).delay(300).animate({
                        opacity: 0
                    },300).delay(100)
                    Api.signList().then(res => {
                        let signDay = res.data.sign_data.map((item) => {
                            return item.date
                        });
                        this.setState({
                            signInfo:res.data,
                            signDay
                        });
                        this.props.getUserInfo();
                    });
                }).catch( err =>{
                    message.info(err.msg)
                })
                clearInterval(setI)
            }
        },50);
    }

    render(){
        const date1 = [1,2,3,4,5,6,7];
        const date2 = [14,13,12,11,10,9,8];
        const date3 = [15,16,17,18,19,20,21];
        const date4 = [28,27,26,25,24,23,22];
        let date5 = [];
        for(let i = 29;i<=this.state.signInfo.total_day;i++){
            date5.push(i);
        }
        if(this.state.signInfo.total_day){
            setTimeout(()=>{
            },100)
        }
        const today = this.state.signInfo.is_sign?Number(this.state.signInfo.today)+1:Number(this.state.signInfo.today);
        const total_day = Number(this.state.signInfo.total_day);
        let line_first = 36;
        let line1 = null;
        let line2 = null;
        let line3 = null;
        let line4 = null;
        let line5 = null;
        let line6 = null;
        let line7 = null;
        let line8 = line_first-((total_day-26)*8);
        let line8_right = (31-total_day)*8+34.8;
        if(today <= 7){
            line1 = 62.93 - (today*8);
        }else if(today > 7){
            line1 = 0;
            if(today <= 11){
                line2 = 35.07-((today - 7)*8);
            }else if(today > 11){
                line2 = 0;
                if(today <= 14){
                    line3 = 35.07-((today-11)*8)
                }else if(today > 14){
                    line3 = 0;
                    if(today <= 18){
                        line4 = 35.07-((today-14)*8)
                    }else if(today >18){
                        line4 = 0;
                        if(today <= 21){
                            line5 = 35.07-((today-18)*8)-4
                        }else if(today > 21){
                            line5 = 0;
                            if(today <= 25){
                                line6 = 35.07-((today-21)*8)
                            }else if(today >25){
                                line6 = 0;
                                if(today <= 28){
                                    line7 = 35.07-((today-25)*8)
                                }else if(today > 28) {
                                    line7 = 0;
                                    line8 = line_first - ((today - 26) * 8)
                                    if(today >= total_day){
                                        line8 = 0
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return(
            <div>
                <span className="today-signs1"></span>
                <span className="today-signs2"></span>
                <span className="today-signs3"></span>
                <span className="today-signs4"></span>
                <span className="today-signs5"></span>
                <span className="today-signs6"></span>
                <span className="today-signs7"></span>
                <span className="today-signs8"></span>
                <span className="today-signs9"></span>
                <span className="today-signs10"></span>
                <span className="today-signs11"></span>
                <span className="today-signs12"></span>
                <span className="today-signs13"></span>
                <span className="today-signs14"></span>
                <span className="today-signs15"></span>
                <span className="today-signs16"></span>
                <span className="today-signs17"></span>
                <span className="get-golds">123123</span>
                <Modal entered={true} visible={this.props.isOpenSign}  wrapClassName={"all-modal sign-in-wrap"}
                       closable={false} destroyOnClose={true}>
                    <span className="fireworks_f"><img src={require("../../../layouts/image/01.png")} alt=""/></span>
                    <span className="fireworks_s"><img src={require("../../../layouts/image/02.png")} alt=""/></span>
                    <span className="fireworks_t"><img src={require("../../../layouts/image/03.png")} alt=""/></span>
                    <span className="fireworks_fo"><img src={require("../../../layouts/image/04.png")} alt=""/></span>
                    <Icon className="close-modal" onClick={this.props.closeSign} type="close" theme="outlined" />
                    <div className="player-info">
                        <div className="content">
                            <div className="line-box">
                                <div className="number">
                                    <div className="top-num">
                                        {
                                            date1.map((item , index) => {
                                                return <span key={index}
                                                    className={this.state.signInfo.today < item?"":today === item&&
                                                        !this.state.signInfo.is_sign?"today-sign":
                                                            this.state.signDay.indexOf(item) !== -1?"has-sign": "not-sign"
                                                    }
                                                             onClick={today === item&& !this.state.signInfo.is_sign?(e)=>this.signToday(e):null}
                                                >{item}</span>
                                            })
                                        }
                                    </div>
                                    <div className="bottom-num">
                                        {
                                            date2.map((item , index) => {
                                                return <span key={index}
                                                    className={this.state.signInfo.today < item?"":today === item&&
                                                    !this.state.signInfo.is_sign?"today-sign":
                                                        this.state.signDay.indexOf(item) !== -1?"has-sign": "not-sign"
                                                    }
                                                             onClick={today === item&& !this.state.signInfo.is_sign?(e)=>this.signToday(e):null}
                                                >{item}</span>
                                            })
                                        }
                                    </div>
                                </div>
                                <div style={line1 === 0?{width: 0,borderRightWidth: 0}:{width:line1+"vw"}} className="curve-top">
                                </div>
                                <div style={line1 === 0?{width:line2+"vw",borderRadius: 0,borderRightWidth: 0}:{width:line2+"vw"}} className="curve-small-right-bottom">
                                </div>
                            </div>
                            <div className="line-box">
                                <div style={line3 === 0?{width: 0,borderLeftWidth: 0}:{width:line3+"vw"}} className="curve-small-left-top">
                                </div>
                                <div style={line3 === 0?{width: line4+"vw",borderRadius: 0,borderLeftWidth: 0}:{width: line4+"vw"}} className="curve-small-left-bottom">
                                </div>
                                <div className="number">
                                    <div className="bottom-num">
                                        {
                                            date3.map((item , index) => {
                                                return <span key={index}
                                                    className={this.state.signInfo.today < item?"":today === item&&
                                                    !this.state.signInfo.is_sign?"today-sign":
                                                        this.state.signDay.indexOf(item) !== -1?"has-sign": "not-sign"
                                                    }
                                                             onClick={today === item&& !this.state.signInfo.is_sign?(e)=>this.signToday(e):null}
                                                >{item}</span>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="line-box">
                                <div style={line5 === 0?{width: 0,borderRightWidth: 0}:{width:line5+"vw"}} className="curve-small-right-top">
                                </div>
                                <div style={line5 === 0?{width: line6+"vw",borderRadius: 0,borderRightWidth: 0}:{width: line6+"vw"}} className="curve-small-right-bottom">
                                </div>
                                <div className="number">
                                    <div className="bottom-num">
                                        {
                                            date4.map((item , index) => {
                                                return <span key={index}
                                                    className={this.state.signInfo.today < item?"":today === item&&
                                                    !this.state.signInfo.is_sign?"today-sign":
                                                        this.state.signDay.indexOf(item) !== -1?"has-sign": "not-sign"
                                                    }
                                                             onClick={today === item&& !this.state.signInfo.is_sign?(e)=>this.signToday(e):null}
                                                >{item}</span>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="line-box">
                                <div style={line7 === 0?{width: 0,borderLeftWidth: 0}:{width:line7+"vw"}} className="curve-small-left-top">
                                </div>
                                <div style={line7 === 0?{width: line8+"vw",borderRadius: 0,borderLeftWidth: 0,right:line8_right+"vw"}:{width: line8+"vw",right:line8_right+"vw"}} className="curve-small-left-bottom">
                                </div>
                                <div className="number">
                                    <div className="bottom-num">
                                        {
                                            date5.map((item , index) => {
                                                return <span key={index}
                                                    className={this.state.signInfo.today < item?"":today === item&&
                                                    !this.state.signInfo.is_sign?"today-sign":
                                                        this.state.signDay.indexOf(item) !== -1?"has-sign": "not-sign"
                                                    }
                                                             onClick={today === item&& !this.state.signInfo.is_sign?(e)=>this.signToday(e):null}
                                                >{item}</span>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sign-progress">
                            <div className="gift-item">
                                <ul>
                                    <li><img src={this.state.signDay.length >= 3?require("../../../layouts/image/has_gift2.png"):require("../../../layouts/image/gift.png")} alt=""/></li>
                                    <li><img src={this.state.signDay.length >= 7?require("../../../layouts/image/has_gift2.png"):require("../../../layouts/image/gift.png")} alt=""/></li>
                                    <li><img src={this.state.signDay.length >= 10?require("../../../layouts/image/has_gift2.png"):require("../../../layouts/image/gift.png")} alt=""/></li>
                                    <li><img src={this.state.signDay.length >= 15?require("../../../layouts/image/has_gift2.png"):require("../../../layouts/image/gift.png")} alt=""/></li>
                                    <li><img src={this.state.signDay.length >= 20?require("../../../layouts/image/has_gift2.png"):require("../../../layouts/image/gift.png")} alt=""/></li>
                                    <li><img src={this.state.signDay.length >= 25?require("../../../layouts/image/has_gift.png"):require("../../../layouts/image/big_gift.png")} alt=""/></li>
                                </ul>
                            </div>
                            <ul className="progress-circle">
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                            <Progress successPercent={(this.state.signDay.length/this.state.signInfo.total_day).toFixed(2)*100} showInfo={false}/>
                            <ul>
                                <li><span>3天</span></li>
                                <li><span>7天</span></li>
                                <li><span>10天</span></li>
                                <li><span>15天</span></li>
                                <li><span>20天</span></li>
                                <li><span>25天</span></li>
                            </ul>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Sign