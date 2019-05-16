import EventBus from '../../utils/EventBus';
import extend from '../../utils/extend';
const bus = new EventBus();

/**
 * 混入函数对象
 * 混入的函数接收原函数和原函数的参数，执行完需要执行的逻辑后接着执行原函数
 */
const mixins = {
    // onLoad时将事件处理对象绑定到实例上。
    onLoad(originOnLoad, options) {
        this.$bus = bus;

        originOnLoad && originOnLoad.call(this, options);
    },
};
// Base函数将传入的原始数据进行修改，返回新的对象
const Base = (opts) => {
    const newOpts = extend(true, {}, opts);
    for (let key in mixins) {
        let handle = opts[key];

        newOpts[key] = function (...args) {
            mixins[key].call(this, handle, ...args);
        };
    }
    return newOpts;
};

export default Base;
