import React from "react";
import MyForm from "./form"
import { Modal,Button} from "antd";
import moment from "moment";//设置日期默认格式
import "./popForm.less";

/**
 * 弹出框表单组件
 * */
class PopForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 弹出框显示/隐藏
            modalVisible:false,
            // 上传文件列表
            fileList:[]
        };
    }

    componentWillReceiveProps(nextProps){
        if(this.props.modalVisible!=nextProps.modalVisible&&nextProps.modalVisible){
            // 显示Modal
            this.setState({
                modalVisible:true
            })
        }
        //若传入进来的modalVisible为false
        if(this.props.modalVisible!=nextProps.modalVisible&&!nextProps.modalVisible){
            // 隐藏Modal
            this.setState({
                modalVisible:false
            })
        }
    }


    render() {
        const { /*传入示例*/
            title,
            modalWidth=560,
            formItemLayout={ //可省略
                labelCol: { span: 5},//label 标签布局
                wrapperCol: { span: 16 }
            },
            itemList = [
                {
                    name:"姓名",
                    keyName:"name",
                    type:"text",
                    rules: [
                        { required: true, message: "请填写姓名" , whitespace: true }
                    ],
                    placeholder:"Please select a country",
                    onChange:function (e,form) {//除了联动，一般用不上
                    }
                },
                {
                    name:"数量",
                    keyName:"num",
                    type:"number",
                    defaultValue:3,
                    rules: [
                        { required: true, message: "Please select your country!" }
                    ],
                    placeholder:"Please select a country"
                },
                {
                    name:"密码",
                    type:"password",
                    keyName:"password",
                    placeholder:"请输入密码",
                    defaultValue:"",
                    rules: [
                        { required: true, message: "请填写密码", whitespace: true }
                    ],
                    visible:true
                },
                {
                    name:"地址",
                    type:"textarea",
                    keyName:"address",
                    placeholder:"请输入地址",
                    rows:4,
                    defaultValue:""
                },
                {
                    name:"爱好",
                    type:"checkbox",
                    keyName:"sex",
                    defaultValue:[1],//注：多选必须是数组
                    options:[
                        {value:0,label:"体育"},
                        {value:1,label:"音乐"},
                        {value:2,label:"美术"}
                    ],
                    rules: [
                        { required: true, message: "请选择爱好"}
                    ]
                },
                {
                    name:"性别",
                    type:"radio",
                    keyName:"sex",
                    defaultValue:1,
                    options:[
                        {value:0,label:"女"},
                        {value:1,label:"男"}
                    ],
                    rules: [
                        { required: true, message: "请选择性别"}
                    ]
                },
                {
                    name:"偶像",
                    type:"select",//注：下拉无权限控制
                    keyName:"sex",
                    defaultValue:1,
                    options:[
                        {value:0,label:"吴亦凡"},
                        {value:1,label:"黄子韬"},
                        {value:2,label:"张艺兴"}
                    ],
                    rules: [
                        { required: true, message: "请选择偶像"}
                    ]
                },
                {
                    name:"日期",
                    keyName:"date",
                    type:"date",
                    dateType:"month",
                    rules: [
                        { required: true, message: "Please select your country!" }
                    ],
                    defaultValue:moment("2018-08-15","YYYY-MM-DD"),
                    placeholder:"Please select a country",
                    disabledDate:function(current){
                        return current && current < moment("2018-08-15", "YYYY-MM-DD")
                    }
                }
                // {
                //     name:"两个日期",
                //     type:"dateTwo",
                //     keyName:"dateTwo",
                //     defaultValue:[moment("2018/07/07", "YYYY/MM/DD"), moment("2018/07/09", "YYYY/MM/DD")],
                //     placeholder:["Start Time", "End Time"],
                //     rules:[//权限控制
                //         {name:"isrequire",tip:"请填写姓名"}
                //     ],
                //     itemNameWidth:"20%",/*选配*/
                //     itemInputStyle:{width:"85%"},/*选配*/
                //     onChange:function(date,dateString){
                //         console.log(date,dateString,"date")
                //     }
                // },
                // {
                //     name:"通知人员",
                //     type:"inform",//注：单选无权限控制
                //     keyName:"sendType",
                //     defaultValue:1,
                //     options:[
                //         {value:1,label:"所有人"},
                //         {value:2,label:"按部门"},
                //         {value:3,label:"按人"}
                //     ],
                //     departmentKeyName:"department",
                //     departmentOptions:[
                //         {value:1,label:"设计部"},
                //         {value:2,label:"技术部"},
                //         {value:3,label:"财务部"}
                //     ],
                //     personKeyName:"menList",
                //     personList:[
                //         {id:1,name:"超级管理员"},
                //         {id:2,name:"测试bbb"},
                //         {id:3,name:"zcxzx"},
                //         {id:4,name:"张三"},
                //         {id:5,name:"李四"},
                //         {id:6,name:"张老师"},
                //         {id:7,name:"zcl"}
                //     ],
                //     searchPerson:function(str){
                //         console.log(str,"str")
                //     // _this.searchPerson(str)
                //     },
                //     rules:[//权限控制
                //         {name:"isrequire",tip:"请填写内容"}
                //     ],
                //     itemNameWidth:"20%",/*选配*/
                //     itemInputStyle:{width:"85%"},/*选配*/
                //     onChange:function(e){}
                // },
                // {
                //     name: "消息文件",//后台接收的文件流参数名
                //     type:"file",
                //     keyName:"newsFile",
                //     url:"",//上传的地址
                //     defaultValue:[{
                //         uid:-1,// 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
                //         name:"hello",// 文件名
                //         url:"xxxx",// 文件url
                //         status: "done"// 状态有：uploading done error removed
                //     }],//或者defaultValue:""
                //     rules:[//权限控制
                //         {name:"isrequire",tip:"请填写姓名"}
                //     ],
                //     visible:"true",
                //     disabled:false,
                //     itemNameWidth:"20%",/*选配*/
                //     itemInputStyle:{width:"85%"}/*选配*/
                // }
            ],
            buttonStyle={},
            onOk,
            onCancel,
            className
        } = this.props.initData;


        return (
            <div className="modal-pupModal">
                {/*<Modal*/}
                    {/*title={title}*/}
                    {/*width={modalWidth}*/}
                    {/*wrapClassName={`vertical-center-modal ${className}`}*/}
                    {/*visible={this.state.modalVisible}*/}
                    {/*onCancel={()=>{onCancel()}}*/}
                    {/*destroyOnClose={true}//关闭时销毁 Modal 里的子元素*/}
                    {/*ref={(ins)=>{this.modalInstance=ins}}*/}
                    {/*footer={null}*/}
                {/*>*/}
                    <MyForm onCancel={onCancel} onOk={onOk} buttonStyle={buttonStyle}
                        formItemLayout={formItemLayout} itemList={itemList}
                        wrappedComponentRef={(form) => {return this.form = form}}
                    >
                        <Button onClick={()=>{onCancel()}} style={{marginRight:10}}>取消</Button>
                    </MyForm>
                {/*</Modal>*/}
            </div>

        );
    }
}
PopForm.defaultProps={
    initData:{
        title:"",
        modalWidth : 560,
        formConfig : [],
        onOk:function(){},
        onCancel:function(){}
    },
    modalVisible:false
}


export default PopForm;
