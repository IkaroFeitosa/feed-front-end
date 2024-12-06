import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { Avatar } from "../Avatar";
import { Comment } from "../Comment";
import { format, formatDistanceToNow } from "date-fns";
import {ptBR} from "date-fns/locale/pt-BR";
import styles from "./Post.module.css";

interface IAuthor{
  avatarUrl: string;
  name: string;
  role: string;
}
interface IContent {
  type: 'paragraph' | 'link';
  content: string;
}
export interface IPost{
  id: number;
  author: IAuthor;
  content: IContent[];
  publishedAt: Date;
}
interface IPostProps {
  post: IPost;
}

export function Post({ post }:IPostProps) {
  const [comments, setComments] = useState<string[]>([])
  const [newCommentText, setNewCommentText] = useState('')
  const commentDate = new Date()
  const publishedAtDateFormated = format(
    post.publishedAt,
    "d 'de' MMMM 'às' HH:mm",
    {
      locale: ptBR,
    }
  );
  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleCreateComment(event:FormEvent) {
    event.preventDefault();
    setComments([...comments,newCommentText])
    setNewCommentText('')
  }
  function handleNewCommentChange(event:ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value);
  }
  function deleteComment(comment:string) {
    setComments(comments.filter((c) => c !== comment));
  }
  function handleNewCommentInvalid(event:InvalidEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('Este campo é obrigatório')
  }
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>

        <time
          title={publishedAtDateFormated}
          dateTime={post.publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>
      <div className={styles.content}>
        {post.content.map((line) => {
          if (line.type === "paragraph") {
            return <p key={line.content}>{line.content}</p>;
          } else if (line.type === "link") {
            return (
              <p  key={line.content}>
                <a href="#">
                {line.content}
              </a>
              </p>
            );
          }
        })}
      </div>

      <form className={styles.commentForm} onSubmit={handleCreateComment}>
        <strong>Deixe um comentário</strong>
        <textarea
          name="comment"
          placeholder="Deixe um comentário..."
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        ></textarea>
        <footer>
          <button type="submit" disabled={!newCommentText}>Publicar</button>
        </footer>
      </form>
      <div className={styles.commentsList}>
        {comments.map((comment,index) => (
          <Comment key={comment + index} onDeleteComment={deleteComment} author={post.author} content={comment} publishedAt={commentDate} />
        ))}
      </div>
    </article>
  );
}
