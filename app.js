$(document).ready(function () {
  console.log("script loaded");
  quizData = [];

  //Function for rendering quiz
  function renderQuiz(data) {
    for (i = 0; i < data.length; i++) {
      var section = $("<div>");
      var question = $("<p>").html("Q" + Number(i + 1) + "." + data[i].question);
      var line = $("<div>").addClass("line");
      section.append(question);
      for (j = 0; j < data[i].options.length; j++) {
        var optionWrapper = $("<label>").attr("class", "option-wrapper");
        var option = $("<input>")
          .attr("type", "radio")
          .attr("name", "q" + data[i].id)
          .attr("value", j + 1)
          .attr("required", "true")
          .attr("id", "q" + data[i].id + "-" + Number(j + 1));
        var optionName = $("<span>").html(data[i].options[j]);
        optionWrapper.append(option, optionName);
        section.append(optionWrapper);
        $("#quiz-wrapper").append(section);
      }
      section.append(line);
    }
  }

  //Sending Req
  $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/quiz", function (response) {
    quizData = response;
    renderQuiz(response);
    var btnWrapper = $("<div>").attr("id", "btn-wrapper");
    var submit = $("<input>").attr("type", "submit").attr("id", "submit");
    btnWrapper.append(submit);
    $("#quiz-wrapper").append(btnWrapper);

    //Submit Btn click
    $("#quiz-wrapper").submit(function (o) {
      o.preventDefault();

      var result = {};
      var radioButtons = $(".option-wrapper input");
      for (i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
          result[radioButtons[i].name] = radioButtons[i].value;
        }
      }
      var score = 0;
      for (i = 0; i < quizData.length; i++) {
        var tick = $("<i>").addClass("fas fa-check").attr("id", "tick");
        var cross = $("<i>").addClass("fas fa-times").attr("id", "cross");
        var key = "q" + quizData[i].id;
        var selector = "#" + (key + "-" + result[key]) + "+ span";
        if (result[key] == quizData[i].answer) {
          score++;
          console.log($(selector).parent());
          $(selector).parent().append(tick);
        } else {
          var correctOptionSelector = "#" + (key + "-" + quizData[i].answer) + "+ span";
          $(correctOptionSelector).parent().append(tick);
          $(selector).parent().append(cross);
        }
        console.log(tick);
      }
      $("#final-score").html(score);
    });
  });
});
