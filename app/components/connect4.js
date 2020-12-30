/*
    Author - Shaun Halliday
    This is the main component code that creates connect 4,
    this code consists of:
    - drawing the board
    - implement player pieces/markers
    - match winning patters
    - handle clicks
    - animate visuals
    - play sounds on actions
    - implement a computer player
    - have mobile input actions
*/


import Component from "@ember/component";

function deepClone(state) {
    var new_state = [];
    for(var idx1 = 0; idx1 < state.length; idx1++) {
        new_state.push(state[idx1].slice(0));
    }
    return new_state;
}


// Start of the computer player creation, refactoring the
// check_winner into an overarching check_game_winner function
// and this will be implemented within the game in the 
// check_winner function
function check_game_winner(state) {

    // Outline all the possible patterns for wins
    var patterns = [
    
        // All horizontal, vertical and diagonal patterns,
        // these are zero index arrays hence 0,1 style 
        // All the horizontal possible matches for wins
    
        //1st column  Horizontal
        [[0, 0], [1, 0], [2, 0], [3, 0]],
        [[1, 0], [2, 0], [3, 0], [4, 0]],
        [[2, 0], [3, 0], [4, 0], [5, 0]],
        [[3, 0], [4, 0], [5, 0], [6, 0]],
        //2nd column  Horizontal
        [[0, 1], [1, 1], [2, 1], [3, 1]],
        [[1, 1], [2, 1], [3, 1], [4, 1]],
        [[2, 1], [3, 1], [4, 1], [5, 1]],
        [[3, 1], [4, 1], [5, 1], [6, 1]],
        //3rd column  Horizontal
        [[0, 2], [1, 2], [2, 2], [3, 2]],
        [[1, 2], [2, 2], [3, 2], [4, 2]],
        [[2, 2], [3, 2], [4, 2], [5, 2]],
        [[3, 2], [4, 2], [5, 2], [6, 2]],
        //4th column  Horizontal
        [[0, 3], [1, 3], [2, 3], [3, 3]],
        [[1, 3], [2, 3], [3, 3], [4, 3]],
        [[2, 3], [3, 3], [4, 3], [5, 3]],
        [[3, 3], [4, 3], [5, 3], [6, 3]],
        //5th column  Horizontal
        [[0, 4], [1, 4], [2, 4], [3, 4]],
        [[1, 4], [2, 4], [3, 4], [4, 4]],
        [[2, 4], [3, 4], [4, 4], [5, 4]],
        [[3, 4], [4, 4], [5, 4], [6, 4]],
        //6th column  Horizontal
        [[0, 5], [1, 5], [2, 5], [3, 5]],
        [[1, 5], [2, 5], [3, 5], [4, 5]],
        [[2, 5], [3, 5], [4, 5], [5, 5]],
        [[3, 5], [4, 5], [5, 5], [6, 5]],
    
        // All the vertical possible matches for wins
        //1st column Verticals
        [[0, 0], [0, 1], [0, 2], [0, 3]],
        [[0, 1], [0, 2], [0, 3], [0, 4]],
        [[0, 2], [0, 3], [0, 4], [0, 5]],
        //2nd column Verticals
        [[1, 0], [1, 1], [1, 2], [1, 3]],
        [[1, 1], [1, 2], [1, 3], [1, 4]],
        [[1, 2], [1, 3], [1, 4], [1, 5]],
        //3rd column Verticals
        [[2, 0], [2, 1], [2, 2], [2, 3]],
        [[2, 1], [2, 2], [2, 3], [2, 4]],
        [[2, 2], [2, 3], [2, 4], [2, 5]],
        //4th column Verticals
        [[3, 0], [3, 1], [3, 2], [3, 3]],
        [[3, 1], [3, 2], [3, 3], [3, 4]],
        [[3, 2], [3, 3], [3, 4], [3, 5]],
        //5th column  Verticals
        [[4, 0], [4, 1], [4, 2], [4, 3]],
        [[4, 1], [4, 2], [4, 3], [4, 4]],
        [[4, 2], [4, 3], [4, 4], [4, 5]],
        //6th column  Verticals
        [[5, 0], [5, 1], [5, 2], [5, 3]],
        [[5, 1], [5, 2], [5, 3], [5, 4]],
        [[5, 2], [5, 3], [5, 4], [5, 5]],
        //7th column  Verticals
        [[6, 0], [6, 1], [6, 2], [6, 3]],
        [[6, 1], [6, 2], [6, 3], [6, 4]],
        [[6, 2], [6, 3], [6, 4], [6, 5]],
    
    
        // All the diagonals, first left to right,
        // then right to left
        //Diagonals (Left to Right)
        [[3, 0], [2, 1], [1, 2], [0, 3]],  //work
        [[4, 0], [3, 1], [2, 2], [1, 3]],  //work
        [[3, 1], [2, 2], [1, 3], [0, 4]],  //work
        [[5, 0], [4, 1], [3, 2], [2, 3]],  //work
        [[4, 1], [3, 2], [2, 3], [1, 4]],  //work
        [[3, 2], [2, 3], [1, 4], [0, 5]],  //work
        [[5, 1], [4, 2], [3, 3], [2, 4]],  //work
        [[4, 2], [3, 3], [2, 4], [1, 5]],  //work
        [[3, 3], [4, 2], [5, 1], [6, 0]],  //Work
        [[5, 2], [4, 3], [3, 4], [2, 5]],  //work
        [[3, 4], [4, 3], [5, 2], [6, 1]],  //work
        [[3, 5], [4, 4], [5, 3], [6, 2]],  //work
    
        //Diagonals (Right to Left)
        [[6, 3], [5, 2], [4, 1], [3, 0]],  //work
        [[6, 4], [5, 3], [4, 2], [3, 1]],  //work
        [[5, 3], [4, 2], [3, 1], [2, 0]],  //work
        [[5, 3], [4, 2], [3, 1], [2, 0]],  //work
        [[6, 5], [5, 4], [4, 3], [3, 2]],  //work
        [[5, 4], [4, 3], [3, 2], [2, 1]],  //work
        [[4, 3], [3, 2], [2, 1], [1, 0]],  //work
        [[5, 5], [4, 4], [3, 3], [2, 2]],  //work
        [[4, 4], [3, 3], [2, 2], [1, 1]],  //work
        [[3, 3], [2, 2], [1, 1], [0, 0]],  //work
        [[4, 5], [3, 4], [2, 3], [1, 2]],  //work
        [[3, 4], [2, 3], [1, 2], [0, 1]],  //work
        [[3, 5], [2, 4], [1, 3], [0, 2]],  //work
        ];
        
        for(var pidx = 0; pidx < patterns.length; pidx++) {
            var pattern = patterns[pidx];
            var winner = state[pattern[0][0]][pattern[0][1]];
    
            if(winner) {
                for(var idx = 1; idx < pattern.length; idx++) {
                    if(winner != state[pattern[idx][0]][pattern[idx][1]]) {
                        winner = undefined;
                        break;
                    }
                }
            if(winner) {
                return winner;
                }
             }
            }
            
            var draw = true;
            for(var x = 0; x <= 7; x++) {
                for(var y = 0; y <= 6; y++) {
                    if(!state[x][y]) {
                        return undefined;
                    }
                }
            }
            return '';
        }

        /*  All the patterns for scoring, all possible ways 
        that the computer can win
        */

        var patterns = [
            {
            pattern: [['p', 0, 1], ['p', 0, 1], ['p', 0, 1], ['p']],
            score: 1000
            },
            {
            pattern: [['p', 0, -1], ['p', 0, -1], ['p', 0, -1], ['p']],
            score: 1000
            },
            {
            pattern: [['p', 1, 0], ['p', 1, 0], ['p', 1, 0], ['p']],
            score: 1000
            },
            {
            pattern: [['p', -1, 0], ['p', -1, 0], ['p', -1, 0], ['p']],
            score: 1000
            },
            {
            pattern: [['p', 1, 1], ['p', 1, 1], ['p', 1, 1], ['p']],
            score: 1000
            },
            {
            pattern: [['p', 1, -1], ['p', 1, -1], ['p', 1, -1], ['p']],
            score: 1000
            },
            {
            pattern: [['p', 0, 1], ['p', 0, 1], ['p']],
            score: 100
            },
            {
            pattern: [['p', 0, -1], ['p', 0, -1], ['p']],
            score: 100
            },
            {
            pattern: [['p', 1, 0], ['p', 1, 0], ['p']],
            score: 100
            },
            {
            pattern: [['p', -1, 0], ['p', -1, 0], ['p']],
            score: 100
            },
            {
            pattern: [['p', 1, 1], ['p', 1, 1], ['p']],
            score: 100
            },
            {
            pattern: [['p', 1, -1], ['p', 1, -1], ['p']],
            score: 100
            },
            {
            pattern: [['p', 0, 1], ['p']],
            score: 50
            },
            {
            pattern: [['p', 0, -1], ['p']],
            score: 50
            },
            {
            pattern: [['p', 1, 0], ['p']],
            score: 50
            },
            {
            pattern: [['p', -1, 0], ['p']],
            score: 50
            },
            {
            pattern: [['p', 1, 1], ['p']],
            score: 50
            },
            {
            pattern: [['p', 1, -1], ['p']],
            score: 50
            }
        ];
  

        function match_pattern_at(state, pattern, player, x, y) {
                if(x >= 0 && x < state.length) {
                    if(y >= 0 && y < state[x].length) {
                        var element = pattern[0];
                        if(element[0] == 'p') {
                            if(state[x][y] !== player) {
                                return false;
                            }
                        } else if(element[0] == ' ') {
                           if(state[x][y] !== undefined) {
                               return false;
                           }
                       }
                       if(pattern.length > 1) {
                           return match_pattern_at(state, pattern.slice(1), player, x + element[1], y + element[2])
                       } else {
                            return true;
                       }
                   }
               }
               return false;
           }
           




        /*  Creation of match pattern function, this helps with
        the heuristic implementation in the component definition
        */
        function match_pattern(state, pattern, player) {
            for(var idx1 = 0; idx1 < state.length; idx1++) {
                for(var idx2 = 0; idx2 < state[idx1].length; idx2++) {
                    var matches = match_pattern_at(state, pattern, player, idx1, idx2);
                    if(matches) {
                        return true;
                    }
                }
            }
            return false;
        }


        /*  creation of the heuristic function, creating a
        score variable to judge the strength of current
        patterns and increasing score variable accordingly
        */
       function heuristic(state) {
        var score = 0;
        for(var idx = 0; idx < patterns.length; idx++) {
            if(match_pattern(state, patterns[idx].pattern, 'o')) {
                score = score + patterns[idx].score;
            }
            if(match_pattern(state, patterns[idx].pattern, 'x')) {
                score = score - patterns[idx].score;
            }
        }
        return score;
        }

        /* creation and implementation of the minimax function,
        it evaluates the moves, runs through thew index, 
        incorporates the deepClone function, and then loops
        assigning scores to current placements, finally returning
        the current moves into the function recursively until
        a winner is found
        */
        function minimax(state, limit, player) {
             var moves = []
             if(limit > 0) {
                 for(var idx1 = 0; idx1 < 7; idx1++) {
                     for(var idx2 = 0; idx2 < 6; idx2++) {
                         if(state[idx1][idx2] === undefined) {
                             var move = {
                                x: idx1,
                                y: idx2,
                                   state: deepClone(state),
                                   score: 0
                               };
                               move.state[idx1][idx2] = player;
                               if (limit === 1 || check_game_winner(move.state) !== undefined) {
                                   move.score = heuristic(move.state);
                               } else {
                                move.moves = minimax(move.state, limit - 1, player == 'x' ? 'o' : 'x');
                                var score = undefined;
                                for (var idx3 = 0; idx3 < move.moves.length; idx3++) {
                                  if (score === undefined) {
                                    score = move.moves[idx3].score;
                                  } else if (player === 'x') {
                                    score = Math.max(score, move.moves[idx3].score);
                                  } else if (player === 'o') {
                                    score = Math.min(score, move.moves[idx3].score);
                                  }
                                }
                                move.score = score;
                              }
                               moves.push(move);
                           }
                       }
                   }
               }
               return moves;
           }


        // the computer move function implementation, this
        // is actioned on the component by the setTimeout function
        // if the value after state in minimax is amended the
        // computer player gets more difficult to beat the higher
        // the value
        function computer_move(state) {
                var moves = minimax(state, 3, 'o');
                var max_score = undefined;
                var move = undefined;
                for(var idx = 0; idx < moves.length; idx++) {
                    max_score = moves[idx].score;
                    move = {
                        x: moves[idx].x,
                        y: moves[idx].y
                    }
                }
            return move;
           }

