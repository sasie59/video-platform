/** 套件 */
import { Link } from "react-router-dom";

/** 自訂元件 */
import { VideoItem } from "components";

export const FavoritePage = props => {

  const { favoriteVideo, updateFavoriteVideo } = props;

  const removeFavorite = video => {
    delete favoriteVideo[video.id];
    updateFavoriteVideo(favoriteVideo);
  }

  return (
    <div>
      <ul>
        <li><Link to="/">首頁</Link></li>
        <li><Link to="/favorite">收藏頁</Link></li>
        <li><Link to="/play">播放頁</Link></li>
      </ul>
      <h1>收藏頁</h1>
      {Object.keys(favoriteVideo).map(videoID =>
        <VideoItem
          key={videoID}
          {...favoriteVideo[videoID]}
          onClick={removeFavorite}
          buttonText="取消收藏"
        />
      )}
    </div>
  )
}
