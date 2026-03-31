import { 
  getFirestore, 
  collection, 
  getDocs, 
  getDoc, 
  doc 
} from "firebase/firestore";
import app from "./firebase";

const db = getFirestore(app);

// mengambil semua data dari collection
export async function retrieveProducts(collectionName: string) {
  const snapshot = await getDocs(collection(db, collectionName));

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

// mengambil data berdasarkan ID
export async function retrieveDataByID(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(db, collectionName, id));

  const data = snapshot.data();

  return data;
}