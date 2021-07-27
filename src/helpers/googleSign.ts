import firebase from "firebase"
import { auth } from "../firebase"
export const googleSignIn = async() => {
    const googleprovider = new firebase.auth.GoogleAuthProvider()
    await auth.signInWithPopup(googleprovider).then((user) => {
        console.log(user)
        //check for database if created
    }).catch((e:any) => {
        console.log(e)
        throw new Error("Failed to sign in")
    })
    return "Signed Successfully"
}