/**
 * @component  MyLoadingComponent
 * @param  {isLoading} isLoading isLoading,是否显示加载组件,默认带出
 * @param  {error} error error加载组件错误的信息
 * */
import React from 'react';
import { Spin, Alert  } from 'antd';
import "./loadComponents.less"

const MyLoadingComponent = ({isLoading, error}) => {
    if (isLoading) {
        return <Spin tip="Loading..."></Spin>;
    }
    else if (error) {
        return <div>抱歉，服务器出错，请点击<a href={()=>{window.location.href = "#/Dashboard/index"}}>返回</a>回到主页面，或者重启app</div>;
    }
    else {
        return null;
    }
};
export default MyLoadingComponent