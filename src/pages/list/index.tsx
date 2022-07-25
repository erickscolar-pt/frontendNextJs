import { useState, FormEvent } from 'react'
import { canSSRAuth } from '../../utils/canSSRAuth'
import Head from 'next/head';
import { Header } from '../../components/Header';
import styles from './styles.module.scss'
import { confExternalAPI } from '../../services/apiExterna'


type intensListProps = {
    characters: string;
    created: string;
    director: string;
    edited: Date;
    episode_id: number;
    opening_crawl: string;
    planets: string[];
    producer: string;
    release_date: Date;
    species: string[];
    starships: string[];
    title: string;
    url: string;
  }
  
  interface MoviesProps{
    listaDeFilmes: intensListProps[];
  }
export default function List({ listaDeFilmes }: MoviesProps){
    console.log(listaDeFilmes)

    const [movies, setMovies] = useState(listaDeFilmes || []);

    console.log(movies)

    return(
        <>
            <Head>
                <title>Lista de Filmes</title>
            </Head>
            <div>
                <Header/>
                <main className={styles.container}>
                    <h1>Lista de Filmes</h1>
                </main>
                <ul className="list-group">
                        {movies.map((movie)=>{
                            return(
                                <li className="list-group-item">

                                    <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{movie.title}</h5>
                                        <p className="card-text">{movie.opening_crawl}</p>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">Episodio: {movie.episode_id}</li>
                                        <li className="list-group-item">Produção: {movie.producer}</li>
                                        <li className="list-group-item">Diretor: {movie.director}</li>
                                    </ul>
                                    </div>

                                </li>
                            )
                        })}
                    </ul>
            </div>
        </>
    )
}
//Rota privada
export const getServerSideProps = canSSRAuth(async (ctx) => {

    const apiExterna = confExternalAPI(ctx)

    const response = await apiExterna.get('films/?format=json');

    console.log(response.data)

    return {
      props: {
        listaDeFilmes: response.data.results
      }
    }
  })