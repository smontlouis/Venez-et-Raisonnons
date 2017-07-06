import * as firebase from 'firebase'
import Auth from './auth'

const FireAuth = class {
  user = null;
  profile = null;
  onUserChange = null;
  onLogout = null;
  onEmailVerified = null;
  onLogin = null;
  onError = null;

  init (googleConfig) {
    Auth.Google.configure(googleConfig)
  }

  setup = (onLogin, onUserChange, onLogout, onEmailVerified, onError) => {
    this.onUserChange = onUserChange
    this.onLogout = onLogout
    this.onEmailVerified = onEmailVerified
    this.onLogin = onLogin
    this.onError = onError

    firebase.auth().onAuthStateChanged((user) => {
      if (user && user.isAnonymous) {
        console.log('User is anonymous', user.uid)
        return // Do nothing for now
      }
      if (user) {
        // Determine if user needs to verify email
        var emailVerified = !user.providerData || !user.providerData.length || user.providerData[0].providerId != 'password' || user.emailVerified

        const profile = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          provider: user.providerData[0].providerId,
          lastSeen: Date.now(),
          emailVerified: emailVerified
        }

        // Upsert profile information
        const profileRef = firebase.database().ref(`profiles/${user.uid}`)
        profileRef.update(profile)

        profileRef.once('value', (profile) => {
          const val = profile.val()

          // Email become verified in session
          if (val.emailVerified && (this.profile && !this.profile.val().emailVerified)) {
            this.onEmailVerified && this.onEmailVerified()
          }

          if (!this.user) {
            this.onLogin && this.onLogin(val) // On login
          } else if (val) {
            this.onUserChange && this.onUserChange(val) // On updated
          }
          this.user = user // Store user
        })
      } else {
        // @TODO -  On logout, purge every data
        this.user = null
        this.onLogout && this.onLogout()
      }
    })
  }

  login = (email, password) => {
    try {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .catch((err) => this.onError && this.onError(err))
    } catch (e) {
      this.onError && this.onError(e)
    }
  }

  register = (username, password) => {
    try {
      firebase.auth().createUserWithEmailAndPassword(username, password)
        .then((user) => {
          user.sendEmailVerification()
        })
        .catch((err) => this.onError && this.onError(err))
    } catch (e) {
      this.onError && this.onError(e)
    }
  }

  resendVerification = () => {
    this.user.sendEmailVerification()
  }

  facebookLogin = (permissions) => {
    Auth.Facebook.login(permissions)
      .then((token) => (
        firebase.auth()
          .signInWithCredential(firebase.auth.FacebookAuthProvider.credential(token))
      ))
      .catch((err) => this.onError && this.onError(err))
  }

  googleLogin = () => {
    Auth.Google.login()
      .then((token) => (
        firebase.auth()
          .signInWithCredential(firebase.auth.GoogleAuthProvider.credential(null, token))
      ))
      .catch((err) => this.onError && this.onError(err))
  }

  logout = () => {
    firebase.auth().signOut()
  }

  update = (data) => {
    var profileRef = firebase.database().ref(`profiles/${this.user.uid}`)
    return profileRef.update(data)
  }

  resetPassword = (email) => {
    firebase.auth().sendPasswordResetEmail(email)
  }

  updatePassword = (password) => {
    this.user.updatePassword(password)
  }

  linkWithGoogle = () => {
    // @TODO
  }

  linkWithFacebook = () => {
    // @TODO
  }

  linkWithEmail = () => {
    // @TODO
  }
}

export default new FireAuth()
