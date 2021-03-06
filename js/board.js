var Board = function(size) {
  this.current_color = Board.BLACK;
  this.size = size;
  this.board = this.create_board(size);
  this.last_move_passed = false;
  this.in_atari = false;
  this.attempted_suicide = false;
};

Board.EMPTY = 0;
Board.BLACK = 1;
Board.WHITE = 2;

// Alerts array for TUTORIAL
var tutorial = document.getElementById('tutorialActivator').className;
var alertArray = [
  "<div class='alert'>Bonjour ! Tu es donc prêt à devenir un vrai stratège ? <a onclick='alertWrite(alertArray[1]);'>Suivant</a></div>", 
  "<div class='alert'>Bien ! Le jeu de Go se joue sur un plateau : le Goban <a onclick='alertWrite(alertArray[2]);'>Suivant</a></div>", 
  "<div class='alert'>Le jeu se joue avec des soldats, qui attaquent, et des villageois, qui défendent. <a onclick='alertWrite(alertArray[3]);stonePlaceB(posArray[0])'>Suivant</a></div>",
  "<div class='alert'>Les soldats jouent en premier. <a onclick='alertWrite(alertArray[4]);stonePlaceW(posArray[2])'>Suivant</a></div>",
  "<div class='alert'>Place ton villageois à côté du soldat. <a onclick='alertWrite(alertArray[5]);stonePlaceW(posArray[1]);stonePlaceW(posArray[3])'>Suivant</a></div>",
  "<div class='alert'>Et maintenant entoure-le ! <a onclick='alertWrite(alertArray[6]);stonePlaceW(posArray[4]);stoneClear(posArray[0])'>Suivant</a></div>",
  "<div class='alert'>Bravo ! Tu viens de capturer le premier soldat adverse ! <a onclick='alertWrite(alertArray[7]);stoneClear(posArray[2]);stoneClear(posArray[1]);stoneClear(posArray[3]);stoneClear(posArray[4]);stonePlaceW(posArray[5])'>Suivant</a></div>",
  "<div class='alert'>Une pierre commence avec 4 'libertés', soit entourée d'aucune pierre. <a onclick='alertWrite(alertArray[8]);stonePlaceB(posArray[6])'>Suivant</a></div>",
  "<div class='alert'>Si une autre pierre la touche, elle n'a plus que 3 libertés. <a onclick='alertWrite(alertArray[9]);stonePlaceW(posArray[6])'>Suivant</a></div>",
  "<div class='alert'>Dans le cas où deux pierres du même camp sont côte à côte, cela crée une 'chaîne', les libertées sont partagées <a onclick='alertWrite(alertArray[10]);stoneClear(posArray[5]);stoneClear(posArray[6])'>Suivant</a></div>",
  "<div class='alert'>Une autre règle importante : le Ko. <a onclick='alertWrite(alertArray[11]);stonePlaceB(posArray[6]);stonePlaceB(posArray[7]);stonePlaceW(posArray[8]);stonePlaceB(posArray[9]);stonePlaceB(posArray[10]);stonePlaceW(posArray[11]);stonePlaceW(posArray[12]);'>Suivant</a></div>",
  "<div class='alert'>Dans ce cas précis, les villageois vont capturer la pierre du milieu. <a onclick='alertWrite(alertArray[12]);stonePlaceW(posArray[5]);stoneClear(posArray[7]);'>Suivant</a></div>",
  "<div class='alert'>Mais les soldats vont pouvoir reprendre la pierre adverse de la même façon, et on se retrouve dans une boucle. <a onclick='alertWrite(alertArray[13]);stonePlaceB(posArray[7]);stoneClear(posArray[5]);'>Suivant</a></div>",
  "<div class='alert'>Pour empêcher cela, on admet que ce coup ne peut pas être joué plus d'une fois d'affilée. <a onclick='alertWrite(alertArray[14]);stoneClear(posArray[6]);stoneClear(posArray[7]);stoneClear(posArray[8]);stoneClear(posArray[9]);stoneClear(posArray[10]);stoneClear(posArray[11]);stoneClear(posArray[12]);'>Suivant</a></div>",
  "<div class='alert'>Souviens-toi, la partie s'arrête quand les deux joueurs ont passé leur tour ! <a onclick='alertWrite(alertArray[15]);stonePlaceB(posArray[9]);stonePlaceW(posArray[13]);stonePlaceB(posArray[14]);stonePlaceW(posArray[15]);stonePlaceB(posArray[16]);stonePlaceW(posArray[17]);stonePlaceB(posArray[18]);stonePlaceW(posArray[19]);stonePlaceB(posArray[20]);stonePlaceW(posArray[21]);stonePlaceB(posArray[22]);stonePlaceW(posArray[23]);stonePlaceB(posArray[24]);stonePlaceW(posArray[25]);'>Suivant</a></div>",
  "<div class='alert'>Tu sais maintenant tout ce qu'il faut pour gagner cette bataille !! <a onclick='location.reload();'>GO !</a></div>",
  ];

