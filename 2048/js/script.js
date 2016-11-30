/**
 * Created by Administrator on 2016/11/26 0026.
 */
var Grids, // 对应每一格的二维数组
    scoreBorad, // 获取 p 元素下面的 span
    score = 0, // 当前分数
    roundFlag = false; // 是否可以产生新的数字

window.onload = function(){
    scoreBoard = document.getElementById("scoreBoard").getElementsByTagName("span")[0];
    initGrids();
    randomNewNum(); randomNewNum(); randomNewNum();
    loadAction();
    F5();
    changeColor();
};

 function initGrids() {
     //每一项的第一位代表该元素的值，第二位代表该元素当前位置可用否
     Grids = [
         [[0, true], [0, true], [0, true], [0, true]],
         [[0, true], [0, true], [0, true], [0, true]],
         [[0, true], [0, true], [0, true], [0, true]],
         [[0, true], [0, true], [0, true], [0, true]]
     ];
 }

 //遍历Grids中的每一个元素
 //y代表行，x代表列
function Map(Func){
  Grids.map(function(row, y){
    row.map(function(grid, x){
      Func(grid, x, y);
    });
  });
}

function F5(){
  Map(function(grid, x, y){
    grid[1] = true; //将所有位置重设为可用状态
    var mapID = y.toString()+x.toString();
    if(grid[0] !== 0){
      document.getElementById(mapID).className = 'v' + grid[0];
    }else {
      document.getElementById(mapID).className = '';
    }
  });
  scoreBoard.innerHTML = score;
  roundFlag = false;
}

function randomNewNum(){
  var emptyGrids = []; //存储当前空位
  Map(function(grid, x, y){
    if(grid[0] === 0){
      emptyGrids.push([x,y]);
    }
  });
  //还有空位的时候继续生成随机位置
  if(emptyGrids.length > 0){
    var randomNum = parseInt(Math.random() * emptyGrids.length),
        x = emptyGrids[randomNum][0],
        y = emptyGrids[randomNum][1];
    Grids[y][x][0] = Math.random() > 0.05 ? 2 : 4; //生成随机位置的数字
  }
  //这里没有空位全部填满（即游戏失败）之后的提示，只能重新开始
}

function loadAction(){
  document.body.onkeyup = function(e){
    var eve = e || window.event;
    switch (eve.keyCode) {
      case 37:
        Move.left();
        break;
      case 38:
        Move.up();
        break;
      case 39:
        Move.right();
        break;
      case 40:
        Move.down();
        break;
      default:
    }
    if(roundFlag){
      randomNewNum();
    }
    F5();
  };
}

var Move = {
  left : function(){  // 遍历所有格子，将有值的格子都向下移动
     for(var y=0; y<4; y++){
       for(x=0; x<4; x++){
         move_this('left', x, y);
       }
     }
  },
  right : function(){
    for(y=0; y<4; y++){
      for(x=3; x>=0; x--){
        move_this('right', x, y);
      }
    }
  },
  up : function(){
    for(y=0; y<4; y++){
      for(x=0; x<4; x++){
        move_this('up', x, y);
      }
    }
  },
  down : function(){
    for(y=3; y>=0; y--){
      for(x=0; x<4; x++){
        move_this('down', x, y);
      }
    }
  }
};

//判断要移动的位置能不能去
function can_go(direction, grid){
  var x=grid.x, y=grid.y,
      flag=false;
  switch(direction){
    case 'left':
      if(Grids[y][x-1] && Grids[y][x-1][0]===0){
        flag = true;
      }
      break;
    case 'right':
      if(Grids[y][x+1] && Grids[y][x+1][0]===0){
        flag = true;
      }
      break;
   case 'up':
     if(Grids[y-1] && Grids[y-1][x][0]===0){
       flag = true;
     }
     break;
   case 'down':
    if(Grids[y+1] && Grids[y+1][x][0]===0){
      flag = true;
    }
    break;
   default:
  }
  return flag;
}

//可以移动的话，将当前位置的值赋值给要去的位置
function lets_go(direction, grid){
  var x=grid.x, y=grid.y, v=grid.v;
  switch (direction) {
    case 'left':
      Grids[y][x-1][0] = v;
      grid.x--;
      break;
    case 'right':
      Grids[y][x+1][0] = v;
      grid.x++;
      break;
    case 'up':
      Grids[y-1][x][0] = v;
      grid.y--;
      break;
    case 'down':
      Grids[y+1][x][0] = v;
      grid.y++;
      break;
    default:
  }
  Grids[y][x][0] = 0;
  roundFlag = true;
}

//判断能不能相加
function can_add(direction, grid){
  var x = grid.x, y = grid.y, v = grid.v,
      flag = false;
  switch (direction) {
    case 'left':
      if(Grids[y][x-1]){
        if(Grids[y][x-1][0] === v && Grids[y][x-1][1]){
          flag = true;
        }
      }
      break;
    case 'right':
      if(Grids[y][x+1]){
        if(Grids[y][x+1][0] === v && Grids[y][x+1][1]){
          flag = true;
        }
      }
      break;
      case 'up':
        if(Grids[y-1]){
          if(Grids[y-1][x][0] === v && Grids[y-1][x][1]){
            flag = true;
          }
        }
        break;
      case 'down':
        if(Grids[y+1]){
          if(Grids[y+1][x][0] === v && Grids[y+1][x][1]){
            flag = true;
          }
        }
        break;
    default:
  }
  return flag;
}

// 能相加的话，直接将目标元素值*2
// 并将Grids[*][*][1]值设为false，保证每次移动只能相加一次
function lets_add(direction, grid){
  var x = grid.x, y = grid.y, v = grid.v
  switch (direction) {
    case 'left':
      Grids[y][x-1][0] = v * 2;
      Grids[y][x-1][1] = false;
      break;
    case 'right':
      Grids[y][x+1][0] = v * 2;
      Grids[y][x+1][1] = false;
      break;
    case 'up':
      Grids[y-1][x][0] = v * 2;
      Grids[y-1][x][1] = false;
      break;
    case 'down':
      Grids[y+1][x][0] = v * 2;
      Grids[y+1][x][1] = false;
      break;
    default:
  }
  score += v*2;
  Grids[y][x][0] = 0;
  roundFlag = true;
}

function move_this(direction, x, y){
  var grid = {
    x : x,
    y : y,
    v : Grids[y][x][0]
  };
  if(grid.v > 0){
    while(can_go(direction, grid)){
      lets_go(direction, grid);
    }

    if(can_add(direction, grid)){
      lets_add(direction, grid);
    }
  }
}

function playAgain(){
  initGrids();
  randomNewNum();  randomNewNum();  randomNewNum();
  score = 0;
  F5();
}

function changeColor() {
  var btn = document.getElementById('restart');
  btn.onmousedown = function(){
    btn.style.backgroundColor = '#333';
    setTimeout(function(){
      btn.style.backgroundColor = '#9DCD14';
    }, 300);
  };
  btn.onmouseup = function(){
    this.style.backgroundColor = '#9DCD14';
    playAgain();
  };
}
