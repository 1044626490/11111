import React from "react"
import { Tabs } from 'antd';
import FriendTab from "./component/FriendTab"
import HeaderNav from "../../components/headerNav/headerNav";
import "./MyFriend.less"
import Api from '~/until/api';
import connect from "react-redux/es/connect/connect";

const TabPane = Tabs.TabPane;

class MyFriend extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            defaultActiveKey:"1",
            friendForm:[],
            count:0,
            myFriendRank:0
        }
    }

    componentWillMount(){
        let id = this.props.match.params.pageId;
        this.setState({
            defaultActiveKey:id||"1"
        })
    }

    callback(value){
        this.setState({
            defaultActiveKey:value
        })
        if(value === "1"){
            this.selfFriend()
        }
    }

    selfFriend(){
        Api.selfFriend().then((res) => {
            let rank = 0;
            for(let i=0;i<res.data.length-1;i++){
                for(let j=0;j<res.data.length-1-i;j++){
                    if(res.data[j].rownum>res.data[j+1].rownum){
                        let temp=res.data[j];
                        res.data[j]=res.data[j+1];
                        res.data[j+1]=temp;
                    }
                }
            }
            for(let i=0;i<res.data.length;i++){
                if(this.props.userInfo.data.uid === res.data[i].uid){
                    rank = i+1
                }
            }
            this.setState({
                friendForm:res.data,
                count:res.count,
                myFriendRank:rank
            })
        }).catch((err) => {

        })
    }

    componentDidMount(){
        this.selfFriend()
    }

    render(){
        const tabs = [
            {
                key:"1",
                name:"我的好友",
            },
            {
                key:"2",
                name:"添加好友"
            },
            {
                key:"3",
                name:"邀请好友"
            }
        ];
        return(
            <div className="my-friend-wrap">
                <HeaderNav name="好友"/>
                <div className="my-friend-container">
                    <Tabs activeKey={this.state.defaultActiveKey} onChange={this.callback.bind(this)}>
                        {
                            tabs.map((item, index) => {
                                return <TabPane tab={item.name} key={item.key}>
                                    <FriendTab item={item} key={item.key} index={index}/>
                                        {/*{*/}
                                            {/*this.state.defaultActiveKey === item.key?<Icon type="caret-up" theme="outlined" />:null*/}
                                        {/*}*/}
                                </TabPane>
                            })
                        }
                    </Tabs>
                    {
                        this.state.defaultActiveKey === "1"?<div className="rank-info">
                            <div className="rank-my-info">
                                <p className="info-name">好友数量&nbsp;&nbsp;&nbsp;{this.state.friendForm.length}/300</p>
                                <p>我的排名：<span style={{color:"#decc35"}}>{this.state.myFriendRank?"第"+this.state.myFriendRank+"名":"未上榜"}</span></p>
                            </div>
                        </div>:null
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {loginReducer,userInfo} = state;
    return {loginReducer,userInfo}
};
export default connect(mapStateToProps)(MyFriend)