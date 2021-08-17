import { TrophyServer } from '../../types';
import base from './base';
import { getTeammates } from '../../../../lib/riot/helpers';

const livingArtillery: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const teammates = getTeammates(match, participant);

    const teammatesDamage = teammates.reduce(
      (current, teammate) => current + teammate.totalDamageDealtToChampions,
      0
    );

    const damageShare =
      participant.totalDamageDealtToChampions / teammatesDamage;
    return damageShare / 0.35;
  },
};

export default livingArtillery;
