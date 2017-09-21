function createQuestion() {

    var questionArray = {
        question: [],
        correct_answer: []
    }
    var trivia = "https://opentdb.com/api.php?amount=10&category=22&difficulty=medium&type=boolean";
    $.get(trivia, function(data) {
        console.log(data.results);
        data.results.forEach(function(element) {
            questionArray.question.push(element.question);
            questionArray.correct_answer.push(element.correct_answer);
        });
        console.log(questionArray);
        $.post("/api/questions", questionArray);
    });
}


// qrURL as a parameter?
//this function is called on london.html page load and this function
//calls the api to get the question Object and display question in html
function getQuestion() {
    $.get("/api/London/questions", function(questObj) {
        console.log(questObj);
        $("#question").empty();
        $("#question").html(questObj.question);
    })

}
$(document).ready(function() {
    var compareForm = $("#compareForm");
    $(compareForm).on("submit", compareAnswer);
});

function compareAnswer(userGuess) {
    userGuess.preventDefault();
    //this will confirm what the user guess was from the html form 
    if ($("#true").prop("checked")) {
        userGuess = "True";
    } else {
        userGuess = "False";
    }
    $.get("/api/London/questions", function(questObj) {
        console.log(questObj);
        $(".questionBlock").empty();
        if (userGuess === questObj.correct_answer) {
            $(".questionBlock").append($("<h2>").html("CORRECT"));
        } else {
            $(".questionBlock").append($("<h2>").html("WRONG"));
        }

    })
    console.log(userGuess);
}