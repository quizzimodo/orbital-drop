// /**

// 	The user-node, outlines the basic structure
// 	for all clien nodes that are active on the 
// 	network.

// */
// angular.module('AirDrop').directive('userNode', function() {

// 	return {
// 		restrict: 'E',
// 		controller: function(){},
// 		link: function( scope, element, attributes ){
// 			console.log('element :', element)
// 			$(element).dropzone({ url: "/file/post" });
// 		},
// 		templateUrl: '/air-drop/app/templates/user-node.tpl.html',
// 	}

// });



/**

	The user-node, outlines the basic structure
	for all clien nodes that are active on the 
	network.

*/
angular.module('AirDrop').directive('userNode', function() {

	return {
		restrict: 'E',
		link: function(scope, element, attrs) {

	        var config = {
	            url: '/files/upload?id='+scope.user.id,
	            id: scope.user.id,
	            type: 'POST',
	        };

	        dropzone = new Dropzone(element.context, config);
	        
	        // dropzone.events.forEach(function(event_name){
	        // 	dropzone.on(event_name, function(){
	        // 		console.log(event_name + ' Biatch');
	        // 	})
	        // })

	        dropzone.on("addedfile", function(file) {
	  				var icon = 'unknown.png';
	  				if (!file.type.match(/image.*/)) {
				    // This is not an image, so Dropzone doesn't create a thumbnail.
				    // Set a default thumbnail:
				    	if(file.type === 'application/json') {
				    		icon = 'json.png'
				    	} else if(file.type === 'application/pdf') {
				    		icon = 'pdf.png'
				    	} else if(file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
				    		icon = 'powerpoint.png';
				    	} else if(file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
				    		icon = 'excel.png';
				    	} else if(file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
				    		icon = 'word.jpg';
				    	} else if(file.type === 'application/zip') {
				    		icon = 'zip.png';
				    	} else if(file.type === 'audio/mp3') {
				    		icon = 'mp3.png';
				    	} else if(file.type === 'text/css') {
				    		icon = 'css.png';
				    	} else if(file.type === 'text/csv') {
				    		icon = 'csv.png';
				    	} else if(file.type === 'text/html') {
				    		icon = 'html.png';
				    	} else if(file.type === 'text/javascript') {
				    		icon = 'javascript.png';
				    	} else if(file.type === 'text/markdown') {
				    		icon = 'md.png';
				    	} else if(file.type === 'text/plain') {
				    		icon = 'text.png';
				    	} else if(file.type === 'video/avi' || file.type === 'video/msvideo' || file.type === 'video/x-msvideo') {
				    		icon = 'avi.png';
				    	} else if(file.type === 'video/quicktime') {
				    		icon = 'mov.png';
				    	} else if(file.type === 'video/webm') {
				    		icon = 'webm.jpeg';
				    	}
				    				
				    	
				   		dropzone.emit("thumbnail", file, "../../../resources/icons/" + icon);

				    // You could of course generate another image yourself here,
				    // and set it as a data url.
  					}
});

	    },
		templateUrl: '/air-drop/app/templates/user-node.tpl.html',
	}

});
