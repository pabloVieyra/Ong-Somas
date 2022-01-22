import React, { useState, useRef } from 'react';
import Typography from '@mui/material/Typography';
import ReactPlayer from 'react-player';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Controls from './Controls';
import '../../../Styles/UltimoEvento/Video.css';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

const format = (seconds) => {
  if (isNaN(seconds)) {
    return `00:00`;
  }
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, '0');

  if (hh) {
    return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
  }

  return `${mm}:${ss}`;
};

let count = 0;

const Video = () => {
  const handle = useFullScreenHandle();
  const [timeDisplayFormat, setTimeDisplayFormat] = useState('normal');
  const [bookmarks, setBookmarks] = useState([]);
  const [state, setState] = useState({
    pip: false,
    playing: true,
    controls: false,
    light: false,

    muted: true,
    played: 0,
    duration: 0,
    playbackRate: 1.0,
    volume: 1,
    loop: false,
    seeking: false,
  });

  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsRef = useRef(null);
  const canvasRef = useRef(null);
  const {
    playing,
    light,

    muted,
    loop,
    playbackRate,
    pip,
    played,
    volume,
  } = state;

  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing });
  };

  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handleProgress = (changeState) => {
    if (count > 3) {
      controlsRef.current.style.visibility = 'hidden';
      count = 0;
    }
    if (controlsRef.current.style.visibility == 'visible') {
      count += 1;
    }
    if (!state.seeking) {
      setState({ ...state, ...changeState });
    }
  };

  const handleSeekChange = (e, newValue) => {
    setState({ ...state, played: parseFloat(newValue / 100) });
  };

  const handleSeekMouseDown = () => {
    setState({ ...state, seeking: true });
  };

  const handleSeekMouseUp = (e, newValue) => {
    setState({ ...state, seeking: false });
    playerRef.current.seekTo(newValue / 100, 'fraction');
  };

  const handleDuration = (duration) => {
    setState({ ...state, duration });
  };

  const handleVolumeSeekDown = (e, newValue) => {
    setState({ ...state, seeking: false, volume: parseFloat(newValue / 100) });
  };
  const handleVolumeChange = (e, newValue) => {
    setState({
      ...state,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
  };

  const handleMouseMove = () => {
    controlsRef.current.style.visibility = 'visible';
    count = 0;
  };

  const hanldeMouseLeave = () => {
    controlsRef.current.style.visibility = 'hidden';
    count = 0;
  };

  const handleDisplayFormat = () => {
    setTimeDisplayFormat(
      timeDisplayFormat == 'normal' ? 'remaining' : 'normal',
    );
  };

  const handlePlaybackRate = (rate) => {
    setState({ ...state, playbackRate: rate });
  };

  const hanldeMute = () => {
    setState({ ...state, muted: !state.muted });
  };

  const addBookmark = () => {
    const canvas = canvasRef.current;

    canvas.width = 160;
    canvas.height = 90;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      playerRef.current.getInternalPlayer(),
      0,
      0,
      canvas.width,
      canvas.height,
    );
    const dataUri = canvas.toDataURL();

    canvas.width = 0;
    canvas.height = 0;
    const bookmarksCopy = [...bookmarks];

    bookmarksCopy.push({
      time: playerRef.current.getCurrentTime(),
      display: format(playerRef.current.getCurrentTime()),
      image: dataUri,
    });
    setBookmarks(bookmarksCopy);
  };

  const currentTime =
    playerRef && playerRef.current
      ? playerRef.current.getCurrentTime()
      : '00:00';

  const duration =
    playerRef && playerRef.current ? playerRef.current.getDuration() : '00:00';
  const elapsedTime =
    timeDisplayFormat == 'normal'
      ? format(currentTime)
      : `-${format(duration - currentTime)}`;

  const totalDuration = format(duration);

  return (
    <>
      <FullScreen handle={handle}>
        <div
          ref={playerContainerRef}
          className="player-wrapper"
          onMouseLeave={hanldeMouseLeave}
          onMouseMove={handleMouseMove}>
          <ReactPlayer
            ref={playerRef}
            className="react-player"
            config={{
              file: {
                attributes: {
                  crossorigin: 'anonymous',
                },
              },
            }}
            controls={false}
            height={handle.active === true && '100vh'}
            light={light}
            loop={loop}
            muted={muted}
            pip={pip}
            playbackRate={playbackRate}
            playing={playing}
            url="https://www.youtube.com/watch?v=4YnSk1gI_Oo"
            volume={volume}
            width={handle.active === true && '100%'}
            onProgress={handleProgress}
          />

          <Controls
            ref={controlsRef}
            elapsedTime={elapsedTime}
            handle={handle}
            muted={muted}
            playbackRate={playbackRate}
            played={played}
            playing={playing}
            totalDuration={totalDuration}
            volume={volume}
            onBookmark={addBookmark}
            onChangeDispayFormat={handleDisplayFormat}
            onDuration={handleDuration}
            onFastForward={handleFastForward}
            onMute={hanldeMute}
            onPlayPause={handlePlayPause}
            onPlaybackRateChange={handlePlaybackRate}
            onRewind={handleRewind}
            onSeek={handleSeekChange}
            onSeekMouseDown={handleSeekMouseDown}
            onSeekMouseUp={handleSeekMouseUp}
            onVolumeChange={handleVolumeChange}
            onVolumeSeekDown={handleVolumeSeekDown}
          />
        </div>

        <Grid container spacing={3} style={{ marginTop: 20 }}>
          {bookmarks.map((bookmark, index) => (
            <Grid key={index} item>
              <Paper
                elevation={3}
                onClick={() => {
                  playerRef.current.seekTo(bookmark.time);
                  controlsRef.current.style.visibility = 'visible';

                  setTimeout(() => {
                    controlsRef.current.style.visibility = 'hidden';
                  }, 20);
                }}>
                <img crossOrigin="anonymous" src={bookmark.image} />
                <Typography align="center" variant="body2">
                  bookmark at {bookmark.display}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </FullScreen>
    </>
  );
};

export default Video;
