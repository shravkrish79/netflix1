// Node modules
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";

// Project files
import { database } from "./firebaseSetup";

// Methods
export async function readDocuments(collectionName) {
  const querySnapshot = await getDocs(collection(database, collectionName));
  const result = [];
  querySnapshot.forEach((doc) => {
    const document = { id: doc.id, ...doc.data() };
    result.push(document);
  });
  // console.log(result);
  return result;
}


export async function createDocument(collectionName, data) {
  let result = { status: false, payload: null, message: "" };
  try {
    const documentPath = collection(database, collectionName);
    const document = await addDoc(documentPath, data);
    const payload = document.id;
    result = { status: true, payload: payload, message: "Document created" };
  } catch (error) {
    result.message = error.code;
  }

  return result;
}

export async function updateDocument(collectionName, data, id) {
  let result = { status: false, payload: null, message: "" };
  try {
    const documentPath = doc(database, collectionName, id);
    await updateDoc(documentPath, data);
    result = { status: true, payload: null, message: `Document ${id} updated` };
  } catch (error) {
    console.log(error);
    result.message = error.code;
  }

  return result;
}

export async function deleteDocument(collectionName, id) {
  let result = { status: false, payload: null, message: "" };
  try {

    const documentPath = doc(database, collectionName, id);
    await deleteDoc(documentPath);
    result = { status: true, payload: null, message: `Document ${id} deleted` };
  } catch (error) {
    result.message = error.code;
  }
  return result;
}