// http://81.69.28.107:8888/blog/getBlogList

const qs = require("qs");

const Fetch = (url, method, params) => {
  const token = sessionStorage.getItem("token");
  return new Promise((resolve, reject) => {
    let options = {
      method: method,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: token,
      },
    };
    if (method === "POST") {
      options.body = JSON.stringify(params);
    } else {
      if (Object.keys(params).length) {
        url = `${url}?${qs.stringify(params)}`;
      }
    }
    fetch(url, options)
      .then(async (res) => {
        const data = await res.json();
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const POST = async (url, params) => {
  return await Fetch(url, "POST", params);
};

export const GET = async (url, params) => {
  return await Fetch(url, "GET", params);
};
