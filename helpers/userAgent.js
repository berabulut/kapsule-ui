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

// returning an array that's suitable as chart data
// chrome, firefox etc.
export const browserStatistics = (visits) => {
  let arr = [];
  for (let i = 0; i < visits.length; i++) {
    const ua = visits[i].UserAgent;
    if (ua === null) continue;
    for (let j = 0; j < ua.length; j++) {
      const record = ua[j];
      const index = arr.findIndex((browser) => browser.id === record.Browser); // index is -1 if previous browser record has not been found
      if (index > -1) {
        arr[index].value += 1;
        continue;
      }
      if (record.Browser === "") {
        const index = arr.findIndex((browser) => browser.id === "unknown");
        if (index > -1) {
          arr[index].value += 1;
          continue;
        }
      }

      arr.push({
        id: record.Browser ? record.Browser : "unknown",
        label: record.Browser ? record.Browser : "unknown",
        value: 1,
        color: colors[arr.length + 1],
      });
    }
  }
  return arr;
};

// statistics of mobile / desktop devices
export const deviceStatistics = (visits) => {
  let arr = [];
  for (let i = 0; i < visits.length; i++) {
    const ua = visits[i].UserAgent;
    if (ua === null) continue;
    for (let j = 0; j < ua.length; j++) {
      const record = ua[j];

      const index = arr.findIndex(
        (device) => device.id === (record.Mobile ? "Mobile" : "Desktop")
      ); // index is -1 if previous device record has not been found
      if (index > -1) {
        arr[index].value += 1;
        continue;
      }
      if (record.Mobile === "") {
        const index = arr.findIndex((device) => device.id === "Unknown");
        if (index > -1) {
          arr[index].value += 1;
          continue;
        }
      }

      arr.push({
        id:
          record.Mobile !== ""
            ? record.Mobile
              ? "Mobile"
              : "Desktop"
            : "Unknown",
        label:
          record.Mobile !== ""
            ? record.Mobile
              ? "Mobile"
              : "Desktop"
            : "Unknown",
        value: 1,
        color: colors[arr.length + 1],
      });
    }
  }
  return arr;
};

// windows, android , ubuntu
export const osStatistics = (visits) => {
  let arr = [];
  for (let i = 0; i < visits.length; i++) {
    const ua = visits[i].UserAgent;

    if (ua === null) continue;

    for (let j = 0; j < ua.length; j++) {
      const record = ua[j];
      let OS = record.OS.substr(0, record.OS.indexOf(" "));

      const index = arr.findIndex((os) => os.id === OS); // index is -1 if previous browser record has not been found
      if (index > -1) {
        arr[index].value += 1;
        continue;
      }

      if (OS === "") {
        const index = arr.findIndex((os) => os.id === "unknown");
        if (index > -1) {
          arr[index].value += 1;
          continue;
        }
      }

      arr.push({
        id: OS ? OS : "unknown",
        label: OS ? OS : "unknown",
        value: 1,
        color: colors[arr.length + 1],
      });
    }
  }
  return arr;
};

export const languageStatistics = (visits) => {
  let arr = [];
  for (let i = 0; i < visits.length; i++) {
    const languages = visits[i].Language;
    if (languages === null) continue;
    for (let j = 0; j < languages.length; j++) {
      const language = languages[j].substr(
        languages[j].indexOf("-") + 1,
        languages[j].length
      );
      const index = arr.findIndex((record) => record.id === language); // index is -1 if previous browser record has not been found
      if (index > -1) {
        arr[index].value += 1;
        continue;
      }
      if (language === "") continue;

      arr.push({
        id: language,
        label: language,
        value: 1,
        color: colors[arr.length + 1],
      });
    }
  }
  return arr;
};
