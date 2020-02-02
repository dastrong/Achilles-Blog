export const getDaysSinceInjury = (injuryDate: number, dateNow: Date) => {
  return Math.floor((dateNow.getTime() - injuryDate) / 86400000);
};

export const getInjuryDate = () => new Date('12/1/2019').getTime();
