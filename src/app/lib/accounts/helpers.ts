import { Account, AccountTrophy } from './types';
import { Participant } from '../riot/types';

export const getTrophy = (
  account: Account,
  trophyName: string
): AccountTrophy => {
  return account.trophies.find((trophy) => trophy.name === trophyName);
};

export const getTrophyProgress = (
  account: Account,
  trophyName: string
): number => {
  const trophy = getTrophy(account, trophyName);
  const progress = trophy?.progress || 0;
  if (progress === Infinity || progress === -Infinity || isNaN(progress)) {
    return 0;
  }
  return progress;
};

export const getTrophyProgressDetails = (
  account: Account,
  trophyName: string
): any => {
  const trophy = getTrophy(account, trophyName);
  const progressDetails = trophy?.progressDetails || [];
  return progressDetails;
};

export const findPerk = (
  participant: Participant,
  perkId: number
): {
  var1: number;
  var2: number;
  var3: number;
} => {
  const perk = {
    var1: 0,
    var2: 0,
    var3: 0,
  };
  participant.perks.styles.forEach((style) => {
    const selection = style.selections.find(
      (selection) => selection.perk === perkId
    );
    if (selection) {
      perk.var1 = selection.var1;
      perk.var2 = selection.var2;
      perk.var3 = selection.var3;
    }
  });
  return perk;
};
