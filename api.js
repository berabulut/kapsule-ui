export const shortenURL = async (url, options) => {
  const res = await fetch(process.env.apiURL + "/shorten", {
    body: JSON.stringify({
      url: url,
      options_enabled: options.checked,
      duration: options.duration,
      message: options.message,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (res.status === 400) return res.json();

  if (!res.ok) return { error: res.status, text: res.statusText };

  return await res.json();
};

export const getStats = async (url) => {
  const res = await fetch(url, {
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