// Start of the main body of code for all other game functions
export default Component.extend ({

    // Set playing, winner and draw states
    playing: false,
    winner: undefined,
    draw: false,

    // Load sounds as required for application
    init: function() {
        this._super(...arguments);
        createjs.Sound.registerSound("assets/sounds/markerplace.wav", "place-marker");
        createjs.Sound.registerSound("assets/sounds/falling.wav", "falling");
        createjs.Sound.registerSound("assets/sounds/winner.wav", "winner");

    },

    // Creation of didInsertElement function, this encompasses all
    // the required game functions
    didInsertElement: function() {

        var stage = new createjs.Stage(this.element.querySelector("#stage"));

        // Draw the game board - color blue fill like a connect 4 board
        var board = new createjs.Shape();
        var graphics = board.graphics;
        graphics.beginFill('#0000ff');

        // Draw the Outside Lines
        graphics.drawRect(0, 0, 340, 2);
        graphics.drawRect(340, 0, 2, 300);
        graphics.drawRect(0, 0, 2, 300);
        graphics.drawRect(0, 300, 340, 2);

        //Draw Vertical Lines
        graphics.drawRect(48.5, 0, 2, 300);
        graphics.drawRect(97, 0, 2, 300);
        graphics.drawRect(145.5, 0, 2, 300);
        graphics.drawRect(194, 0, 2, 300);
        graphics.drawRect(242.5, 0, 2, 300);
        graphics.drawRect(291, 0, 2, 300);

        //Draw Horizontal Lines
        graphics.drawRect(0, 50, 340, 2);
        graphics.drawRect(0, 100, 340, 2);
        graphics.drawRect(0, 150, 340, 2);
        graphics.drawRect(0, 200, 340, 2);
        graphics.drawRect(0, 250, 340, 2);

        // start drawing from x and y board co-ordinates, then add
        // board to the stage variable
        board.x = 20;
        board.y = 40;
        board.alpha = 0;
        this.set('board', board);
        stage.addChild(board);

        // Create players markers/pieces, leave as x and o as easier
        //than setting long names
        var markers = {
            'x': [],
            'o': []
        };

        // for loop, 21 counters per player as there are 42 places
        // on the connect 4 board
        for(var x = 0; x < 21; x++) {
            //Create the yellow token/game piece
            var yellowPiece = new createjs.Shape();
            graphics = yellowPiece.graphics;
            graphics.beginFill('#FFFF00');
            graphics.drawCircle(0, 0, 23);
            graphics.endFill();
            yellowPiece.visible = false;
            stage.addChild(yellowPiece);
            markers.o.push(yellowPiece);

            //Create the red token/game piece
            var redPiece = new createjs.Shape();
            graphics = redPiece.graphics;
            graphics.beginFill('#FF0000');
            graphics.drawCircle(0, 0, 23);
            graphics.endFill();
            redPiece.visible = false;
            stage.addChild(redPiece);
            markers.x.push(redPiece);
        }

        // store markers and stage in component state,
        // update stage with the board
        this.set("markers", markers);
        this.set("stage", stage);
        createjs.Ticker.addEventListener("tick", stage);
    },

    // Create click events function, this contains all the
    // mathematical values to the marker placements, also
    // the implementation of checking if markers already
    // in a column and if so to place markers on top of
    // each other
    click: function(ev) {
        var component = this;
        if(component.get("playing") && !component.get("winner")) {
            if (
                ev.target.tagName.toLowerCase() === "canvas" &&
                ev.offsetX >= 20 &&
                ev.offsetY >= 40 &&
                ev.offsetX < 360 &&
                ev.offsetY < 340
            ) {
                var x = Math.floor((ev.offsetX - 20) / 48.5);
                var y = Math.floor((ev.offsetY - 40) / 50);

                //Var y value of 5, this starts the count for the column,
                // to ensure markers occupy the lowest possible grid

                // Set y column value to 5 (6 grid in column as zero
                // index valuation)
                var y = 5;
                var state = component.get('state');

                //each time marker is placed, subrtact 1 from the Y 
                // variable relevant to the column it is placed in.
                while (state[x][y] == 'x' || state[x][y] == 'o'){
                // Each time executed get the current column value of y
                // and minus one off it so the next placement in that column
                // is telling the program a grid, or multiple grid spaces
                // are taken
                y = y - 1;
                }

                // wrap the move_count and placement of markers in the
                // column variable counter
                if(y >= 0) {
                    createjs.Sound.play('place-marker');
                    state[x][y] = 'x';
                    // For each move set the move count and marker variables,
                    // the also set the visibiltiy of each marker to true,
                    // now refactored to use component instead of this
                    var move_count = component.get("moves")['x'];
                    var marker  = component.get("markers")['x'][move_count];
                    marker.visible = true;
                    // The code so on placement of a marker with click
                    // if player x place marker as per mathematical variables
                    // , also check for winner and increase move count by one
                    marker.x = 45 + x * 48.5;
                    marker.y = 66 + y * 50;
                    component.check_winner();
                    component.get('moves')['x'] = move_count + 1;

                    // Starting point for the computer player implementation
                    setTimeout(function() {
                        if(!component.get('winner') && !component.get('draw')) {
                            var move = computer_move(state);
                            move_count = component.get('moves')['o'];
                            state[move.x][move.y] = 'o';
                            marker = component.get('markers')['o'][move_count];
                            marker.visible = true;
                            marker.x = 45 + move.x * 48.5;
                            marker.y = 66 + move.y * 50;
                            component.get('moves')['o'] = move_count + 1;
                            
                            component.get('stage').update();
                            createjs.Sound.play('place-marker');

                            component.check_winner();
                        }
                    }, 500);
                }
            }
        }
    },

    // Refactored check_winner function, pulling
    // in the states and functionality from the 
    // check_game_winner function at the top of this code,
    // outside the component definition
    check_winner: function() {
        var state = this.get('state');
        var winner = check_game_winner(state);
        if(winner !== undefined) {
            if(winner === '') {
                this.set('draw', true);
            } else {
                this.set('winner', winner);
                createjs.Sound.play('winner');
            }
        }
    },


        // actions section
        actions: {
            // Setup start function, when start button clicked all actions
            // in this section carried out
            start: function() {
                var board = this.get('board');
                board.alpha = 0;
                
                // implementation of code to animate markers falling off the
                // screen when restart a game and sounds for markers falling
                // off the screen
                if(this.get('playing')) {
                    var markers = this.get('markers');
                    for(var idx = 0; idx < 21; idx++) {
                        createjs.Tween.get(markers.x[idx]).to({y: 600}, 500);
                        createjs.Tween.get(markers.o[idx]).to({y: 600}, 500);
                    }
                    createjs.Sound.play("falling");
                    createjs.Tween.get(board).wait(500).to({alpha: 1}, 1000);
                } else {
                    createjs.Tween.get(board).to({alpha: 1}, 1000);
                }

                this.set('playing', true);
                this.set('winner', undefined);
                this.set('draw', undefined);
                // Sets state of board to all undefined, as per column and row amounts
                // in the board (6x7 board)
                this.set('state', [
                    [undefined, undefined, undefined, undefined, undefined, undefined],
                    [undefined, undefined, undefined, undefined, undefined, undefined],
                    [undefined, undefined, undefined, undefined, undefined, undefined],
                    [undefined, undefined, undefined, undefined, undefined, undefined],
                    [undefined, undefined, undefined, undefined, undefined, undefined],
                    [undefined, undefined, undefined, undefined, undefined, undefined],
                    [undefined, undefined, undefined, undefined, undefined, undefined]]
                );
                this.set('moves', { 'x': 0, 'o': 0 });
                this.set('player', 'x');
                var markers = this.get('markers');
                this.get('stage').update(); 
            }
        }
    });