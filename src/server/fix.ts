import dotenv from 'dotenv';
dotenv.config();

import trophies from '../app/components/trophies/server';
import { TrophyServer } from '../app/components/trophies/types';
import { getAccountsCollection } from '../app/lib//accounts/server/collection';
import { AccountTrophy } from '../app/lib/accounts';
import { initMongoDatabase } from '../app/lib/utils/server/db';

const trophyToAccountTrophy = (trophy: TrophyServer): AccountTrophy => ({
  name: trophy.name,
  island: trophy.island,
  level: trophy.level,
  status: 'active',
  progress: 0,
  progressDetails: null,
});

async function run() {
  await initMongoDatabase();
  const Accounts = await getAccountsCollection();

  const cursor = Accounts.find({});
  while (await cursor.hasNext()) {
    const account = await cursor.next();
    const newTrophies: AccountTrophy[] = [];

    let changed = false;
    const hubSkills = account.levels.find(
      (level) => level.name === 'hubSkills'
    );
    if (
      hubSkills &&
      !account.trophies.some((trophy) => trophy.name === trophies.wanted.name)
    ) {
      changed = true;
      newTrophies.push(trophyToAccountTrophy(trophies.wanted));
      if (hubSkills.status === 'completed') {
        hubSkills.status = 'unlocked';
      }
    }

    const skills4 = account.levels.find((level) => level.name === 'skills4');
    if (
      skills4 &&
      !account.trophies.some((trophy) => trophy.name === trophies.criminal.name)
    ) {
      changed = true;
      newTrophies.push(trophyToAccountTrophy(trophies.criminal));
      if (skills4.status === 'completed') {
        skills4.status = 'unlocked';
      }
    }

    const skills6 = account.levels.find((level) => level.name === 'skills6');
    if (
      skills6 &&
      !account.trophies.some(
        (trophy) => trophy.name === trophies.bountyKing.name
      )
    ) {
      changed = true;
      newTrophies.push(trophyToAccountTrophy(trophies.bountyKing));
      if (skills6.status === 'completed') {
        skills6.status = 'unlocked';
      }
    }

    if (changed) {
      await Accounts.updateOne(
        { _id: account._id },
        {
          $addToSet: {
            trophies: {
              $each: newTrophies,
            },
          },
          $set: {
            levels: account.levels,
          },
        }
      );
    }
  }
  console.log('DONE');
}
run();
