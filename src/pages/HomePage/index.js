import { useEffect, useState } from 'react';

import { Link } from "react-router-dom";

import style from './style.module.scss';

const { REACT_APP_KEY: KEY } = process.env;

export const HomePage = () => {

  const [ videoList, setVideoList ] = useState([]);

  useEffect(() => {
    fetch(`https://www.googleapis.com/youtube/v3/videos?chart=mostPopular&maxResults=100&part=snippet,contentDetails,statistics&key=${KEY}`)
      .then(res => res.json())
      .then(({ items, ...results }) => {
        console.warn(results);
        setVideoList(items);
      });
  }, []);

  return (
    <div className={style.HomePage}>
      <ul>
        <li><Link to="/">首頁</Link></li>
        <li><Link to="/favorite">收藏頁</Link></li>
        <li><Link to="/play">播放頁</Link></li>
      </ul>
      <h1>首頁</h1>
      {videoList.map(video =>
        <div key={video.id} className={style.VideoItem}>
          <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
        </div>
      )}
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
