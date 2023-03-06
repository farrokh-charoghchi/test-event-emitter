const fs = require("fs");
const UglifyJS = require('uglify-js');


class MyJsMinifierWebpackPlugin{

  options = null;
  jsMinifier = null;

  constructor(opt){
    this.options = {};
    this.options.outFileName = opt.outFileName || "";
    this.options.jsFiles = opt.jsFiles || [];
    this.options.minifierOptions = opt.minifierOptions || {};

    this.jsMinifier = UglifyJS;
  }

  apply(compiler) {
    var self = this;
    compiler.hooks.done.tap(
        'MyJsMinifierWebpackPlugin',
        (status) => {
            var jsFiles = self.options.jsFiles;
            var finalJsContent = "";

            if(Array.isArray(jsFiles)) {
                jsFiles.forEach((fileName) => {
                    if (!fileName.endsWith('.js')) {
                        return;
                    }
                    const fileContents = 
                        "/********   " + fileName + "   ********/" + "\r\n"
                        + fs.readFileSync(fileName).toString()
                        + "\r\n\r\n";
                    finalJsContent += fileContents;
                });

                var outDir =  self.options.outFileName.split('/');
                outDir.splice(outDir.length-1);
                outDir = outDir.join('/');

                try{fs.mkdirSync(outDir);}catch{}

                var outFileName = self.options.outFileName.split('/');
                outFileName = outFileName[outFileName.length-1];
                outFileName = outFileName.split('.js');
                outFileName = outFileName[0];
                
                fs.writeFileSync(outDir + '/' + outFileName + '.js', finalJsContent);
                fs.writeFileSync(outDir + '/' + outFileName + '.min.js', self.jsMinifier.minify(finalJsContent).code);
            }
        }
    );


    // compiler.plugin('done', function(compilation, callback) {
      
      
    //   //callback();
    // });
  }
}
module.exports = MyJsMinifierWebpackPlugin;