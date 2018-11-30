$(document).ready(function () {
  //for A7, #listDiv is unhidden, carousel is hidden

  /* $("#main-body").hide()
  $("#eventsCarousel").hide() */
  $("#listDiv").hide()


  var source = $("#carousel-template").html();

  var template = Handlebars.compile(source);

  var carousel = $("#carouselDiv")

  var listSource = $("#listView-template").html();
  console.log(listSource)
  var listTemplate = Handlebars.compile(listSource)
  var accordion = $("#accordion")



  listEventsRef.get().then(snapshot => {
    snapshot.docs.forEach((doc, index) => {
      doc.data().id = doc.id
      
      console.log(doc.data().host)
      console.log(doc.data())
      let copyObj = JSON.parse(JSON.stringify(doc.data()));
      copyObj.id = "number" + index
      
      

      var query = usersRef.where("acronym", "==", doc.data().host)
      query.get().then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          console.log(doc)
          console.log(doc.data().name)
          var fullName = doc.data().name
          copyObj.fullName = fullName
          
        })
        var listString = listTemplate(copyObj)
        accordion.append(listString)
        $('[data-toggle="popover"]').popover({
          container: ".card"
        });

        $(".popover-dismiss").popover({
          trigger: "focus"
        });
        
        $(".btn-link").onclick = function (num) {
          console.log("clicked on an accordion card")
          $("this").collapse()
        }(index)
        

      });

      console.log(copyObj)

     
    })
  })

  carouselEventsRef.get().then(snapshot => {
    snapshot.docs.forEach((doc, index) => {
      let copyObj = JSON.parse(JSON.stringify(doc.data()));
      
      
      var query = usersRef.where("acronym", "==", doc.data().host)
      query.get().then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          console.log(doc)
          console.log(doc.data().name)
          var fullName = doc.data().name
          copyObj.fullName = fullName
        })
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

      });
      /* doc.data().id = doc.id
      let copyObj = JSON.parse(JSON.stringify(doc.data()));
      copyObj.id = "number" + index
      console.log(copyObj) */

      
      /*   $(".btn-link").onclick = function (num) {
        console.log("clicked on an accordion card")
         $("this").collapse()
      }(index)
 */
    });
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
  });



})