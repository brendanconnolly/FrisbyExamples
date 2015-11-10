
var frisby = require('frisby');

frisby.create('Github Users')
.addHeader('User-Agent','frisbyJS Test')
  .get('https://api.github.com/users/vlucas')
  .expectStatus(200)
  .expectHeaderContains('Content-Type', 'json')
  .expectHeader('Content-Type', 'application/json')
  .expectJSON({login: 'vlucas'})
.toss();


frisby.create('Nested Test Repos ContainsJson Frisby')
.addHeader('User-Agent','frisbyJS Test')
  .get('https://api.github.com/users/vlucas')
   .afterJSON(function(jsonResponse) {
     frisby.create("using response from first request")
          .addHeader('User-Agent','frisbyJS Test')
          .get(jsonResponse.repos_url)
          .expectJSON('?',{name: 'frisby'}) //? in path param searches with an array
          .toss();
   })
.toss();

frisby.create('Frisby Repos language contains javascript')
  .addHeader('User-Agent','frisbyJS Test')
  .get('https://api.github.com/repos/vlucas/frisby/languages')
  .inspectJSON()
  .expectStatus(200)
  .expectBodyContains('JavaScript')
  .toss();

frisby.create('Bad Auth expect 401')
  .addHeader('User-Agent','frisbyJS Test')
  .get('https://bad:user@api.github.com/users/vlucas')
  .inspectJSON()
  .expectStatus(401)
  .expectJSON({ message: 'Bad credentials', documentation_url: 'https://developer.github.com/v3' })
  .toss();
