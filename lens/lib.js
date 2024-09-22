var Buffer = function (width, height) {
	var canvas = document.createElement ("canvas");
	canvas.width = width;
	canvas.height = height;

	var result = canvas.getContext ("2d");
	result.canvas = result.canvas || canvas;
	result.width = result.width || width;
	result.height = result.height || height;

	return result;
};

var MakeColorRamp = function (from, to, steps, output) {
	for (var i = 0; i < steps; i++)
	{
		output.push ([
			Math.min (255, from[0] + ((to[0] - from[0]) / steps * i) | 0),
			Math.min (255, from[1] + ((to[1] - from[1]) / steps * i) | 0),
			Math.min (255, from[2] + ((to[2] - from[2]) / steps * i) | 0)
		]);
	}
};

var Scene = function (update, render) {
	this.t = new Date ().getTime ();
	this._running = false;
	this.update = update;
	this.render = render;
	this._loop = Scene.loop.bind (this);
	
	this.events = [];
};

Scene.prototype.start = function () {
	this._running = true;
	this._loop ();
};

Scene.prototype.stop = function () {
	this._running = false;
};

Scene.prototype.addEvent = function (id, fn, time, repeat) {
	this.events.push ({ id:id, fn:fn, time:time, repeat:repeat, delta:0, isActive:true });
};

Scene.loop = function () {
	if (!this._running)
		return;

	requestAnimationFrame (this._loop);

	var t = new Date ().getTime (),
		dt = t - this.t;

	this.t = t;

	for (var i = 0; i < this.events.length; i++)
	{
		var e = this.events[i];
		if (e.isActive)
		{
			e.delta += dt;
			if (e.delta >= e.time)
			{
				e.delta -= e.time;

				e.fn (this);
				if (!e.repeat)
					e.isActive = false;
			}
		}
	}

	this.update (dt);
	this.render (dt);
};

function loadImage (src, action)
{
	var img = new Image ();
	img.onload = function () { action (img); };
	img.src = src;
	return img;
}