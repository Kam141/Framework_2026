import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  addDoc,
  where,
  updateDoc,
} from "firebase/firestore";
import app from "./firebase";
import bcrypt from "bcrypt";

export const ROLE = {
  MEMBER: "member",
  EDITOR: "editor",
  ADMIN: "admin",
};

const db = getFirestore(app);

// ambil semua data dari collection
const getAllData = async (collectionName: string) => {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// ambil user berdasarkan email
export const getUserByEmail = async (email: string) => {
  const q = query(collection(db, "users"), where("email", "==", email));
  const snapshot = await getDocs(q);

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data[0] || null;
};

// hash password reusable
const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};



export async function retrieveProducts(collectionName: string) {
  return await getAllData(collectionName);
}

export async function retrieveDataByID(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(db, collectionName, id));
  return snapshot.data();
}

export async function signIn(email: string) {
  return await getUserByEmail(email);
}

export async function signUp(
  userData: {
    email: string;
    fullname: string;
    password: string;
    role?: string;
  },
  callback: Function,
) {
  const existingUser = await getUserByEmail(userData.email);

  if (existingUser) {
    callback({
      status: "error",
      message: "Email already exists",
    });
    return;
  }

  try {
    userData.password = await hashPassword(userData.password);
    userData.role = userData.role || ROLE.MEMBER;

    await addDoc(collection(db, "users"), userData);

    callback({
      status: "success",
      message: "User registered successfully",
    });
  } catch (error: any) {
    callback({
      status: "error",
      message: error.message,
    });
  }
}

export async function signInWithGoogle(userData: any, callback: any) {
  try {
    const existingUser: any = await getUserByEmail(userData.email);

    if (existingUser) {
      // user lama → update
      userData.role = existingUser.role;

      await updateDoc(doc(db, "users", existingUser.id), userData);

      callback({
        status: true,
        message: "User logged in",
        data: userData,
      });
    } else {
      // user baru
      userData.role = ROLE.MEMBER;

      await addDoc(collection(db, "users"), userData);

      callback({
        status: true,
        message: "User registered",
        data: userData,
      });
    }
  } catch (error) {
    callback({
      status: false,
      message: "Failed to register user",
    });
  }
}