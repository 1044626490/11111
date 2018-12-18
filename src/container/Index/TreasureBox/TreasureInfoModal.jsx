import React from "react"
import {Avatar, Button, Icon, Input, message, Modal, Progress, Upload} from "antd";
import "./TreasureInfoModal.less"
import Api from '~/until/api';
import {fetchPostsGetUser} from '~/action/getUserInfo';
import connect from "react-redux/es/connect/connect";
import $ from "jquery"

class TreasureInfoModal extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            myName: this.props.info.username||"",
            header:this.props.info.avatar||"",
            signature:this.props.info.signature||"",
            alipay:this.props.info.alipay||"",
        }
    }

    componentDidMount(){
        this.setState({
            header:this.props.info.avatar,
            signature:this.props.info.signature,
            myName: this.props.info.username,
        })
    }

    resetMyInfo = (e,name) => {
        this.setState({
            [name]:e.target.value
        })
    };

    saveInfo = () => {
        if(this.state.myName !== null&&this.state.myName.length > 8){
            message.warning("昵称的长度不能大于八位");
            return false
        }else if(this.state.signature !== null&&this.state.signature.length > 8){
            message.warning("个性签名的长度不能大于八位");
            return false
        }else {
            let params = {
                username:this.state.myName||"",
                signature:this.state.signature||"",
                avatar:this.state.header||"",
                alipay: this.state.alipay||""
            };
            Api.updateUserinfo(params).then((res) => {
                message.success(res.msg);
                this.getUserInfo()
            }).catch((err) => {
                message.error(err.msg)
            });
            this.props.getUserInfo()
        }
    };

    changeHeader(file){
        Api.uploadMyHead({file:file.file}).then((res) => {
            message.success(res.msg);
            this.setState({
                header:res.src
            })
        }).catch((err) => {
            message.error(err.msg)
        })
    }

    getUserInfo(){
        this.props.getUserInfo();
        this.props.dispatch(fetchPostsGetUser()).then((res) => {

        }).catch((err) => {

        })
    }

    openShare(){

    }

    render(){
        const info = this.props.info;
        return(
            <div className="treasure-info-modal-wrap">
                <Modal entered={true} visible={this.props.isOpenModel} wrapClassName={"treasure-my-info-modal reset-treasure-infos"}
                       maskStyle={{backgroundColor: "rgba(255,255,255,0.8)"}}
                       closable={false} destroyOnClose={true}>
                    <p className="reset-my-info-container">个人信息
                        <Icon type="close" theme="outlined" onClick={()=>this.getUserInfo()}
                        />
                    </p>
                    <div className="reset-info-item">
                        <div>
                            <Avatar size={64} shape="square" icon="user" src={info?this.state.header:require("../../../layouts/image/head.png")} />
                        </div>
                        <div>
                            <Upload accept={"image/*"} onChange={(file)=>this.changeHeader(file)} showUploadList={false} beforeUpload={()=>{return false}}>
                                <Button className="reset-myhead">上传文件</Button>
                            </Upload>
                        </div>
                        <div>
                            <span>昵称：</span><Input className="name" onChange={(e)=>this.resetMyInfo(e,"myName")} defaultValue={info?info.username:""}/>
                        </div>
                        <div>
                            <span>签名：</span><Input onChange={(e)=>this.resetMyInfo(e,"signature")} defaultValue={info?info.signature:""}/>
                        </div>
                        <div className="bind-item">
                            <span>I&nbsp;&nbsp;D&nbsp;：</span><Input disabled={true} defaultValue={info?info.uid:""}/>
                            <span>
                                <span>
                                    <img key={"music2"} onClick={()=>this.mySetting("music")} className="music2"
                                         src={info.openid?require("../../../layouts/image/index1/treasure/wx2.png"):require("../../../layouts/image/index1/treasure/wx1.png")} alt=""/>
                                </span>
                                <span>
                                    <img key={"music2"} onClick={()=>this.mySetting("music")} className="music2"
                                         src={info.tel?require("../../../layouts/image/index1/treasure/phone1.png"):require("../../../layouts/image/index1/treasure/phone2.png")} alt=""/>
                                </span>
                            </span>
                        </div>
                        <div className="music">
                            <span>分享：</span>
                            <img key={"music2"} onClick={()=>this.props.openTwo()} className="music2" src={require("../../../layouts/image/index1/treasure/share.png")} alt=""/>
                        </div>
                        <Button onClick={()=>this.saveInfo()} className="save-reset">
                            保存
                        </Button>
                        <span className="record" onClick={()=>{window.location.href = "#/Dashboard/TreasureList"}}>
                            查看个人纪录
                        </span>
                    </div>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {userInfo} = state;
    return {userInfo}
};
export default connect(mapStateToProps)(TreasureInfoModal)