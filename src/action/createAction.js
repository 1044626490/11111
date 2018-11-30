/**
 * @method createAction
 * @param  {String} action action的type,必传
 * @param  {Function} payloadCreator payloadCreator为执行请求的函数
 * */
const createAction = (action, payloadCreator) => {
    return (params) => dispatch => {
        return new Promise(function (resolve, reject) {
            payloadCreator(params).then((result) => {
                dispatch({
                    type: action,
                    data: Object.assign({}, result.content.data)
                });
                resolve(result);
            }).catch((error) => {
                console.error(`请求 ${action}异常，请求结果为: ${JSON.stringify(error)}`);
                reject(error)
            })
        })
    }
};
export default createAction