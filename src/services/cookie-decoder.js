// derived from the js-cookie source files.
export default function(rawCookies, key) {
  rawCookies = rfc6265Converter(rawCookies).split(';');
  const jar = [];
  rawCookies.forEach(c => {
    const crumbs = c.split('=').map(x => x.trim());
    let content;
    try {
      content = JSON.parse(crumbs[1]);
    } catch (e) {
      content = crumbs[1];
    }
    const baked = {};
    baked[crumbs[0]] = content;
    jar.push(baked);
  });
  if (key) {
    for (const cookie of jar) {
      if (cookie[key]) return cookie[key];
    }
  }
  return jar;
}

const rfc6265Converter = function(value) {
  return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
};
