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

export const getStats = async (key) => {
  let url;
  if (process.env.prod) {
    url = window.location.origin + process.env.apiURL + "/" + key
  }
  url = process.env.apiURL + "/" + key
  
  const res = await fetch(url, { //http://kapsule.click
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
