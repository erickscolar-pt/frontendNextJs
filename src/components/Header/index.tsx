import { useContext  } from 'react'
import styles from './styles.module.scss';
import Link from 'next/link'

import { FiLogOut } from 'react-icons/fi'

import { AuthContext } from '../../contexts/AuthContext'


export function Header(){

  const { signOut } = useContext(AuthContext)

  return(
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>

        <nav className={styles.menuNav}>
          <Link href="/taskregister">
            <a>Registrar Tarefa</a>
          </Link>
          <Link href="/task">
            <a>Lista de Tarefas</a>
          </Link>
          <Link href="/list">
            <a>Lista de Filmes Star Wars</a>
          </Link>   

          <button onClick={signOut}>
            <FiLogOut color="#FFF" size={24} />
          </button>       
        </nav>

      </div>
    </header>
  )
}