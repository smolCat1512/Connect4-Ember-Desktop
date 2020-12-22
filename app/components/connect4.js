import Component from "@ember/component";

export default Ember.Component.extend ({

    // Creation of didInsertElement function, this encompasses all
    // the required game functions
    didInsertElement: function() {
        let stage = new createjs.Stage(this.element.querySelector("#stage"));

        // Draw the game board - color blue fill like a connect 4 board
        let board = new createjs.Shape();
        let graphics = board.graphics;
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
        let markers = {
            'x': [],
            'o': []
        }
        // for loop, 21 counters per player as there are 42 places
        // on the connect 4 board
        for(let x = 0; x < 21; x++) {
            //Create the yellow token/game piece
            let yellowPiece = new createjs.Shape();
            graphics = yellowPiece.graphics;
            graphics.beginStroke('#FFFF00');
            graphics.beginFill('#FFFF00');
            graphics.setStrokeStyle(10);
            graphics.drawCircle(0, 0, 30);
            yellowPiece.visible = false;
            stage.addChild(yellowPiece);
            markers.o.push(yellowPiece);

            //Create the red token/game piece
            let redPiece = new createjs.Shape();
            graphics = redPiece.graphics;
            graphics.beginStroke('#FF0000');
            graphics.beginFill('#FF0000');
            graphics.setStrokeStyle(10);
            graphics.drawCircle(0, 0, 30);
            redPiece.visible = false;
            stage.addChild(redPiece);
            markers.o.push(redPiece);
        }

        // store markers and stage in component state
        this.set('markers', markers);
        this.set('stage', stage);





        stage.update()
    }
});