'use strict';

const Classes = {
    get Module() {
        return require('./src/module').Module;
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
        return require('./redux/sender').Sender;
    },

    get Redux() {
        return require('react-redux');
    },

    get connect() {
        return require('react-redux').connect;
    },

    get Provider() {
        return require('react-redux').Provider;
    }
};

module.exports = Classes;
