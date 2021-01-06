/** 套件 */
import { Link } from "react-router-dom";

/** 樣式 */
import style from './style.module.scss';

export function VideoItem({onClick, isFavorited, ...props}) {
  const {
    id,
    snippet: {
      title, 
      thumbnails: {
        maxres: {
          url: image
        }
      },
      description,
    },
    contentDetails: {
      duration
    },
  } = props;
  return (
    <div className={style.VideoItem}>
      <Link to={`/play?id=${id}`}>
        <div className={style.img} style={{
          backgroundImage: `url(${image})`
        }} alt={title} />
        <div className={style.title}>{title}</div>
        <div className={style.description}>{description}</div>
        <div className={style.duration}>{duration}</div>
      </Link>
      {isFavorited ?
        <span>已收藏</span>:
        <button onClick={onClick.bind(this, props)}>收藏</button>
      }
    </div>
  )
}
