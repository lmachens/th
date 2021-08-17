import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const theBear: TrophyServer = {
  ...base,
  checkProgress: ({ match, account, participant }) => {
    const maxKillParticipation = Math.max(
      ...match.info.participants.map(
        (participant) => participant.kills + participant.assists
      )
    );

    const highestKillParticipation = Number(
      participant.kills + participant.assists >= maxKillParticipation
    );
    if (!highestKillParticipation) {
      return 0;
    }
    const trophyProgress = getTrophyProgress(account, 'theBear');
    return highestKillParticipation / 3 + trophyProgress;
  },
};

export default theBear;
