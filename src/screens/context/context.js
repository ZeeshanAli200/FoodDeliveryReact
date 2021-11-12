import React, { createContext, useReducer } from 'react';
import { reducer,reducerUser, data , initialState } from './reducer';

export const GlobalContext = createContext('Initial Value');

function ContextProvider({children}) {
    // const [state, dispatch] = useReducer(reducer, data);
    const [state, dispatch] = useReducer( reducerUser, initialState );
    // dispatch method 


    // type , payload


    
    return (
        <GlobalContext.Provider value={{state,dispatch}}>
            {children}
        </GlobalContext.Provider>
    )
}

export default ContextProvider;





