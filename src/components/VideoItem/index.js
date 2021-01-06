/** 套件 */
import { Link } from "react-router-dom";

/** 樣式 */
import style from './style.module.scss';

const timeFormat = timeStr => {
  const result = timeStr.slice(2).slice(0, -1);
  return /M/.test(result) ?
    result.replace('M', ":"):
    `0:${result}`;
}

export function VideoItem({onClick, isFavorited, ...props}) {
  const {
    id,
    snippet: {
      title, 
      thumbnails: {
        standard: {
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
        <div
          alt={title}
          className={style.img}
          data-duration={timeFormat(duration)}
          style={{
            backgroundImage: `url(${image})`
          }}
        />
        <div className={style.title}>{title}</div>
        <div className={style.description}>{description}</div>
      </Link>
      {isFavorited ?
        <span className={style.favorited}>已收藏</span>:
        <button
          className={style.btn}
          onClick={onClick.bind(this, props)}
        >收藏</button>
      }
    </div>
  )
}
