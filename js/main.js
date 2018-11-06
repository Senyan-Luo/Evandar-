const Events = [
  {
    title: "Python Workshop",
    host: "UBIC",
    date: "Nov. 15th, 2018",
    time: "5:30pm to 6:30pm",
    location: "CSE007",
    tagline: "Come to learn Python with us!",
    description:
      "Hey y'all, this Friday we will have another python workshop, come to learn and hang out with us! Free Pizza and drinks will be provided.",
    interest: "7"
  },
  {
    title: "Machine Learning workshop",
    host: "DS3",
    date: "Nov. 20th, 2018",
    time: "4:00pm to 5:00pm",
    location: "SSC1307",
    tagline: "The coolest intro crash course to machine learning.",
    description:
      "Hey guys! Welcome back to our biweekly data science workshop! This Thursday come hand out with Data Science Student Society and learn about machine learning!",
    interest: "16"
  }
];

$(document).ready(function() {
  loadHomepage(Events);
  $(".navbar-toggler").on("click", function() {
    $(".animated-icon").toggleClass("open");
  });
  $(".carousel").carousel();

  $('[data-toggle="popover"]').popover({
    container: "#carouselDiv"
  });
  $(".popover-dismiss").popover({
    trigger: "focus"
  });

  

  function loadHomepage(data) {
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

    data.forEach(item => {
      let newEvent = document.createElement("div");
      $(newEvent).addClass("carousel-item");
      var domString = `
                  <img class="d-block w-100" src="http://via.placeholder.com/800x300" alt="First slide">
                  <div class="carousel-caption">
                        <h3>${item.title}</h3>
                        <p>Hosted by <a href="#">${item.host}</a></p>
                        <h5>${item.date}</h5>
                        <h5>${item.time}</h5>
                        <h5>${item.location}</h5>
                        <p>"${item.tagline}"</p>
                      </div>
                 
<button tabindex="0" type="button" class="btn btn-secondary" style="margin-left:46%;" data-container="#carouselDiv" data-trigger="focus" data-toggle="popover" data-placement="top" data-content="${
        item.description
      }      ${item.interest} Likes">
  Learn More
</button>
`;
      $(newEvent).html(domString);
      console.log(newEvent);
      $("#carouselDiv").append(newEvent);
    });
  }
});
