(function() {
	tinymce.PluginManager.add('gavickpro_tc_button', function( editor, url ) {
		editor.addButton( 'gavickpro_tc_button', {
			text: 'Slider',
			icon: false,
			onclick: function() {
				editor.insertContent('<br />[slider]<br /><br /><br />[/slider]<br />');
			}
		});
	});
	tinymce.PluginManager.add('gavickpro_tc_button_2', function( editor, url ) {
		editor.addButton( 'gavickpro_tc_button_2', {
			text: 'Image 100%',
			icon: false,
			onclick: function() {
				editor.insertContent('<br />[full]<br />[text]<br /><br />[/text]<br /><br />[/full]<br />');
			}
		});
	});
})();