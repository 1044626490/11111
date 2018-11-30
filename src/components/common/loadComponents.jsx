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
        return <div>Sorry, there was a problem loading the page.</div>;
    }
    else {
        return null;
    }
};
export default MyLoadingComponent