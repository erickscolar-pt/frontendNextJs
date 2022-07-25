import { FormEvent, useContext, useState } from "react";
import Head from "next/head";
import styles from '../../styles/home.module.scss';
import { Button } from '../components/ui/button'
;
import Link from 'next/link';

import { Input } from '../components/ui/input/index';

import { AuthContext } from "../contexts/AuthContext";

import { canSSRGuest } from '../utils/canSSRGuest'

export default function Home() {
  const { signIn } = useContext(AuthContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if(username === '' || password === ''){
      return;
    }

    setLoading(true)

    let data = {
      username,
      password
    }

    await signIn(data)
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Tasks - Login</title>
      </Head>
      <div className={styles.containerCenter}>
        <div className={styles.login}>
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <Input
              placeholder="Digite seu login"
              type="text"
              value={username}
              onChange={ (e)=> setUsername(e.target.value) }
            />

            <Input
              placeholder="Sua senha"
              type="password"
              value={password}
              onChange={ (e)=> setPassword(e.target.value) }
            />
            <Button
              type="submit"
              loading={loading}
            >
              Entrar
            </Button>

          </form>

          <Link href="/signup">
            <a className={styles.text}>Nao possui uma conta? Cadastre-se</a>
          </Link>


        </div>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  
  return {
    props: {}
  }
})
