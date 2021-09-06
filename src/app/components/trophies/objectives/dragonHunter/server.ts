import { TrophyServer } from '../../types';
import base, { REQUIRED_DRAGONS } from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';
import { getTeam } from '../../../../lib/riot/helpers';

const dragonHunter: TrophyServer = {
  ...base,
  checkProgress: ({ match, events, participant, account }) => {
    const teamIds = getTeam(match, participant.teamId).map(
      (teammate) => teammate.participantId
    );

    const dragonKills = events.filter(
      (event) =>
        event.type === 'ELITE_MONSTER_KILL' &&
        event.monsterType === 'DRAGON' &&
        teamIds.includes(event.killerId)
    ).length;

    const trophyProgress = getTrophyProgress(account, 'dragonHunter');
    return dragonKills / REQUIRED_DRAGONS + trophyProgress;
  },
};

export default dragonHunter;
