
/**
 * 订阅发布模式，事件管理类
 */
class EventBus {
    constructor({single = true} = {}) {
        this.single = single;
        this.events = {};
    }
    /**
     * 监听事件方法
     * @param {String} ename 事件名
     * @param {Function} handle 事件处理函数
     */
    on(ename, handle) {
        if (!ename || !handle) {
            throw new Error('参数错误，请检查');
        }
        let eventHandles = this.events[ename] || [];
        if (this.single) {
            eventHandles[0] = handle;
        } else {
            eventHandles.push(handle);
        }
        this.events[ename] = eventHandles;
    }
    /**
     * 触发事件
     * @param {String} ename 事件名
     * @param  {...any} args 传递参数
     */
    emit(ename, ...args) {
        let eventHandles = this.events[ename] || [];
        eventHandles.forEach((handle) => {
            handle(...args);
        });
    }
    /**
     * 注销事件，传递thisHandle则注销事件的此处理函数
     * @param {String} ename 事件名
     * @param {Function} thisHandle 处理函数
     */
    off(ename, thisHandle) {
        if (!thisHandle) {
            this.events[ename] = undefined;
            return;
        }
        let eventHandles = this.events[ename] || [];
        this.events[ename] = eventHandles.filter((handle) => handle !== thisHandle);
    }
}

export default EventBus;
