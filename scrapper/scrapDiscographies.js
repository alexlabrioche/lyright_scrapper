import fs from "fs";
import slug from "slug";
import path from "path";

import getDiscography from "./getDiscography";
import getLyrics from "./getLyrics";
import takeABreak from "./takeABreak";

global.appRoot = path.resolve(__dirname + "/../");

async function scrapDiscographies(rappersArray, pathName) {
  for (const rapper of rappersArray) {
    console.info(`\n 🙌  Salut ${rapper}`);
    const { error, data } = await getDiscography(rapper.toLocaleLowerCase());
    if (data) {
      const discography = [];
      for (const current of data) {
        const lyrics = await getLyrics(current.lyricsUri);
        discography.push({ song: current.song, lyrics });
        await takeABreak(500);
      }

      fs.writeFileSync(
        `${appRoot}/${pathName}/${slug(rapper.toLocaleLowerCase())}.json`,
        JSON.stringify(
          {
            artist: rapper,
            count: data.length,
            discography
          },
          null,
          2
        )
      );
    } else {
      console.info(`Oups : ${error}`);
    }
    takeABreak(1000);
  }
  console.info(`\n\n 🚀  c'est dans l'espace`);
}

export default scrapDiscographies;
