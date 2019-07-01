import { Button } from 'grommet';
import { Pause, Play } from 'grommet-icons';

export default ({ disabled, isPlay, onPlay, onPause }) => (
  <Button
    margin='xsmall'
    plain={false}
    disabled={disabled}
    icon={isPlay ? <Play /> : <Pause />}
    onClick={isPlay ? onPlay : onPause}
    name='onPlayOrPause' />
);