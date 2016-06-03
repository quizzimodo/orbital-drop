// /**

//  The user-node, outlines the basic structure
//  for all clien nodes that are active on the 
//  network.

// */
// angular.module('AirDrop').directive('userNode', function() {

//  return {
//    restrict: 'E',
//    controller: function(){},
//    link: function( scope, element, attributes ){
//      console.log('element :', element)
//      $(element).dropzone({ url: "/file/post" });
//    },
//    templateUrl: '/air-drop/app/templates/user-node.tpl.html',
//  }

// });



/**

  The user-node, outlines the basic structure
  for all clien nodes that are active on the 
  network.

*/
angular.module('AirDrop').directive('userNode', function() {
  //require('progressbar.js')

  return {
    restrict: 'E',
    link: function(scope, element, attrs) {

    var config = {
        url: '/files/upload?id='+scope.user.id,
        id: scope.user.id,
        type: 'POST',
    };

    dropzone = new Dropzone(element.context, config);
    
    dropzone.events.forEach(function(event_name){
      dropzone.on(event_name, function(){
        console.log(event_name + ' Biatch');
      })
    })

    dropzone.on("totaluploadprogress", function(progress) {
      document.querySelector(".progress-bar").style.width = progress + "%";
      console.log(progress);
      if(progress === 100) {
        window.setTimeout(function() {
          document.getElementById("full-progress-bar").style.visibility = "hidden";
        }, 2000);
      }
    })

    dropzone.on("drop", function(progress) {
      console.log("yoooooooo", progress);
      document.querySelector(".progress-bar").style.width = 0 + "%";
      document.getElementById("full-progress-bar").style.visibility = "visible"

    })

    dropzone.on("addedfile", function(file) {
      var icon = 'unknown.png';
      var icons = {
        'application/json': 'json.png',
        'application/pdf': 'pdf.png',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'powerpoint.png',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'excel.png',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'word.jpg',
        'application/zip': 'zip.png',
        'audio/mp3': 'mp3.png',
        'text/css': 'css.png',
        'text/csv': 'csv.png',
        'text/html': 'html.png',
        'text/javascript': 'javascript.png',
        'text/markdown': 'md.png',
        'text/plain': 'text.png',
        'video/avi': 'avi.png',
        'video/msvideo': 'avi.png',
        'video/x-msvideo': 'avi.png',
        'video/quicktime': 'mov.png',
        'video/webm': 'webm.jpeg'
      }

      if (!file.type.match(/image.*/)) {
      // This is not an image, so Dropzone doesn't create a thumbnail.
      // Set a default thumbnail:
        if(file.type in icons) {
          icon = icons[file.type];
        } 
        dropzone.emit("thumbnail", file, "../../../resources/icons/" + icon);

      }
});        
  
    },
    templateUrl: '/air-drop/app/templates/user-node.tpl.html',
  }

});
