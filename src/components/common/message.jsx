
import {message} from 'antd';

export const success = (mes = '成功') => {
    message.success(mes);
};

export const error = (mes = '失败') => {
    message.error(mes);
};

export const warning = (mes = '警告') => {
    message.warning(mes);
};
export const info = (mes = '信息') => {
    message.info(mes);
};
