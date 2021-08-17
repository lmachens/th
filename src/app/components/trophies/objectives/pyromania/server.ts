import { TrophyServer } from '../../types';
import base from './base';

const pyromania: TrophyServer = {
  ...base,
  checkProgress: ({ match, events, participant }) => {
    const teamIds = match.info.participants
      .filter(
        (matchParticipant) => matchParticipant.teamId === participant.teamId
      )
      .map((teammate) => teammate.participantId);

    const fireDragonKills = events.filter(
      (event) =>
        event.type === 'ELITE_MONSTER_KILL' &&
        event.monsterSubType === 'FIRE_DRAGON' &&
        teamIds.includes(event.killerId)
    ).length;

    return fireDragonKills / 3;
  },
};

export default pyromania;
