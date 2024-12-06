import { ThumbsUp, Trash } from "phosphor-react";
import styles from "./Comment.module.css";
import { format, formatDistanceToNow } from "date-fns";
import {ptBR} from "date-fns/locale/pt-BR";
import { Avatar } from "../Avatar";
import { useState } from "react";
interface IAuthor{
  avatarUrl: string;
  name: string;
  role: string;
}
interface ICommentProps{
  author: IAuthor;
  content: string;
  publishedAt: Date;
  onDeleteComment: (comment:string) => void;
}
export function Comment({ author, content, publishedAt,onDeleteComment }:ICommentProps) {
  const [likeCount, setLikeCount] = useState(0)
  const publishedAtDateFormated = format(
    publishedAt,
    "d 'de' MMMM 'às' HH:mm",
    {
      locale: ptBR,
    }
  );
  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleDeleteComment() {
    onDeleteComment(content)
  }
  function handleLikeComment() {
    setLikeCount((state) => state + 1)
  }
  return (
    <div className={styles.comment}>
      <Avatar src={author.avatarUrl} hasBorder={false} />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>{author.name}</strong>
              <time
                title={publishedAtDateFormated}
                dateTime={publishedAt.toISOString()}
              >
                {publishedDateRelativeToNow}
              </time>
            </div>
            <button title="Deltar comentário" onClick={handleDeleteComment}>
              <Trash size={24} />
            </button>
          </header>
          <p>{content}</p>
        </div>
        <footer>
          <button type="button" onClick={handleLikeComment}>
            <ThumbsUp size={20} />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
