$(document).ready(function() {

  $(".navbar-toggler").on("click", function() {
    $(".animated-icon").toggleClass("open");
  });
 
  $('.carousel').each(function(){
    $(this).carousel({
        interval: 10000,
        pauseAutoPlayOnHover: true
    });
});

  $('[data-toggle="popover"]').popover({
    container: ".body"
  });

  $(".popover-dismiss").popover({
    trigger: "focus"
  });
  

  var source = $("#carousel-template").html();
  console.log(source)
  var template = Handlebars.compile(source);
  var carousel = $("#carouselDiv")

  eventsRef.get().then(snapshot => {
    snapshot.docs.forEach(doc => {
      console.log("inside forEach loop");
      console.log(doc.data().description);
      var string = template(doc.data());
      carousel.append(string);
     
    });
  });
  
 
   
    $("#toggleBtn").on("click", function(event) {
      event.preventDefault();
      $(".main-body").toggleClass("listView");
      if ($(".main-body").hasClass("listView")) {
        listString = `
        <div class="jumbotron">
    <h1>It will display a list view</h1>
    </div>
    `;
        $(".listView").html(listString);
      } else {
        $(".listView").empty();
      }
    });


   
  
});
