import React from "react"
import {Button} from "antd";
import "./TreasureBottom.less"

class TreasureBottom extends React.Component{
    constructor(props) {
        super(props);

    }

    render(){
        return(
            <div className="treasure-bottom-wrap">
                <Button onClick={()=>{window.location.href = "#/Dashboard/TreasureBox"}}>返回</Button>
                <Button onClick={()=>{window.location.href = "#/Dashboard/TreasureList"}}>记录</Button>
            </div>
        )
    }
}

export default TreasureBottom