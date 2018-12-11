import React from "react"
import $ from "jquery"
import "./redPacket.less"
import HeaderNav from "../../../components/headerNav/headerNav";
import TopCarousel from "../../../components/TopCarousel/TopCarousel";
import { Modal, message } from "antd";
import Api from '~/until/api';
import connect from "react-redux/es/connect/connect";

let packet = 0;
let posLeft = 50;
localStorage.setItem("packet",packet)
// let bkt = "00:00:00";
let num = 0;
$(document).on("touchstart",".small",(e)=>{
    if(num >= 1){
        num = 0;
        return false
    }else {
        num++
    }
    let className = e.target.classList[e.target.classList.length-2];
    packet += 5;
    // console.log(5)
    localStorage.setItem("packet",packet);
    $(".num").text(packet);
    e.target.style.cssText = "display: none";
    let setT =setTimeout(()=>{
        num = 0;
        clearTimeout(setT)
    },100)
});
$(document).on("touchstart",".small-middle",(e)=>{
    if(num >= 1){
        num = 0;
        return false
    }else {
        num++
    }
    let className = e.target.classList[e.target.classList.length-2];
    packet += 10;
    // console.log(10)
    localStorage.setItem("packet",packet);
    $(".num").text(packet);
    e.target.style.cssText = "display: none";
    let setT =setTimeout(()=>{
        num = 0;
        clearTimeout(setT)
    },100)
});
$(document).on("touchstart",".middle-middle",(e)=>{
    if(num >= 1){
        num = 0;
        return false
    }else {
        num++
    }
    let className = e.target.classList[e.target.classList.length-2];
    packet += 15;
    // console.log(15)
    localStorage.setItem("packet",packet)
    $(".num").text(packet);
    e.target.style.cssText = "display: none";
    let setT =setTimeout(()=>{
        num = 0;
        clearTimeout(setT)
    },100)
});
$(document).on("touchstart",".big-middle",(e)=>{
    if(num >= 1){
        num = 0;
        return false
    }else {
        num++
    }
    let className = e.target.classList[e.target.classList.length-2];
    packet += 20;
    // console.log(20)
    localStorage.setItem("packet",packet)
    $(".num").text(packet);
    e.target.style.cssText = "display: none";
    let setT =setTimeout(()=>{
        num = 0;
        clearTimeout(setT)
    },100)
})
$(document).on("touchstart",".biger-middle",(e)=>{
    if(num >= 1){
        num = 0;
        return false
    }else {
        num++
    }
    let className = e.target.classList[e.target.classList.length-2];
    packet += 25;
    // console.log(25)
    localStorage.setItem("packet",packet)
    $(".num").text(packet);
    e.target.style.cssText = "display: none";
    let setT =setTimeout(()=>{
        num = 0;
        clearTimeout(setT)
    },100)
})
$(document).on("touchstart",".biger",(e)=>{
    if(num >= 1){
        num = 0;
        return false
    }else {
        num++
    }

    let className = e.target.classList[e.target.classList.length-2];
    packet += 30;
    // console.log(30)
    localStorage.setItem("packet",packet);
     Api.sysSendMessage({uid:this.state.uid,type:"抢得",name:"30金大红包"});
    $(".num").text(packet);
    e.target.style.cssText = "display: none";
    let setT =setTimeout(()=>{
        num = 0;
        clearTimeout(setT)
    },100)
});
// let timestamp1 = null;
class redPacket extends React.Component{
    constructor(props) {
        super(props);
        this.setI = null;
        this.setI1 = null;
        this.state = {
            uid:1,
            hour:0,
            min:0,
            sec:0,
            isOpenModel:false,
            isActivity:true,
            type:"【下一场红包雨将于20:00开始】",
        }
    }

    componentWillMount(){
        Api.getTime().then(res => {
            let timestamp1 = res.data*1000;
            let end = Date.parse(new Date("2018-12-09 20:30:10"));
            if(Number(timestamp1) >= Number(end)){
                this.setState({
                    isActivity:false,
                    type:"【活动结束,等待下次活动】"
                })
            }else {
                this.backTime(false,timestamp1);
            }
        }).catch(err => {
            message.warning("网络延迟，获取时间失败")
            // let timestamp1 =Date.parse(new Date());
            // this.backTime(false,timestamp1);
        });
    }

