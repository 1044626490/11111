import React from "react"
import "./BoxRecord.less"
import {Avatar, Col, Row} from "antd";
import Api from '~/until/api';
import connect from "react-redux/es/connect/connect";

class BoxRecord extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            myGold:0,
            packageId:this.props.match.params.id,
            gold:this.props.match.params.gold,
            boxRecord:[
                // {
                //     name:"我是冒险家",
                //     avatar:"",
                //     time:"12.10 12:12:12",
                //     gold:19,
                //     is:0
                // },
                // {
                //     name:"我是冒险家",
                //     avatar:"",
                //     time:"12.10 12:12:12",
                //     gold:30,
                //     is:1
                // },
                // {
                //     name:"我是冒险家",
                //     avatar:"",
                //     time:"12.10 12:12:12",
                //     gold:18,
                //     is:0
                // },
                // {
                //     name:"我是冒险家",
                //     avatar:"",
                //     time:"12.10 12:12:12",
                //     gold:17,
                //     is:0
                // },{
                //     name:"我是冒险家",
                //     avatar:"",
                //     time:"12.10 12:12:12",
                //     gold:16,
                //     is:0
                // }
            ]
        }
    }

    componentDidMount(){
        Api.packageRecord({package_id:this.state.packageId}).then(res => {
            for(let i=0;i<res.data.package_record.length;i++){
                if(res.data.package_record[i].uid === this.props.userInfo.data.uid){
                    this.setState({
                        myGold:res.data.package_record[i].gold
                    })
                }
            }
            this.setState({
                gold:res.data.gold,
                boxRecord:res.data.package_record
            })
        })
    }

    render(){
        return(
            <div className="box-record-wrap">
                <div className="header-wrap">
                    <p>您共抢到</p>
                    <p>{this.state.myGold}<span>金币</span></p>
                    <p><a href="#/Dashboard/TreasureList">点击查看个人纪录</a></p>
                    <span onClick={()=>{window.location.href = "#/Dashboard/TreasureBoxRoom/"+this.props.match.params.gold}}>关闭</span>
                </div>
                <div className="list-content">
                    <div>
                        <p>宝箱明细</p>
                        <p>已领取5/5人，共{Number(this.state.gold?this.state.gold:this.props.match.params.gold)*0.9}金币</p>
                    </div>
                    <ul>
                        {
                            this.state.boxRecord.map((item, index) => {
                                return <li key={index}>
                                    <Row>
                                        <Col span={4}>
                                            <Avatar icon="user" src={item.avatar||""}/>
                                        </Col>
                                        <Col span={13}>
                                            <Row>{item.username}{index === 0?<span>手气最佳</span>:null}</Row>
                                            <Row>{item.get_time}</Row>
                                        </Col>
                                        <Col span={7}>
                                            <Row>{item.gold}金币</Row>
                                        </Col>
                                    </Row>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {userInfo} = state;
    return {userInfo}
};
export default connect(mapStateToProps)(BoxRecord)
// export default BoxRecord
