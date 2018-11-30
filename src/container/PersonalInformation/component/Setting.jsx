import React from "react"
import HeaderNav from "../../../components/headerNav/headerNav";
import "./Setting.less"
import { Switch, Popconfirm } from "antd"
import Api from '~/until/api';
import {fetchPostsGetUser} from '~/action/getUserInfo';
import connect from "react-redux/es/connect/connect";

class Setting extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            num:3,
            mySetting:{}
        }
    }

    componentWillMount(){
        this.getMySetting()
    }

    getMySetting = () => {
        Api.setInfo().then(res => {
            this.setState({
                mySetting:res.data
            })
        })
    };

    mySetting = (name,status) => {
        let arr = this.state.mySetting;
        arr[name] = status?1:0;
        this.setState({
            mySetting:arr
        });
        Api[name]({status:status?1:0});
        this.getMySetting()
    };

    render(){
        return(
            <div className="setting-wrap">
                <HeaderNav name="设置"/>
                <ul>
                    <li key={Math.random()}><span>音乐</span><Switch onChange={(value)=>this.mySetting("setMusic",value)} checkedChildren="on" unCheckedChildren="off" defaultChecked={this.state.mySetting.music} /></li>
                    <li key={Math.random()}><span>音效</span><Switch onChange={(value)=>this.mySetting("setSoundEffect",value)} checkedChildren="on" unCheckedChildren="off" defaultChecked={this.state.mySetting.sound_effect} /></li>
                    {/*<li><span>振动</span><Switch checkedChildren="on" unCheckedChildren="off" defaultChecked /></li>*/}
                    <li key={Math.random()}><span>屏蔽邀请信息</span><Switch onChange={(value)=>this.mySetting("setShield",value)} checkedChildren="on" unCheckedChildren="off" defaultChecked={this.state.mySetting.shield} /></li>
                    <li key={Math.random()}><span>关闭观战界面</span><Switch onChange={(value)=>this.mySetting("setWatch",value)} checkedChildren="on" unCheckedChildren="off" defaultChecked={this.state.mySetting.watch} /></li>
                    {/*<li><span>清理缓存</span><span className="clear">1.03M</span></li>*/}
                    <Popconfirm overlayClassName={"loginout-game-pop"} placement="top" title="确认退出？"
                                onConfirm={null}
                                onCancel={()=>{Api.loginOut().then(res => {
                                    window.location.href = "#"
                                });
                        this.props.dispatch(fetchPostsGetUser())
                    }} okText="取消" cancelText="确定">
                        <li><span>退出账号</span></li>
                    </Popconfirm>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {loginReducer,userInfo} = state;
    return {loginReducer,userInfo}
};
export default connect(mapStateToProps)(Setting)