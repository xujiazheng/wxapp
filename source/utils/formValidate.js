
const validateFalse = () => false;
const validateRequired = (target) => target;
const validateLength = (target = '', {min = 0, max = Infinity}) => (target.length >= min && target.length <= max);
const validatePattern = (target = '', {test}) => test.test(target);

/**
 * 通过规则描述返回校验函数，如果没有匹配最终返回false函数
 * 目前有3种校验规则： required: true, min/max, test: 正则
 * @param {Object} rule 规则描述对象
 */
const getValidateItem = (rule) => {
    if (rule.required) {
        return validateRequired;
    }
    if (rule.min || rule.max) {
        return validateLength;
    }
    if (rule.test) {
        return validatePattern;
    }
    return validateFalse;
};

const invited = {
    success() {
        return {
            success: true,
        };
    },
    fail(message = '数据格式错误') {
        return {
            success: false,
            message,
        };
    },
};
/**
 * 校验数据函数，如果校验某一下失败，则返回{success: false, message: 对应的提示}，校验成功返回{success: true}
 * @param {Object} data 校验的数据对象
 * @param {Object} rules 规则map表，key值为校验数据的属性
 */
const validate = (data, rules) => {
    for (let key in rules) {
        let ruleItems = rules[key];
        for (let rule of ruleItems) {
            let validateHandle = getValidateItem(rule);
            if (!validateHandle(data[key], rule)) {
                return invited.fail(rule.message);
            }
        }
    }
    return invited.success();
};

export default validate;
