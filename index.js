const PORT = 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

const newspapers = [
  {
    name: "USA Today",
    address: "https://usatoday.com/",
    base: "https://usatoday.com/",
  },
  {
    name: "The Guardian",
    address: "https://www.theguardian.co.uk",
    base: "",
  },
  {
    name: "The Wall Street Journal",
    address: "https://www.wsj.com",
    base: "",
  },
  {
    name: "The Washington Post",
    address: "https://www.washingtonpost.com/",
    base: "",
  },
  {
    name: "The Asahi Shimbun",
    address: "https://www.asahi.com/ajw/",
    base: "https://www.asahi.com",
  },

  {
    name: "NY Times",
    address: "https://www.nytimes.com/",
    base: "https://www.nytimes.com/",
  },
  {
    name: "Coindesk",
    address: "https://www.coindesk.com/",
    base: "https://www.coindesk.com",
  },
  {
    name: "Coin Telegraph",
    address: "https://cointelegraph.com/",
    base: "https://cointelegraph.com",
  },
  {
    name: "Bitcoin Magazine",
    address: "https://bitcoinmagazine.com/",
    base: "https://bitcoinmagazine.com",
  },
];

newspapers.forEach((newspaper) => {
  axios.get(newspaper.address).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);

    $("a:contains('Dogecoin')", html).each(function () {
      const title = $(this).text();
      const url = $(this).attr("href");
      url.includes("tag" || "tags")
        ? ""
        : articles.push({
            title,
            url: newspaper.base + url,
            source: newspaper.name,
          });
    });
    $("a:contains('Doge')", html).each(function () {
      const title = $(this).text();
      const url = $(this).attr("href");
      url.includes("tag" || "tags")
        ? ""
        : articles.push({
            title,
            url: newspaper.base + url,
            source: newspaper.name,
          });
    });
  });
});

const articles = [];

app.get("/", (req, res) => {
  res.json("Welcom to my placeholder API");
});

app.get("/news", (req, res) => {
  res.json(articles);
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
