/** 自訂元件 */
import { VideoItem, NavHeader } from "components";

export const FavoritePage = props => {

  const { favoriteVideo, updateFavoriteVideo } = props;

  const removeFavorite = video => {
    delete favoriteVideo[video.id];
    updateFavoriteVideo(favoriteVideo);
  }

  return (
    <div>
      <NavHeader />
      <h1>收藏頁</h1>
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
