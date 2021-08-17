import { TrophyServer } from '../../types';
import base from './base';
import {
  isInEnemyTurretRange,
  getParticipantKills,
} from '../../../../lib/riot/helpers';

const siegeMaster: TrophyServer = {
  ...base,
  checkProgress: ({ match, events, participant }) => {
    const kills = getParticipantKills(events, participant.participantId);

    const underTurretKills = kills.filter((kill) => {
      const isUnderTurret = isInEnemyTurretRange(
        kill.position,
        participant.teamId
      );

      return isUnderTurret;
    }).length;

    const maxDamageDealtToTurrets = Math.max(
      ...match.info.participants.map(
        (participant) => participant.damageDealtToTurrets
      )
    );

    return Number(
      participant.damageDealtToTurrets >= maxDamageDealtToTurrets &&
        underTurretKills >= 5
    );
  },
};

export default siegeMaster;
