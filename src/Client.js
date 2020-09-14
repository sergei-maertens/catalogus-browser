import jwt from 'jsonwebtoken';



class Client {
    constructor(baseUrl, clientId, secret) {
        if (!baseUrl.endsWith('/')) {
            baseUrl += '/';
        }
        this.baseUrl = baseUrl;
        this.clientId = clientId;
        this.secret = secret;
    }

    get token() {
        const payload = {client_id: this.clientId};

        return jwt.sign(
            payload,
            this.secret,
            {
                algorithm: 'HS256',
                issuer: this.clientId,
            }
        );
    };

    async request(method='get', url, body=null) {
        const _body = body ? JSON.stringify(body) : null;
        const response = await fetch(
            url,
            {
                method: method,
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Accept': 'application/json',
                },
                body: _body
            }
        );
        return (await response.json());
    }

    async get(path: '') {
        const fullUrl = `${this.baseUrl}${path}`;
        const data = await this.request('get', fullUrl);
        return data;
    }
}

export { Client };
