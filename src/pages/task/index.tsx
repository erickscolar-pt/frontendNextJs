import { useState, FormEvent } from 'react'
import { canSSRAuth } from '../../utils/canSSRAuth'
import Head from 'next/head';
import { Header } from '../../components/Header';
import styles from './styles.module.scss'
import { setupAPIClient } from '../../services/api'
import { AiOutlineSearch, AiFillCloseCircle } from 'react-icons/ai';
import Router,{ useRouter } from 'next/router'

type ItemProps = {
    id: string;
    task: string;
}

interface TaskProps{
    tasklist: ItemProps[];
}

export default function Task({ tasklist }: TaskProps){

    console.log(tasklist)

    const [task, setTask] = useState(tasklist || []);
    const router = useRouter();

    //http://localhost:3333/task/delete?id=e98ed6dc-695d-4802-a45e-8a8226923733
    async function excluirTarefa(id) {
        console.log(id)

    
        const apiClient = setupAPIClient();
        await apiClient.delete(`/task/delete`, { params: {id}}).then(()=>{
            Router.reload()
            //router.reload()
        })
        .catch(()=>{
            alert("Não foi possivel excluir ...")
        })


    }


    return(
        <>
            <Head>
                <title>Tasks</title>
            </Head>
            <div>
                <Header/>
                <main className={styles.container}>
                    <h1>Tarefas</h1>

                    <ul className="list-group">
                        {task.map((tasks)=>{
                            return(
                                <li className="list-group-item row" key={tasks.id}>
                                    <span className="col-10">{tasks.task}</span>
                                    <button type="button" onClick={() => excluirTarefa(tasks.id)} className="btn btn-danger btn-lg col-2">Apagar</button>
                                </li>
                            )
                        })}

                    </ul>

                </main>
            </div>
        </>
    )
}
//Rota privada
export const getServerSideProps = canSSRAuth(async (ctx) => {

    const apiClient = setupAPIClient(ctx)

    const response = await apiClient.get('/task');

    //console.log(response.data)

    return {
      props: {
        tasklist: response.data
      }
    }
  })