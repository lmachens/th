import { TrophyServer } from '../../types';
import base from './base';

const theSphinx: TrophyServer = {
  ...base,
  checkProgress: ({ match, events, participant }) => {
    const teamIds = match.info.participants
      .filter(
        (matchParticipant) => matchParticipant.teamId === participant.teamId
      )
      .map((teammate) => teammate.participantId);

    const earthDragonKills = events.filter(
      (event) =>
        event.type === 'ELITE_MONSTER_KILL' &&
        event.monsterSubType === 'EARTH_DRAGON' &&
        teamIds.includes(event.killerId)
    ).length;

    return earthDragonKills / 3;
  },
};

export default theSphinx;
