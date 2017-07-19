//listem for form submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);


function saveBookmark(e) {
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if(!validateForm(siteName, siteUrl)){
    return false;
  }


  var bookmark = {
    name: siteName,
    url: siteUrl
  }

  //adding to local storage (only stores stings)
  /*
    localStorage.setItem('test', 'Hello World');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
  */

  if (localStorage.getItem('bookmarks') === null) { //test if bookmars already exists
    var bookmarks = []; //createing a blank array
    bookmarks.push(bookmark);
    // How does pushing an object to an array work??
    alert('bookmars is empty'); //debugging
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); //set to localStorage
  } else {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); //get bookmarks from localStorage
    bookmarks.push(bookmark); //Add submitted bookmark to array
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  document.getElementById('myForm').reset();

  fetchBookmarks();

  //prevent form form submitting fully
  e.preventDefault();
}

function deleteBookmark(url) {
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); //get bookmarks from localStorage

  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      bookmarks.splice(i, 1); //why the 1??
    }
  }
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); //set to localStorage

  fetchBookmarks();
}


function fetchBookmarks() {
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); //get bookmarks from localStorage
  var bookmarksResults = document.getElementById('bookmarksResults'); //get output id
  //How does it set the output id? is it some kind of property of a varible??

  bookmarksResults.innerHTML = '';
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;
    bookmarksResults.innerHTML += '<div class="well">' +
      '<h3>' + name +
      ' <a class="btn btn-default" target="_blank" href="' + url + '">Visit</a> ' +
      ' <a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="#">Delete</a> ' +
      '</h3>' +
      '</div>'; //appending ?? ?? deleteBookmark escape
  }
}

function validateForm(siteName, siteUrl){
  if(!siteName || !siteUrl){
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }
  return true;
}
