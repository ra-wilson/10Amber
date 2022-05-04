import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore'

console.log(process.env.REACT_APP_FIREBASE_API_KEY)

// firebase keys

const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
})


// export const auth = app.auth()
export const auth = getAuth();
export default app


// init database
const db = getFirestore()



export async function getDrinksData(done) {
// collection ref
const colRef = collection(db, 'drinks')

// get collection data
getDocs(colRef)
  .then((snapshot) => {
    let drinks = []
    snapshot.docs.forEach((doc) => {
      drinks.push({...doc.data(), id: doc.id})
    })
    console.log("HERE", drinks)
    done(drinks);
  })
  .catch (err =>{
    console.log("ERR", err.message)
    done([]);
  })
}