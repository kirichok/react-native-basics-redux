'use strict';

const Classes = {
    get Module() {
        return require('./src/module');
    },

    get Store() {
        return require('./src/store');
    },

    get Utils() {
        return require('./src/utils');
    },

    get Authorization() {
        return require('./redux/authorization');
    },

    get Sender() {
        return require('./redux/sender');
    },
};

module.exports = Classes;
