import { TrophyServer } from '../../types';
import base from './base';

const glutton: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const maxKills = Math.max(
      ...match.info.participants.map((participant) => participant.kills)
    );

    const maxTotalMinionsKilled = Math.max(
      ...match.info.participants.map(
        (participant) =>
          participant.totalMinionsKilled + participant.neutralMinionsKilled
      )
    );

    return Number(
      participant.kills >= maxKills &&
        participant.totalMinionsKilled + participant.neutralMinionsKilled >=
          maxTotalMinionsKilled
    );
  },
};

export default glutton;
