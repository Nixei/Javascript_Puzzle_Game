$(function () {

    //Giving the pieces random coordinates in the pieces box
    for (var i = 0; i < 9; i++) {
      $("#pieces").append(`<div class = 'smallPiece' id = 'sPiece${i}' ></div>`)
      var rndX = Math.floor(Math.random() * 200)
      var rndY = Math.floor(Math.random() * 200)
      $(`#sPiece${i}`).css({ top: `${rndY}px`, left: `${rndX}px` })
    }
    
    //When user clicks on 1 piece that piece is surrounded by a yellow border
    $(".smallPiece").click(function () {
      $(".smallPiece").css("border", "3px solid rgba(207, 207, 207)")
      $(this).css("border", "3px solid yellow")
    })
  
    //Splitting the original picture to 100x100 px small pieces by using different positions of the big picture
    var num = 0
    for (var i = 0; i >= -200; i -= 100) {
      for (var j = 0; j >= -200; j -= 100) {
        $(`#sPiece${num}`).css({ "background-position": `${j}px ${i}px` })
        num++
      }
    }

    //Hover effect on the hints button
    $('#hints').mouseenter(function(){$('#hints').css({"background-color": "#D0BDF0", "color": "black","box-shadow" : "1px 1px 10px rgba(54, 52, 52, 0.74)"})})
    $('#hints').mouseleave(function(){$('#hints').css({"background-color" : "#771dde", "color" : "white", "box-shadow" : "none"})})
  
    //The algorithim for hint buttons action
    var flag = false
    $("#hints").click(function (e) {
      if (!flag) {
        for (num = 0; num < 9; num++) {
          $(`#sPiece${num}`).append(`<h3>${num + 1}</h3>`)
          $(`#p${num}`).append(`<h3>${num + 1}</h3>`)
        }
        flag = true
      } else {
        for (num = 0; num < 9; num++) $(`h3`).remove()
        flag = false
      }
    })
  
    var assignments = {}
    var selected = null
  
    //selecting a piece from pieces box
    $(".smallPiece").click(function () {
      selected = $(this)
      selected.appendTo(`#pieces`)//Moves the selected piece on top so it is easier to see hints
    })
    $(".puzzlePlce").click(function () {
      console.log(assignments)
      clickedPlace = $(this)
      var existingPieceId = assignments[clickedPlace.attr("id")]
  
      //console.log("target", clickedPlace.attr("id"))
      if (selected) {
        if (existingPieceId) {
          $(`#${existingPieceId}`).show()
          assignments[$(this).attr("id")] = selected.attr("id")
        } else {
          assignments[$(this).attr("id")] = selected.attr("id")
        }
  
        $(this).css({"background": "url(./img/img.jpeg)","background-position": `${selected.css("background-position")}`,"border": "none"})
        selected.hide()
        selected = null

        for (var i = 0; i < 9; i++) {
          //console.log($(`#sPiece${i}`).css('background-position'));
          if ($(`#sPiece${i}`).css("background-position") !== $(`#p${i}`).css("background-position")){
            return;
          }
        }
        //console.log('YOU WON!');
        $("#youWonContainer").append('<div class= "youWon"> <h1> CONGRATULATIONS!</h1></div>')
        //If the user has won the game remove the hints, disable the availablity to click hints button and the pieces.
        $(".puzzlePlce").off("click").css({ "border": "none", "box-shadow": "none" })
        $('#hints').off("click");
        for (num = 0; num < 9; num++) {
            $(`h3`).remove()
        }

      } else {
        //console.log("You haven't picked a piece to put here!")
        if (existingPieceId) {
          clickedPlace.css({"background": "none","border": "1px solid rgba(207, 207, 207, 0.521)"})
          $(`#${existingPieceId}`).show()
          assignments[existingPieceId] = null
        }
      }
    })
  
  })
  