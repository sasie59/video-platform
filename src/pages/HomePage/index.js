import { useEffect, useState } from 'react';

import { Link, useLocation } from "react-router-dom";

import style from './style.module.scss';

const { REACT_APP_KEY: KEY } = process.env;

const MAX = 100;
const PAGESIZE = 12;
const LASTPAGE = Math.ceil(MAX / PAGESIZE);
const POPULAR_URL = `https://www.googleapis.com/youtube/v3/videos?key=${KEY}&chart=mostPopular&maxResults=50&part=snippet,contentDetails,statistics`

const favoriteVideo = JSON.parse(localStorage.getItem('favoriteVideo')) ?? {};

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

const addFavorite = video => {
  favoriteVideo[video.id] = video;
  localStorage.setItem('favoriteVideo', JSON.stringify(favoriteVideo));
}

export const HomePage = () => {

  const location = useLocation();
  const [ videoList, setVideoList ] = useState([]);

  const urlParams = new URLSearchParams(location.search);
  const page = Number(urlParams.get('page') ?? 1);

  useEffect(() => {
    fetchVideo(setVideoList);
  }, []);

  return (
    <div className={style.HomePage}>
      <ul>
        <li><Link to="/">首頁</Link></li>
        <li><Link to="/favorite">收藏頁</Link></li>
        <li><Link to="/play">播放頁</Link></li>
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
          <div className={style.VideoItem} key={video.id}>
            <Link to={`/play?v=${video.id}`}>
              <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
              <div className={style.title}>{video.snippet.title}</div>
              <div className={style.description}>{video.snippet.description}</div>
              <div className={style.duration}>{video.contentDetails.duration}</div>
            </Link>
            <button onClick={addFavorite.bind(this, video)}>收藏</button>
          </div>
      )}
    </div>
  )
}
