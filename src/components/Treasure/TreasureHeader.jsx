import React from "react"
import {Button} from "antd";
import "./TreasureHeader.less"

class TreasureHeader extends React.Component{
    constructor(props) {
        super(props);

    }

    back(){
        if(window.location.hash.indexOf("TreasureBox") >= 0&&window.location.hash.indexOf("TreasureBoxRoom") === -1){
            window.location.href = "#/Dashboard/index"
        }else {
            window.history.go(-1)
        }
    }

    render(){
        return(
            <div className="treasure-bottom-wrap">
                <Button onClick={()=>this.back()}>返回</Button>
                <Button onClick={()=>this.props.musicSet()}>设置</Button>
            </div>
        )
    }
}

export default TreasureHeader