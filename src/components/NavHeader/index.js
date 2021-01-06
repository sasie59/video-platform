/** 套件 */
import { Link } from "react-router-dom";

/** 樣式 */
import style from './style.module.scss';

export const NavHeader = () => {
  return (
    <ul className={style.NavHeader}>
      <li><Link to="/">首頁</Link></li>
      <li><Link to="/favorite">收藏頁</Link></li>
    </ul>
  )
}
