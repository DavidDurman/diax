uki.view.declare('uki.view.ColorPicker', uki.view.TextField, function(Base) {
    this._style = function(name, value) {
	this._input.className = this._input.className + " color";
        return Base._style.call(this);
    };
});
