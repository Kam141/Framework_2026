const mockGetFirestore = jest.fn(() => "mock-db");
const mockCollection = jest.fn();
const mockGetDocs = jest.fn();
const mockGetDoc = jest.fn();
const mockDoc = jest.fn();
const mockQuery = jest.fn();
const mockAddDoc = jest.fn();
const mockWhere = jest.fn();
const mockUpdateDoc = jest.fn();

module.exports = {
  __esModule: true,
  getFirestore: mockGetFirestore,
  collection: mockCollection,
  getDocs: mockGetDocs,
  getDoc: mockGetDoc,
  doc: mockDoc,
  query: mockQuery,
  addDoc: mockAddDoc,
  where: mockWhere,
  updateDoc: mockUpdateDoc,
};
