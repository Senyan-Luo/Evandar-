$(document).ready(function () {


    var source = $("#all-posts-template").html();
    var template = Handlebars.compile(source);
    var tartgetDiv = $("#past-posts")

    $("#loadPostsBtn").on("click", function (event) {
        event.preventDefault()
        getUser()
        $("#loadPostsBtn").addClass("invisible")
    })

    function getUser() {
        var userEmail = firebase.auth().currentUser.email;
        console.log(userEmail)
        if (userEmail) {
            var query = usersRef.where("email", "==", userEmail)
            query.get().then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {

                    console.log(doc.data())
                    console.log(doc.data().acronym)
                    if (doc.data().acronym) {
                        var host = doc.data().acronym
                    } else {
                        var host = doc.data().name
                    }
                    $("#titleDiv").text(`All Events from ${doc.data().name}`)
                    getAllPosts(host)
                })

            });
        } else {
            console.log("no user is found! Try log in again")
        }
    }

    function getAllPosts(host) {

        listEventsRef.where("host", "==", host).get().then((querySnapshot) => querySnapshot.docs.forEach((doc, index) => {
            console.log(doc.id)
            let copyObj = JSON.parse(JSON.stringify(doc.data()));
            /* console.log(copyObj) */
            copyObj.uid = doc.id
            copyObj.id = "number" + index
            copyObj.formId = "form" + copyObj.uid
            copyObj.deleteId = "del" + copyObj.uid
            copyObj.date = moment(doc.data().date).format("YYYY-MM-DD")
            copyObj.startTime = moment(doc.data().startTime, "HH:mm A").format("HH:mm")
            copyObj.endTime = moment(doc.data().endTime, "HH:mm A").format("HH:mm")

            console.log(copyObj)

            var allPostsString = template(copyObj)
            tartgetDiv.append(allPostsString)


            $(".btn-link").onclick = function (num) {
                console.log("clicked on a link")
                $("this").collapse()
                $(".edit").attr("contenteditable", true)
                $(".card-footer").removeClass("invisible")
                $(".edit-message").removeClass("invisible")
            }(index)

            $(".delete-event").on("click", function (event) {
                event.preventDefault();
                console.log("hi")
                var uid = $(this).attr('id')
                var docId = uid.substring(3)

                $('#deleteConfirmed').on("click", function () {
                    console.log(docId)
                    eventsRef.doc(`${docId}`).delete().then(function () {
                        console.log("Document successfully deleted!");
                        location.reload()
                    }).catch(function (error) {
                        console.error("Error removing document: ", error);
                    });
                })


            })

            $(".updateBtn").on("click", function (event) {
                event.preventDefault();

                //save updated data from an associated form into an object
                var uid = $(this).attr('id')
                var form = `#form${uid}`
                console.log(form)
                let dateToConvert = moment($(`${form} .date`).val()).format('MM/DD/YYYY')
                let updatedData = {
                    title: $(`${form} .name`).val().trim(),
                    date: moment($(`${form} .date`).val().trim()).format('LL'),
                    startTime: moment($(`${form} .start-time`).val().trim(), "HH:mm").format("hh:mm A"),
                    endTime: moment($(`${form} .end-time`).val().trim(), "HH:mm").format("hh:mm A"),
                    unixTime: moment(`${dateToConvert} ${$(`${form} .startTime`).val()}`, "MM/DD/YYYY hh:mm").unix(),
                    location: $(`${form} .location`).val().trim(),
                    tagline: $(`${form} .tagline`).val().trim(),
                    description: $(`${form} .details`).val().trim()
                }
                console.log(updatedData)
                console.log("updateBtn clicked")
                var forms = document.getElementsByClassName('needs-validation');
                // Loop over them and prevent submission
                var validation = Array.prototype.filter.call(forms, function (form) {
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    } else {
                        updateDB(uid, updatedData)
                    }
                    form.classList.add('was-validated');
                });
                console.log("clicked submit button")

                function updateDB(doc, updates) {
                    let uid = doc
                    const updatedData = updates
                    console.log(uid)
                    const docRef = eventsRef.doc(`${uid}`)

                    docRef.update({
                            title: updatedData.title,
                            date: updatedData.date,
                            startTime: updatedData.startTime,
                            endTime: updatedData.endTime,
                            unixTime: updatedData.unixTime,
                            location: updatedData.location,
                            tagline: updatedData.tagline,
                            description: updatedData.description
                        })
                        .then(function () {
                            console.log("Document successfully updated!");
                            window.location.reload()


                        })
                        .catch(function (error) {
                            // The document probably doesn't exist.
                            console.error("Error updating document: ", error);
                        });
                }


            })
        }))
    }
})