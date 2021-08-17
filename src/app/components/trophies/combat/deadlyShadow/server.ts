import { TrophyServer } from '../../types';
import base from './base';

const deadlyShadow: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const maxKills = Math.max(
      ...match.info.participants.map((participant) => participant.kills)
    );
    const minTotalDamageTaken = Math.min(
      ...match.info.participants.map(
        (participant) => participant.totalDamageTaken
      )
    );

    return Number(
      participant.kills >= maxKills &&
        participant.totalDamageTaken === minTotalDamageTaken
    );
  },
};

export default deadlyShadow;
