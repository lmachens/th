import { TrophyServer } from '../../types';
import base from './base';

const deepSea: TrophyServer = {
  ...base,
  checkProgress: ({ match, events, participant }) => {
    const teamIds = match.info.participants
      .filter(
        (matchParticipant) => matchParticipant.teamId === participant.teamId
      )
      .map((teammate) => teammate.participantId);

    const waterDragonKills = events.filter(
      (event) =>
        event.type === 'ELITE_MONSTER_KILL' &&
        event.monsterSubType === 'WATER_DRAGON' &&
        teamIds.includes(event.killerId)
    ).length;

    return waterDragonKills / 3;
  },
};

export default deepSea;