    backTime(isStart,timestamp1){
        // if(timestamp1 === null){
        //     timestamp1 =Date.parse(new Date());
        // }
        let today = new Date(new Date().toLocaleDateString()).getTime();
        // timestamp1 = today + 71990000;
        let oClock = today + 72000000;
        this.setState({
            isOpenModel:false
        });
        if(timestamp1 > oClock+10000||(isStart&&timestamp1 > oClock)){
            oClock = today + 72900000;
            this.setState({
                type:"【下一场红包雨将于20:15开始】"
            });
            if(timestamp1 > oClock+10000||(isStart&&timestamp1 > oClock)){
                oClock = today + 73800000;
                this.setState({
                    type:"【下一场红包雨将于20:30开始】"
                });
                if(timestamp1 > oClock+10000||(isStart&&timestamp1 > oClock)){
                    oClock = today+ 158400000;
                    this.setState({
                        type:"【下一场红包雨将于次日20:00开始】"
                    });
                }
            }
        }
        let backtime = Math.round((oClock - timestamp1)/1000);
        if(backtime <= 0){
            this.redPacketDown(Math.abs(backtime),oClock,today);
            this.setState({
                hour:0,min:0,sec:0
            })
        }else {
            let hour = parseInt((backtime/3600));
            let min = parseInt((backtime - hour*3600)/60);
            let sec = parseInt(backtime - hour*3600 - min*60);
            this.setI1 = setInterval(()=>{
                if(min === 0&&sec === 0){
                    min = 60;
                    hour--
                }
                if(sec === 0){
                    sec = 60;
                    min--
                }
                sec--;
                this.setState({
                    hour,min,sec
                });
                if(hour === 0&&min === 0&&sec === 0){
                    this.redPacketDown(10,oClock,today);
                    clearInterval(this.setI1)
                }
            },1000)
        }
    }

    componentWillUnmount(){
        clearInterval(this.setI);
        clearInterval(this.setI1);
        packet = 0;
        localStorage.setItem("packet",packet)
    }

    redPacketDown(time,oClock,today){
        let count = 0;
        clearInterval(this.setI);
        clearInterval(this.setI1);
        packet = 0;
        localStorage.setItem("packet",packet);
        this.setI = setInterval(()=>{
            count++;
            let rad = Math.random().toFixed(4)*100;
            let left = Math.random()*85;
            // do {
            //     left = Math.random()*85
            // } while (Math.abs(left - posLeft) > 20);
            // for(let i=0;i<100;i++){
            //     left = Math.random()*85;
            //     if(Math.abs(left - posLeft) > 20){
            //         posLeft = left;
            //         break
            //     }
            // }
            if(rad <= 0.02){
                $(".red-packet-wrap").append("<div class='big biger biger"+count+" red-packet-item'></div>");
                let dom = $(".biger"+count);
                let sp = Math.random()*500;
                let add = Math.random();
                let speed = 1500;
                if(add > 0.5){
                    speed = speed +sp;
                }else {
                    speed = speed - sp;
                }
                dom.css({
                    left: left-5+"%"
                });
                dom.animate({
                    top: "100%"
                },speed)
                let setT = setTimeout(()=>{
                    $(".big"+count).remove()
                    clearTimeout(setT)
                },speed)
                dom.onclick = () => {
                    let num = this.state.num + 50;
                    this.setState({
                        num
                    })
                }
            }else if(rad <= 85){
                $(".red-packet-wrap").append("<div class='small smaller"+count+" red-packet-item'></div>");
                let dom = $(".smaller"+count);
                let sp = Math.random()*500;
                let add = Math.random();
                dom.css({
                    left: left+"%"
                });
                let speed = 2500;
                if(add > 0.5){
                    speed = speed +sp;
                }else {
                    speed = speed - sp;
                }
                dom.animate({
                    top: "100%"
                },speed);
                let setT = setTimeout(()=>{
                    dom.remove();
                    clearTimeout(setT)
                },speed)
            }else if(rad <= 95){
                $(".red-packet-wrap").append("<div class='middle middle-middle middle"+count+" red-packet-item'></div>");
                let dom = $(".middle"+count);
                let sp = Math.random()*500;
                let add = Math.random();
                dom.css({
                    left: left+"%",
                });
                let speed = 1500;
                if(add > 0.5){
                    speed = speed +sp;
                }else {
                    speed = speed - sp;
                }
                dom.animate({
                    top: "100%"
                },speed)
                let setT = setTimeout(()=>{
                    dom.remove();
                    clearTimeout(setT)
                },speed)
            }else{
                $(".red-packet-wrap").append("<div class='big biger-middle biger-middle"+count+" red-packet-item'></div>");
                let dom = $(".biger-middle"+count);
                let sp = Math.random()*500;
                let add = Math.random();
                dom.css({
                    left: left+"%",
                });
                let speed = 1500;
                if(add > 0.5){
                    speed = speed +sp;
                }else {
                    speed = speed - sp;
                }
                dom.animate({
                    top: "100%"
                },speed)
                let setT = setTimeout(()=>{
                    dom.remove();
                    clearTimeout(setT)
                },speed)
            }
            if(count >= time*5||count >= 50||packet >= 300){
                console.log(count);
                clearInterval(this.setI);
                clearInterval(this.setI1);
                let setI = setInterval(()=>{
                    if(!$(".red-packet-item").is(":animated")){
                        this.setState({
                            isOpenModel:true
                        });
                        let params = {uid:this.state.uid,money:packet};
                        if(oClock === today+72000000){
                            params.type = 1;
                        }else if(oClock === today+72900000){
                            params.type = 2;
                        }else {
                            params.type = 3;
                        }
                         Api.redEnvelope(params);
                        clearInterval(setI)
                    }
                },1000)
            }
        },200);
    }

