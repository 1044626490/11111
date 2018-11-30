import 'whatwg-fetch';
import * as C from '~/constants/api';
import queryString from 'query-string'
import {login_Popup} from '~/action/loginPopup';
import connect from "react-redux/es/connect/connect";
import {store} from "../index"
const METHODS = {
    GET: 'get',
    POST: 'POST',
    PUT: 'put',
    DELETE: 'delete'
};

/**
 * @method   request
 * 封装fetch请求的方法
 * @param {string} url 请求的接口地址 必填
 * @param {object} params 请求的接口参数 必填
 * @param {object} [headers={}] 请求的请求头 不必填
 * @param {string} [method=get] 请求的方法 不必填
 * */
export const request = (url, params, headers = {}, method = METHODS.GET, mode = false) => {
    // console.log(url, params, method)
    let options = {
        headers: {
            // 'Content-Type': jsonType ? 'application/json;charset=UTF-8' : 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            ...headers
        },
        method: method,
        credentials: 'include',
    };
    if (mode) {
        options = {...options, mode: "cors"};
        delete options.credentials;
    }
    if (method !== METHODS.GET && params) {

        let formData = new FormData();
        for (let key in params) {
            (typeof params[key]) === 'object' && key !== 'file' ? params[key] = JSON.stringify(params[key]) : params[key];
            params[key] !== undefined && formData.append(key, params[key]);
        }
        // console.log(formData.keys());
        options.body = formData;
    } else if (method === METHODS.GET && params) {
        const newParams = (~url.lastIndexOf('?') ? '&' : '?') + queryString.stringify(params);
        url += newParams;
    }
    // url = window.config.context + url;
    
    return fetch(url, options).then(checkRespStatus);
};

/**
 * @method   post
 * 封装fetch的post请求的方法
 * @param {string} url 请求的接口地址 必填
 * @param {Object} params 请求的接口参数 必填
 * @param {headers} headers 请求的请求头 不必填
 * */
export const post = (url, params, headers) => request(url, params, headers, METHODS.POST);

export const postModeCors = (url, params, headers) => request(url, params, headers, METHODS.POST, true);
/**
 * @method   checkRespStatus
 * 封装检查请求返回状态方法
 * @param {Object} respPromise 请求返回的数据 必填
 * */
const checkRespStatus = (respPromise) => {
    // console.log(respPromise);
    return new Promise((resolve, reject) => {
        if (respPromise && respPromise.status === 200) {
            // console.log(respPromise.method);
            // if (respPromise.url.indexOf(C.GET_LOGIN_CAPTCHA) >= 0) {
            //     respPromise.blob().then((res) => {
            //         resolve(res)
            //     })
            // } else {
                respPromise.json().then((res) => {
                    if (res.code === "0000" || res.status === "1") {
                        if(res.data===null){
                            res.data=[]
                        }
                        resolve(res);
                    } else if(res.status ==="3"){
                        store.dispatch(login_Popup(true))
                    }
                    else {
                        reject(res);
                    }
                })
            // }
        } else {
            // Message.error(respPromise.statusText);//公共catch处理
            reject(respPromise);//交给子组件catch处理
        }
    })
};
/**
 * @method getDateOrTime 获取对应时间日期
 * @param {number} time 时间原始数据 必填
 * @param {string} type 获取的日期类型   year  month  date  date-hour   date-minute  date-second  不必填
 * @param {string} str - / zh 获取日期的间隔方式  例如‘-’ ‘/’ ‘年’ 不必填
 * @param {boolean} hasZero 是否用“0”补齐  默认为是  不必填
 * @return {str} dateTime 返回的目标格式
 */
export const getDateOrTime = (time, str = "-", type = "date", hasZero = true) => {
    let dateTime = "";
    if (time) {
        const sourceTime = new Date(time);
        let year = sourceTime.getFullYear();
        let month = sourceTime.getMonth() + 1;
        let day = sourceTime.getDate();
        let hour = sourceTime.getHours();
        let minute = sourceTime.getMinutes();
        let second = sourceTime.getSeconds();
        if (hasZero) {
            month = month < 10 ? ("0" + month) : month;
            day = day < 10 ? ("0" + day) : day;
            hour = hour < 10 ? ("0" + hour) : hour;
            minute = minute < 10 ? ("0" + minute) : minute;
            second = second < 10 ? ("0" + second) : second;
        }
        switch (type) {
            case "year":
                dateTime = year + "年";
                break;
            case "month":
                if (str === "zh") {
                    dateTime = year + "年" + month + "月";
                } else {
                    dateTime = year + str + month;
                }
                break;
            case "date":
                if (str === "zh") {
                    dateTime = year + "年" + month + "月" + day + "日";
                } else {
                    dateTime = year + str + month + str + day;
                }
                break;
            case "date-hour":
                if (str === "zh") {
                    dateTime = year + "年" + month + "月" + day + "日" + hour + "时";
                } else {
                    dateTime = year + str + month + str + day + " " + hour;
                }
                break;
            case "date-minute":
                if (str === "zh") {
                    dateTime = year + "年" + month + "月" + day + "日" + hour + "时" + minute + "分";
                } else {
                    dateTime = year + str + month + str + day + " " + hour + ":" + minute;
                }
                break;
            case "date-second":
                if (str === "zh") {
                    dateTime = year + "年" + month + "月" + day + "日" + hour + "时" + minute + "分" + second + "秒";
                } else {
                    dateTime = year + str + month + str + day + " " + hour + ":" + minute + ":" + second;
                }
                break;
            default:
                if (str === "zh") {
                    dateTime = year + "年" + month + "月" + day + "日";
                } else {
                    dateTime = year + str + month + str + day;
                }
                break;
        }
    }
    return dateTime;
}
