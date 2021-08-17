import { TrophyServer } from '../../types';
import base from './base';

const smartness: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    const hasKillingSpree = Number(participant.killingSprees >= 1);
    const hasTenAssists = Number(participant.assists >= 10);
    const hasLessThanFiveDeaths = Number(participant.deaths <= 5);

    return (hasKillingSpree + hasTenAssists + hasLessThanFiveDeaths) / 3;
  },
};

export default smartness;
