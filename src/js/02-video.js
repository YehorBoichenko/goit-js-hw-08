import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGED_TIME = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

function timePlayer(data) {
  localStorage.setItem(STORAGED_TIME, data.seconds);
}

player.on('timeupdate', throttle(timePlayer, 1000));

const currentPlayedTime = localStorage.getItem(STORAGED_TIME);
player.setCurrentTime(currentPlayedTime);
