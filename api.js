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
