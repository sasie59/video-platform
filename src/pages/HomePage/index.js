/** 套件 */
import { useEffect, useState, useRef } from 'react';
import { useLocation, useHistory } from "react-router-dom";

/** 自訂元件 */
import {
  NavHeader,
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
  const history = useHistory();
  const location = useLocation();
  const [ videoList, setVideoList ] = useState([]);

  const urlParams = new URLSearchParams(location.search);
  const searchText = urlParams.get('searchText');
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


  const searchFetch = searchText => {
    setVideoList([]);
    _videoList = [];

    history.push(`/?searchText=${searchText}`);
    
    fetchVideo(`${SEARCH_URL}${searchText}`, data => {
      /** 因為使用 search 與 video api 拿到的資料結構不同，所以需要在資料搜集完畢時調整一次 id 的規格 */
      const idList = data.map(({ id: { videoId}}) => videoId ).slice(0, 50).join(',');
      _videoList = [];
      fetchVideo(`${POPULAR_URL}&id=${idList}`, updateVideoList);
    });
  }

  /** 加分題：搜尋, 但輸入空白不搜尋 */
  const handleSerach = e => {
    e.preventDefault();
    const searchText = inputDOM.current.value.trim();
    if(!searchText) return;

    searchFetch(searchText);
  }

  /** 一進到首頁就取得熱門影片 */
  useEffect(() => {
    _videoList = [];
    if(!searchText)
      fetchVideo(`${POPULAR_URL}&chart=mostPopular`, updateVideoList);
    else
      searchFetch(searchText);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  return (
    <div className={style.HomePage}>
      <NavHeader />
      <h1>首頁</h1>
      <form onSubmit={handleSerach}>
        <input
          required
          type="text"
          ref={inputDOM}
          placeholder="搜尋..."
          disabled={videoList.length === 0}
        />
      </form>
      {videoList.length > 1 && <Pagination {...{page, lastPage}} />}
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
          isFavorited={props.favoriteVideo.hasOwnProperty(video.id)}
        />
      )}
    </div>
  )
}
