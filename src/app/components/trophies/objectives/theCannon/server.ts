import { TrophyServer } from '../../types';
import base from './base';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/riot/queues';
import { BuildingKillEvent } from '../../../../lib/riot/types';

const theCannon: TrophyServer = {
  ...base,
  checkProgress: ({ participant, events, match }) => {
    const firstTurretDeath = events.find(
      (event) =>
        event.type === 'BUILDING_KILL' &&
        event.buildingType === 'TOWER_BUILDING'
    ) as BuildingKillEvent;
    if (!firstTurretDeath) {
      return 0;
    }
    const requiredMinutes = match.info.queueId === ARAM_HOWLING_ABYSS ? 5 : 10;
    const isEarly = firstTurretDeath.timestamp < requiredMinutes * 60 * 1000;
    const isKiller = firstTurretDeath.killerId === participant.participantId;
    const isAssistant = firstTurretDeath.assistingParticipantIds?.some(
      (id) => id === participant.participantId
    );
    return Number(isEarly && (isKiller || isAssistant));
  },
};

export default theCannon;
