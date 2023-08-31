import { createContext, useContext, useState, useEffect } from "react";

import {api} from '../services/api'

export const AuthContext = createContext ({});


function AuthProvider ({children}){
    const [data, setData] = useState({});

    async function signIn({email, password}){

            try{
             const response = await api.post('/sessions',{email,password});
             const{user, token} = response.data;

             localStorage.setItem('@rocknotes:user', JSON.stringify(user));
             localStorage.setItem('@rocknotes:token', token);

             
             api.defaults.headers.common['Authorization'] = `Bearer${token}`;
             setData({user, token})


             }catch(error){
             if(error.response){
              alert (error.response.data.message);
             }else{
              alert('Não foi possível entrar')
             }
            }
         }    

        function signOut(){
       localStorage.removeItem('@rocknotes:token');
       localStorage.removeItem('@rocknotes:user');
       setData({})
        };

       async function updateProfile({user}){
        try{
            await api.put('/users,', user);
            localStorage.setItem('@rocknotes:user', JSON.stringify(user));

            setData({user,token:data.token})
            alert('Perfil Atualizado!!');

             }catch(error){
             if(error.response){
              alert (error.response.data.message);
             }else{
              alert('Não foi possível atualizar o perfil ')
             }
            }
       }

    
    

         useEffect (()=>{
            const token = localStorage.getItem('@rocknotes:token');
            const user = localStorage.getItem('@rocknotes:user');

            if(token && user){
                api.defaults.headers.common['Authorization'] = `Bearer${token}`;

                setData({
                    token,
                    user: JSON.parse(user )
                });
            }


         },[]); //vetor 

    return (
        <AuthContext.Provider value = {{
            signIn,
            signOut,
            updateProfile,
            
            user:data.user,
         }}>
            {children}               
        </AuthContext.Provider>

    )
}

function useAuth(){
    const context = useContext(AuthContext);

    return context;
}

export {AuthProvider, useAuth};