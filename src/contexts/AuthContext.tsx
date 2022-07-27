import { createContext, ReactNode, useState, useEffect } from 'react';
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router'
import { api } from '../services/apiClient'

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>
}

type UserProps ={
    id: string;
    username: string;
}

type SignInProps = {
    username: string;
    password: string;
}

type SignUpProps = {
    username: string;
    password: string;
}

type AuthProviderProps ={
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
    try{
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/')
    }catch{
        console.log('erro ao deslogar')
    }
}


export function AuthProvider({ children }: AuthProviderProps){

    const [user, setUser] = useState<UserProps>()

    const isAuthenticated = !!user;

    useEffect(() => {

        // tentar pegar algo no cookie
        const { '@nextauth.token': token } = parseCookies();
    
        if(token){
          api.get('/me').then(response => {
            const { id, username } = response.data;
    
            setUser({
              id,
              username
            })
    
          })
          .catch(() => {
            //Se deu erro deslogamos o user.
            signOut();
          })
        }
    
    
      }, [])

    async function signIn({ username, password }: SignInProps){

        //console.log('login => ' + username)
        //console.log('senha => ' + password)

        try{
            const response =  await api.post('/signin',{
                username,
                password
            })

            //console.log(response.data);

            const {id, token} = response.data;


            setCookie(undefined,'@nextauth.token', token,{
                maxAge: 60 * 60 * 24 * 30,
                path: "/" // Quais caminhos terao acesso ao cookie
            })

            setUser({
                id,
                username
            })

            // Passar para as proximas requisições o token
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            //Redirecionar para pagina tasks
            Router.push('/task')


        }catch(err){
            console.log('Erro ao acessar => ' + err)
        }
    }

    async function signUp({ username, password }: SignUpProps) {
                //console.log('login => ' + username)
        //console.log('senha => ' + password)

        try{
            const response =  await api.post('/signup',{
                username,
                password
            })

            Router.push('/')


        }catch(err){
            console.log('Erro ao cadastrar => ' + err)
        }
    }


    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}
