import  {
    Point
} from "./point.js";

export class Wave {
    constructor(index, totalPoints, color) {
        this.index = index;
        this.totalPoints = totalPoints;
        this.color = color;
        this.points = [];
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.centerX = stageWidth /2;
        this.centerY = stageHeight /2;

        this.pointGap = this.stageWidth / (this.totalPoints -1);
        //포인트들의 간격

        this.init(); //point 생성
    }

    init() { //point 생성하는 함수
        this.points = [];

        for (let i = 0; i < this.totalPoints; i++) {
            const point = new Point(
                this.index + i,
                this.pointGap * i,
                this.centerY,
            );
            this.points[i] = point;
        }
        /*
        this.point = new Point(
            this.centerX,
            this.centerY
        );
        */
    }

    //실제로 캔버스를 그리는 함수
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;

        let prevX = this.points[0].x;
        let prevY = this.points[0].y;

        ctx.moveTo(prevX,prevY);

        for (let i = 0; i < this.totalPoints; i++) {

            if (i < this.totalPoints ) {
                this.points[i].update();
            }

            const cx = (prevX + this.points[i].x) /2;
            const cy = (prevY + this.points[i].y) /2;

            ctx.quadraticCurveTo(prevX, prevY, cx, cy);

            prevX = this.points[i].x;
            prevY = this.points[i].y;
        }



        ctx.lineTo(prevX, prevY);
        ctx.lineTo(this.stageWidth, this.stageHeight);
        ctx.lineTo(this.points[0].x, this.stageHeight);
        ctx.fill();
        //ctx.stroke();
        ctx.closePath();

        //ctx.arc(this.points[4].x, this.points[4].y, 30, 0,  2 *Math.PI);
        //ctx.fill();

    }

        /*
        this.point.update();

        ctx.arc(this.point.x, this.point.y, 30, 0, 2 *Math.PI);
        ctx.fill();

         */

}
