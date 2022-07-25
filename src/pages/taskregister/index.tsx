import { useState, FormEvent } from 'react'
import { canSSRAuth } from '../../utils/canSSRAuth'
import Head from 'next/head';
import { Header } from '../../components/Header';
import styles from './styles.module.scss'
import { setupAPIClient } from '../../services/api'

export default function TaskRegister(){

    const [task, setTask] = useState('')

    async function handleRegister(event: FormEvent){
        event.preventDefault();
    
        if(task === ''){
          return;
        }
    
        const apiClient = setupAPIClient();
        await apiClient.post('/task', {
          task: task
        })
    
        setTask('');
    
      }

    return(
        <>
            <Head>
                <title>Tasks</title>
            </Head>
            <div>
                <Header/>
                <main className={styles.container}>
                    <h1>Registrar Tarefa</h1>

                    <form className={styles.form} onSubmit={handleRegister}>
                    <input 
                    type="text" 
                    placeholder="Digite o nome da sua tarefa"
                    className={styles.input}
                    value={task}
                    onChange={ (e) => setTask(e.target.value) }
                    />

                    <button className={styles.buttonAdd} type="submit">
                        Registrar Tarefa
                    </button>

                    </form>

                </main>
            </div>
        </>
    )
}
//Rota privada
export const getServerSideProps = canSSRAuth(async (ctx) => {

    return {
      props: {}
    }
  })