import axios from "axios";
import cheerio from "cheerio";

async function getLyrics(uri) {
  const url = `https://paroles2chansons.lemonde.fr/${uri}`;
  console.info("      🎤 ScrapyRaptor : ", uri);
  const res = await axios.get(url);
  const $ = cheerio.load(res.data);
  let text = "";
  $(".border.block-spacing-medium.text-center").map((idx, element) => {
    $(`.csdemNotification`).remove();
    text = $(element)
      .text()
      .normalize("NFD")
      .replace(/\[(.*?)\]/g, "")
      .replace(/[, ]+/g, " ")
      .replace(/[; ]+/g, " ")
      .replace(/[: ]+/g, " ")
      .replace(/[) ]+/g, " ")
      .replace(/[( ]+/g, " ")
      .replace(/[" ]+/g, " ")
      .replace(/[. ]+/g, " ")
      .replace(/[* ]+/g, " ")
      .trim()
      .split(/\n/)
      .filter(str => str.length > 0);
  });
  return text;
}

export default getLyrics;
