 
 var AnimationTask = (function () {
	var $ = {};

	var _nextId = 1,
		_tasks = [];

	var _lastT = 0;
	
	var _running = false,
		_frames = 0;
		
	$.onRequestAnimation = function (fn) { window.requestAnimationFrame (fn); };

	$.add = function (fn, milliseconds, from, to) {
		var id = _nextId++;;
		
		_tasks.push ({
			id: id,
			active: true,
			fn: fn,
			time: milliseconds,
			delta: 0,
			
			hasValues: from !== undefined && to !== undefined,
			from: from,
			to: to
		});
		
		if (_lastT == 0)
			_lastT = new Date ().getTime ();

		if (!_running)
		{
			_running = true;
			$.onRequestAnimation (step);
		}
		
		return id;
	};
	
	$.cancel = function (id) {
		for (var i = 0; i < _tasks.length; i++)
		{
			var t = tasks[i];
			if (t.id == id)
			{
				t.active = false;
				return;
			}
		}
	};

	function step ()
	{
		var T = new Date ().getTime (),
			dt = T - _lastT;

		_lastT = T;

		var i = 0;
		while (i < _tasks.length)
		{
			var t = _tasks[i++];
			if (!t.active)
			{
				_tasks.splice (--i, 1);
				continue;
			}
			
			t.delta += dt;
			
			var progress = t.time == 0 ? 0 : Math.min (1.0, t.delta / t.time),
				value = t.hasValues ? t.from + ((t.to - t.from) * progress) : progress;

			t.fn (progress, value, t.sync); 

			if (t.time > 0 && t.delta > t.time)
				t.active = false;
		}
		
		$.onRequestAnimation (step);
	}

	return $;
 }) ();