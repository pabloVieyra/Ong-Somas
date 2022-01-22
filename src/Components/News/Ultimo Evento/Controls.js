import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import VolumeUp from '@mui/icons-material/VolumeUp';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeMute from '@mui/icons-material/VolumeOff';
import FullScreen from '@mui/icons-material/Fullscreen';
import Popover from '@mui/material/Popover';
import '../../../Styles/UltimoEvento/Controls.css';
import { PrettoSlider, useStyles } from '../../../Utils/VideoUtils';

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip enterTouchDelay={0} open={open} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

// eslint-disable-next-line react/display-name
const Controls = forwardRef(
  (
    {
      onSeek,
      onSeekMouseDown,
      onSeekMouseUp,
      onDuration,
      onPlayPause,
      playing,
      played,
      elapsedTime,
      totalDuration,
      onMute,
      muted,
      onVolumeSeekDown,
      onChangeDispayFormat,
      playbackRate,
      onPlaybackRateChange,
      volume,
      onVolumeChange,
      handle,
    },
    ref,
  ) => {
    useStyles;
    PrettoSlider;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
      <div ref={ref} className="controls-wrapper">
        <Grid
          container
          direction="column"
          justify="space-between"
          style={{ flexGrow: 1 }}>
          <Grid
            container
            style
            alignItems="center"
            direction="row"
            justify="space-between"
            // eslint-disable-next-line react/jsx-no-duplicate-props
            style={{ padding: 16 }}>
            <Grid item>
              <Typography className="video-title" variant="h5">
                Ultimo evento
              </Typography>
            </Grid>
          </Grid>
          {/* bottom controls */}
          <Grid
            container
            alignItems="center"
            direction="row"
            justify="space-between"
            style={{
              padding: 16,
              marginTop: 'auto',
              justifyContent: 'space-between',
            }}>
            <Grid item xs={12}>
              <PrettoSlider
                ValueLabelComponent={(props) => (
                  <ValueLabelComponent {...props} value={elapsedTime} />
                )}
                aria-label="custom thumb label"
                max={100}
                min={0}
                value={played * 100}
                onChange={onSeek}
                onChangeCommitted={onSeekMouseUp}
                onDuration={onDuration}
                onMouseDown={onSeekMouseDown}
              />
            </Grid>

            <Grid item>
              <Grid container alignItems="center">
                <IconButton className="bottom-icons" onClick={onPlayPause}>
                  {playing ? (
                    <PauseIcon fontSize="large" />
                  ) : (
                    <PlayArrowIcon fontSize="large" />
                  )}
                </IconButton>

                <IconButton
                  // onClick={() => setState({ ...state, muted: !state.muted })}
                  className={`bottom-icons`}
                  onClick={onMute}>
                  {muted ? (
                    <VolumeMute fontSize="large" />
                  ) : volume > 0.5 ? (
                    <VolumeUp fontSize="large" />
                  ) : (
                    <VolumeDown fontSize="large" />
                  )}
                </IconButton>

                <Slider
                  aria-labelledby="input-slider"
                  className={classes.volumeSlider}
                  max={100}
                  min={0}
                  value={muted ? 0 : volume * 100}
                  onChange={onVolumeChange}
                  onChangeCommitted={onVolumeSeekDown}
                  onMouseDown={onSeekMouseDown}
                />
                <Button
                  variant="text"
                  onClick={
                    onChangeDispayFormat
                    //     () =>
                    //   setTimeDisplayFormat(
                    //     timeDisplayFormat == "normal" ? "remaining" : "normal"
                    //   )
                  }>
                  <Typography
                    style={{ color: '#fff', marginLeft: 16 }}
                    variant="body1">
                    {elapsedTime}/{totalDuration}
                  </Typography>
                </Button>
              </Grid>
            </Grid>

            <Grid item>
              <Button
                aria-describedby={id}
                className="bottom-icons"
                variant="text"
                onClick={handleClick}>
                <Typography>{playbackRate}X</Typography>
              </Button>

              <Popover
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                container={ref.current}
                id={id}
                open={open}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                onClose={handleClose}>
                <Grid container direction="column-reverse">
                  {[0.5, 1, 1.5, 2].map((rate) => (
                    <Button
                      key={rate}
                      variant="text"
                      onClick={() => onPlaybackRateChange(rate)}>
                      <Typography
                        color={rate === playbackRate ? 'secondary' : 'inherit'}>
                        {rate}X
                      </Typography>
                    </Button>
                  ))}
                </Grid>
              </Popover>
              <IconButton
                className="bottom-icons"
                onClick={handle.active === false ? handle.enter : handle.exit}>
                <FullScreen fontSize="large" />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  },
);

Controls.propTypes = {
  onSeek: PropTypes.func,
  onSeekMouseDown: PropTypes.func,
  onSeekMouseUp: PropTypes.func,
  onDuration: PropTypes.func,
  onRewind: PropTypes.func,
  onPlayPause: PropTypes.func,
  onFastForward: PropTypes.func,
  onVolumeSeekDown: PropTypes.func,
  onChangeDispayFormat: PropTypes.func,
  onPlaybackRateChange: PropTypes.func,
  onToggleFullScreen: PropTypes.func,
  onMute: PropTypes.func,
  playing: PropTypes.bool,
  played: PropTypes.number,
  elapsedTime: PropTypes.string,
  totalDuration: PropTypes.string,
  muted: PropTypes.bool,
  playbackRate: PropTypes.number,
};
export default Controls;
