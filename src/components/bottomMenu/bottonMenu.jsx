import React from 'react';
import "./bottonMenu.less"

class BottomMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [
                {
                    name:"大厅",
                    href:"#/Dashboard/TenSen",
                    img: require("../../layouts/image/message/ss/icon (1).png"),
                },{
                    name:"活动",
                    href:"#/Dashboard/Activity",
                    img: require("../../layouts/image/message/ss/icon (2).png"),
                },{
                    name:"我的",
                    href:"#/Dashboard/PersonalInformation",
                    img: require("../../layouts/image/message/ss/icon (3).png"),
                },{
                    name:"设置",
                    href:"#/Dashboard/setting",
                    img: require("../../layouts/image/message/ss/icon (4).png"),
                },{
                    name:"商城",
                    href:"#/Dashboard/Shopping/1",
                    img: require("../../layouts/image/message/ss/icon (5).png"),
                },
            ]
        }
    }

    render(){
        const { data } = this.state
        return(
            <div className="footer">
                <div className="footer-bg">
                    <ul>
                        {
                            data.map((item ,index) => {
                                return <li key={index} onClick={()=>{window.location.href = item.href}}>
                                    <p className="none">
                                        <img src={item.img} alt=""/>
                                    </p>
                                </li>
                            })
                        }
                        {/*<li onClick={()=>{window.location.href = "#/Dashboard/TenSen"}}>*/}
                            {/*<p className="home-icon">*/}
                                {/*<span>大厅</span>*/}
                            {/*</p>*/}
                        {/*</li>*/}
                        {/*<li onClick={()=>{window.location.href = "#/Dashboard/Activity"}}>*/}
                            {/*<p className="active-icon">*/}
                                {/*<span>活动</span>*/}
                            {/*</p>*/}
                        {/*</li>*/}
                        {/*<li onClick={()=>{window.location.href = "#/Dashboard/PersonalInformation"}}>*/}
                            {/*<p className="my-icon">*/}
                                {/*<span>我的</span>*/}
                            {/*</p>*/}
                        {/*</li>*/}
                    </ul>
                </div>
            </div>
        )
    }
}

export default BottomMenu