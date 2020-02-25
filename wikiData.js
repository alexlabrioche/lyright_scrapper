import addWikiData from "./scrapper/addWikiData";
import readJsonFiles from "./utils/readJsonFiles";

const artists = readJsonFiles("data/french_classics");

addWikiData(artists);

const notFound = [
  "Diam_S",
  "Jul",
  "Orelsan",
  "Oxmo_Puccino",
  "PNL",
  "Angele",
  "Claude_Francois",
  "Leo_Ferre",
  "Sheila",
  "Sylvie_Vartan"
];
