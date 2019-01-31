const outcomes = [];

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  // Ran every time a balls drops into a bucket
   outcomes.push([dropPosition, bounciness, size, bucketLabel])
}

function runAnalysis() {
  const predictionPoint = 300;
  const k = 5;

  function distance(point) {
    return Math.abs(point - predictionPoint);
  }

  const predictedBucket = _.chain(outcomes)
    .map(row => [distance(row[0]), row[3]])
    .sortBy(row => row[0])
    .slice(0,k)
    .countBy(row => row[1])
    .toPairs()
    .sortBy(row => row[1])
    .last()
    .first()
    .parseInt()
    .value()
}
