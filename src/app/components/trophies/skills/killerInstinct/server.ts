import { TrophyServer } from '../../types';
import base from './base';

const killerInstinct: TrophyServer = {
  ...base,
  checkProgress: ({ participant, match }) => {
    const maxKills = Math.max(
      ...match.info.participants.map((participant) => participant.kills)
    );

    return Number(participant.kills >= maxKills);
  },
};

export default killerInstinct;
