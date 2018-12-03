import React from "react"
import BottomMenu from "../../components/bottomMenu/bottonMenu";
import "./Activity.less"
import HeaderNav from "../../components/headerNav/headerNav";
import Api from '~/until/api';
import { Button, message } from "antd"
import TopCarousel from "../../components/TopCarousel/TopCarousel";

class Activity extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data:[
                // {
                //     startTime:"2018-11-23 18:00:00",
                //     img:require("../../layouts/activity/acticon.png"),
                //     name:"充值钜惠",
                //     info:"11月23日至12月1日，充值额外送大量金币。",
                //     value:"参加活动",
                //     isActivity:true,
                //     type: 1,
                //     callback:(item)=>{item.isActivity?window.location.href = "#/Dashboard/Recharge":null}
                // },
                {
                    startTime:"2018-12-03 18:00:00",
                    img:require("../../layouts/activity/sliver.png"),
                    name:"今日福利",
                    info:"玩家每日登录游戏，均可免费领取2000银币。银币可用于体验场试玩游戏。",
                    value:"领取银币",
                    isActivity:true,
                    type: 2,
                    callback:(item)=>{item.isActivity?Api.receiveSilver().then(res => {message.success(res.msg)}):null}
                },
                {
                    startTime:"2018-12-03 18:00:00",
                    img:require("../../layouts/activity/into.png"),
                    name:"坐以待币",
                    info:"12月3日至12月9日，每天20:00、20:15、20:30各一场红包雨。",
                    value:"参加活动",
                    isActivity:true,
                    type: 1,
                    callback:(item)=>{item.isActivity?window.location.href = "#/Dashboard/redPacket":null}
                },
                // {
                //     startTime:"2018-11-23 18:00:00",
                //     img:require("../../layouts/activity/challenge.png"),
                //     name:"挑战赛",
                //     info:"所有玩家均可免费报名参加，比赛结束后前十名可得大量金币奖励。注：必须赛前报名",
                //     value:"免费报名",
                //     isActivity:true,
                //     type: 1,
                //     callback:()=>{window.location.href = "#/Dashboard/ChallengeMatch"}
                // },
            ],
            // isActivity:[true,true,true]
        }
    }

    componentDidMount(){
        this.getMyCoupon();
        let time = Date.parse(new Date());
        let end =Date.parse(new Date("2018-12-09"));
        let data = this.state.data;
        if(Number(time) >= Number(end)){
            data[1].isActivity = false;
            this.setState({
                data
            })
        }
    }

    getMyCoupon(){
        Api.isReceiveSilver().then(res => {
            let data = this.state.data;
            if(res.status === 0){
                data[0].isActivity = true
            }else {
                data[0].isActivity = false
            }
            this.setState({
                data
            })
        })
        // Api.coupon().then((res) => {
        // }).catch((err)=>{
        // })
    }

    render(){
        const data = this.state.data
        return(
            <div className="Activity-wrap">
                <HeaderNav name="最新活动"/>
                {/*<TopCarousel />*/}
                <div className="my-active-wrap">
                    <ul>
                        {
                            data.map((item, index) => {
                                return <li key={index}>
                                    <div onClick={()=>item.callback(item)} className={item.isActivity?
                                        "item-wrap-container":item.type === 1?"item-wrap-container over":
                                            item.type === 2?"item-wrap-container over1":""}>
                                        <p>{item.startTime}</p>
                                        <div>
                                            <span><img src={item.img} alt=""/></span>
                                            <span>
                                        <span>{item.name}</span>{item.info}
                                                {/*，每天12:00、20:00*/}
                                    </span>
                                        </div>
                                        {item.isActivity?<p><a>{item.value} ></a></p>:null}
                                    </div>
                                </li>
                            })
                        }
                        {/*<li>*/}
                            {/*<div onClick={()=>{this.state.isActivity[0]?window.location.href = "#/Dashboard/Recharge":null}} className={this.state.isActivity[0]?"item-wrap-container":"item-wrap-container over"}>*/}
                                {/*<p>2018-11-23 18:00:00</p>*/}
                                {/*<div>*/}
                                    {/*<span><img src={require("../../layouts/activity/acticon.png")} alt=""/></span>*/}
                                    {/*<span>*/}
                                        {/*[充值钜惠]11月23日至12月1日，充值额外送大量金币。*/}
                                        {/*/!*，每天12:00、20:00*!/*/}
                                    {/*</span>*/}
                                {/*</div>*/}
                                {/*{this.state.isActivity[0]?<p><a>参加活动 ></a></p>:null}*/}
                            {/*</div>*/}
                        {/*</li>*/}
                        {/*<li>*/}
                            {/*<div onClick={()=>{this.state.isActivity[1]?window.location.href = "#/Dashboard/redPacket":null}} className={this.state.isActivity[1]?"item-wrap-container":"item-wrap-container over"}>*/}
                                {/*<p>2018-11-23 18:00:00</p>*/}
                                {/*<div>*/}
                                    {/*<span><img className="into" src={require("../../layouts/activity/into.png")} alt=""/></span>*/}
                                    {/*<span>*/}
                                        {/*[坐以待币]11月23日至12月1日，每天20:00、20:15、20:30各一场红包雨。*/}
                                    {/*</span>*/}
                                {/*</div>*/}
                                {/*{this.state.isActivity[1]?<p><a>参加活动 ></a></p>:null}*/}
                            {/*</div>*/}
                        {/*</li>*/}
                        {/*<li>*/}
                            {/*<div onClick={()=>{this.state.isActivity[2]?null:null}} className={this.state.isActivity[2]?"item-wrap-container":"item-wrap-container over"}>*/}
                                {/*<p>2018-11-23 18:00:00</p>*/}
                                {/*<div>*/}
                                    {/*<span><img className="into" src={require("../../layouts/activity/sliver.png")} alt=""/></span>*/}
                                    {/*<span>*/}
                                        {/*[今日福利]玩家每日登录游戏，均可免费领取2000银币。银币可用于体验场试玩游戏。*/}
                                    {/*</span>*/}
                                {/*</div>*/}
                                {/*{this.state.isActivity[2]?<p><a>领取银币 ></a></p>:null}*/}
                            {/*</div>*/}
                        {/*</li>*/}
                        {/*<li>*/}
                            {/*<div className="item-wrap-container over">*/}
                                {/*<p>2018-11-20 11:11:11</p>*/}
                                {/*<div>*/}
                                    {/*<span><img className="into" src={require("../../layouts/activity/into.png")} alt=""/></span>*/}
                                    {/*<span>*/}
                                        {/*[优惠名]2018.11.20-2018.12.01期间，每天12:00、20:00*/}
                                    {/*</span>*/}
                                {/*</div>*/}
                                {/*/!*<p><a href="#/Dashboard/redPacket">参加活动 ></a></p>*!/*/}
                            {/*</div>*/}
                        {/*</li>*/}
                        {/*<li>*/}
                            {/*<div className="item-wrap">*/}
                                {/*<div>*/}
                                    {/*<p>￥<span>50</span>体验券</p>*/}
                                    {/*<span>挑战10s体验券</span>*/}
                                {/*</div>*/}
                                {/*<div>*/}
                                    {/*<p>使用时间</p>*/}
                                    {/*<p>09.10-09.11</p>*/}
                                    {/*<Button>立即使用</Button>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</li>*/}
                        {/*<li>*/}
                            {/*<div className="item-wrap">*/}
                                {/*<div>*/}
                                    {/*<p>￥<span>100</span>体验券</p>*/}
                                    {/*<span>新人下单体验券</span>*/}
                                {/*</div>*/}
                                {/*<div>*/}
                                    {/*<p>使用时间</p>*/}
                                    {/*<p>09.10-09.11</p>*/}
                                    {/*<Button>立即使用</Button>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</li>*/}
                    </ul>
                </div>
                {/*<BottomMenu />*/}
            </div>
        )
    }
}

export default Activity