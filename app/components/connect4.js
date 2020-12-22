import Component from "@ember/component";

export default Component.extend ({

    // Set playing, winner and draw states
    playing: false,
    winner: undefined,
    draw: false,

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
        stage.addChild(board);

        // Create players markers/pieces, leave as x and o as easier
        //than setting long names
        var markers = {
            'x': [],
            'o': []
        };

        // for loop, 21 counters per player as there are 42 places
        // on the connect 4 board
        for(var x = 0; x < 22; x++) {
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
        stage.update();
    },


    click: function(ev) {
        if(this.get("playing") && !this.get("winner")) {
            if (
                ev.target.tagName.toLowerCase() === "canvas" &&
                ev.offsetX >= 20 &&
                ev.offsetY >= 40 &&
                ev.offsetX < 360 &&
                ev.offsetY < 340
            ) {
                var x = Math.floor((ev.offsetX - 20) / 48.5);
                var y = Math.floor((ev.offsetY - 40) / 50);
                var state = this.get("state");
                if(!state[x][y]) {
                    var player = this.get("player");
                    state[x][y] = player;

                    var move_count = this.get("moves")[player];
                    var marker  = this.get("markers")[player][move_count];
                    marker.visible = true;

                    if (player == "x") {
                        marker.x = 45 + x * 48.5;
                        marker.y = 66 + y * 50;
                    } else {
                        marker.x = 45 + x * 48.5;
                        marker.y = 66 + y * 50;
                    }
                // this.check_winner();
                this.get('moves')[player] = move_count + 1;
                if (player == 'x') {
                    this.set('player', 'o');
                } else {
                    this.set('player', 'x');
                }
                this.get('stage').update();
                }
            }
        }
    },

        // actions section
        actions: {
            // Setup start function, when start button clicked all actions
            // in this section carried out
            start: function() {
                this.set('playing', true);
                this.set('winner', undefined);
                this.set('draw', false);
                // Sets state of board to all undefined
                this.set('state', [
                    [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
                    [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
                    [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
                    [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
                    [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
                    [undefined, undefined, undefined, undefined, undefined, undefined, undefined]
                ]);
                this.set('moves', { 'x': 0, 'o': 0 });
                this.set('player', 'x');
                var markers = this.get('markers');
                for(var idx = 0; idx < 22; idx++) {
                    markers.x[idx].visible = false;
                    markers.o[idx].visible = false;
                }
                this.get('stage').update(); 
            }
        }
    });