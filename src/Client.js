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

  get configState() {
    const input = `${this.baseUrl}${this.clientId}${this.secret}`;
    return btoa(input);
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

    if (!response.ok) {
      throw new Error(response.text);
    }

    return (await response.json());
  }

  async get(path: '', query={}) {
    const params = new URLSearchParams(query).toString();
    const qs = params ? `?${params}` : '';
    const fullUrl = `${this.baseUrl}${path}${qs}`;
    const data = await this.request('get', fullUrl);
    return data;
  }

  async getPaginated(path: '', query={}) {
    let results = [];
    let paginatedResponse = await this.get(path, query);

    while (paginatedResponse.next) {
      results = results.concat(paginatedResponse.results);
      paginatedResponse = await this.request('get', paginatedResponse.next);
    }

    results = results.concat(paginatedResponse.results);
    return results;
  }
}

export { Client };
