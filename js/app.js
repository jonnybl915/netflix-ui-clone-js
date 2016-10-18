// Functions

var forEach = function(arr, cb){
   for(var i = 0 ; i < arr.length; i+=1){
      cb(arr[i], i, arr)
   }
}

// ROUTER
// (1-R) Create router that checks for initial state and changes in the hash
var routerController = function(){
   var selectedUser = window.location.hash.slice(1)

   console.log(selectedUser)

   if(selectedUser.length === 0){
      showHomePage()
      return
   }

   // console.log( selectedUser )
   showUserShowsPage(selectedUser)
}
// ================
//  Show Home Page
// ================

var showHomePage = function(){
   var bigStr = '<div class="row users-container">'
       bigStr += "<h1>Who's watching?</h1>"

       for(var propp in userList ){

          console.log()
          bigStr += '<div class="col-xs-6 col-sm-3">'
          bigStr +=     '<a href="#'+propp+'">'
          bigStr +=        '<img src="https://flathash.com/' + propp +'" alt="">'
          bigStr +=        '<h3>'+ userList[propp].username +'</h3>'
          bigStr +=     '</a>'
          bigStr += '</div>'
       }

       bigStr +='</div>'
       appContainer.innerHTML = bigStr
}

// ================
//  Show Personal Page
// ================

var showUserShowsPage = function(usr){
   var userObj = userList[usr]

   //CREATE CONTAINER FOR DATA AND PUT ON PAGE
   var bigHTMLStr = '<h2>All <span class="bg-primary"> '+ userObj.username + '\'s </span> Shows </h2>'
       bigHTMLStr = '<div class="row shows-list"> </div>'

       appContainer.innerHTML = bigHTMLStr

   // FETCH DATA
   var firstShowId = userObj.showIds[0]
   console.log('.showId[0]', firstShowId);
   // (1) check to make sure the data can be fetched and shows up in the browser

   // (2) fetch *any* data and log it out w/ $.getJSON(apiURL).then(cb)
   // $.getJSON("http://api.tvmaze.com/shows/3").then(function(dataResponse){
   //    console.log(dataResponse)
   // })



   // (3) fetch *all*  the data for each showId
   forEach(userObj.showIds, function(elementIdNum){
      // console.log(elementIdNum)

      $.getJSON("http://api.tvmaze.com/shows/" + elementIdNum ).then(function(dataResponse){
         console.log(dataResponse);

         // RENDER DATA TO PAGE
         // console.log(userList[selectedUser])
         var showsListContainerEl = document.querySelector('.shows-list');

         var showStr = '<div class="col-sm-3">';
             showStr +=    "<img src='" + dataResponse.image.medium  + "'>";
             showStr +=    "<h4>" + dataResponse.name  + "</h4>";
             showStr += '</div>';

         showsListContainerEl.innerHTML += showStr;
      })
   })
}

// MAJOR VARIABLES + SELECTORS

var userList = {
   matt: {username: "Matt", showIds: [170,169,175,318,76,270, 255]},
   ed: {username: "Ed", showIds: [5853,431,80,279,570,76,73,20540,83,17119]},
   michelle: {username: "Michelle", showIds: [83,576,735,73,749,170,112,80]},
   justin: {username: "Justin", showIds: [551,169,490,530,73,302, 547, 532]},
}

// put data on page
var appContainer = document.querySelector('#app-container')


// EXECUTION CODE
// --------------------

// (2-R) Execute Router on hash change AND at initialization
window.addEventListener('hashchange', routerController )
routerController()
