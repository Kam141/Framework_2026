module.exports = {
  __esModule: true,
  signIn: jest.fn(() => Promise.resolve({ error: null, ok: true, status: 200, url: "/" })),
  signOut: jest.fn(),
  useSession: jest.fn(() => ({ data: null, status: "unauthenticated" })),
  SessionProvider: ({ children }) => children,
};
