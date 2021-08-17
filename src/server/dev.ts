import { Request, Response } from 'express';
import Ajv from 'ajv';
import {
  getSummoner,
  getMatchAndTimeline,
  getTeammateAccounts,
  isMatchInProgress,
} from '../app/lib//riot/server';
import { allTrophies, aramTrophies } from '../app/components/trophies/server';
import { newAccount } from '../app/lib//accounts/server';
import {
  getAllEvents,
  getParticipantByAccount,
} from '../app/lib//riot/helpers';
import {
  ARAM_HOWLING_ABYSS,
  SUPPORTED_QUEUE_IDS,
} from '../app/lib/riot/queues';
import { log } from '../app/lib/logs';
import { getAccountsCollection } from '../app/lib//accounts/server/collection';
import { getMissionsCollection } from '../app/lib//missions/server/collection';

export const handlePostDev = async (req: Request, res: Response) => {
  const ajv = new Ajv();
  const valid = ajv.validate(
    {
      type: 'object',
      properties: {
        matchId: {
          type: 'integer',
        },
        summonerName: {
          type: 'string',
        },
        platformId: {
          type: 'string',
        },
      },
      required: ['matchId', 'summonerName', 'platformId'],
    },
    req.body
  );
  if (!valid) {
    return res.status(422).json(ajv.errors);
  }

  const { matchId, summonerName, platformId } = req.body;

  const [match, timeline] = await getMatchAndTimeline({
    platformId,
    matchId,
  });

  const summoner = await getSummoner({ summonerName, platformId });
  if (!summoner) {
    return res.status(404).end('Summoner not found');
  }

  if (!match || !timeline) {
    const matchInProgress = await isMatchInProgress({
      platformId: summoner.platformId,
      encryptedSummonerId: summoner.id,
    });
    console.warn(`matchInProgress: ${matchInProgress}`);

    return res.status(404).end('Not Found');
  }

  if (!SUPPORTED_QUEUE_IDS.includes(match.info.queueId)) {
    return res
      .status(403)
      .end(`Game mode ${match.info.queueId} is not supported`);
  }

  const events = getAllEvents(timeline);

  const Accounts = await getAccountsCollection();
  const account = (await Accounts.findOne({
    'summoner.name': summoner.name,
    'summoner.platformId': summoner.platformId,
  })) || {
    ...newAccount,
    summoner: summoner,
  };

  const timeLabel = `Check ${matchId} of ${account.summoner.name} ${account.summoner.platformId}`;
  console.time(timeLabel);

  const participant = getParticipantByAccount(match, account);
  if (!participant) {
    log(`Participant not found ${matchId} ${account.summoner.name}`);
    return res.status(403).end('Participant not found');
  }

  const teammateAccounts = await getTeammateAccounts(match, participant);

  const activeMission = await getMissionsCollection().findOne({
    active: true,
  });

  let accountMission = account.missions.find(
    (mission) => mission.missionId.toString() === activeMission._id.toString()
  );
  if (!accountMission) {
    accountMission = {
      missionId: activeMission._id,
      completedTrophyNames: [],
    };
    account.missions.push(accountMission);
  }
  const missionTrophyNames: string[] = [];
  activeMission.trophyNames.forEach((trophyName) => {
    if (accountMission.completedTrophyNames.includes(trophyName)) {
      return;
    }
    const trophy = allTrophies.find((trophy) => trophy.name === trophyName);
    const result = trophy.checkProgress({
      match,
      timeline,
      account,
      events,
      participant,
      teammateAccounts,
      missionTrophiesCompleted: 0,
    });
    const { progress } =
      typeof result === 'number' ? { progress: result } : result;
    if (progress >= 0.999) {
      missionTrophyNames.push(trophyName);
      accountMission.completedTrophyNames.push(trophyName);
    }
  });
  if (missionTrophyNames.length > 0) {
    account.missionTrophiesCompleted += missionTrophyNames.length;
  }

  const trophiesAboutToCheck =
    match.info.queueId === ARAM_HOWLING_ABYSS ? aramTrophies : allTrophies;
  const checkedTrophies = trophiesAboutToCheck.reduce(
    (current, trophy) => ({
      ...current,
      [trophy.name]: trophy.checkProgress({
        match,
        timeline,
        account,
        events,
        participant,
        teammateAccounts,
        missionTrophiesCompleted: missionTrophyNames.length,
      }),
    }),
    {}
  );

  res.json(checkedTrophies);
  console.timeEnd(timeLabel);
};
