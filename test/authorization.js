export class ApiAuth {
    constructor(auth) {
        this._auth = auth;
        this.getHeaders = this.getHeaders.bind(this);
    }

    getHeaders() {
        return this._auth.apiHeader
    }
}

export class Storage {
    constructor(storage) {
        this._storage = storage;
        this.save = this.save.bind(this);
        this.remove = this.remove.bind(this);
        this.get = this.get.bind(this);
    }

    get(name) {

    }

    save(name, value) {

    }

    remove(name) {

    }
}

export class Authorization {
    constructor(name = 'Auth:', storage) {
        if (storage && !storage instanceof Storage) {
            throw new Error('Authorization: Wrong instance for STORAGE variable')
        }

        this._name = name;
        this._token = null;
        this._header = {};
        this._storage = storage;
    }

    async _load() {
        if (!this._storage) {
            return;
        }
        await this.setToken(await this._storage.load(this._name));
    }

    async _save() {
        if (!this._storage) {
            return;
        }
        await this._storage.save(this._name, this._token);
    }

    async _remove() {
        if (!this._storage) {
            return;
        }
        await this._storage.remove(this._name);
    }

    async setToken(token) {
        this._token = token;
        this._header = token
            ? {'AUTHORIZATION': 'Bearer ' + token}
            : {};

        if (token) {
            await this._save();
        } else if (this._token) {
            await this._remove();
        }
    }

    getToken() {
        return this._token;
    }

    get apiHeader() {
        return this._header;
    }
}
