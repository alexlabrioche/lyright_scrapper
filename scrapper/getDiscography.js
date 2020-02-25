import axios from "axios";
import cheerio from "cheerio";
import slug from "slug";

import takeABreak from "./takeABreak";

async function getDiscography(artist) {
  try {
    const rootUrl = `https://paroles2chansons.lemonde.fr/paroles-${slug(
      artist.toLocaleLowerCase()
    )}-p1`;
    const res = await axios.get(rootUrl);
    const $ = cheerio.load(res.data);
    const allUrls = [];
    $(".pager-letter").each(function(idx) {
      idx === 0
        ? (allUrls[idx] = rootUrl)
        : (allUrls[idx] = $(this).attr("href"));
    });
    const discography = [];
    for (const url of allUrls) {
      console.info(`  🧘‍  URL en cours`, url);
      const res = await axios.get(url);
      const $ = cheerio.load(res.data);
      const currentPage = [];
      $("ul > li.item").each(async function(idx) {
        const song = $(this)
          .find("a.link")
          .text()
          .normalize("NFD")
          .trim();

        const lyricsUri = $(this)
          .find("a.link")
          .attr("href");
        currentPage[idx] = {
          song,
          lyricsUri
        };
      });
      discography.push(...currentPage);
      await takeABreak(500);
    }
    return {
      data: discography,
      error: null
    };
  } catch (error) {
    return {
      data: null,
      error: error.message
    };
  }
}

export default getDiscography;
