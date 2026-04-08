const mockInitializeApp = jest.fn(() => ({ name: "mock-app" }));

module.exports = {
  __esModule: true,
  initializeApp: mockInitializeApp,
  getApps: jest.fn(() => []),
  getApp: jest.fn(),
};
