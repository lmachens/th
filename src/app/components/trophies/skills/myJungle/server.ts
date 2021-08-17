import { TrophyServer } from '../../types';
import base from './base';

const myJungle: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const maxJungleCs = Math.max(
      ...match.info.participants.map(
        (participant) => participant.neutralMinionsKilled
      )
    );

    return participant.neutralMinionsKilled / maxJungleCs;
  },
};

export default myJungle;
