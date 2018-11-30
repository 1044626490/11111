import React from "react"
import HeaderNav from "../../components/headerNav/headerNav";
import { Tabs} from "antd"
import Api from '~/until/api';
import "./MyTask.less"

const TabPane = Tabs.TabPane;
class MyTask extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            pageId:"1"
        }
    }

    componentDidMount(){
        Api.dailyTaskList().then(res => {
        }).catch(err => {

        })
    }

    render(){
        return(
            <div className="my-task-wrap">
                <HeaderNav name="挑战10秒"/>
                <div className="my-task-container">
                    <div className="my-task-content">
                        <Tabs
                            activeKey={this.state.pageId}
                            tabPosition="top"
                            onChange={(value)=>{this.setState({pageId:value})}}
                            animated={true}
                        >
                            <TabPane tab="每日任务" key="1">
                            </TabPane>
                            <TabPane tab="成就任务" key="2">
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
                {/*<Modal entered={true} visible={true} mask={false} wrapClassName={"all-modal"}*/}
                       {/*closable={false} destroyOnClose={true}>*/}
                    {/*/!*all-modal*!/*/}
                {/*</Modal>*/}
            </div>
        )
    }
}

export default MyTask