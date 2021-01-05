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
    </div>
  )
}
