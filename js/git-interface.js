var apiKey = require('./../.env').apiKey;
var sortRepos = require('./../js/getRepos.js').sortRepos;
var graph = require('./../js/dategraph.js').graph;
var moment = require('moment');

  $(document).ready(function() {
    $('#userSubmit').click(function() {
      $("#showRepos").html("");
      $("#activityChart").html("");
      var username = $('#username').val();
      $('#username').val("");
    $.get('https://api.github.com/users/' + username + '/repos?access_token=' + apiKey).then(function(response){
      foundRepositories = sortRepos(response);
      console.log(foundRepositories);
      graph(foundRepositories);

      foundRepositories.forEach(function(repo) {
        $("#showRepos").append('<h3>' + repo.name + '</h3><br>Description: ' + repo.description + '<br>Created: ' + moment(repo.created).format("M/D/YY") + '<br>');
      });
      }).fail(function(error){
      console.log(error.responseJSON.message);
      $("#showRepos").append("Something went wrong! Try again.");
      });
    });
  });
