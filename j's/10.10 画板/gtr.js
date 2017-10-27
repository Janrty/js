function Palette(canvas,mask) {
    this.canvas= canvas;
    this.mask = mask;
    this.ctx =this.canvas.getContext('2d');
    this.history = [];
    this.cx = this.canvas.width;
    this.cy = this.canvas.height;
    this.clipdata = null;


}
