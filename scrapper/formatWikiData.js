function formatWikiData(arr) {
  let formated = {
    birth_name: null,
    born: null,
    nicknames: null,
    labels: null,
    genres: null,
    influences: null
  };
  arr.forEach(obj => {
    if (obj["Nom de naissance"] && Object.values(obj) !== null) {
      formated.birth_name = Object.values(obj)[0].trim();
    }
    if (obj["Surnom"] && Object.values(obj) !== null) {
      formated.nicknames = Object.values(obj)[0]
        .split(",")
        .map(s =>
          s
            .replace(/\[[0-9]\]/gi, "")
            .replace(/\(([^)]+)\)/g, "")
            .trim()
        )
        .slice(0, 5);
    }
    if (obj["Labels"] && Object.values(obj) !== null) {
      formated.labels = Object.values(obj)[0]
        .split(",")
        .map(s => s.trim())
        .slice(0, 5);
    }
    if (obj["Influences"] && Object.values(obj) !== null) {
      formated.influences = Object.values(obj)[0]
        .split(",")
        .map(s => s.trim())
        .slice(0, 5);
    }
    if (obj["Genre musical"] && Object.values(obj) !== null) {
      formated.genres = Object.values(obj)[0]
        .split(",")
        .map(s => s.trim())
        .slice(0, 3);
    }
    if (obj["Naissance"] && Object.values(obj) !== null) {
      formated.born =
        Object.values(obj)[0].match(
          /[0-9]{1,2}\s([-'a-zA-ZÀ-ÖØ-öø-ÿé]+)\s[0-9]{4}/i
        )[0] || null;
    }
  });
  return formated;
}

export default formatWikiData;
