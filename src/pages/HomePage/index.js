import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div>
      <ul>
        <li><Link to="/">首頁</Link></li>
        <li><Link to="/favorite">收藏頁</Link></li>
        <li><Link to="/play">播放頁</Link></li>
      </ul>
      <h1>首頁</h1>
      <ol>
        <li>每頁顯示12部影片</li>
        <li>收藏功能</li>
        <li>
          影片資訊需有包含
          <ol>
            <li>圖片</li>
            <li>影片長度</li>
            <li>影片標題</li>
            <li>影片描述</li>
          </ol>
        </li>
        <li>點選影片進入播放頁</li>
        <li>頁籤：總計列出100部影片，用頁籤切換顯示項目</li>
      </ol>
    </div>
  )
}
