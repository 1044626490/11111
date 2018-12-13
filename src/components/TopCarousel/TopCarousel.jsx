import React from "react"
import "./TopCarousel.less"
import $ from "jquery"
import connect from "react-redux/es/connect/connect";

class TopCarousel extends React.Component{
    constructor(props) {
        super(props);
        if(this.props.userInfo&&this.props.userInfo.code === "0000"){
            let hash = window.location.hash;
            if(hash.indexOf("#/Dashboard/Activity") >= 0 || hash.indexOf("#/Dashboard/redPacket") >= 0){
                this.webS = new WebSocket("ws://47.99.198.85:8282");
                // this.webS = new WebSocket("ws://api.times168.net:8282");
            }
        }
        this.state = {
            num:[
                // {username:"阿狸大大",type: "获得",name:"百战成就"}
                ],
            num1:{},
        }
    }

    componentDidMount(){
        if(this.props.userInfo&&this.props.userInfo.code === "0000"){
            let hash = window.location.hash;
            if(hash.indexOf("#/Dashboard/Activity") >= 0 || hash.indexOf("#/Dashboard/redPacket") >= 0){
                this.ws(this.props.userInfo.data.uid);
            }
        }
    }

    ws(uid){
        if(this.props.userInfo&&this.props.userInfo.code === "0000"){
            let hash = window.location.hash;
            if(hash.indexOf("#/Dashboard/Activity") >= 0 || hash.indexOf("#/Dashboard/redPacket") >= 0){
                this.webS.onopen = ()=>{
                    let data = JSON.stringify({
                        "type": "bind",
                        "uid": uid
                    });
                    this.webS.send(data);
                    this.setI3 = setInterval(()=>{
                        let data = JSON.stringify({"type":"ping"});
                        this.webS.send(data)
                    },9000);
                };
                this.webS.onmessage = (e)=> {
                    let data = JSON.parse(e.data);
                    let userData = data.data;
                    let type = data.type || "";
                    switch (type) {
                        case "sys_hint":
                            let arr = {
                                username:userData[0],
                                type: userData[1],
                                name:userData[2]
                            };
                            this.Carousel(arr);
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    }

    Carousel(num1){
        let num = this.state.num;
        num.push(num1);
        this.setState({
            num,
        });
        $(".carousel-item").animate(
            {
                marginTop:-20
            },200);
        let setT = setTimeout(()=>{
            this.refresh();
            clearTimeout(setT)
        },220);
        // if(!$(".carousel-item").is(":animated")){
        //     num.push(num1);
        //     this.setState({
        //         num,
        //     });
        //     $(".carousel-item").animate(
        //         {
        //             marginTop:-20
        //         },200);
        //     let setT = setTimeout(()=>{
        //         this.refresh();
        //         clearTimeout(setT)
        //     },220);
        // }else {
        //     let setT = setTimeout(()=>{
        //         num.push(num1);
        //         this.setState({
        //             num,
        //         });
        //         $(".carousel-item").animate(
        //             {
        //                 marginTop:-20
        //             },300);
        //         let setT1 = setTimeout(()=>{
        //             this.refresh();
        //             clearTimeout(setT1)
        //         },320);
        //         clearTimeout(setT)
        //     },300)
        // }
    }

    refresh(){
        let num = this.state.num;
        if(num.length > 1){
            num.splice(0,1);
            this.setState({
                num
            })
        }
        // if(num.length === 1){
        //     let setT = setTimeout(()=>{
        //         $('.carousel-item').animate(
        //             {
        //                 marginTop:-20
        //             },300);
        //         // num.splice(0,1);
        //         clearTimeout(setT)
        //     },3000);
        //     let setTT = setTimeout(()=>{
        //         this.setState({
        //             num
        //         });
        //         clearTimeout(setTT)
        //     },3320);
        // }
        $('.carousel-item').animate(
            {
                marginTop:0
            },0)
    }

    render(){
        return(
            <div className="carousel-info-wrap">
                {
                    this.state.num.map((item, index) => {
                        return <p className={index === 0?"carousel-item":""} key={index}>
                            <span className="trumpet"></span>
                            <span>玩家</span>
                            <span style={{color:"rgba(222,204,53,0.7)"}}>{item.username}</span>
                            <span>{item.type}{item.name}</span>
                        </p>
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {userInfo} = state;
    return {userInfo}
};
export default connect(mapStateToProps)(TopCarousel)
// export default TopCarousel