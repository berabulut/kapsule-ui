export const mapStatistics = (visits) => {
  let arr = [];
  for (let i = 0; i < visits.length; i++) {
    const countryCodes = visits[i].CountryCode;
    if (countryCodes === null) continue;
    for (let j = 0; j < countryCodes.length; j++) {
	  const code = countryCodes[j];
      const index = arr.findIndex((record) => record.id === code); // index is -1 if previous browser record has not been found
      if (index > -1) {
        arr[index].value += 1;
        continue;
      }
      if (code === "") continue;

      arr.push({
        id: code,
        value: 1,
      });
    }
  }
  return arr;
};

