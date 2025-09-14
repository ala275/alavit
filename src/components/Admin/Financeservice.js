import { db } from "./firebase";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const financeCollectionRef = collection(db, "finance")
class FinanceDataService {
  addFinances = (newFinance) => {
    return addDoc(financeCollectionRef, newFinance);
  };

  updateFinance = (id, updatedFinance) => {
    const financeDoc = doc(db, "finance", id);
    return updateDoc(financeDoc, updatedFinance);
  };

  deleteFinance = (id) => {
    const financeDoc = doc(db, "finance", id);
    return deleteDoc(financeDoc);
  };

  getAllFinances = () => {
    return getDocs(financeCollectionRef);
  };

  getFinance = (id) => {
    const financeDoc = doc(db, "finance", id);
    return getDoc(financeDoc);
  };
}

export default new FinanceDataService();
