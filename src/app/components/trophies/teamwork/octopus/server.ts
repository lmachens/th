import { TrophyServer } from '../../types';
import base from './base';

const octopus: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const maxAssists = Math.max(
      ...match.info.participants.map((other) => other.assists)
    );

    return Number(participant.assists >= maxAssists);
  },
};

export default octopus;
