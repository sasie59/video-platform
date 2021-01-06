/** 套件 */
import { useState, useLayoutEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ReactPlayer from 'react-player'

/** 樣式 */
import style from "./style.module.scss";

/** 環境變數 */
const { REACT_APP_KEY: KEY } = process.env;

const VIDEO_URL = `https://www.googleapis.com/youtube/v3/videos?key=${KEY}&part=snippet,contentDetails,statistics&id=`;

export const PlayPage = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const videoID = urlParams.get('id');
  const [ videoInfo, setVideoInfo ] = useState({});
  const [ playing, setPlaying ] = useState(true);
  const [ enableAD, setEnableAD ] = useState(false);

  const handleResume = () => {
    setPlaying(true);
    setEnableAD(false);
  }

  const handlePause = () => {
    setPlaying(false);
    setEnableAD(true);
  }

  useLayoutEffect(() => {
    fetch(`${VIDEO_URL}${videoID}`)
      .then(res => res.json())
      .then(({ items }) => {
        setVideoInfo(items[0].snippet);
      });
  }, [videoID])

  return (
    <div className={style.PlayPage}>
      <ul>
        <li><Link to="/">首頁</Link></li>
        <li><Link to="/favorite">收藏頁</Link></li>
      </ul>
      <h1>{videoInfo.title}</h1>
      <div className={style.Player}>
        <ReactPlayer
          controls
          playsinline
          playing={playing}
          onPause={handlePause}
          url='https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'
        />
        {enableAD &&
          <div className={style.AD}>
            <h3>AD</h3>
            <button onClick={handleResume}>close AD</button>
          </div>
        }
      </div>
      <div>{videoInfo.description}</div>
    </div>
  )
}
