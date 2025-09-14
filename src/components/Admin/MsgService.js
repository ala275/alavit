import { db } from "./firebase";

import {
  collection,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const messageCollectionRef = collection(db, "ContactUs");
class MessageDataService {

  

  deleteBook = (id) => {
    const msgDoc = doc(db, "ContactUs", id);
    return deleteDoc(msgDoc);
  };

  getAllBooks = () => {
    return getDocs(messageCollectionRef);
  };

  getBook = (id) => {
    const msgDoc = doc(db, "ContactUs", id);
    return getDoc(msgDoc);
  };
}

export default new MessageDataService();