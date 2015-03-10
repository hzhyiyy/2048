/**
 * Created by Administrator on 3/1/2015.
 */
function showNumberWithAnimation(i, j, randNumber){
    var numberCell = $("#number-cell-" + i + "-" + j);
    numberCell.css("background-color", getNumberBackgroundColor(randNumber));
    numberCell.css("color", getNumberColor(randNumber));
    numberCell.text(getNumberText(randNumber));

    numberCell.animate({
        width: "100px",
        height: "100px",
        top: getPosTop(i, j),
        left: getPosLeft(i, j)
    }, 100);
}

function showMoveAnimation(fromx, fromy, tox, toy){
    var numCell = $("#number-cell-"+fromx+"-"+fromy);
    numCell.animate({
        top : getPosTop(tox, toy),
        left : getPosLeft(tox, toy)
    },200);
}

function updateScore(score){
    $("#score").text(score);
}