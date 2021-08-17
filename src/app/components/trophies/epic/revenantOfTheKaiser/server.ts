import { TrophyServer } from '../../types';
import base from './base';
import { getTeam } from '../../../../lib/riot/helpers';
import { EliteMonsterKill } from '../../../../lib/riot/types';

const revenantOfTheKaiser: TrophyServer = {
  ...base,
  checkProgress: ({ match, events, participant }) => {
    const teamIds = getTeam(match, participant.teamId).map(
      (teammate) => teammate.participantId
    );

    const elderDragonKills = events.filter(
      (event) =>
        event.type === 'ELITE_MONSTER_KILL' &&
        event.monsterSubType === 'ELDER_DRAGON' &&
        teamIds.includes(event.killerId)
    ) as EliteMonsterKill[];
    const baronKills = events.filter(
      (event) =>
        event.type === 'ELITE_MONSTER_KILL' &&
        event.monsterType === 'BARON_NASHOR' &&
        teamIds.includes(event.killerId)
    ) as EliteMonsterKill[];

    const hasElderIntoBaronKill = elderDragonKills.some((elderDragonKill) =>
      baronKills.some(
        (baronKill) =>
          baronKill.timestamp > elderDragonKill.timestamp &&
          elderDragonKill.timestamp + 60000 > baronKill.timestamp
      )
    );
    return Number(hasElderIntoBaronKill);
  },
};

export default revenantOfTheKaiser;
