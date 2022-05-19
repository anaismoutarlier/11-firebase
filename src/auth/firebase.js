import { initializeApp } from "firebase/app"
import { 
  getAuth, 
  signOut, 
  signInWithPopup, 
  GoogleAuthProvider,
  FacebookAuthProvider
} from "firebase/auth"
import firebaseConfig from './firebase-config';

class Firebase {
  constructor() {
    this.app = initializeApp(firebaseConfig)
    this.auth = getAuth()
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
}

const firebase = new Firebase()

export default firebase