// Positions array for TUTORIAL
var posArray = [
  "[style='top:280px;left:80px;']",   //0
  "[style='top:240px;left:80px;']",   //1
  "[style='top:280px;left:40px;']",   //2
  "[style='top:280px;left:120px;']",  //3
  "[style='top:320px;left:80px;']",   //4
  "[style='top:160px;left:160px;']",  //5
  "[style='top:160px;left:120px;']",  //6
  "[style='top:160px;left:200px;']",  //7
  "[style='top:160px;left:240px;']",  //8
  "[style='top:120px;left:160px;']",  //9
  "[style='top:200px;left:160px;']",  //10
  "[style='top:120px;left:200px;']",  //11
  "[style='top:200px;left:200px;']",  //12
  "[style='top:80px;left:120px;']",   //13
  "[style='top:80px;left:80px;']",    //14
  "[style='top:120px;left:40px;']",   //15
  "[style='top:160px;left:40px;']",   //16
  "[style='top:200px;left:80px;']",   //17
  "[style='top:240px;left:120px;']",  //18
  "[style='top:280px;left:160px;']",  //19
  "[style='top:240px;left:200px;']",  //20
  "[style='top:200px;left:240px;']",  //21
  "[style='top:160px;left:280px;']",  //22
  "[style='top:120px;left:280px;']",  //23
  "[style='top:80px;left:240px;']",   //24
  "[style='top:80px;left:200px;']",   //25
  "[style='top:240px;left:240px;']",  //25
  ];

/*
 * Tutorial algorithm
 */ 
function tutorialActive() {
  if (document.getElementById('tutorialActivator').className == "activeMode") {
    alertWrite(alertArray[0]);
  }
}
function stonePlaceB(posArray) {
  $(posArray).addClass('black');
}
function stonePlaceW(posArray) {
  $(posArray).addClass('white');
}
function stoneClear(posArray) {
  $(posArray).removeClass('white');
  $(posArray).removeClass('black');
}

/*
 * Write an alert in #alerts, waits a bit before erasing it
 */
 function alertWrite(alert) {
  var alerts = document.getElementById('alerts');
  var firstAlert = document.getElementsByClassName('alert')[0];
  var firstBr = document.getElementsByTagName('br')[0];
  var muchAlerts = document.querySelectorAll('#alerts .alert').length;
  if (document.getElementById('tutorialActivator').className == "activeMode") {
    if (muchAlerts > 0) {
      alerts.removeChild(firstAlert);
      alerts.removeChild(firstBr);
      alerts.innerHTML+=alert+"<br>";
    } else {
      alerts.innerHTML+=alert+"<br>";
    }
  } else {
    if (muchAlerts > 3) {
    // remove the first .alert in #alerts before adding a new one
    alerts.removeChild(firstAlert);
    alerts.removeChild(firstBr);
    alerts.innerHTML+=alert+"<br>";
    } else {
      alerts.innerHTML+=alert+"<br>";
    }
  }
}

/*
 * Returns a size x size matrix with all entries initialized to Board.EMPTY
 */
 Board.prototype.create_board = function(size) {
  var m = [];
  for (var i = 0; i < size; i++) {
    m[i] = [];
    for (var j = 0; j < size; j++)
      m[i][j] = Board.EMPTY;
  }
  return m;
};

/*
 * Switches the current player
 */
 Board.prototype.switch_player = function() {
  this.current_color = 
  this.current_color == Board.BLACK ? Board.WHITE : Board.BLACK;
  var turnBlack = document.getElementById('turnBlack');
  var turnWhite = document.getElementById('turnWhite');
  var passbtn = document.getElementById('pass-btn');
  if (this.current_color === 1){
    // Remove .activeTurn from turnWhite and set it to turnBlack
    turnWhite.className="";
    turnBlack.className="activeTurn";
    passbtn.className="passBlue";
  } else if (this.current_color === 2){
     // Remove .activeTurn from turnBlack and set it to turnWhite
     turnBlack.className="";
     turnWhite.className="activeTurn";
     passbtn.className="passRed";
   }
 };

