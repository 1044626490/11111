import React from "react"
import Api from '~/until/api';
import HeaderNav from "../../components/headerNav/headerNav";
import $ from "jquery"
import "./MyMedal.less"
import {Tabs, Carousel, Modal, Icon, message} from 'antd';

const TabPane = Tabs.TabPane;

class MyMedal extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            myMedalInfo:[],
            pageId:this.props.match.params.id||"1",
            isOpenMedal:false,
            item:{},
        }
    }

    componentDidMount(){
        Api.getUserMedal().then((res) => {
            this.setState({
                myMedalInfo:res.data
            })
        }).catch((err => {
        }))
    }

    openMedal(item){
        Api.medalInfo({num_id:item.num_id}).then(res =>{
            this.setState({
                isOpenMedal:true,
                item:res.data
            })
        }).catch(err => {
        })
    }

    receiveGold(){
        Api.receiveGold({num_id:this.state.item.num_id}).then(res => {
            $('.get-gold').animate({
                marginTop:"-8vw",
                opacity: 1,
            },1000).delay(300).animate({
                opacity: 0
            },300).delay(100)
            Api.medalInfo({num_id:this.state.item.num_id}).then(res =>{
                this.setState({
                    item:res.data
                })
            }).catch(err => {
            })
        }).catch(err => {
            message.info(err.msg)
        })
    }

    render(){
        const data = this.state.myMedalInfo||[]
        return(
            <div className="my-medal-wrap">
                <HeaderNav name="挑战10秒"/>
                <div className="my-medal-container">
                    <div className="my-medal-content">
                        <div className="header-img">
                            <img src={require("../../layouts/image/medal_head.png")} alt=""/>
                        </div>
                        <Tabs
                            activeKey={this.state.pageId}
                            tabPosition="left"
                            onChange={(value)=>{this.setState({pageId:value})}}
                            animated={true}
                        >
                            <TabPane tab="等级" key="1">
                                <div className="level">
                                    <Carousel afterChange={null}>
                                    <ul>
                                        {
                                            data&&data.map((item ,index) => {
                                                return <li key={index}>
                                                            <img onClick={()=>this.openMedal(item)}
                                                                 src={item.img} alt=""/>
                                                            <i>{item.level}级</i>
                                                            <span>{item.name}</span>
                                                        </li>
                                            })
                                        }
                                    </ul>
                                        {
                                            data.length>9?<ul>
                                                    {
                                                        data.map((item, index) => {
                                                            if(index > 9){
                                                                return <li key={index}>
                                                                    <img onClick={()=>this.openMedal(item)}
                                                                         src={item.img} alt=""/>
                                                                    <i>{item.level}级</i>
                                                                    <span>{item.name}</span>
                                                                </li>
                                                            }
                                                        })
                                                    }
                                            </ul>:null
                                        }
                                        {
                                            data.length > 18?<ul>
                                                {
                                                    data.map((item, index) => {
                                                        if(index > 18){
                                                            return <li key={index}>
                                                                <img onClick={()=>this.openMedal(item)}
                                                                     src={item.img} alt=""/>
                                                                <i>{item.level}级</i>
                                                                <span>{item.name}</span>
                                                            </li>
                                                        }
                                                    })
                                                }
                                            </ul>:null
                                        }
                                    </Carousel>
                                </div>
                            </TabPane>
                            <TabPane tab="任务" key="2">
                                <div className="task">
                                </div>
                            </TabPane>
                            <TabPane tab="隐藏" key="3">
                                <div className="conceal">
                                </div>
                            </TabPane>
                        </Tabs>
                        {
                            this.state.isOpenMedal?<Modal entered={true} visible={this.state.isOpenMedal}  wrapClassName={"all-modal my-medal-modal"}
                                                          closable={false} destroyOnClose={true}>
                                <div className="bg-light">

                                </div>
                                <Icon className="close-modal" onClick={()=>{this.setState({isOpenMedal:false})}}
                                      type="close" theme="outlined" />
                                <div className="player-info">
                                    <div className="medal-info-content">
                                        <div className="medal-img">
                                            <img src={this.state.item.img} alt=""/>
                                            <span className="level">{this.state.item.level}级</span>
                                        </div>
                                        <p className="medal-name">{this.state.item.name}
                                            <span>{
                                                Number(this.state.item.level) === 1?"Ⅰ":Number(this.state.item.level) === 2?"Ⅱ":Number(this.state.item.level) === 3?"Ⅲ":
                                                    Number(this.state.item.level) === 4?"Ⅳ":Number(this.state.item.level) === 5?"Ⅴ":Number(this.state.item.level) === 6?"Ⅵ":
                                                        Number(this.state.item.level) === 7?"Ⅶ":Number(this.state.item.level) === 8?"Ⅷ":Number(this.state.item.level) === 9?"Ⅸ":
                                                            Number(this.state.item.level) === 10?"Ⅹ":Number(this.state.item.level) === 11?"Ⅺ":Number(this.state.item.level) === 12?"Ⅻ":""
                                            }</span>
                                        </p>
                                        <p>消费达到100w金币</p>
                                    </div>
                                    <div className="my-medal-operation">
                                        <p>金币+{this.state.item.reward}</p>
                                        <span className="get-gold">+{this.state.item.reward}</span>
                                        <button className={this.state.item.is_receive?"is-receive":""}
                                                disabled={this.state.item.is_receive}
                                                onClick={()=>this.receiveGold()}>
                                            {this.state.item.is_receive?"已领取":"领取奖励"}
                                        </button>
                                        <p>2018-10-17 获得</p>
                                    </div>
                                </div>
                            </Modal>:null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default MyMedal