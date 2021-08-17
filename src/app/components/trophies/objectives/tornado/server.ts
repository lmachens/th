import { TrophyServer } from '../../types';
import base from './base';

const tornado: TrophyServer = {
  ...base,
  checkProgress: ({ match, events, participant }) => {
    const teamIds = match.info.participants
      .filter(
        (matchParticipant) => matchParticipant.teamId === participant.teamId
      )
      .map((teammate) => teammate.participantId);

    const airDragonKills = events.filter(
      (event) =>
        event.type === 'ELITE_MONSTER_KILL' &&
        event.monsterSubType === 'AIR_DRAGON' &&
        teamIds.includes(event.killerId)
    ).length;

    return airDragonKills / 3;
  },
};

export default tornado;
