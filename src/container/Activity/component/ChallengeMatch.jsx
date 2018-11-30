import React from "react"
import "./ChallengeMatch.less"
import HeaderNav from "../../../components/headerNav/headerNav";
import { Button } from "antd"

class ChallengeMatch extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        }
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
                    <Button></Button>
                    <Button></Button>
                </div>
            </div>
        )
    }
}

export default ChallengeMatch