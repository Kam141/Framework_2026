import { jest } from "@jest/globals";

export const useRouter = () => ({
  pathname: '/',
  push: jest.fn(),
  query: {},
  asPath: '/',
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn()
  },
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn()
});
