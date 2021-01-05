import { Link } from "react-router-dom";

export const FavoritePage = () => {
  return (
    <div>
      <ul>
        <li><Link to="/">首頁</Link></li>
        <li><Link to="/favorite">收藏頁</Link></li>
        <li><Link to="/play">播放頁</Link></li>
      </ul>
      <h1>收藏頁</h1>
      <ol>
        <li>列出已收藏影片列表</li>
        <li>收藏功能</li>
        <li>影片資訊同首頁</li>
        <li>點選影片進入播放頁</li>
        <li>重整頁面或重新進入列表不會消失</li>
      </ol>
    </div>
  )
}
