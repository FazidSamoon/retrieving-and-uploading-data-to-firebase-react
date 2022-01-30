import react, { useEffect, useState } from 'react';
import './App.css';
import { handleNew , handleEdit , handleDelete , handleQueryDelete } from "./Util"
import Dot from './Dot';
import db from "./Firebase"
import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore"

function App() {

  const [colors , setColors] = useState([]);

  
  
    //Fetch data from the firestore database
  useEffect(() => {
    //onSnapshot returns as soon as the db changes no need to refresh
    //getDocs() only gets the data once while onSnapshot() continuesly return data
    //collection is to target the entire collection
    
    //to target a specific doc can use doc() method   onSnapshot(doc(db , "colors", "someSpecificIdToFetch"), () => {})
    
    

    //method 1   normal way of rendering data
    // const unsub = onSnapshot(collection(db, "colors"), (snapShot) => {
    //   setColors(snapShot.docs.map((data) => {
    //     return {...data.data(), id: data.id}
    //   }))
    // })
    // return unsub;


    //method 1 rendering data with quering
    const collectionRef = collection(db , "colors");
    const q = query(collectionRef , orderBy("timeStamp" , "desc"));  //quering the result based on a condition
    const unsub = onSnapshot(q , (snapShot) => {
      setColors(snapShot.docs.map((data) => {
        return {...data.data(), id: data.id}
      }))
    })
    return unsub;
  }, []);



  //method 2
  // useEffect(() => 
  //   onSnapshot(collection(db, "colors"), (snapShot) =>
  //   setColors(snapShot.docs.map((doc) => ({...doc.data(), id:doc.id})))
  //   ),[]
  // );



  return (
    <div className="App">
      <h1>FIREBASE CRUD OPERATIONS</h1>


      {/* onclick on this button it should create new color codes */}
      <button className='button' onClick={handleNew}>New</button>
      <button className='button' onClick={handleQueryDelete}>Query Delete</button>
      <ul>
      
      {colors.map((color) => (
            <li key={color.id}>
              <button className='button2' href="#" onClick={() => handleEdit(color.id)}>Edit </button> 
              <button className='button2' href="#" onClick={() => handleDelete(color.id)}>Delete </button>
              <Dot color={color.value}/> {color.name}
            </li>    
        ))}
      </ul>
    </div>
  );
}



export default App;
