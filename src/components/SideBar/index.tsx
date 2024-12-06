import { URL_CAPA, URL_POST_PROFILE } from '../../shared/constants'
import { Avatar } from '../Avatar'
import styles from './SideBar.module.css'
import { PencilLine } from 'phosphor-react'
export function SideBar (){
    const urlImgCapa = URL_CAPA
    const urlImgProfile = URL_POST_PROFILE
    return(
        <aside className={styles.sideBar}>
            <img src={urlImgCapa} className={styles.cover} alt='Capa de perfil'/>
            <div className={styles.profile}> 
                <Avatar  src={urlImgProfile}  />
                <strong>Ikaro S.Feitosa</strong>
                <span>Web Developer</span>
            </div>
            <footer>
                
                <a href='#'><PencilLine size={20}/> Editar seu Perfil</a>
            </footer>
        </aside>
    )
}