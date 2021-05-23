import { features } from "@./data/world_countries";

export const mapStatistics = (visits) => { // getting country codes from visits
  let records = [];
  for (let i = 0; i < visits.length; i++) {
    const countryCodes = visits[i].CountryCode;
    if (countryCodes === null) continue;
    for (let j = 0; j < countryCodes.length; j++) {
      const code = countryCodes[j];
      const index = records.findIndex((record) => record.id === code); // index is -1 if previous browser record has not been found
      if (index > -1) {
        records[index].value += 1;
        continue;
      }
      if (code === "") continue;

      records.push({
        id: code,
        value: 1,
      });
    }
  }
  return records;
};

export const countryStatistics = (mapStatistics) => { // getting country names from country codes
  let records = [];
  for (let i = 0; i < mapStatistics.length; i++) {
    const countryCode = mapStatistics[i].id;
    if (countryCode === null) continue;
    const country = features.filter((country) => country.id === countryCode);

    if (!country[0]) return;

    records.push({
      name: country[0]?.properties?.name,
      value: mapStatistics[i].value,
    });
  }
  return records.sort(function (a, b) { // sorting in desceding order
    return b.value - a.value;
  });
};
