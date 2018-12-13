import React from "react"
import "./BoxRecord.less"
import {Avatar, Col, Row} from "antd";

class BoxRecord extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            myGold:0,
            boxRecord:[
                {
                    name:"我是冒险家",
                    avatar:"",
                    time:"12.10 12:12:12",
                    gold:19,
                    is:0
                },
                {
                    name:"我是冒险家",
                    avatar:"",
                    time:"12.10 12:12:12",
                    gold:30,
                    is:1
                },
                {
                    name:"我是冒险家",
                    avatar:"",
                    time:"12.10 12:12:12",
                    gold:18,
                    is:0
                },
                {
                    name:"我是冒险家",
                    avatar:"",
                    time:"12.10 12:12:12",
                    gold:17,
                    is:0
                },{
                    name:"我是冒险家",
                    avatar:"",
                    time:"12.10 12:12:12",
                    gold:16,
                    is:0
                }
            ]
        }
    }

    render(){
        return(
            <div className="box-record-wrap">
                <div className="header-wrap">
                    <p>您共抢到</p>
                    <p>{this.state.myGold}<span>金币</span></p>
                    <p><a href="#/Dashboard/TreasureList">点击查看个人纪录</a></p>
                    <span onClick={()=>{window.history.go(-1)}}>关闭</span>
                </div>
                <div className="list-content">
                    <div>
                        <p>宝箱明细</p>
                        <p>已领取5/5人，共100金币</p>
                    </div>
                    <ul>
                        {
                            this.state.boxRecord.map((item, index) => {
                                return <li>
                                    <Row>
                                        <Col span={4}>
                                            <Avatar icon="user" src={item.avatar||""}/>
                                        </Col>
                                        <Col span={13}>
                                            <Row>{item.name}{item.is?<span>手气最佳</span>:null}</Row>
                                            <Row>{item.time}</Row>
                                        </Col>
                                        <Col span={7}>
                                            <Row>{item.gold}金币</Row>
                                        </Col>
                                    </Row>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default BoxRecord
