import test from 'ava';
import EventBus from '../source/utils/EventBus';

test('bus.on is success', (t) => {
    const bus = new EventBus();
    bus.on('msg', (msg) => {
        t.is(msg, 'nihao');
    });
    bus.emit('msg', 'nihao');
});

test('bus.off is success 1', (t) => {
    const bus = new EventBus();
    bus.on('msg', (msg) => {
        // ..
    });
    bus.off('msg');
    t.is(bus.events.msg, undefined);
});

test('EventBus single', (t) => {
    const bus = new EventBus({
        single: true, // 默认就是true
    });
    bus.on('msg', (msg) => {
        // ..
    });
    bus.on('msg', (e) => {
        // ...
    });
    t.is(bus.events.msg.length, 1);
});

test('EventBus not single 1', (t) => {
    const bus = new EventBus({
        single: false,
    });
    bus.on('msg', (msg) => {
        // ..
    });
    bus.on('msg', (e) => {
        // ...
    });
    t.is(bus.events.msg.length, 2);
});

test('EventBus not single 2', (t) => {
    const bus = new EventBus({
        single: false,
    });
    const handle = (e) => {
        // ...
    };
    bus.on('msg', (msg) => {
        // ..
    });
    bus.on('msg', handle);

    bus.off('msg', handle);

    t.is(bus.events.msg.length, 1);
});
