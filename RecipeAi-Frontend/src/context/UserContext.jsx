import { createStore } from "solid-js/store";
import { createContext, useContext } from "solid-js";
import { makePersisted } from "@solid-primitives/storage";



export const UserContext = createContext()


export function UserContextProvider(props) {

    const [user, setUser] = makePersisted(createStore({}),{ storage: sessionStorage ,name:'user'})

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {props.children}

        </UserContext.Provider>
    )

}

export const useUserContext = () => {
    return useContext(UserContext)
}