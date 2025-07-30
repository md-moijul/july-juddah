module.exports = {
  NextRequest: class {
    constructor(input, init) {
      this.url = input;
      this.method = init?.method;
      this.headers = new Map(init?.headers);
      this.body = init?.body;
    }
    json() {
      return Promise.resolve(JSON.parse(this.body));
    }
  },
  NextResponse: class {
    constructor(body, init) {
      this.status = init?.status;
      this.body = body;
      this.headers = new Map();
    }
    static json(body, init) {
      return new module.exports.NextResponse(JSON.stringify(body), init);
    }
    json() {
      return Promise.resolve(JSON.parse(this.body));
    }
    arrayBuffer() {
      return Promise.resolve(this.body);
    }
  },
};
