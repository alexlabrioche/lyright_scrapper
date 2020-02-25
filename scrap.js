import scrapDiscographies from "./scrapper/scrapDiscographies";
import { chansonFr } from "./artists";

scrapDiscographies(chansonFr, "data/french_classics");
