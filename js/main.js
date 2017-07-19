//listem for form submit

document.getElementById('myForm').addEventListener('submit', saveBookmark)



function saveBookmark(e){


  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  var bookmark={
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

  if(localStorage.getItem('bookmark')===null){ //test if bookmars already exists
    var bookmarks = [];//createing a blank array
    bookmarks.push(bookmarks);

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));   //set to localStorage
  } else{
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); //get bookmarks from localStorage
    bookmark.push(bookmark)//Add submitted bookmark to array
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  //prevent form form submitting fully
  e.preventDefault();
}