    getGold(){
        let count = 1;
        let setT = setInterval(()=>{
            $(".today-signs"+count).css({
                display: "inline-block"
            }).animate({
                top: "10%",
                left: "90%",
            }).animate({
                opacity: 0,
            },200).animate({
                top: "50%",
                left: "50%",
                display: "none",
            },0);
            if(count === 17){
                clearInterval(setT);
                let setT1 = setTimeout(()=>{
                    Api.getTime().then(res => {
                        let timestamp1 = res.data*1000;
                        let end =Date.parse(new Date("2018-12-02 20:30:10"));
                        if(Number(timestamp1) >= Number(end)){
                            this.setState({
                                isActivity:false,
                                type:"【活动结束,等待下次活动】"
                            })
                        }else {
                            this.backTime(false,timestamp1);
                        }
                    }).catch(err => {
                        message.warning("网络延迟，获取时间失败")
                        // let timestamp1 =Date.parse(new Date());
                        // this.backTime(false,timestamp1);
                    });
                    clearTimeout(setT1)
                },2000)
            }
            count++
        },50)
    }

    render(){
        return(
            <div className="red-packet-wrap">
                <audio src={require("../../../layouts/video/bg2.mp3")}
                       autoPlay={true}
                       loop={true} ></audio>
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
                <HeaderNav name="挑战10秒"/>
                {/*<TopCarousel />*/}
                {
                    this.state.hour||this.state.min||this.state.sec?<div className="back-red-wrap">
                        <p className="red-type">
                            {this.state.type}
                        </p>
                        <div className="back-time">
                            {
                                this.state.isActivity?<span>
                                    {this.state.hour<10?"0"+this.state.hour:this.state.hour}:&nbsp;
                                    {this.state.min<10?"0"+this.state.min:this.state.min}:&nbsp;
                                    {this.state.sec<10?"0"+this.state.sec:this.state.sec}
                                </span>:<span>活动结束</span>
                            }
                        </div>
                        <div className="float-red">
                            <img className="float1" src={require("../../../layouts/activity/r1.png")} alt=""/>
                            <img className="float2" src={require("../../../layouts/activity/r2.png")} alt=""/>
                            <img className="float3" src={require("../../../layouts/activity/r3.png")} alt=""/>
                            <img className="big-red" src={require("../../../layouts/activity/red.png")} alt=""/>
                        </div>
                    </div>:<span key={Math.random()} className="num">{packet}</span>
                }
                {
                    this.state.isOpenModel?<Modal entered={true} visible={this.state.isOpenModel}
                                                  wrapClassName={"all-modal red-packet"} mask={false}
                                                  closable={false} destroyOnClose={true}>
                        <div className="player-info">
                            <span className="close" onClick={()=>{
                                packet = 0;
                                Api.getTime().then(res => {
                                    let timestamp1 = res.data*1000;
                                    let end =Date.parse(new Date("2018-12-02 20:30:10"));
                                    if(Number(timestamp1) >= Number(end)){
                                        this.setState({
                                            isActivity:false,
                                            type:"【活动结束,等待下次活动】"
                                        })
                                    }else {
                                        this.backTime(false,timestamp1);
                                    }
                                }).catch(err => {
                                    message.warning("网络延迟，获取时间失败")
                                });
                            }
                            }
                            >
                            </span>
                            <p>恭喜您，本次抢到<br/><b>{packet}</b>枚</p>
                            <span onClick={()=>this.getGold()} className="get-packet">
                            </span>
                        </div>
                    </Modal>:null
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {userInfo} = state;
    return {userInfo}
};
export default connect(mapStateToProps)(redPacket)
// export default redPacket