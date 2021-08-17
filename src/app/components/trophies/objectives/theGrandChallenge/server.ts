import { TrophyServer } from '../../types';
import base from './base';
import { getParticipantSoloKills } from '../../../../lib/riot/helpers';

const theGrandChallenge: TrophyServer = {
  ...base,
  checkProgress: ({ events, participant }) => {
    const soloKills = getParticipantSoloKills(
      events,
      participant.participantId
    );

    const buildingKills = events.filter(
      (event) =>
        event.type === 'BUILDING_KILL' &&
        (event.killerId === participant.participantId ||
          event.assistingParticipantIds?.some(
            (id) => id === participant.participantId
          )) &&
        (event.buildingType === 'INHIBITOR_BUILDING' ||
          (event.buildingType === 'TOWER_BUILDING' &&
            event.towerType === 'BASE_TURRET'))
    );

    const validKills = soloKills.filter((event) =>
      buildingKills.some(
        (buildingKill) =>
          buildingKill.timestamp >= event.timestamp &&
          event.timestamp + 25000 >= buildingKill.timestamp
      )
    );

    return validKills.length;
  },
};

export default theGrandChallenge;
