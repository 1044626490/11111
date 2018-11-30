import React from "react"
import {Avatar, Col, Icon, Row} from "antd";
import "./MyFriendInfo.less"
import Api from '~/until/api';
import FriednInfoModal from "./FriednInfoModal"

class MyFriendInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            friendInfo:[],
            isOpenFriendModal:false
        }
    }



    openFriendModal(isOpen,uid){
        if(isOpen){
            Api.otherUserInfo({uid}).then((res) => {
                this.setState({
                    friendInfo:res.data,
                    isOpenFriendModal:true,
                })
            });
        }else {
            this.setState({
                isOpenFriendModal:false,
            })
        }
    }

    render(){
        let arr = this.props.friendForm;
        for(let j=0;j<arr.length-1;j++){
            //两两比较，如果前一个比后一个大，则交换位置。
            for(let i=0;i<arr.length-1-j;i++){
                if(arr[i].rownum>arr[i+1].rownum){
                    let temp = arr[i];
                    arr[i] = arr[i+1];
                    arr[i+1] = temp;
                }
            }
        }
        return(
            <div className="my-friend-info">
                {
                    this.props.friendForm.map((item, index) => {
                        return <div key={index} className={item.uid === this.props.myId?"myRank my-friend-info-item":"my-friend-info-item"}>
                            <Row type="flex" justify="start" align="top">
                                <Col span={3}><span className={index === 0?"rank-first":index === 1?"rank-second":index === 2?"rank-third":"rank"}>{index>2?index+1:null}</span></Col>
                                <Col span={5}>
                                    <Avatar onClick={()=>this.openFriendModal(true,item.uid)} shape="square" src={item.avatar} icon="user" />
                                </Col>
                                <Col span={15}>
                                    <div>
                                        <Row><Col span={7}><span className="level-card"><span title={item.level}>第{item.level}级</span><span></span></span></Col><Col span={17}><span className="add-friend-name">{item.username.slice(0,8)}</span></Col></Row>
                                        <Row><Col span={24}><Icon type="star" theme="filled" /><span className="ranking">总积分全国前{Math.round((item.rownum/this.props.count)*100)}%</span></Col></Row>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    })
                }
                {
                    this.state.isOpenFriendModal?
                        <FriednInfoModal myId={this.props.myId} info={this.state.friendInfo} openModal={()=>this.openFriendModal()}
                                         isOpenModel={this.state.isOpenFriendModal}
                                         count={this.props.count}/>:null
                }
                {/*<div className="my-friend-info-item">*/}
                    {/*<Row type="flex" justify="start" align="top">*/}
                        {/*<Col span={3}><span className="rank-first"></span></Col>*/}
                        {/*<Col span={5}>*/}
                            {/*<Avatar shape="square" icon="user" />*/}
                        {/*</Col>*/}
                        {/*<Col span={15}>*/}
                            {/*<div>*/}
                                {/*<Row><Col span={9}><span className="level-card">第21级</span></Col><Col span={15}><span className="add-friend-name">阿狸大大</span></Col></Row>*/}
                                {/*<Row><Col span={24}><Icon type="star" theme="filled" /><span className="ranking">总积分全国前32.11%</span></Col></Row>*/}
                            {/*</div>*/}
                        {/*</Col>*/}
                    {/*</Row>*/}
                {/*</div>*/}
                {/*<div className="my-friend-info-item">*/}
                    {/*<Row type="flex" justify="start" align="top">*/}
                        {/*<Col span={3}><span className="rank-second"></span></Col>*/}
                        {/*<Col span={5}>*/}
                            {/*<Avatar shape="square" icon="user" />*/}
                        {/*</Col>*/}
                        {/*<Col span={15}>*/}
                            {/*<div>*/}
                                {/*<Row><Col span={9}><span className="level-card">第21级</span></Col><Col span={15}><span className="add-friend-name">阿狸大大</span></Col></Row>*/}
                                {/*<Row><Col span={24}><Icon type="star" theme="filled" /><span className="ranking">总积分全国前32.11%</span></Col></Row>*/}
                            {/*</div>*/}
                        {/*</Col>*/}
                    {/*</Row>*/}
                {/*</div>*/}
                {/*<div className="my-friend-info-item">*/}
                    {/*<Row type="flex" justify="start" align="top">*/}
                        {/*<Col span={3}><span className="rank-third"></span></Col>*/}
                        {/*<Col span={5}>*/}
                            {/*<Avatar shape="square" icon="user" />*/}
                        {/*</Col>*/}
                        {/*<Col span={15}>*/}
                            {/*<div>*/}
                                {/*<Row><Col span={9}><span className="level-card">第21级</span></Col><Col span={15}><span className="add-friend-name">阿狸大大</span></Col></Row>*/}
                                {/*<Row><Col span={24}><Icon type="star" theme="filled" /><span className="ranking">总积分全国前32.11%</span></Col></Row>*/}
                            {/*</div>*/}
                        {/*</Col>*/}
                    {/*</Row>*/}
                {/*</div>*/}
                {/*<div className="my-friend-info-item">*/}
                    {/*<Row type="flex" justify="start" align="top">*/}
                        {/*<Col span={3}><span className="rank">4</span></Col>*/}
                        {/*<Col span={5}>*/}
                            {/*<Avatar shape="square" icon="user" />*/}
                        {/*</Col>*/}
                        {/*<Col span={15}>*/}
                            {/*<div>*/}
                                {/*<Row><Col span={9}><span className="level-card">第21级</span></Col><Col span={15}><span className="add-friend-name">阿狸大大</span></Col></Row>*/}
                                {/*<Row><Col span={24}><Icon type="star" theme="filled" /><span className="ranking">总积分全国前32.11%</span></Col></Row>*/}
                            {/*</div>*/}
                        {/*</Col>*/}
                    {/*</Row>*/}
                {/*</div>*/}
            </div>
        )
    }
}

export default MyFriendInfo