var vorpal = require('vorpal')();
var sharp = require('sharp');
var mmm = require('mmmagic');
var Magic = mmm.Magic;

vorpal
  .command('resize <path> [width] [height]', 'Resize an image or all images in a folder')
  .action(function(args, cb) {
    const self = this;
    path = args.path;

    // if a width and height are defined when the command is called, set them
    if (args.width)
      width = args.width;
    if (args.height)
      height = args.height;

    // resize all images in a directory to a set width
    if (fs.lstatSync(path).isDirectory()) {
        this.prompt({
          type: 'confirm',
          name: 'continue',
          default: false,
          message: 'Resize all images in the folder? ',
          },
          function(result){
            if (result.continue) {
              files = fs.readdirSync(args.path);
              // skip the prompts if a width was supplied
              if (width)
                doResize(self);
              else
                getWidth(self);
            }
            else {
              cb();
            }
        });
    }
    // resize a single image
    else if (fs.lstatSync(args.path).isFile()) {
      // get the file name without the path
      files = [args.path.split("/").pop()];
      //get the path without the file name
      path = args.path.substr(0, args.path.lastIndexOf('/'))
      // skip the questions if a width was supplied
      if (width)
        doResize(self);
      else
        getWidth(self);
    }
  });

// ask for a width
function getWidth(v) {
  self = v;
  self.prompt({
    type: 'input',
    name: 'width',
    default: false,
    message: 'Max width? ',
    },
    function(result){
      if (result.width)
        width = result.width;
      getHeight(self);
  });
}

// ask for a height
function getHeight(v) {
  self = v;
  self.prompt({
    type: 'input',
    name: 'height',
    default: false,
    message: 'Max height? ',
    },
    function(result){
      if (result.height)
        height = result.height;
      doResize(self);
  });
}

function doResize(v) {
  self = v;
  // create a folder to dump the resized images into
  if (!fs.existsSync('optimized'))
    fs.mkdirSync('optimized')

  for (var i in files) {
    detectFileType(files[i]);
  }
}

function detectFileType(filename) {
  var fullpath = path + "/" + filename,
      filenameNoExt = filename.substr(0, filename.lastIndexOf('.'));
      magic = new Magic(mmm.MAGIC_MIME_TYPE);

  // make sure this is an appropriate image file type
  magic.detectFile(fullpath, function(err, result) {
      if (!err) {
        if (result.split('/')[0] == 'image')
          // resize to a jpeg without enlarging it beyond the specified width/height
          sharp(fullpath)
            .resize(parseInt(width),parseInt(height))
            .max()
            .withoutEnlargement()
            .jpeg()
            .toFile('optimized/'+filenameNoExt+'.jpg', function(err) {
              if (err)
                self.log(err);
              else
                self.log('Resize of ' + filename + ' complete');
            });
      }
      else
        self.log(err);
  });
}


