import "@testing-library/jest-dom";

if (typeof global.Request === "undefined") {
  // Minimal Request/Response/Headers shims for Next.js web APIs in Jest/jsdom
  global.Request = class Request {
    constructor(input: string | Request, init?: Record<string, unknown>) {
      return input as any;
    }
  } as any;
}

if (typeof global.Headers === "undefined") {
  global.Headers = class Headers {
    constructor(init?: Record<string, unknown>) {
      return init as any;
    }
  } as any;
}

if (typeof global.Response === "undefined") {
  global.Response = class Response {
    constructor(body?: any, init?: Record<string, unknown>) {
      return { body, init } as any;
    }
  } as any;
}
