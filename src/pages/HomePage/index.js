/** 套件 */
import { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from "react-router-dom";

/** 自訂元件 */
import {
  VideoItem,
  Pagination,
} from "components";

/** 樣式 */
import style from './style.module.scss';

/** 環境變數 */
const { REACT_APP_KEY: KEY } = process.env;

const MAX = 100;
const PAGESIZE = 12;
let lastPage = Math.ceil(MAX / PAGESIZE);
const SEARCH_URL = `https://www.googleapis.com/youtube/v3/search?key=${KEY}&maxResults=50&part=snippet&q=`;
const POPULAR_URL = `https://www.googleapis.com/youtube/v3/videos?key=${KEY}&maxResults=50&part=snippet,contentDetails,statistics`

let _videoList = [];

/** 因為 youtube 有限制搜尋1次最多回傳50筆，所以需要重複搜尋，直到我們要的數量再停 */
const fetchVideo = (URL, cb, nextPageToken = '') => {
  fetch(`${URL}${nextPageToken}`)
    .then(res => res.json())
    .then(({ items, nextPageToken }) => {
      _videoList = [..._videoList, ...items];
      if(_videoList.length < MAX && nextPageToken)
        fetchVideo(URL, cb, `&pageToken=${nextPageToken}`);
      else {
        cb(_videoList);
      }
    });
}

export const HomePage = props => {

  const inputDOM = useRef();
  const location = useLocation();
  const [ videoList, setVideoList ] = useState([]);

  const urlParams = new URLSearchParams(location.search);
  const page = Number(urlParams.get('page') ?? 1);

  const addFavorite = video => {
    const { favoriteVideo } = props;
    favoriteVideo[video.id] = video;
    props.updateFavoriteVideo(favoriteVideo);
  }

  const updateVideoList = videoList => {
    lastPage = Math.ceil(Math.min(MAX, _videoList.length) / PAGESIZE);
    setVideoList(videoList);
  }

  /** 加分題：搜尋, 但輸入空白不搜尋 */
  const handleSerach = e => {
    e.preventDefault();
    const searchText = inputDOM.current.value.trim();
    if(!searchText) return;

    setVideoList([]);

    _videoList = [];
    fetchVideo(`${SEARCH_URL}${searchText}`, data => {
      /** 因為使用 search 與 video api 拿到的資料結構不同，所以需要在資料搜集完畢時調整一次 id 的規格 */
      const idList = data.map(({ id: { videoId}}) => videoId ).slice(0, 50).join(',');
      _videoList = [];
      fetchVideo(`${POPULAR_URL}&id=${idList}`, updateVideoList);
    });
  }

  /** 一進到首頁就取得熱門影片 */
  useEffect(() => {
    _videoList = [];
    fetchVideo(`${POPULAR_URL}&chart=mostPopular`, updateVideoList);
  }, []);

  return (
    <div className={style.HomePage}>
      <ul>
        <li><Link to="/">首頁</Link></li>
        <li><Link to="/favorite">收藏頁</Link></li>
      </ul>
      <h1>首頁</h1>
      <form onSubmit={handleSerach}>
        <input type="text" ref={inputDOM} required disabled={videoList.length === 0} />
      </form>
      <Pagination {...{page, lastPage}} />
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
