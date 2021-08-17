import { TrophyServer } from '../../types';
import base from './base';

const dragonLord: TrophyServer = {
  ...base,
  checkProgress: ({ match, events, participant }) => {
    const teamIds = match.info.participants
      .filter(
        (matchParticipant) => matchParticipant.teamId === participant.teamId
      )
      .map((teammate) => teammate.participantId);

    const dragonKills = events.filter(
      (event) =>
        event.type === 'ELITE_MONSTER_KILL' &&
        event.monsterType === 'DRAGON' &&
        teamIds.includes(event.killerId)
    ).length;

    return dragonKills / 5;
  },
};

export default dragonLord;
