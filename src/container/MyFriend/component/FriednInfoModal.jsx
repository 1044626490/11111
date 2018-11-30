import React from "react"
import {Avatar, Icon, message, Modal, Progress} from "antd";
import "./FriednInfoModal.less"
import Api from '~/until/api';

class FriednInfoModal extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    deleteFriend(uid){
        Api.delFriend({friend_id :uid}).then(res=>{
            message.success(res.msg);
            this.props.openModal(false)
        }).catch(err=>{
            message.warning(err.msg)
        })
    }

    addFriend(uid){
        let params = {uid:uid.toString()};
        Api.batchAddUser(params).then((res) => {
            message.info(res.msg)
        }).catch((err) => {
        })
    }
    render(){
        const info = this.props.info;
        const winRate = info.total_office !== 0 ?Math.round((info.victory/info.total_office)*100):0;
        return(
            <div className="friend-info-modal-wrap">
                <Modal entered={true} visible={this.props.isOpenModel} wrapClassName={"my-info-modal"}
                       closable={false} destroyOnClose={true}
                >
                    <div className="info-body">
                        <div className="header-wrap">
                            <Avatar size={64} shape="square" icon="user" src={info?info.avatar:require("../../../layouts/image/head.png")} />
                            {
                                info&&info.uid === this.props.myId?null:info.is_friend?null:<Icon type="plus-circle" onClick={()=>this.addFriend(info.uid)} theme="filled" />
                            }
                            <div className="my-info">
                                <p className="name-class"><span>昵称：</span>
                                    <span>
                                    <span className="my-name">{info?info.username:""}</span>&nbsp;&nbsp;
                                    </span>
                                </p>
                                <p>
                                    签名：{info?info.signature:0}
                                </p>
                                <p>
                                    胜负：{info?info.victory+"/"+info.total_office+"（"+winRate+"%）":0}
                                    {
                                        info&&info.is_friend?<span onClick={()=>this.deleteFriend(info.uid)} className="delete-friend button"></span>:null
                                    }
                                    {/*<Button className="open-reset-modal" onClick={()=>{this.setState({isResetMyInfo:true})}}>编辑</Button>*/}
                                </p>
                            </div>
                            {/*<div className="my-account">*/}
                                {/*<span>我的账号：</span><span></span>*/}
                            {/*</div>*/}
                        </div>
                        <div className="my-class-medal">
                            <div className="my-class my-progress">
                                <p>等级{info?info.level:0}:（{info?Math.round(((info.integral-info.sumption)/(info.integral-info.sumption+info.next_int)*100)):0}/100）</p>
                                <img src={require("../../../layouts/image/star.png")} alt=""/>
                                <Progress successPercent={info?Math.round(((info.integral-info.sumption)/(info.integral-info.sumption+info.next_int)*100)):0} />
                            </div>
                            <div className="my-medal my-progress">
                                <p>勋章数:（{info?info.medal_num:0}/28）</p>
                                <img src={require("../../../layouts/image/medal1.png")} alt=""/>
                                <Progress successPercent={info?(info.medal_num/28).toFixed(2)*100:0} />
                            </div>
                        </div>
                    </div>
                    <Icon onClick={()=>this.props.openModal(false)} type="close-circle" theme="outlined" />
                </Modal>
            </div>
        )
    }
}

export default FriednInfoModal