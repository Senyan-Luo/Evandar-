$(document).ready(function () {
  //for A7, #listDiv is unhidden, carousel is hidden

  /* $("#main-body").hide()
  $("#eventsCarousel").hide() */
  $("#listDiv").hide()

  var source = $("#carousel-template").html();

  var template = Handlebars.compile(source);

  var carousel = $("#carouselDiv")

  var listSource = $("#listView-template").html();
  
  var listTemplate = Handlebars.compile(listSource)
  var accordion = $("#accordion")

  listEventsRef.get().then(snapshot => {
    snapshot.docs.forEach((doc, index) => {
      doc.data().id = doc.id
      let copyObj = JSON.parse(JSON.stringify(doc.data()));
      copyObj.id = "number" + index

      usersRef.get().then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          if(doc.data().acronym == copyObj.host ){ 
            var fullName = doc.data().name
            copyObj.fullName = fullName
          }
          })
 
      }).then(function(){
        var listString = listTemplate(copyObj)
        accordion.append(listString)
        $('[data-toggle="popover"]').popover({
          container: "body"
        });

        $(".popover-dismiss").popover({
          trigger: "focus"
        });

        $(".btn-link").onclick = function (num) {
          $("this").collapse()
      
        }(index)

      
        
        
      })    
      });
    })
  
  carouselEventsRef.get().then(snapshot => {
    snapshot.docs.forEach((doc, index) => {
      let copyObj = JSON.parse(JSON.stringify(doc.data()));
      //copyObj in time order here
      console.log(copyObj)
     
      usersRef.get().then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          if(doc.data().acronym == copyObj.host ){ 
            var fullName = doc.data().name
            copyObj.fullName = fullName
          }
          })
 
      }).then(function(){
      
      var string = template(copyObj);
      carousel.append(string);

      $("#detailsBtn").onclick = function (num) {

        $('[data-toggle="popover"]').popover({
          container: "#carouselDiv"
        });

        $(".popover-dismiss").popover({
          trigger: "focus"
        });
      }(index);
      })
    });
 


  $(".navbar-toggler").on("click", function () {
    $(".animated-icon").toggleClass("open");
  });


  $('.carousel').carousel({
    interval: false
  })

  $('[data-toggle="popover"]').popover({
    container: "#carouselDiv"
  });

  $(".popover-dismiss").popover({
    trigger: "focus"
  });

  $("#toggleBtn").on("click", function (event) {
    console.log('clicked on toggle');
    event.preventDefault();
    $(".main-body").toggleClass("listView");
    if ($(".main-body").hasClass("listView")) {
      $(".main-body").hide()
      $("#listDiv").show()
      $("#toggleBtn").text("See Carousel")
    } else {
      $("#toggleBtn").text("See List View")
      $(".main-body").show()
      $("#listDiv").hide()
      console.log("no list")
    }
  })
})
})
