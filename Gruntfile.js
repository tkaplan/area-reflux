module.exports = function (grunt) {
        grunt.initConfig({
        browserify: {
            dist: {
                options: {
                    transform: [
                        [
                            "babelify",
                            {presets: ["es2015", "react", "stage-0", "babel-polyfill"]}
                        ]
                    ]
                },
                files: {
                    // if the source file has an extension of es6 then
                    // we change the name of the source file accordingly.
                    // The result file's extension is always .js
                    "./dist/module.js": [
                        "./modules/index.js"
                    ]
                }
            }
        },
        less: {
            "dist": {
                files: {
                    "css/index.css": "less/index.less"
                }
            }
        },
        watch: {
            scripts: {
                files: ["./modules/*.js", "./less/*"],
                tasks: ["less","browserify"]
            }
        },
        'connect': {
            'server': {
                options: {
                    port: 80,
                    directory: '/home/ubuntu/arena-reflux',
                    keepalive: true,
		    index: 'index.html',
        	    middleware: function(connect, options, middlewares) {
          middlewares.unshift(function(req, res, next) {
              res.setHeader('Access-Control-Allow-Origin', '*');
              next();
          });

          return middlewares;
        }    
                }
            }
        },
        concurrent: {
            target: ['watch', 'connect']
        }
   });

   grunt.loadNpmTasks("grunt-browserify");
   grunt.loadNpmTasks("grunt-contrib-watch");
   grunt.loadNpmTasks('grunt-contrib-less');
   grunt.loadNpmTasks('grunt-contrib-connect');
   grunt.loadNpmTasks('grunt-concurrent');

   grunt.registerTask("default", ["concurrent:target"]);
   grunt.registerTask("build", ["less:dist","browserify"]);
};
