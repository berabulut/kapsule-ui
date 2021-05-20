export const shortenURL = async (url) => {
  const res = await fetch(process.env.apiURL + "/shorten", {
    body: JSON.stringify({
      url: url,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const status = res.status.toString();
  if (status[0] !== "2") return { error: res , text: res.statusText};

  return await res.json();
};

export const getStats = async (key) => {
  const res = await fetch(process.env.apiURL + "/" + key, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  return await res.json();
};

export const getMultipleRecords = async (params) => {
  const res = await fetch(process.env.apiURL + "/details" + params, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  return await res.json();
};
