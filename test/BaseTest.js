import test from 'ava';
import Base from '../source/common/base/base';

const options = {
    data: {
        a: 11,
        b: 22,
    },
    onLoad() {
        // ...
    },
};

const newOptions = Base(options);
newOptions.onLoad();
test('Base minxs onLoad success', (t) => {
    t.not(newOptions.$bus, undefined);
});
