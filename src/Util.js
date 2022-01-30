import db from "./Firebase"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore"
import { async } from '@firebase/util';


//add new items to the database
export const handleNew = async() => {

    //many methods to add items to firestore
        // 1 setDoc()  there are 2 arguments reference and payload


        //setDoc() for overiding
    // const docRef = doc(db, "colors", "addUniqueDocID");  // doc is the method that use to create document reference
    // const payLoad = {name: "Black", value: "#000"}
    // await setDoc(docRef, payLoad); // setDoc() overide an exisiting doc if exists if not create new one


        // 2 addDoc()  there are 2 arguments reference and payload
        //add doc create a new collection

        const name= prompt("enter color name");
        const value = prompt("enter color value");

        
        const collectionRef = collection(db, "colors");
        const payload = {name: name , value : value , timeStamp: serverTimestamp()} //server timestamp set the time of updated
        await addDoc(collectionRef, payload);
  }


  //edit records in firebase
export const handleEdit = async(id) => {

        const name= prompt("enter color name");
        const value = prompt("enter color value");

        const docRef = doc(db, "colors", id);
        const payload = {name: name , value: value , timeStamp: serverTimestamp()}
        // setDoc(docRef, payload);
        updateDoc(docRef, payload);

        //setDoc() replace the whole document while updateDoc() only changes the fields to be updated

};


    //delete records from firebase
export const handleDelete = async(id) => {

        const docRef = doc(db, "colors", id);
        await deleteDoc(docRef)
}



export const handleQueryDelete = async(id) => {
        const queryToDeleted= prompt("enter color name");
        
        const collectionRef = collection(db, "colors");
        const q = query(collectionRef, where("name", "==" , queryToDeleted));

        const snapshot = await getDocs(q);
        const result = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));


        result.forEach(async result => {
            const docRef = doc(db , "colors" , result.id)
            await deleteDoc(docRef)
        })
}