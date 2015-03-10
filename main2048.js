/**
 * Created by Administrator on 3/1/2015.
 */

var board = new Array();
var score = 0;
var hasConflicted = new Array();

$(document).ready(function(){
    newgame();
});

/*新建一个游戏*/
function newgame(){
    //初始化棋盘格
    init();

    //在随机两个格子生成数字
    generateOneNumber();
    generateOneNumber();
}

/*初始化当前游戏*/
function init(){
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css("top", getPosTop(i, j));
            gridCell.css("left", getPosLeft(i, j));
        }
    }

    for(var i = 0; i < 4; i++){
        board[i] = new Array();
        hasConflicted[i] = new Array();

        for(var j = 0; j < 4; j++){
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }

    updateBoardView();

    score = 0;
    $("#score").text(score);
}

/*随机生成一个数字，2或者4*/
function generateOneNumber(){
    if(nospace(board)){
        return false;
    }

    //随机一个位置
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));

    var times = 0;

    while(times < 50){
        if(board[randx][randy] == 0){
            break;
        }

        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));

        times++;
    }

    if(times == 50){
        for(var i = 0; i < 4; i++){
            for(var j = 0; j < 4; j++){
                if(board[i][j] == 0){
                    randx = i;
                    randy = j;
                }
            }
        }
    }


    //随机一个数字
    var randNumber = Math.random() < 0.8 ? 2 : 4;

    //在随机位置显示随机数字
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx, randy, randNumber);

    return true;
}

/*更新面板显示*/
function updateBoardView(){
    $(".number-cell").remove();
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            $("#grid-container").append('<div class="number-cell" id="number-cell-' + i+ '-' + j + '"></div>');
            var theNumberCell = $("#number-cell-"+ i + "-" + j);

            if(board[i][j] == 0){
                theNumberCell.css("width", "0px");
                theNumberCell.css("height", "0px");
                theNumberCell.css("top", getPosTop(i, j) + 50);
                theNumberCell.css("left", getPosLeft(i, j) + 50);
                theNumberCell.css("font-size", "20px")
            } else {
                theNumberCell.css("width", "100px");
                theNumberCell.css("height", "100px");
                theNumberCell.css("top", getPosTop(i, j));
                theNumberCell.css("left", getPosLeft(i, j));
                theNumberCell.css("background-color", getNumberBackgroundColor(board[i][j]));
                theNumberCell.css("color", getNumberColor(board[i][j]));
                theNumberCell.css("font-size", "20px");
                theNumberCell.text(getNumberText(board[i][j]));
            }

            hasConflicted[i][j] = false;
        }
    }
}

/*监听键盘按下的事件*/
$(document).keydown(function (event) {
    var canMove = false;
    switch (event.keyCode){
        case 37 :  //left
            if(moveLeft()){
                canMove = true;
            }
            break;
        case 38 :  //up
            if(moveUp()){
                canMove = true;
            }
            break;
        case 39 :  //right
            if(moveRight()){
                canMove = true;
            }
            break;
        case 40 :  //down
            if(moveDown()){
                canMove = true;
            }
            break;
        default :
            break;
    }

    if(canMove){
        setTimeout("generateOneNumber()", 210);
        setTimeout("isgameover()", 300);
    }
});

/*游戏是否结束*/
function isgameover(){
    if(nospace(board) && nomove(board)){
        gameover();
    }
}

/*游戏结束*/
function gameover(){
    alert("Game Over!");
}

/*向左移动*/
function moveLeft(){
    if(!canMoveLeft(board)){
        return false;
    }
    //moveLeft
    for(var i = 0; i < 4; i++){
        for(var j = 1; j < 4; j++){
            if(board[i][j] != 0){
                for(var k = 0; k < j; k++){
                    if(board[i][k] == 0 && noBlockHorizontal(i, k, j, board)){
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if(board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]){
                        //move
                        showMoveAnimation(i, j, i, k);

                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        //add score
                        score += board[i][k];

                        updateScore(score);

                        hasConflicted[i][k] = true;

                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
    return true;
}

/*向右移动*/
function moveRight(){
    if(!canMoveRight(board)){
        return false;
    }
    //moveRight
    for(var i = 0; i < 4; i++){
        for(var j = 2; j >= 0; j--){
            if(board[i][j] != 0){
                for(var k = 3; k > j; k--){
                    if(board[i][k] == 0 && noBlockHorizontal(i, k, j, board)){
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if(board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]){
                        //move
                        showMoveAnimation(i, j, i, k);

                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        //add score
                        score += board[i][k];

                        updateScore(score);

                        hasConflicted[i][k] = true;

                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
    return true;
}

/*向上移动*/
function moveUp(){
    if(!canMoveUp(board)){
        return false;
    }
    //moveUp
    for(var j = 0; j < 4; j++){
        for(var i = 1; i < 4; i++){
            if(board[i][j] != 0){
                for(var k = 0; k < i; k++){
                    if(board[k][j] == 0 && noBlockVertical(j, i, k, board)){
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if(board[k][j] == board[i][j] && noBlockVertical(j, i, k, board) && !hasConflicted[k][j]){
                        //move
                        showMoveAnimation(i, j, k, j);

                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        //add score
                        score += board[k][j];

                        updateScore(score);

                        hasConflicted[k][j] = true;

                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
    return true;
}

/*向下移动*/
function moveDown(){
    if(!canMoveDown(board)){
        return false;
    }
    //moveDown
    for(var j = 0; j < 4; j++){
        for(var i = 2; i >= 0; i--){
            if(board[i][j] != 0){
                for(var k = 3; k > i; k--){
                    if(board[k][j] == 0 && noBlockVertical(j, i, k, board)){
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if(board[k][j] == board[i][j] && noBlockVertical(j, i, k, board) && !hasConflicted[k][j]){
                        //move
                        showMoveAnimation(i, j, k, j);

                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        //add score
                        score += board[k][j];

                        updateScore(score);

                        hasConflicted[k][j] = true;

                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
    return true;
}