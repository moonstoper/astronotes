// import firebase from "firebase"
import { createContext, useEffect, useState } from "react"
import { auth, db } from "../firebase"


export const authContext = createContext({user:null})
const UserAuth: React.FC = ({children}) => {
    const [userstate,setuserstate] = useState({user:null})
    useEffect(() => {
        auth.onAuthStateChanged(userAuth => {
            setuserstate({user:userAuth as any})
        })

        // return userSubs()
    })

    return <authContext.Provider value={userstate}>{children}</authContext.Provider>
}

export default UserAuth