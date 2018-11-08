$(document).ready(function() {
  loadHomepage();

  $(".navbar-toggler").on("click", function() {
    $(".animated-icon").toggleClass("open");
  });
  $(".carousel").carousel({
    interval: false
  });

  $('[data-toggle="popover"]').popover({
    container: "#carouselDiv"
  });

  $(".popover-dismiss").popover({
    trigger: "focus"
  });


  function loadHomepage() {
    console.log("triggered loadHomepage");
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
        $(".main-body").html(carouselString);
      }
    });

    let carouselString = `
  <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner" id="carouselDiv">
            
                <div class="carousel-item active">
                  <img class="d-block w-100" src="http://via.placeholder.com/800x300" alt="First slide">
                  <div class="carousel-caption">
                        <h3>Welcome to Evendar!</h3>
                        <h4>Click Right or Left to start discovering Student Orgs events on campus</h4>
                      </div>
            </div>
            </div>
            
        
        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
      `;
    $(".main-body").html(carouselString);
    eventsRef.get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        console.log("inside forEach loop");
        console.log(doc.data());
        let newEvent = document.createElement("div");
        $(newEvent).addClass("carousel-item");
        var domString = `
                    <img class="d-block w-100" src="http://via.placeholder.com/800x300" alt="First slide">
                    <div class="carousel-caption">
                          <h3>${doc.data().title}</h3>
                          <p>Hosted by <a href="#">${doc.data().host}</a></p>
                          <h5>${doc.data().date}</h5>
                          <h5>${doc.data().startTime}</h5>
                          <h5>${doc.data().endTime}</h5>
                          <h5>${doc.data().location}</h5>
                          <p>"${doc.data().tagline}"</p>
                         </div>
                         <a tabindex="0" role="button" data-trigger="focus" data-placement="top" id="detailBtn" class="btn btn-secondary" style="margin-left:46%;" data-toggle="popover"  data-html="true" data-content="hello!" title="${doc.data().title}">
                        Learn More
                    </a>`;
        $(newEvent).html(domString);
        console.log(newEvent);
        $("#carouselDiv").append(newEvent);
      });
    });
  }
});
