/** 套件 */
import cx from 'classnames';
import { Link } from "react-router-dom";

import style from './style.module.scss';

export const Pagination = ({ page, lastPage, searchText }) => {
  const withSearch = searchText ? `&searchText=${searchText}`: '';
  return (
    <ul className={style.Pagination}>
      <li>{page > 1 && <Link to={`/?page=${page - 1}${withSearch}`}>«</Link>}</li>
      {[...Array(lastPage).keys()].map(i =>
        <li key={i}>
          <Link
            to={`/?page=${i + 1}${withSearch}`}
            className={cx({
              [style.current]: page === i + 1
            })}
          >{i + 1}</Link>
        </li>
      )}
      <li>{page < lastPage && <Link to={`/?page=${page + 1}${withSearch}`}>»</Link>}</li>
    </ul>
  )
}
