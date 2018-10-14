'use strict';

module.exports = (NODE) => {
  const Sentiment = require('sentiment');
  const sentiment = new Sentiment();

  const stringsIn = NODE.getInputByName('strings');

  const scoreOut = NODE.getOutputByName('score');
  scoreOut.on('trigger', async (conn, state) => {
    const strs = await stringsIn.getValues(state);
    let results;

    if (strs.length) {
      results = strs.map(str => sentiment.analyze(str).score);
    } else {
      results = [];
    }

    return results;
  });

  const comparativeOut = NODE.getOutputByName('comparative');
  comparativeOut.on('trigger', async (conn, state) => {
    const strs = await stringsIn.getValues(state);
    let results;

    if (strs.length) {
      results = strs.map(str => sentiment.analyze(str).comparative);
    } else {
      results = [];
    }

    return results;
  });
};
