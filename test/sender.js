import {ApiAuth} from "./authorization";

export class Sender {
    constructor(host, apiAuth) {
        if (apiAuth && !apiAuth instanceof ApiAuth) {
            throw new Error('Incorrect type class for API AUTH variable')
        }

        this.host = host;
        this.apiAuth = apiAuth;

        this._getHeaders = this._getHeaders.bind(this);
        this.send = this.send.bind(this);

        this.POST = this.POST.bind(this);
        this.GET = this.GET.bind(this);
        this.PUT = this.PUT.bind(this);
        this.DELETE = this.DELETE.bind(this);
    }

    _getHeaders(headers = {}) {
        if (this.apiAuth) {
            return {
                ...this.apiAuth.getHeaders(),
                ...headers
            }
        }
        return headers
    }

    send(method, path, data = {}, headers = {}) {

    }

    POST(path, data = {}, headers) {
        return this.send('POST', path, data, this._getHeaders(headers));
    }

    GET(path, data = {}, headers) {
        return this.send('GET', path, data, this._getHeaders(headers));
    }

    PUT(path, data = {}, headers) {
        return this.send('PUT', path, data, this._getHeaders(headers));
    }

    DELETE(path, data = {}, headers) {
        return this.send('DELETE', path, data, this._getHeaders(headers));
    }
}
