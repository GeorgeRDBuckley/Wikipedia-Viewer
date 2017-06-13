var query = "";
var resultHTML = document.getElementById("resultsList");
var search = document.getElementById("search");
  var header = document.getElementById("header");
  var body = document.getElementById("body");
var random = document.getElementById("random-article");

function myFunction() {
  // var
  query = document.getElementById('query').value
  resultHTML.innerHTML = "";

  //if else
  if (query === "") {
    search.style.padding = "";
    header.style.bottom = "0px";
    header.style.position = "absolute";
    body.style.display = "";
    random.style.display = "";
  }
  else {
    wikiSearch(query);
  }
}

function wikiSearch(q) {
  var api = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&pithumbsize=150&exlimit=max&gsrsearch=";
  var pageLink = "https://en.wikipedia.org/?curid=";
  $.ajax({
    url: api + q,
    type: 'GET',
    data: {},
    dataType: 'jsonp',
    success: function(data) {
      console.log(data);
      results = data.query.pages;
      console.log(results);
      for (var key in results) {
  if (results.hasOwnProperty(key)) {
    if (results[key].thumbnail == null) {
      var thumbURL = 'http://via.placeholder.com/150x150/ffffff?text=No+Image'
    }
    else {
      var thumbURL = results[key].thumbnail.source
    }
    var newElement = document.createElement('a');
    newElement.href = pageLink + results[key].pageid;
    newElement.target = "_blank";
newElement.innerHTML = "<li><div class='row'><div class='col-md-2 result-image'><img src='" + thumbURL + "'></div><div class='col-md-10 results-info'><h2>" + results[key].title + "</h2><p>" + results[key].extract + "</p></div></li>";
resultHTML.appendChild(newElement);
    search.style.padding = "5%";
    header.style.bottom = "0";
    header.style.position = "inherit";
    body.style.display = "block";
    random.style.display = "none";
  }
}
  }
  })
}
