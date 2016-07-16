function colorForTopic(count, index) {
  const hue = Math.round(360 * index / (count + 1));
  return `hsl(${hue}, 74%, 65%)`;
}

export default {
  darkText: '#1d1d26',
  lightText: '#7F91A7', // TODO get from invisionapp
  colorForTopic,
};
