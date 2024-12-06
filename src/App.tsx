import { Header } from "@components/Header";
import styles from "./App.module.css";
import { SideBar } from "./components/SideBar";
import { IPost, Post } from "./components/Post";
import { URL_POST_PROFILE } from "./shared/constants";

const posts:IPost[] = [
  {
    id: 1,
    author: {
      avatarUrl: URL_POST_PROFILE,
      name: 'Ikaro S.Feitosa',
      role: 'Web Developer'
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋' },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
      { type: 'link', content: '👉 https://jane.design/doctorcare' }
    ],
    publishedAt: new Date('2024-12-03 20:00:00')
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/maykbrito.png',
      name: 'Mayk Brito',
      role: 'Educator @Rocketseat'
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋' },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
      { type: 'link', content: '👉 https://jane.design/doctorcare' }
    ],
    publishedAt: new Date('2024-12-03 23:00:00 ')
  }
]

function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <SideBar />
        <main>
          {posts.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </main>
      </div>
    </div>
  );
}

export default App;
