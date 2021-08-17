import { TrophyServer } from '../../types';
import base from './base';

const greyEminence: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const maxAssists = Math.max(
      ...match.info.participants.map((participant) => participant.assists)
    );
    const minDeaths = Math.min(
      ...match.info.participants.map((participant) => participant.deaths)
    );

    return Number(
      participant.assists >= maxAssists && participant.deaths <= minDeaths
    );
  },
};

export default greyEminence;
