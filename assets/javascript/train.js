// adding the firebase database
var config = {
    apiKey: "AIzaSyBZBVQ9O7sDnjt__wruHbpcDPpfvVjTxCk",
    authDomain: "train-scheduler-bbc2f.firebaseapp.com",
    databaseURL: "https://train-scheduler-bbc2f.firebaseio.com",
    projectId: "train-scheduler-bbc2f",
    storageBucket: "train-scheduler-bbc2f.appspot.com",
    messagingSenderId: "810546569581"
};
firebase.initializeApp(config);



// Create a variable to reference the database.
var database = firebase.database();



//need to create a function that will get the information that the user will input 


$("#submit-trainInfo-btn").on("click", function(event) {
    event.preventDefault();

    var train = $("#train-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var time = $("#time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    database.ref().push({
        train: train,
        destination: destination,
        time: time,
        frequency: frequency,

    });
});

database.ref().on("child_added", function(childSnapshot) {
    //var nextArr;
    var minAway;
    // Chang year so first train comes before now
    var firstTrainNew = moment(childSnapshot.val().firstTrain, "hh:mm")

    // Difference between the current and firstTrain
    var diffTime = moment().diff(moment(firstTrainNew), "minutes");
    var remainder = diffTime % childSnapshot.val().frequency;
    // Minutes until next train
    var minAway = childSnapshot.val().frequency - remainder;
    // Next train time
    var nextTrain = moment().add(minAway, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm");

    $("#add-row").append("<tr><td>" + childSnapshot.val().train +
        "</td><td>" + childSnapshot.val().destination +
        "</td><td>" + childSnapshot.val().frequency +
        "</td><td>" + time +
        "</td><td>" + minAway + "</td></tr>");

    // Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
    // Change the HTML to reflect
    $("#train-display").html(snapshot.val().train);
    $("#destination-display").html(snapshot.val().destination);
    $("#time-display").html(snapshot.val().time);
    $("#frequency-display").html(snapshot.val().frequency);
});
/*
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
        " </span></div>");*/