const colors = [
  "#00ADB5",
  "#FFA700",
  "#AAAAAA",
  "#B500AD",
  "#00B562",
  "#B50053",
  "#F3FF00",
  "#FF8A00",
  "#01D2FF",
  "#0D1920",
  "#5F70FE",
  "#8D5FFF",
  "#E84545",
];

export const browserStatistics = (visits) => {
  let arr = [];
  for (let i = 0; i < visits.length; i++) {
    const ua = visits[i].UserAgent;
    if (ua === null) continue;
    for (let j = 0; j < ua.length; j++) {
      const record = ua[j];
      const index = arr.findIndex((browser) => browser.id === record.Browser);
      if (index > -1) {
        arr[index].value += 1;
        continue;
      }

      arr.push({
        id: record.Browser,
        label: record.Browser,
        value: 1,
        color: colors[arr.length + 1],
      });
    }
  }
  return arr;
};
