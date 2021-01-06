/** 套件 */
import { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";

/** 自訂元件 */
import { VideoItem } from "components";

/** 樣式 */
import style from './style.module.scss';

/** 環境變數 */
const { REACT_APP_KEY: KEY } = process.env;

const MAX = 100;
const PAGESIZE = 12;
const LASTPAGE = Math.ceil(MAX / PAGESIZE);
const POPULAR_URL = `https://www.googleapis.com/youtube/v3/videos?key=${KEY}&chart=mostPopular&maxResults=50&part=snippet,contentDetails,statistics`

let videoList = [];

const fetchVideo = (cb, nextPageToken = '') => {
  fetch(`${POPULAR_URL}${nextPageToken}`)
    .then(res => res.json())
    .then(({ items, nextPageToken }) => {
      videoList = [...videoList, ...items];
      if(videoList.length < MAX)
        fetchVideo(cb, `&pageToken=${nextPageToken}`);
      else
        cb(videoList);
    });
}

export const HomePage = props => {

  const location = useLocation();
  const [ videoList, setVideoList ] = useState([]);

  const urlParams = new URLSearchParams(location.search);
  const page = Number(urlParams.get('page') ?? 1);

  const addFavorite = video => {
    const { favoriteVideo } = props;
    favoriteVideo[video.id] = video;
    props.updateFavoriteVideo(favoriteVideo);
  }

  useEffect(() => {
    fetchVideo(setVideoList);
  }, []);

  return (
    <div className={style.HomePage}>
      <ul>
        <li><Link to="/">首頁</Link></li>
        <li><Link to="/favorite">收藏頁</Link></li>
      </ul>
      <h1>首頁</h1>
      <ul className={style.pagination}>
        <li>{page > 1 && <Link to={`/?page=${page - 1}`}>上一頁</Link>}</li>
        {[...Array(LASTPAGE).keys()].map(i =>
          <li key={i}><Link to={`/?page=${i + 1}`}>{i + 1}</Link></li>
        )}
        <li>{page < (MAX / PAGESIZE) && <Link to={`/?page=${page + 1}`}>下一頁</Link>}</li>
      </ul>
      <hr/>
      {!videoList.length &&
        <div className={style.loading}>
          Loading
        </div>
      }
      {videoList.slice((page - 1) * PAGESIZE, page * PAGESIZE).map(video =>
        <VideoItem
          key={video.id}
          {...video}
          onClick={addFavorite}
          buttonText="收藏"
        />
      )}
    </div>
  )
}
