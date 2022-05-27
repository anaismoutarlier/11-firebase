import { initializeApp } from "firebase/app"
import { 
  getAuth, 
  signOut, 
  signInWithPopup, 
  GoogleAuthProvider,
  FacebookAuthProvider
} from "firebase/auth"

import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy
} from "firebase/firestore"
import firebaseConfig from './firebase-config';

class Firebase {
  constructor() {
    this.app = initializeApp(firebaseConfig)
    this.auth = getAuth()
    this.db = getFirestore(this.app)
    this.googleProvider = new GoogleAuthProvider()
    this.facebookProvider = new FacebookAuthProvider()
  }

  login = async provider => {
    const { auth } = this

    await signInWithPopup(auth, this[`${provider.toLowerCase()}Provider`])
  }

  logout = async () => {
    const { auth } = this

    await signOut(auth)
  }

  newUser = async (user) => {
    try {
      const { db } = this

      const userRef = doc(db, "users", user.uid)
      setDoc(userRef, { 
          email: user.email, 
          // displayName: user.displayName, 
          // photoURL: user.photoURL 
        }, { merge: true })
      // const userRef = await addDoc(collection(db, "users"), { 
      //   email: user.email, 
      //   displayName: user.displayName, 
      //   photoURL: user.photoURL 
      // })
      // console.log(userRef)
      return { result: true, user: userRef }
    } catch (error) {
      console.error(error)

      return { result: false }
    }
  }

  newMessage = async message => {
    const { db } = this
    await addDoc(collection(db, "messages"), { ...message })
  }

  getMessages = handleSnapshot => {
    const { db } = this

    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"))

    return onSnapshot(q, handleSnapshot)
  }
}

const firebase = new Firebase()

export default firebase