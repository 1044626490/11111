import React from "react"
import "./ChallengeMatch.less"
import HeaderNav from "../../../components/headerNav/headerNav";
import {Button, message} from "antd"
import connect from "react-redux/es/connect/connect";
import Api from '~/until/api';

let timestamp1;
class ChallengeMatch extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    intoActiveRoom(){
        Api.getTime().then(res => {
            timestamp1 = res.data*1000;
        }).catch(err => {
            message.warning("网络延迟，获取时间失败");
            return false
        });
        let myDate = new Date();
        let day = myDate.getDate(); //获取当前日(1-31)
        let today = new Date(new Date().toLocaleDateString()).getTime();
        let next = 30;
        let month = myDate.getMonth()+1;
        let year = myDate.getFullYear();
        if(month === 2){
            if((year%4===0&&year%100!==0)||year%400===0){
                next = 28
            }else {
                next = 29
            }
        }
        if(day === 15&&day === next){
            if(timestamp1 <= today + 75600000){
                window.location.href = "#/Dashboard/ActivityRoom"
            }
        }else if(day === 16&&day === 1){
            if(timestamp1 >= today + 72000000){
                window.location.href = "#/Dashboard/ActivityRoom"
            }
        }else {
            message.info("不在比赛时间内")
        }
    }

    joinMatch(){

    }

    render(){
        const rule = ["萨达所大所多多多多多多多多多多多撒大叔大婶大所撒大大大大多多多多多","少时诵诗书所所所所所所","圣诞袜王大伟大洼大队"]
        return(
            <div className="challenge-match-wrap">
                <HeaderNav name="挑战赛"/>
                <div className="challenge-img">
                    <img src={require("../../../layouts/image/challenge/img.png")} alt=""/>
                </div>
                <div className="rule-challenge">
                    <h2>【参赛规则】</h2>
                    <ul>
                        {
                            rule.map((item, index) => {
                                return <li key={index}>
                                    <p>{item}</p>
                                </li>
                            })
                        }
                    </ul>
                </div>
                <div className="operation">
                    <Button onClick={()=>this.intoActiveRoom()}></Button>
                    <Button onClick={()=>this.joinMatch()}></Button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    const {userInfo} = state;
    return {userInfo}
};
export default connect(mapStateToProps)(ChallengeMatch)