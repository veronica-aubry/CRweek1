var apiKey = require('./../.env').apiKey;
var sortRepos = require('./../js/getRepos.js').sortRepos;

  $(document).ready(function() {
    $('#userSubmit').click(function() {
      $("#showRepos").html("");
      var username = $('#username').val();
      $('#username').val("");
    $.get('https://api.github.com/users/' + username + '/repos?access_token=' + apiKey).then(function(response){
      console.log(response);
      foundRepositories = sortRepos(response);
      console.log(foundRepositories);
      foundRepositories.forEach(function(repo) {
        $("#showRepos").append('<h3>' + repo.name + '</h3><br>Description: ' + repo.description + '<br>')
      })
      }).fail(function(error){
      console.log(error.responseJSON.message);
      $("#showRepos").append("Something went wrong! Try again.");
      });
    });
  });
