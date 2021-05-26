// Dependencias de firebase, habilitar solo después de ingresar las variable de entorno
// import * as firebase from 'firebase'
import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import firebaseConfig from './config'

// Objeto de Firebase
class Firebase {
  // Constructor de Firebase, habilitar solo después de definir las variables de entorno
  constructor () {
    let app
    if (!firebase.apps.length) {
      app = firebase.initializeApp(firebaseConfig)
    } else {
      app = firebase.app()
    }
    this.auth = app.auth()
    this._auth = firebase.auth
    this.db = app.firestore()
    this.functions = app.functions()
    this.storage = app.storage()
  }
}

const fb = new Firebase()

export default fb
