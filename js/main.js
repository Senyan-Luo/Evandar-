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
  $(".navbar-toggler").on("click", function() {
    $(".animated-icon").toggleClass("open");
  });
  $(".carousel").carousel();
  loadHomepage(Events);

  $('[data-toggle="popover"]').popover({
    container: '#carouselDiv'
  })
  $('.popover-dismiss').popover({
    trigger: 'focus'
  })

  $("li a").on("click", function(event) {
    event.preventDefault();
    console.log("clicked on an anchor tag");
    if ($(this).attr("id") == "landing-page") {
     $("#formDiv").empty();
     $("#faq").empty();
     $(this).attr("href","./index.html")
      console.log("load landing-page");
      loadHomepage(Events);
    } else if ($(this).attr("id") == "create-page") {
      console.log("load create-page");
      $("#main-body").empty();
      $("#faq").empty();
      createForm();
    } else {
      console.log("load faq-page");
      $("#main-body").empty();
      $("#formDiv").empty();
      loadfaq();
    }
  });
});

function loadHomepage(data) {
  console.log("inside loadHomepage");
  console.log(data);
  var buttonDiv = document.createElement("div");
  var containerDiv = document.getElementById("toggleBtn");
  var toggleButton = `
    <Button type="button" id="toggleBtn" class="btn btn-success">List View</Button>
    `;
  buttonDiv.innerHTML = toggleButton;
  $(containerDiv).prepend(buttonDiv);
  $(toggleBtn).on("click", function() {});

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
      `

      $("#main-body").html(carouselString);

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
                 
<button tabindex="0" type="button" class="btn btn-secondary" style="margin-left:46%;" data-container="body" data-trigger="focus" data-toggle="popover" data-placement="bottom" data-content="${item.description}      ${item.interest} Likes">
  Learn More
</button>
`;
     $(newEvent).html(domString)
     console.log(newEvent)
         $("#carouselDiv").append(newEvent);
  });
}

function createForm() {
    let elem = $("#formDiv");
    let formString = `
    <div class="jumbotron jumbotron-fluid">
    <form>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4"></label>
      <input type="email" class="form-control" id="inputEmail4" placeholder="">
    </div>
    <div class="form-group col-md-6">
      <label for="inputPassword4"></label>
      <input type="password" class="form-control" id="inputPassword4" placeholder="">
    </div>
  </div>
  <div class="form-group">
    <label for="inputAddress"></label>
    <input type="text" class="form-control" id="inputAddress" placeholder="">
  </div>
  <div class="form-group">
    <label for="inputAddress2"></label>
    <input type="text" class="form-control" id="inputAddress2" placeholder="">
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputCity"></label>
      <input type="text" class="form-control" id="inputCity">
    </div>
    <div class="form-group col-md-4">
      <label for="inputState"></label>
      <select id="inputState" class="form-control">
        <option selected>Choose...</option>
        <option>...</option>
      </select>
    </div>
    <div class="form-group col-md-2">
      <label for="inputZip"></label>
      <input type="text" class="form-control" id="inputZip">
    </div>
  </div>
  <div class="form-group">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="gridCheck">
      <label class="form-check-label" for="gridCheck">
      
      </label>
    </div>
  </div>
  <button type="button" class="btn btn-primary">Preview</button>
</form>
<div class="jumbotron jumbotron-fluid">
    `
    $(elem).html(formString)
}

function loadfaq () {
    let domString = `
    <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h2">FAQ Page</h2>
    <p class="lead">Find answers to the most commonly asked questions on our site.</p>
  </div>
</div>
    `
    $("#faq").html(domString);
}
 