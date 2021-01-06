/** 自訂元件 */
import { VideoItem } from "components";

/** 樣式 */
import style from './style.module.scss';

export const FavoritePage = props => {

  const { favoriteVideo, updateFavoriteVideo } = props;

  const removeFavorite = video => {
    delete favoriteVideo[video.id];
    updateFavoriteVideo(favoriteVideo);
  }

  return (
    <div className={style.FavoritePage}>
      <div className={style.title}>收藏頁</div>
      {Object.keys(favoriteVideo).map(videoID =>
        <VideoItem
          isFavorited
          key={videoID}
          {...favoriteVideo[videoID]}
          onClick={removeFavorite}
        />
      )}
    </div>
  )
}
