function showTension(){
$('#slider1').slider();
		$('#slider1').on('slide', function(ev) {
			$("#sliderValLabel").val(ev.value);
			showRadial(ev.value);

		});

		$("#sliderValLabel").keyup(function(ev) {
			if (ev.keyCode == 13) {
				var val = parseInt($("#sliderValLabel").val());
				if (val > 100 || val < 0) {
					val = 100;
					$("#sliderValLabel").val(val);
				}
				$('#slider1').slider('setValue', val);
				showRadial(val);
			}
		});
}
