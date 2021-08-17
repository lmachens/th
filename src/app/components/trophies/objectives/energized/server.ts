import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const energized: TrophyServer = {
  ...base,
  checkProgress: ({ match, events, participant, account }) => {
    const teamIds = match.info.participants
      .filter(
        (matchParticipant) => matchParticipant.teamId === participant.teamId
      )
      .map((teammate) => teammate.participantId);

    const buildingKills = events.filter(
      (event) =>
        event.type === 'BUILDING_KILL' && event.teamId === participant.teamId
    );

    const baronKills = events.filter(
      (event) =>
        event.type === 'ELITE_MONSTER_KILL' &&
        event.monsterType === 'BARON_NASHOR' &&
        teamIds.includes(event.killerId)
    );

    const energizedScore = Math.max(
      ...baronKills.map(
        (event) =>
          buildingKills.filter(
            (buildingKill) =>
              buildingKill.timestamp < event.timestamp + 210000 &&
              buildingKill.timestamp > event.timestamp
          ).length
      ),
      0
    );

    const trophyProgress = getTrophyProgress(account, 'energized');
    return energizedScore / 5 + trophyProgress;
  },
};

export default energized;
