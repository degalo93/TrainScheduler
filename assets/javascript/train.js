var config = {
    apiKey: "AIzaSyD6cBDOP7vcEmv4ghqvhfs6kZXM4RdrV0c",
    authDomain: "swee-a280d.firebaseapp.com",
    databaseURL: "https://swee-a280d.firebaseio.com",
    projectId: "swee-a280d",
    storageBucket: "swee-a280d.appspot.com",
    messagingSenderId: "93151460604"
};
firebase.initializeApp(config);



// Create a variable to reference the database.
var database = firebase.database();
var employeeName = "";
var role = "";
var startDate = 0;
var monthlyRate = 0;

$("#add-employee-btn").on("click", function(event) {
    event.preventDefault();


    employeeName = $("#employee-name-input").val().trim();
    role = $("#role-input").val().trim();
    startDate = $("#start-input").val().trim();
    monthlyRate = $("#rate-input").val().trim();

    // Code for handling the push
    database.ref().push({
        employeeName: employeeName,
        role: role,
        snapshot: startDate,
        monthlyRate: monthlyRate,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});


dataRef.ref().on("child_added", function(childSnapshot) {
    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().employeeName);
    console.log(childSnapshot.val().role);
    console.log(childSnapshot.val().startDate);
    console.log(childSnapshot.val().monthlyRate);

    // full list of items to the well
    $("#full-member-list").append("<div class='well'><span class='member-name'> " +
        childSnapshot.val().employeeName +
        " </span><span class='member-role'> " + childSnapshot.val().role +
        " </span><span class='member-startDate'> " + childSnapshot.val().startDate +
        " </span><span class='member-monthlyRate'> " + childSnapshot.val().monthlyRate +
        " </span></div>");

}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
    // Change the HTML to reflect
    $("#employee-name-input").text(snapshot.val().employeeName);
    $("#role-input").text(snapshot.val().role);
    $("#start-input").text(snapshot.val().startDate);
    $("#rate-input").text(snapshot.val().monthlyRate);
});