/*
 * At any point in the game, a player can pass and let his opponent play
 */
 Board.prototype.pass = function() {
  if (this.last_move_passed)
    this.end_game();
  else {
    var alert = "<div class='alert'>Le joueur a passé !</div";
    alertWrite(alert);
  }
  this.last_move_passed = true;
  this.switch_player();
};

/*
 * Called when the game ends (both players passed)
 */
 Board.prototype.end_game = function() {
  // Add End score count
  var blackScore = document.querySelectorAll('.black').length;
  blackScore+=0.5;
  var whiteScore = document.querySelectorAll('.white').length;
  if (blackScore > whiteScore){
    var alert = "<div class='alert'>Les deux joueurs ont passé !<br> Les soldats ont gagné !</div";
    alertWrite(alert);
  } else {
    var alert = "<div class='alert'>Les deux joueurs ont passé !<br> Les villageois ont gagné!</div";
    alertWrite(alert);
  }
  var alert = "<div class='alert'>SCORES : Soldats : "+blackScore+"<br> Villageois : "+whiteScore+"</div>";
  alertWrite(alert);
};

/*
 * Attempt to place a stone at (i,j). Returns true if the move was legal
 */
 Board.prototype.play = function(i, j) {
  this.attempted_suicide = this.in_atari = false;

  if (this.board[i][j] != Board.EMPTY)
    return false;

  var color = this.board[i][j] = this.current_color;
  var captured = [];
  var neighbors = this.get_adjacent_intersections(i, j);
  var atari = false;
  var ko = false; // KO rule is not implemented, due to previous turn detection being a complex thing to do

  var self = this;
  _.each(neighbors, function(n) {
    var state = self.board[n[0]][n[1]];
    if (state != Board.EMPTY && state != color) {
      var group = self.get_group(n[0], n[1]);
      // console.log(group);
      if (group["liberties"] == 0)
        captured.push(group);
      else if (group["liberties"] == 1)
        atari = true;
    }
  });

    // detect suicide
    if (_.isEmpty(captured) && this.get_group(i, j)["liberties"] == 0) {
      this.board[i][j] = Board.EMPTY;
      this.attempted_suicide = true;
      var alert = "<div class='alert'>Le suicide n'est pas permis !</div";
      alertWrite(alert);
      return false;
    }

    var self = this;
    _.each(captured, function(group) {
      _.each(group["stones"], function(stone) {
        self.board[stone[0]][stone[1]] = Board.EMPTY;
      });
      var alert = "<div class='alert'>Un groupe a été capturé !</div";
      alertWrite(alert);
    });

    if (atari)
      this.in_atari = true;

    this.last_move_passed = false;
    this.switch_player();
    return true;
  };

/*
 * Given a board position, returns a list of [i,j] coordinates representing
 * orthagonally adjacent intersections
 */
 Board.prototype.get_adjacent_intersections = function(i , j) {
  var neighbors = []; 
  if (i > 0)
    neighbors.push([i - 1, j]);
  if (j < this.size - 1)
    neighbors.push([i, j + 1]);
  if (i < this.size - 1)
    neighbors.push([i + 1, j]);
  if (j > 0)
    neighbors.push([i, j - 1]);
  return neighbors;
};

/*
 * Performs a breadth-first search about an (i,j) position to find recursively
 * orthagonally adjacent stones of the same color (stones with which it shares
 * liberties). Returns null for if there is no stone at the specified position,
 * otherwise returns an object with two keys: "liberties", specifying the
 * number of liberties the group has, and "stones", the list of [i,j]
 * coordinates of the group's members.
 */
 Board.prototype.get_group = function(i, j) {

  var color = this.board[i][j];
  if (color == Board.EMPTY)
    return null;

    var visited = {}; // for O(1) lookups
    var visited_list = []; // for returning
    var queue = [[i, j]];
    var count = 0;

    while (queue.length > 0) {
      var stone = queue.pop();
      if (visited[stone])
        continue;

      var neighbors = this.get_adjacent_intersections(stone[0], stone[1]);
      var self = this;
      _.each(neighbors, function(n) {
        var state = self.board[n[0]][n[1]];
        if (state == Board.EMPTY)
          count++;
        if (state == color)
          queue.push([n[0], n[1]]);
      });

      visited[stone] = true;
      visited_list.push(stone);
    }

    return {
      "liberties": count,
      "stones": visited_list
    };
  }