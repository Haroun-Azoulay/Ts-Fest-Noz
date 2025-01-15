class CustomTestSequencer {
    sort(tests) {
      return tests.sort((a, b) => a.path.localeCompare(b.path));
    }
    cacheResults(results) {
      return results;
    }
}
  
module.exports = CustomTestSequencer;