/**
 * antd组件的validator调用
 */
export function validator(value, callback, checkMethod, message, extraParams) {
    if (value && !checkMethod(value, extraParams)) {
        callback(message)
    } else {
        // 注意: 必须总是返回一个 callback，否则submit的validateFieldsAndScroll 无法响应
        callback()
    }
}


/**
 * 判断手机号
 * value：校验值
 * return boolean
 */
export function checkPhone(value) {
    const exp = /^1[345789]\d{9}$/;
    return value && exp.test(value)
}
/**
 * 判断固定电话
 * value：校验值(0821-2567113)
 * return boolean
 */
export function checkFixPhone(value) {
    const exp = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
    return value && exp.test(value)
}
/**
 * 判断身份证
 * value：校验值
 * return boolean
 */
export function checkIDcard(value) {
    const exp = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return value && exp.test(value)
}
/**
 * 判断QQ号
 * value：校验值
 * return boolean
 */
export function checkQQ(value) {
    const exp = /^\d{5,13}$/;
    return value && exp.test(value)
}
/**
 * 判断数字
 * value：校验值
 * return boolean
 */
export function checkNumber(value) {
    const exp = /^[0-9]*$/;
    if(value == "0"){
        return exp.test(value)
    }
    return value && exp.test(value)
}
/**
 * 判断小数位数不超过两位
 * value：校验值
 * return boolean
 */
export function checkFloatNumberFix2(value) {
    const exp = /^\d{0,8}\.{0,1}(\d{1,2})?$/;
    return value && exp.test(value)
}
export function checkFloatNumberFix1(value,extraParams={}) {
    const exp = /^\d{0,8}\.{0,1}(\d{0,1})$/;
    const {
        min,
        max
    } = extraParams
    if (min && max) {
        return parseFloat(value) >= min && parseFloat(value) <= max
    }
    if (min) {
        return parseFloat(value) >= min
    }
    if (max) {
        return parseFloat(value) <= max
    }
    return value && exp.test(value)
}
/**
 * 判断数字范围
 * value：校验值
 * extraParams:{min:0,max:100}
 * return boolean
 */
export function checkNumberRange(value, extraParams) {
    const {
        min,
        max
    } = extraParams
    if (value) {
        //验证是否为数字(小数位数不超过两位)
        if (!checkFloatNumberFix1(value)) {
            return false
        }
        if (min && max) {
            return parseFloat(value) >= min && parseFloat(value) <= max
        }
        if (min) {
            return parseFloat(value) >= min
        }
        if (max) {
            return parseFloat(value) <= max
        }
    } else {
        return false
    }
}
/**
 * 判断数字范围
 * value：校验值
 * extraParams:{min:1,max:100}
 * return boolean
 */
export function checkPassStandard(value) {
    const exp = /^([1-9][0-9]{0,1}|100)$/;
    return value && exp.test(value)
}
/**
 * 身份证验证
 * value：校验值
 * return boolean
 */
export function checkIdcard(value) {
    const exp1 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    const exp2 = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/;
    return value && (exp1.test(value)||exp2.test(value))
}

/*
* IP地址验证
* value: 校验值
* return boolean
* */
export function checkIPaddress(value) {
    const exp = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/
    return value && exp.test(value)
}

/*
* 邮箱验证
* value: 校验值
* return boolean
* */
export function checkEmail(value) {
    const exp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    return value && exp.test(value)
}