import {Avatar, Col, Icon, Modal, Row, Tabs, Progress, Button} from "antd";
import React from "react";
import "./MyTask.less"
import { message } from "antd"
import Api from '~/until/api';

const TabPane = Tabs.TabPane;
class MyTask extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            pageId:"1",
            taskData:{},
            achievementList:{}
        }
    }

    componentWillMount(){
        this.getTaskList()
    }

    getTaskList = () => {
        Api.dailyTaskList().then(res => {
            this.setState({
                taskData:res.data
            })
        }).catch(err => {

        })
        Api.achievementList().then(res =>{
            this.setState({
                achievementList:res.data
            })
        })
    }

    changetabs(value){
        this.setState({pageId:value})
    }

    receiveAchievementTask(id){
        Api.receiveAchievementTask({id}).then(res => {
            this.getTaskList()
        }).catch(err =>{

        })
    }

    receiveDailyTask(id){
        Api.receiveDailyTask({id}).then(res => {
            message.success(res.msg);
            this.getTaskList();
            this.props.justUser()
        }).catch(err =>{
            message.info(err.msg)
        })
    }

    render(){
        const { taskData,achievementList } = this.state;
        return(
            <div className="my-task-wrap">
                <Modal entered={true} visible={this.props.isOpenMyTask}  wrapClassName={"all-modal my-task-container"}
                       closable={false} destroyOnClose={true}>
                    <Icon className="close-modal" onClick={this.props.closeMyTask} type="close" theme="outlined" />
                        <Tabs
                            activeKey={this.state.pageId}
                            onChange={(value)=>this.changetabs(value)}
                            className="task-tabs"
                        >
                            <TabPane tab="每日任务" key="1">
                                <div>
                                    {
                                        taskData.task_list&&taskData.task_list.map((item, index) => {
                                            // if(item.is_recived){
                                            //     return null
                                            // }
                                            if(index > 0&&item.gold === taskData.task_list[index-1].gold){
                                                return false
                                            }
                                            return <div key={index} className="my-task-info-item">
                                                <Row type="flex" justify="start" align="top">
                                                    <Col span={6}>
                                                        <Avatar shape="square" src={item.img} size="large" icon="user" />
                                                    </Col>
                                                    <Col span={12}>
                                                        <Row>
                                                            {item.name}
                                                        </Row>
                                                        <Row>
                                                            <Progress successPercent={(item.cha_count/item.reach*100)}/><span className="progress-value">
                                                        {"("+item.cha_count+"/"+item.reach+")"}</span>
                                                        </Row>
                                                    </Col>
                                                    <Col span={6}>
                                                        <Button className={item.cha_count < item.reach?"disabled-button":""}
                                                                onClick={()=>this.receiveDailyTask(item.id)}
                                                                disabled={item.cha_count < item.reach?true:false}>领取</Button>
                                                    </Col>
                                                </Row>
                                            </div>
                                        })
                                    }
                                    {/*{*/}
                                        {/*taskData&&taskData.today_recived.length?<p className="has-got">已领取</p>:null*/}
                                    {/*}*/}
                                    <p className="has-got">已领取</p>
                                    {
                                        taskData.today_recived&&taskData.today_recived.map((item, index) => {
                                            return <div key={index} className="my-task-info-item">
                                                <Row type="flex" justify="start" align="top">
                                                    <Col span={6}>
                                                        <Avatar shape="square" src={item.img} size="large" icon="user" />
                                                    </Col>
                                                    <Col span={12}>
                                                        <Row>
                                                            {item.name}
                                                        </Row>
                                                        <Row>
                                                            <Progress successPercent={100}/><span className="progress-value">
                                                            {item.reach}/{item.reach}</span>
                                                        </Row>
                                                    </Col>
                                                    <Col span={6}>
                                                        <Button className="disabled-button" disabled={true}>已领取</Button>
                                                    </Col>
                                                </Row>
                                            </div>
                                        })
                                    }
                                </div>
                            </TabPane>
                            <TabPane tab="成就任务" key="2">
                                <div>
                                    {
                                        achievementList.task_list&&achievementList.task_list.map((item, index) => {
                                            return <div key={index} className="my-task-info-item">
                                                <Row type="flex" justify="start" align="top">
                                                    <Col span={6}>
                                                        <Avatar className="special-pic" shape="square" src={item.img} size="large" icon="user" />
                                                    </Col>
                                                    <Col span={12}>
                                                        <Row>
                                                            {item.name}
                                                        </Row>
                                                    </Col>
                                                    <Col span={6}>
                                                        <Button className={item.is_recived?"disabled-button":""}
                                                                disabled={item.is_recived} onClick={()=>this.receiveAchievementTask(item.id)}>
                                                            领取</Button>
                                                    </Col>
                                                </Row>
                                            </div>
                                        })
                                    }
                                </div>
                                {/*{*/}
                                    {/*achievementList&&achievementList.is_recived.length?<p className="has-got">已领取</p>:null*/}
                                {/*}*/}
                                <p className="has-got">已领取</p>
                                {
                                    achievementList.is_recived&&achievementList.is_recived.map((item, index) => {
                                        return <div key={index} className="my-task-info-item">
                                            <Row type="flex" justify="start" align="top">
                                                <Col span={6}>
                                                    <Avatar className="special-pic" shape="square" src={item.img} size="large" icon="user" />
                                                </Col>
                                                <Col span={12}>
                                                    <Row>
                                                        {item.name}
                                                    </Row>
                                                </Col>
                                                <Col span={6}>
                                                    <Button className="disabled-button" disabled={true}>已领取</Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    })
                                }
                            </TabPane>
                        </Tabs>
                </Modal>
            </div>
        )
    }
}

export default MyTask
