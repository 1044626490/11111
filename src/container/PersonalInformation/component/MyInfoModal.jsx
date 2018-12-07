import React from "react"
import {Avatar, Button, Icon, Input, message, Modal, Progress, Upload} from "antd";
import "./MyInfoModal.less"
import Api from '~/until/api';
import {fetchPostsGetUser} from '~/action/getUserInfo';
import connect from "react-redux/es/connect/connect";

class MyInfoModal extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isResetMyInfo:false,
            myName: this.props.info.username||"",
            header:this.props.info.avatar||"",
            signature:this.props.info.signature||"",
            alipay:this.props.info.alipay||"",
            victoryRate:0
        }
    }

    componentDidMount(){
        let rate = 0;
        if(this.props.info.total_office !== 0){
            rate = Math.round(this.props.info.victory/this.props.info.total_office);
        }
        this.setState({
            header:this.props.info.avatar,
            signature:this.props.info.signature,
            myName: this.props.info.username,
            victoryRate:rate
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
                this.setState({
                    isResetMyInfo:false
                });
                this.getUserInfo()
            }).catch((err) => {
                message.error(err.msg)
            })
        }
    }

    // getUserInfo = () =>{
    //     this.props.dispatch(fetchPostsGetUser()).then((res) => {
    //         let rate = 0;
    //         if(res.data.total_office !== 0){
    //             rate = Math.round(res.data.victory/res.data.total_office);
    //         }
    //         this.setState({
    //             myInfo:res.data,
    //         })
    //     }).catch((err) => {
    //         message.error(err.msg)
    //     })
    // };

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
        this.setState({
            isResetMyInfo:false
        })
    }

    render(){

        const info = this.props.info;
        const winRate =  info.total_office === 0?0:Math.round((info.victory/info.total_office)*100);
        return(
            <div className="my-info-modal-wrap">
                <Modal entered={true} visible={this.props.isOpenModel} wrapClassName={"my-info-modal"}
                       closable={false} destroyOnClose={true}
                >
                    <div className="info-body">
                        <div className="header-wrap">
                            <Avatar size={64} shape="square" icon="user" src={info?info.avatar:require("../../../layouts/image/head.png")} />
                            <div className="my-info">
                                <p className="name-class"><span>昵称：</span>
                                    {/*{*/}
                                    {/*this.state.isResetName? */}
                                    {/*<span>*/}
                                    {/*<Input placeholder="修改昵称" onChange={(e)=>{this.setState({myName:e.target.value})}}/>*/}
                                    {/*<Icon type="check" theme="outlined"  onClick={()=>{this.resetName()}}/>*/}
                                    {/*<Icon type="close" theme="outlined"  onClick={()=>{this.setState({isResetName:false})}}/>*/}
                                    {/*</span>:*/}
                                    {/*<span>*/}
                                    {/*<span className="my-name">{info?info.username:""}</span>&nbsp;&nbsp;*/}
                                    {/*<Icon type="edit" theme="outlined" onClick={()=>{this.setState({isResetName:true})}}/>*/}
                                    {/*</span>*/}
                                    {/*}*/}
                                    <span>
                                    <span className="my-name">{info?info.username:""}</span>&nbsp;&nbsp;
                                        {/*<Icon type="edit" theme="outlined" onClick={()=>{this.setState({isResetName:true})}}/>*/}
                                    </span>
                                    {/*<Icon className="open-reset-modal" type="edit" theme="outlined"*/}
                                          {/*onClick={()=>{this.setState({isResetMyInfo:true})}}/>*/}
                                </p>
                                <p>
                                    签名：{info?info.signature:0}
                                </p>
                                <p>
                                    胜负：{info?info.victory+"/"+info.total_office+"("+winRate+"%)":0}
                                </p>
                            </div>
                            <div className="my-account">
                                <span>退款账号：</span><span>{info.alipay}</span>
                                <Button className="open-reset-modal" onClick={()=>{this.setState({isResetMyInfo:true})}}>编辑</Button>
                            </div>
                        </div>
                        <div className="my-class-medal">
                            <div className="my-class my-progress">
                                <p>等级{info?info.level:0}:（{info?Math.round(((info.integral-info.sumption)/(info.integral-info.sumption+info.next_int)*100)):0}/100）</p>
                                <img src={require("../../../layouts/image/star.png")} alt=""/>
                                <Progress successPercent={info?Math.round(((info.integral-info.sumption)/(info.integral-info.sumption+info.next_int)*100)):0} />
                            </div>
                            {/*<div className="my-medal my-progress">*/}
                                {/*<p>勋章数:（{info?info.medal_num:0}/28）</p>*/}
                                {/*<img src={require("../../../layouts/image/medal1.png")} alt=""/>*/}
                                {/*<Progress successPercent={info?(info.medal_num/28).toFixed(2)*100:0} />*/}
                            {/*</div>*/}
                        </div>
                    </div>
                    <Icon onClick={()=>this.props.openModal(false)} type="close-circle" theme="outlined" />
                </Modal>
                <Modal entered={true} visible={this.state.isResetMyInfo||this.props.isResetMyInfo} wrapClassName={"my-info-modal reset-my-info"}
                       closable={false} destroyOnClose={true}>
                    <p className="reset-my-info-container">编辑资料
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
                            <span>昵称：</span><Input onChange={(e)=>this.resetMyInfo(e,"myName")} defaultValue={info.username}/>
                        </div>
                        <div>
                            <span>签名：</span><Input onChange={(e)=>this.resetMyInfo(e,"signature")} defaultValue={info.signature}/>
                        </div>
                        <div className="bind-item">
                            <span>账号：</span><Input onChange={(e)=>this.resetMyInfo(e,"alipay")} placeholder="此处填写支付宝提现账号" defaultValue={info.alipay}/>
                        </div>
                        <Button onClick={()=>this.saveInfo()} className="save-reset">保存</Button>
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
export default connect(mapStateToProps)(MyInfoModal)