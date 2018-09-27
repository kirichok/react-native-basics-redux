import {createAction} from 'redux-actions';
import {Sender} from "../redux/sender";

const PENDING = 'PENDING',
    FULFILLED = 'FULFILLED',
    REJECTED = 'REJECTED';

const ACTION_CLEAR_ERROR = 'CLEAR_ERROR',
    ACTION_INITIAL_STATE = 'INITIAL_STATE';

class Module {
    constructor(name, /*sender,*/ initialState) {
        /*if (!sender || !sender instanceof Sender) {
            throw new Error('Wrong sender instance for module');
        }*/

        this.name = name;
        this.nameLen = name.length;
        // this.sender = sender;

        this.initalState = {
            loading: false,
            error: null,
            ...initialState
        };

        this.actions = {};
        this.nameActionTypes = {};

        this.initActions = this.initActions.bind(this);
        this.registerAction = this.registerAction.bind(this);
        this._getActionName = this._getActionName.bind(this);

        this.reducer = this.reducer.bind(this);
        this.onPending = this.onPending.bind(this);
        this.onFulfilled = this.onFulfilled.bind(this);
        this.onRejected = this.onRejected.bind(this);
        this.onNotAsync = this.onNotAsync.bind(this);

        this.clearError = this.clearError.bind(this);

        this.initActions();
    }

    _getActionName(nameActionType, type = '') {
        if (!this.nameActionTypes[nameActionType]) {
            this.nameActionTypes[nameActionType] = nameActionType.substring(
                this.nameLen + 1,
                nameActionType.length - (type.length ? type.length + 1 : 0)
            );
        }
        return this.nameActionTypes[nameActionType];
    }

    initActions() {
        this.registerAction(ACTION_INITIAL_STATE, () => this.initalState);
        this.registerAction(ACTION_CLEAR_ERROR, () => {
        });
    }

    registerAction(name, handle, overwrite = false) {
        const action = new Action(this.name, name, handle);
        if (!overwrite && this.actions[name]) {
            throw new Error(`Duplicate action name: ${action.name}`);
        }
        this.actions[name] = action;
        return action;
    }

    onPending(state, type, payload) {
        return state;
    }

    onFulfilled(state, type, payload) {
        return state;
    }

    onRejected(state, type, payload) {
        return state;
    }

    onNotAsync(state, type, payload) {
        switch (type) {
            case ACTION_INITIAL_STATE:
                return {...payload}

        }
        return state;
    }

    reducer(state = this.initalState, {type = '', payload = null}) {
        if (type.startsWith(this.name)) {
            if (type.endsWith(PENDING)) {
                return {
                    ...this.onPending(state, this._getActionName(type, PENDING), payload),
                    // ...this.actions[this._getActionName(type, PENDING)].onPending(state, payload),
                    loading: true,
                    error: false
                }
            } else if (type.endsWith(FULFILLED)) {
                return {
                    ...this.onFulfilled(state, this._getActionName(type, FULFILLED), payload),
                    // ...this.actions[this._getActionName(type, FULFILLED)].onFulfilled(state, payload),
                    loading: false,
                    error: false
                }
            } else if (type.endsWith(REJECTED)) {
                return {
                    ...this.onRejected(state, this._getActionName(type, REJECTED), payload),
                    // ...this.actions[this._getActionName(type, REJECTED)].onRejected(state, payload),
                    loading: false,
                    error: payload
                }
            } else {
                return {
                    loading: false,
                    error: false,
                    ...this.onNotAsync(state, this._getActionName(type), payload),
                    // ...this.actions[this._getActionName(type)].onNotAsync(state, payload),
                }
            }
        }
        return state;
    }

    clearError() {
        return this.actions[ACTION_CLEAR_ERROR].callAction();
    }

    setStateToInitial() {
        return this.actions[ACTION_INITIAL_STATE].callAction();
    }
}

class Action {
    constructor(moduleName, name, handle) {
        this._name = `${moduleName}/${name.toUpperCase()}`;
        this._handle = handle;
        this._action = null;

        this.callAction = this.callAction.bind(this);
        this.callHandle = this.callHandle.bind(this);
    }

    get name() {
        return this._name;
    }

    callAction(data) {
        if (!this._action) {
            this._action = createAction(this._name, this._handle);
        }
        return this._action(data);
    }

    callHandle(data) {
        return this._handle(data);
    }
}

export {Module}
