/**
 * Created by Administrator on 3/1/2015.
 */
function getPosTop(i, j){
    return 20 + i*120;
}

function getPosLeft(i, j){
    return 20 + j*120;
}

function getNumberBackgroundColor(number){
    switch (number){
        case 2 : return "#eee4da"; break;
        case 4 : return "#ede0c8"; break;
        case 8 : return "#f2b179"; break;
        case 16 : return "#f59563"; break;
        case 32 : return "#f67c5f"; break;
        case 64 : return "#f65e3b"; break;
        case 128 : return "#edcf72"; break;
        case 256 : return "#edcc61"; break;
        case 512 : return "#9c0"; break;
        case 1024 : return "#33b5e5"; break;
        case 2048 : return "#09c"; break;
        case 4096 : return "#a6c"; break;
        case 8192 : return "#93c"; break;
    }

    return "black"
}

function getNumberColor(number){
    if(number <= 4){
        return "#776e65";
    }
    return "white";
}

function getNumberText(number){
    switch (number){
        case 2 : return "搭讪"; break;
        case 4 : return "暧昧"; break;
        case 8 : return "约会"; break;
        case 16 : return "表白"; break;
        case 32 : return "恋爱"; break;
        case 64 : return "牵手"; break;
        case 128 : return "拥抱"; break;
        case 256 : return "接吻"; break;
        case 512 : return "OOXX"; break;
        case 1024 : return "求婚"; break;
        case 2048 : return "结婚"; break;
        case 4096 : return "相濡以沫"; break;
        case 8192 : return "白首到老"; break;
    }

    return "error";
}

/*判断当前是否还有空间*/
function nospace(board){
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            if(board[i][j] == 0){
                return false;
            }
        }
    }
    return true;
}

function nomove(board){
    return !(canMoveLeft(board) || canMoveUp(board) || canMoveRight(board) || canMoveDown(board));
}

function canMoveLeft(board){
    for(var i = 0; i < 4; i++){
        for(var j = 1; j < 4; j++ ){
            if(board[i][j] != 0){
                if(board[i][j-1] == 0 || board[i][j-1] == board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveUp(board){
    for(var j = 0; j < 4; j++){
        for(var i = 1; i < 4; i++){
            if(board[i][j] != 0){
                if(board[i-1][j] == 0 || board[i-1][j] == board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveRight(board){
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 3; j++){
            if(board[i][j] != 0){
                if(board[i][j+1] == 0 || board[i][j+1] == board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveDown(board){
    for(var j = 0; j < 4; j++){
        for(var i = 0; i < 3; i++ ){
            if(board[i][j] != 0){
                if(board[i+1][j] == 0 || board[i+1][j] == board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

/*水平方向没有障碍*/
function noBlockHorizontal(row , col1 , col2 , board){
    if(col1 > col2){
        var col3 = col1;
        col1 = col2;
        col2 = col3;
    }
    for(var i = col1+1; i < col2; i++){
        if(board[row][i] != 0){
            return false;
        }
    }

    return true;
}

/*垂直方向没有障碍*/
function noBlockVertical(col , row1 , row2 , board){
    if(row1 > row2){
        var row3 = row1;
        row1 = row2;
        row2 = row3;
    }

    for(var i = row1+1; i < row2; i++){
        if(board[i][col] != 0){
            return false;
        }
    }
    return true;
}