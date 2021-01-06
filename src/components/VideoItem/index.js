/** 套件 */
import { Link } from "react-router-dom";

/** 樣式 */
import style from './style.module.scss';

export function VideoItem(props) {
  return (
    <div className={style.VideoItem}>
      <Link to={`/play?id=${props.id}`}>
        <img src={props.snippet.thumbnails.default.url} alt={props.snippet.title} />
        <div className={style.title}>{props.snippet.title}</div>
        <div className={style.description}>{props.snippet.description}</div>
        <div className={style.duration}>{props.contentDetails.duration}</div>
      </Link>
      <button onClick={props.onClick.bind(this, props)}>{props.buttonText}</button>
    </div>
  )
}
