/** 套件 */
import { useState, useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from 'react-player'

/** 樣式 */
import style from "./style.module.scss";

/** 環境變數 */
const { REACT_APP_KEY: KEY } = process.env;

const VIDEO_URL = `https://www.googleapis.com/youtube/v3/videos?key=${KEY}&part=snippet,contentDetails,statistics&id=`;

export const PlayPage = () => {

  const player = useRef();
  const location = useLocation();
  const videoID = new URLSearchParams(location.search).get('id');
  
  const [ playing, setPlaying ] = useState(true);
  const [ videoInfo, setVideoInfo ] = useState({});

  /** 播放或暫停 */
  const handlePlayOrPause = () => {
    setPlaying(!playing);
  }

  /** 影片 前進 / 後退 */
  const handleSeek = sec => {
    const currentTime = player.current.getCurrentTime();
    player.current.seekTo(currentTime + sec, 'seconds');
  }

  /** 只抓必要的資訊進來就好 */
  useLayoutEffect(() => {
    fetch(`${VIDEO_URL}${videoID}`)
      .then(res => res.json())
      .then(({ items }) => {
        setVideoInfo(items[0].snippet);
      });
  }, [videoID])

  return (
    <div className={style.PlayPage}>
      <div className={style.Player}>
        <ReactPlayer
          width="100%"
          playsinline
          ref={player}
          playing={playing}
          url='https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'
        />
        {!playing &&
          <div className={style.AD}>
            <div className={style.modal}>
              <button onClick={handlePlayOrPause}>關閉廣告</button>
            </div>
          </div>
        }
      </div>
      <div className={style.buttons}>
        <button onClick={handlePlayOrPause}>播放/暫停</button>
        <button onClick={handleSeek.bind(this, 15)}>快進15秒</button>
        <button onClick={handleSeek.bind(this, -15)}>倒進15秒</button>
      </div>
      <h1 className={style.title}>{videoInfo.title}</h1>
      <pre className={style.description}>{videoInfo.description}</pre>
    </div>
  )
}

/** refs: https://github.com/cookpete/react-player/issues/724#issuecomment-541413917 */