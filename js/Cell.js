class Cell {
    constructor(x, y, row, col, width, height) {
        this.x = x;
        this.y = y;
        this.row = row;
        this.col = col;
        this.width = width;
        this.height = height;
        this.owner = null;
        this.focus = false;
        this.moving = false;
    }

    contains(x, y, upBound, lowBound) {
        return x > this.x && x < this.x + this.width && y > upBound && y < lowBound;
    }

    // draw the circle or hole
    draw(ctx) {
        /*
        if(winner){
            if
            color = 
        }
        else{
            color = 
        }


        */

        // choose color
        var color = this.chooseColor(this.owner);
        
        if(this.focus){
            this.drawArrow(ctx); 
        }
        else if(this.owner == null){
            this.drawCircle(ctx, color);
            /*
            if(!this.moving){
                this.drawCircle(ctx, color);
            }
            else{
                this
            }
            */"potato".includes("to")
            //this.drawCircle(ctx, color);
        }
        else if(this.owner.includes("PLAYER") || this.owner == "PC"){
            this.drawPiece(ctx);
        }
        /*
        if(this.focus){
            // draw arrow
            if(this.row == 0){
                this.drawArrow(ctx); 
            }
        }
        else{
            this.drawCircle(ctx, color);
            //this.drawCircle(ctx, "black");
        }
        */
    }

    chooseColor(owner){
        if(owner == null){
            return COLOR_BACKGROUND;
        }
        else if(owner == "ARROW"){
            return COLOR_FOCUS_COL;
        }
        else if(owner == "PLAYER" || owner == "PLAYER1"){
            return COLOR_PLAYER;
        }
        else{
            return COLOR_PC;
        }
    }

    drawCircle(ctx, color){
        ctx.globalCompositeOperation='destination-out';
        let cx = this.x + this.width / 2;
        let cy = this.y + this.height / 2;
        let r = this.width * GRID_CIRCLE / 2;

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, 2 * Math.PI);
        ctx.closePath();
        //ctx.fill();
        ctx.fillStyle = color;
        //ctx.fill('evenodd');
        ctx.fill();

        ctx.globalCompositeOperation='source-over';
    }

    drawArrow(ctx){
        let offset = this.width / 4;

        // console.log(offset + " " + this.x + " " + this.y);

        // first triangle
        ctx.beginPath();
        ctx.moveTo(this.x + offset, this.y + offset);
        ctx.lineTo(this.x + this.width / 2, this.y + offset + this.height / 5);
        ctx.lineTo(this.x + this.width / 2, this.y + offset + this.height / 2);
        ctx.closePath();

        // the outline
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#666666';
        ctx.stroke();
 
        // the fill color
        ctx.fillStyle = COLOR_ARROW1;
        ctx.fill();

        //second triangle
        ctx.beginPath();
        ctx.moveTo(this.x + this.width - offset, this.y + offset);
        ctx.lineTo(this.x + this.width / 2, this.y + offset + this.height / 5);
        ctx.lineTo(this.x + this.width / 2, this.y + offset + this.height / 2);
        ctx.closePath();
        
        // the outline
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#666666';
        ctx.stroke();
 
        // the fill color
        ctx.fillStyle = COLOR_ARROW2;
        ctx.fill();

        /*
        // draw piece
        let cx = this.x + this.width / 2;
        let cy = this.y + this.height + offset;
        let r = this.width * GRID_CIRCLE / 2;

        ctx.globalCompositeOperation='destination-out';
        
        let color = "red";
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.globalCompositeOperation='source-over';
        */
    }

    drawPiece(ctx){
        let offset = this.width/4;
        let cx = this.x + this.width / 2;
        let cy = this.y + this.height / 2;
        let r = this.width * GRID_CIRCLE / 2;

        //let color = this.chooseColor(this.owner);
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, 2 * Math.PI);
        //ctx.fillStyle = color;
        // ctx.fill();
        // ctx.closePath();

        // create radial gradient
        var grdRadial = ctx.createRadialGradient(cx, cy, r, cx - offset, cy - offset, r - offset);
        if(this.owner == "PLAYER" || this.owner == "PLAYER1"){
            // dark color
            grdRadial.addColorStop(0, COLOR_PLAYER);
            // light color
            grdRadial.addColorStop(1, COLOR_PLAYER_2);
        }
        else{
            // dark color
            grdRadial.addColorStop(0, COLOR_PC);
            // light color
            grdRadial.addColorStop(1, COLOR_PC_2);
        }
        ctx.fillStyle = grdRadial;
        ctx.fill();
        ctx.closePath();
    }
}