/** 套件 */
import { Link } from "react-router-dom";

import style from './style.module.scss';

export const Pagination = ({ page, lastPage }) => {
  return (
    <ul className={style.Pagination}>
      <li>{page > 1 && <Link to={`/?page=${page - 1}`}>上一頁</Link>}</li>
      {[...Array(lastPage).keys()].map(i =>
        <li key={i}><Link to={`/?page=${i + 1}`}>{i + 1}</Link></li>
      )}
      <li>{page < lastPage && <Link to={`/?page=${page + 1}`}>下一頁</Link>}</li>
    </ul>
  )
}
