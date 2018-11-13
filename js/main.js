$(document).ready(function() {

  var source = $("#carousel-template").html();
  console.log(source)
  var template = Handlebars.compile(source);
  console.log(template)
  var carousel = $("#carouselDiv")

  eventsRef.get().then(snapshot => {
    snapshot.docs.forEach((doc, index) => {
      console.log("inside forEach loop");
      console.log(index)
      
      var string = template(doc.data());
      carousel.append(string);
      $("#detailsBtn").onclick = function (num) {
        $('[data-toggle="popover"]').popover({
          container: "#carouselDiv"
        });
      
        $(".popover-dismiss").popover({
          trigger: "focus"
        });
        $(this).attr("data-content", doc.data().description)
        console.log($(this).attr("data-content"))
        }(index);
        
    });
  });

  $(".navbar-toggler").on("click", function() {
    $(".animated-icon").toggleClass("open");
  });
 
 
$('.carousel').carousel({
  interval:false
})

  $('[data-toggle="popover"]').popover({
    container: "#carouselDiv"
  });

  $(".popover-dismiss").popover({
    trigger: "focus"
  });

  $("#toggleBtn").on("click", function(event) {
    console.log('clicked on toggle');
    event.preventDefault();
    $(".main-body").toggleClass("listView");
  if($(".main-body").hasClass("listView")){
    $(".main-body").addClass("invisible")
      var listString = `
      <div class="jumbotron">
  <h1>It will display a list view</h1>
  </div>
  `;
      $("#listDiv").html(listString);
      $("#toggleBtn").text("See Carousel")
  } else {
    $(".main-body").removeClass("invisible")
    $("#toggleBtn").text("See List View")
    $("#listDiv").empty()
   
    console.log("no list")
  }
  });


 
})
  
 

    

  

   
  

