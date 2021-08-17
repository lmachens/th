import { TrophyServer } from '../../types';
import base from './base';

const battery: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const maxTotalHeal = Math.max(
      ...match.info.participants.map((other) => other.totalHeal)
    );
    const maxTotalDamageTaken = Math.max(
      ...match.info.participants.map((other) => other.totalDamageTaken)
    );

    return Number(
      participant.totalHeal >= maxTotalHeal &&
        participant.totalDamageTaken >= maxTotalDamageTaken
    );
  },
};

export default battery;
