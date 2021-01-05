
import { useState } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from 'react-player'

import style from "./style.module.scss";

export const PlayPage = () => {

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

  return (
    <div className={style.PlayPage}>
      <ul>
        <li><Link to="/">首頁</Link></li>
        <li><Link to="/favorite">收藏頁</Link></li>
        <li><Link to="/play">播放頁</Link></li>
      </ul>
      <h1>播放頁</h1>
      <div className={style.Player}>
        <ReactPlayer
          controls
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
      <ol>
        <li>標題、影片描述使用點選的影片資訊</li>
        <li>
          請實作播放器，播放下方影片（可使用任意播放器的lib）
          https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8
        </li>
        <li>播放暫停時顯示廣告,廣告樣式自行發揮</li>
      </ol>
    </div>
  )
}
