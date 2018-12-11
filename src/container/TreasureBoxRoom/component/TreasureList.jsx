import React from "react"
import "./TreasureList.less"
import { Tabs, Row, Col, Avatar } from 'antd';

const TabPane = Tabs.TabPane;
class TreasureList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            myBoxList:{
                totalGet:10,
                totalGetGold:1500,
                totalPut:10,
                totalPutGold:2000,
                IGot:[
                    {
                        name:"我是冒险家",
                        avatar:"",
                        time:"12.10 15:15:15",
                        gold:32
                    },
                    {
                        name:"我是冒险家",
                        avatar:"",
                        time:"12.10 15:15:15",
                        gold:32
                    },
                    {
                        name:"我是冒险家",
                        avatar:"",
                        time:"12.10 15:15:15",
                        gold:32
                    },
                    {
                        name:"我是冒险家",
                        avatar:"",
                        time:"12.10 15:15:15",
                        gold:32
                    },
                    {
                        name:"我是冒险家",
                        avatar:"",
                        time:"12.10 15:15:15",
                        gold:32
                    }
                ],
                IPut:[
                    {
                        name:"哈哈哈哈",
                        avatar:"",
                        time:"12.10 15:15:15",
                        gold:32
                    },
                    {
                        name:"哈哈哈哈",
                        avatar:"",
                        time:"12.10 15:15:15",
                        gold:32
                    },
                    {
                        name:"哈哈哈哈",
                        avatar:"",
                        time:"12.10 15:15:15",
                        gold:32
                    },
                    {
                        name:"哈哈哈哈",
                        avatar:"",
                        time:"12.10 15:15:15",
                        gold:32
                    },
                    {
                        name:"哈哈哈哈",
                        avatar:"",
                        time:"12.10 15:15:15",
                        gold:32
                    }
                ]
            }
        }
    }

    render(){
        const myBoxList = this.state.myBoxList
        return(
            <div className="treasure-list">
                <div className="treasure-list-header">
                    <p><span onClick={()=>{window.history.go(-1)}}>关闭</span>我的宝箱</p>
                </div>
                <div className="list-content">
                    <Tabs defaultActiveKey="1" onChange={null}>
                        <TabPane tab="我抢到的" key="1">
                            <p className="list-info">共抢到{myBoxList.totalGet}个宝箱，共{myBoxList.totalGetGold}金币</p>
                            <ul>
                                {
                                    myBoxList.IGot.map((item, index) => {
                                        return <li>
                                            <Row>
                                                <Col span={4}>
                                                    <Avatar icon="user" src={item.avatar||""}/>
                                                </Col>
                                                <Col span={13}>
                                                    <Row>{item.name}</Row>
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
                        </TabPane>
                        <TabPane tab="我发出的" key="2">
                            <p className="list-info">共发出{myBoxList.totalPut}个宝箱，共{myBoxList.totalPutGold}金币</p>
                            <ul className="list-item">
                                {
                                    myBoxList.IPut.map((item, index) => {
                                        return <li>
                                            <Row>
                                                <Col span={4}>
                                                    <Avatar icon="user" src={this.props.userInfo?this.props.userInfo.data.avatar:
                                                        require("../../../layouts/image/head.png")}/>
                                                </Col>
                                                <Col span={13}>
                                                    <Row>{this.props.userInfo?this.props.userInfo.data.name:""}</Row>
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
                        </TabPane>
                    </Tabs>,
                </div>
            </div>
        )
    }
}

export default TreasureList