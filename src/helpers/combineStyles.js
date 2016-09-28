export default function combineStyles(conditions, styles) {
  const results = [];

  Object.keys(conditions).map(key => conditions[key] && results.push(styles[key]));

  return results;
}
