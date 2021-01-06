import { useEffect, useState } from 'react';

import { Link, useLocation } from "react-router-dom";

import style from './style.module.scss';

const { REACT_APP_KEY: KEY } = process.env;

let nextPageToken;
let prevPageToken;

const POPULAR_URL = `https://www.googleapis.com/youtube/v3/videos?key=${KEY}&chart=mostPopular&maxResults=12&part=snippet,contentDetails,statistics`

export const HomePage = () => {

  const location = useLocation();
  const [ videoList, setVideoList ] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    let myParam = urlParams.get('pageToken');
    myParam = myParam ? `&pageToken=${myParam}`: '';

    fetch(`${POPULAR_URL}${myParam}`)
      .then(res => res.json())
      .then(({ items, ...results }) => {
        console.warn(results);
        console.warn(items[0]);
        nextPageToken = results.nextPageToken;
        prevPageToken = results.prevPageToken;
        setVideoList(items);
      });
  }, [location]);

  return (
    <div className={style.HomePage}>
      {nextPageToken}
      {prevPageToken}
      <ul>
        <li><Link to="/">首頁</Link></li>
        <li><Link to="/favorite">收藏頁</Link></li>
        <li><Link to="/play">播放頁</Link></li>
      </ul>
      <h1>首頁</h1>
      <div>{prevPageToken && <Link to={`/?pageToken=${prevPageToken}`}>上一頁</Link>}</div>
      <div>{nextPageToken && <Link to={`/?pageToken=${nextPageToken}`}>下一頁</Link>}</div>
      <hr/>
      {videoList.map(video =>
        <Link key={video.id} to={`/play?v=${video.id}`}>
          <div className={style.VideoItem}>
            <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
            <div className={style.title}>{video.snippet.title}</div>
            <div className={style.description}>{video.snippet.description}</div>
            <div className={style.duration}>{video.contentDetails.duration}</div>
          </div>
        </Link>
      )}
      <ol>
        <li>收藏功能</li>
        <li>頁籤：總計列出100部影片，用頁籤切換顯示項目</li>
      </ol>
    </div>
  )
}
