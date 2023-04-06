// Node modules
import { collection, getDocs, getDoc, addDoc, doc, setDoc, deleteDoc, updateDoc, getCountFromServer } from "firebase/firestore";

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

export async function createDocumentWithCustomId(collectionName, data, id) {
  let result = { status: false, payload: null, message: "" };
  try {
    const documentPath = collection(database, collectionName);
    await setDoc(doc(documentPath, id), data);
    result = { status: true, payload: id, message: "subCollection Document created" };
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


export async function readDocument(collectionName, id) {
  try {
    const reference = doc(database, collectionName, id);
    const document = await getDoc(reference);
    const result = { id: document.id, ...document.data() };
    return result;

  } catch (err) {
    console.error(err);
  }
}

export async function deleteCollection(collectionName) {
  let result = { status: false, payload: null, message: "" };
  try{
    const querySnapshot = await getDocs(collection(database, collectionName));
    querySnapshot.forEach(async (itm) => {
      const documentPath = doc(database, collectionName, itm.id);
      await deleteDoc(documentPath);
    });
    result = { status: true, payload: null, message: `all documents are deleted` };
  }
  catch(err){
    console.error(err);
    result.message = err.code;
  }

  return result;
}


export async function getDocumentCount(collectionName){
  const collectionRef = collection(database, collectionName);
  const documentCount = await getCountFromServer(collectionRef);
  return documentCount;
}