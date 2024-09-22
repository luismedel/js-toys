function CircularPB (x, y, radius, attrs)
{
	attrs = attrs || {};

	this.x = x;
	this.y = y;
	this.radius = radius;

	this.radStart = attrs.radStart === undefined ? -Math.PI/2 : attrs.radStart;
	this.radEnd = attrs.radEnd === undefined ? -Math.PI*2 : attrs.radEnd;

	this.width = attrs.width || 9;
	this.cap = attrs.cap || "round";
	this.backgroundStyle = attrs.backgroundStyle || "#444";
	this.valueStyle = attrs.valueStyle || "#0f0";

	this.text = attrs.text || "";
	this.textX = attrs.textX === undefined ? (this.x + this.width + this.radius*Math.cos (this.radStart)) : attrs.textX;
	this.textY = attrs.textY === undefined ? (this.y + this.radius*Math.sin (this.radStart)) : attrs.textY;
	this.textAlign = attrs.textAlign || "left";
	this.textBaseline = attrs.textBaseline || "middle";
	this.textStyle = attrs.textStyle || this.valueStyle;

	this.text2 = attrs.text2 || "";
	this.text2X = attrs.text2X === undefined ? (this.x + this.radius*Math.cos (this.radEnd)) : attrs.textX2;
	this.text2Y = attrs.text2Y === undefined ? (this.y - this.width + this.radius*Math.sin (this.radEnd)) : attrs.textY2;
	this.text2Align = attrs.textAlign || "center";
	this.text2Baseline = attrs.textBaseline || "bottom";
	this.text2Style = attrs.text2Style || this.valueStyle;

	this.value = 0;
	this.animationTime = 1000;

	this.startValue = 0;
	this.currentValue = 0;
	this.currentRad = 0;
}

CircularPB.prototype.updateProgress = function (progress) {
	var f = Math.sin (progress * Math.PI/2.0);

	this.currentValue = this.startValue + ((this.value - this.startValue) * f);
};

CircularPB.prototype.getRadForValue = function (value) {
	return this.radStart + ((this.radEnd - this.radStart) * (Math.max (0, Math.min (100, value)) / 100.0));
}

CircularPB.prototype.render = function (ctx) {
	if (this.backgroundStyle)
		this.renderBackground (ctx);

	if (this.valueStyle)
		this.renderValue (ctx);

	if (this.text || this.text2)
		this.renderLabels (ctx);
};

CircularPB.prototype.renderBackground = function (ctx, radEnd) {
	this.renderBar (ctx, this.radStart, radEnd || this.radEnd, this.backgroundStyle);
};

CircularPB.prototype.renderValue = function (ctx, radEnd) {
	this.renderBar (ctx, this.radStart, radEnd || this.getRadForValue (this.currentValue), this.valueStyle);
};
	
CircularPB.prototype.renderBar = function (ctx, radStart, radEnd, style) {
	ctx.save ();

	ctx.lineWidth = this.width;
	ctx.lineCap = this.cap;

	ctx.beginPath ();
	ctx.ellipse(this.x, this.y, this.radius, this.radius, 0, radStart, radEnd, true);
	ctx.strokeStyle = style;
	ctx.stroke ();
	
	ctx.restore ();
};

CircularPB.prototype.renderLabels = function (ctx) {
	ctx.save ();

	if (this.text)
	{
		ctx.textAlign = this.textAlign;
		ctx.textBaseline = this.textBaseline;
		ctx.fillStyle = this.textStyle;
		ctx.fillText (this.text, this.textX, this.textY);
	}

	if (this.text2)
	{
		ctx.textAlign = this.text2Align;
		ctx.textBaseline = this.text2Baseline;
		ctx.fillStyle = this.text2Style;
		ctx.fillText (this.text2, this.text2X, this.text2Y);
	}
	
	ctx.restore ();
};

CircularPB.prototype.setValue = function (v, immediate) {
	this.startValue = this.currentValue;
	this.value = Math.min (100, Math.max (v, 0));

	if (immediate)
		this.currentValue = this.startValue = this.value;
};
