import { FormEvent, useState, useContext } from "react";
import Head from "next/head";
import styles from '../../../styles/home.module.scss';
import { Button } from '../../components/ui/button'
;
import Link from 'next/link';

import { Input } from '../../components/ui/input/index';

import { AuthContext } from "../../contexts/AuthContext";

export default function SignUp() {
  const { signUp } = useContext(AuthContext);

  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    if(username === '' || password === ''){
      alert("PREENCHA TODOS OS CAMPOS")
      return;
    }

    setLoading(true);

    let data = {
      username,
      password
    }

    await signUp(data)

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Tasks - Crie sua conta</title>
      </Head>
      <div className={styles.containerCenter}>
      <div className={styles.login}>
        <h1>Cadastro</h1>
        <form onSubmit={handleSignUp}>
          <Input
            placeholder="Digite seu login"
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />

          <Input
            placeholder="Sua senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            loading={loading}
          >
            Entrar
          </Button>

        </form>

        <Link href="/">
          <a className={styles.text}>Entrar na conta</a>
        </Link>


      </div>
      </div>
    </>
  )
}
