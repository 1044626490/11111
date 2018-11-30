import React from "react"
import {Avatar, Button, Checkbox, Col, Icon, Row, Modal, message} from "antd";
import Api from '~/until/api';
import "./InviteFriend.less"

class InviteFriend extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            friendInfo:[],
            count:0,
            checkBox:[]
        }
    }

    componentDidMount(){
        Api.onlineFriend().then((res) => {
            this.setState({
                friendInfo:res.data||[]
            })
        }).catch((err) => {

        })
    }

    checkBox = (e,item) => {
        let checkBox = this.state.checkBox;
        if(e.target.checked){
            checkBox.push(item.uid);
        }else {
            let index = checkBox.indexOf(item.uid);
            checkBox.splice(index,1)
        }
        this.setState({
            checkBox
        })
    };

    checkAll = () => {
        let checkBox = [];
        if(this.state.checkBox.length === this.state.friendInfo.length){
            this.setState({
                checkBox
            })
        }else {
            for(let i=0;i<this.state.friendInfo.length;i++){
                checkBox.push(this.state.friendInfo[i].uid)
            }
            this.setState({
                checkBox
            })
        }
    };

    inviteFriend(){
        Api.inviteFriend({uid:this.state.checkBox.join(","),room_id:this.props.homeId}).then(res =>{
            message.success(res.msg)
        }).catch(err =>{})
    }

    render(){
        return(
            <div>
                <Modal entered={true} visible={true}
                       wrapClassName={"all-modal invite-wrap"}
                       closable={false} destroyOnClose={true}>
                    <Icon className="close-modal" onClick={()=>this.props.inviteFriend(false)} type="close" theme="outlined" />
                    <div className="player-info">
                        <div className="add-friend-container">
                            {
                                this.state.friendInfo&&this.state.friendInfo[0]&&this.state.friendInfo.map((item, index) =>{
                                    return <div className={this.state.checkBox.indexOf(item.uid) === -1?"add-friend-item no-checked":"add-friend-item"} key={index}>
                                        <Row type="flex" justify="start" align="top">
                                            <Col span={5}>
                                                <Avatar shape="square" src={item.avatar} icon="user" />
                                            </Col>
                                            <Col span={15}>
                                                <div>
                                                    <Row><Col span={6}><span className="level-card">第{item.level}级</span></Col><Col span={18}><span className="add-friend-name">{item.username}</span></Col></Row>
                                                </div>
                                            </Col>
                                            <Col span={4}><Checkbox key={Math.random()} defaultChecked={this.state.checkBox.indexOf(item.uid) !== -1} onChange={(e)=>this.checkBox(e,item)} value={item.uid}></Checkbox></Col>
                                        </Row>
                                    </div>
                                })
                            }
                            <div className="operation-button">
                                {
                                    this.state.friendInfo&&this.state.friendInfo.length?<div key={Math.random()}>
                                        <Button onClick={()=>this.inviteFriend()}>邀请好友</Button>
                                        <Checkbox defaultChecked={this.state.checkBox.length === this.state.friendInfo.length}
                                                  onChange={()=>this.checkAll()}></Checkbox>
                                    </div>:<p className="no-friend">暂无好友...</p>
                                }
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default InviteFriend