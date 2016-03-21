
exports.sortRepos = function(repos) {
  var repositories = [];
  repos.forEach(function(repo) {
      var repoObj = {name:repo.name, description:repo.description, created:repo.created_at};
      repositories.push(repoObj);
  });
  return repositories;
};
