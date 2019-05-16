import test from 'ava';
import validate from '../source/utils/formValidate';

test('form validate return true', (t) => {
    const data = {
        name: 'xu',
        tel: 18397968326,
        password: 'xujiazheng',
    };
    const rules = {
        name: [
            {
                required: true,
                message: '请输入姓名',
            },
            {
                min: 2, max: 5,
                message: '姓名长度为2-5个字符',
            },
        ],
        tel: [
            {
                required: true,
                message: '请输入电话号码',
            },
            {
                test: /^[0-9]{11}/g,
                message: '电话号码为11位数字组成',
            },
        ],
        password: [
            {
                required: true,
                message: '请输入密码',
            },
            {
                min: 6,
                message: '密码需大于6位',
            },
        ],
    };
    t.is(validate(data, rules).success, true);
});

test('form validate return message', (t) => {
    const data = {
        name: 'xu',
    };
    const errMsg = '姓名长度需大于等于3位';
    const rules = {
        name: [
            {
                min: 3,
                message: errMsg,
            },
        ],
    };
    t.is(validate(data, rules).message, errMsg);
});
