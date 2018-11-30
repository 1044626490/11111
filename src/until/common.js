
/**
 * 判断JS变量是否空值
 * 如果是 undefined， null， ""， NaN，false，0，[]，{} ，含有空格的空白字符串，都返回true，否则返回false
 * @param v(变量v)
 * @returns {boolean}
 */
export function isEmpty(v) {
    switch (typeof v) {
        case "undefined":
            return true;
        case "string":
            // 去掉空格、换行
            if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0) {return true;}
            break;
        case "boolean":
            if (!v) {return true;}
            break;
        case "number":
            if (v === 0 || isNaN(v)) {return true;}
            break;
        case "object":
            if (v === null || v.length === 0) {return true;}
            for (const i in v) {
                return false;
            }
            return true;
    }
    return false;
}