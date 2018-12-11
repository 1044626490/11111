import React from "react"
import {Avatar, Button, Icon, Input, message, Modal, Progress, Upload} from "antd";
import "./infoModal.less"
import Api from '~/until/api';
import {fetchPostsGetUser} from '~/action/getUserInfo';
import connect from "react-redux/es/connect/connect";

class InfoModal extends React.Component{
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
            })
        }
    }

    changeHeader(file){
        Api.uploadMyHead({file:file.file}).then((res) => {
            message.success(res.msg)
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

    render(){

        const info = this.props.info;
        // const winRate =  info.total_office === 0?0:Math.round((info.victory/info.total_office)*100);
        return(
            <div className="my-info-modal-wrap">
                <Modal entered={true} visible={this.props.isOpenModel} wrapClassName={"index-my-info-modal reset-my-infos"}
                       maskStyle={{color: "rgba(0,0,0,0.3)"}}
                       closable={false} destroyOnClose={true}>
                    <p className="reset-my-info-container">设置
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
                            <span>账号：</span><Input onChange={(e)=>this.resetMyInfo(e,"alipay")} placeholder="此处填写支付宝提现账号" defaultValue={info?info.alipay:""}/>
                        </div>
                        <Button onClick={()=>this.saveInfo()} className="save-reset"></Button>
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
export default connect(mapStateToProps)(InfoModal)