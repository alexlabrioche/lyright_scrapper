import axios from "axios";
import cheerio from "cheerio";
import fs from "fs";
import slug from "slug";

import formatWikiData from "./formatWikiData";
import takeABreak from "./takeABreak";

const capitalize = s => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

async function addWikiData(artists) {
  const notFoundOnWiki = [];
  for (const artist of artists) {
    let artistName = artist.artist
      .split(" ")
      .map(str =>
        capitalize(str)
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
      )
      .join("_");
    console.info(`hello ${artistName}`);
    try {
      const res = await axios.get(
        `https://fr.wikipedia.org/wiki/${artistName}`
      );
      const $ = cheerio.load(res.data);
      const infos = [];
      $("div.infobox_v3 > table > tbody > tr").each(async function(idx) {
        const key = $(this)
          .find("th")
          .text()
          .normalize("NFD")
          .trim();
        const val = $(this)
          .find("td")
          .text()
          .normalize("NFD")
          .trim();
        infos.push({ [key]: val });
      });
      const formatedInfos = formatWikiData(infos);
      if (Object.values(formatedInfos).every(v => v === null)) {
        console.info("not found");
        notFoundOnWiki.push(artistName);
      } else {
        console.info(`     OK ${artist.artist}`);
        fs.writeFileSync(
          `data/french_rappers/${slug(artist.artist.toLocaleLowerCase())}.json`,
          JSON.stringify({ ...artist, ...formatedInfos }, null, 2)
        );
      }
    } catch (error) {
      console.info(`     oups... ${artistName}, ${error.message}`);
      notFoundOnWiki.push(artistName);
    }
    await takeABreak(500);
  }
  console.info("👏 fini");
  console.info(notFoundOnWiki);
}

export default addWikiData;
