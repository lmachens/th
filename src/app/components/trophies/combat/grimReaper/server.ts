import { TrophyServer } from '../../types';
import base from './base';

const grimReaper: TrophyServer = {
  ...base,
  checkProgress: ({ match, events, participant }) => {
    const killsAtEndgame = events.filter(
      (event) =>
        event.type === 'CHAMPION_KILL' &&
        event.killerId === participant.participantId &&
        event.timestamp >= match.info.gameDuration - 60000
    ).length;

    return killsAtEndgame / 3;
  },
};

export default grimReaper;
