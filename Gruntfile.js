module.exports = function (grunt) {
   grunt.initConfig({
      pkg: grunt.file.readJSON("package.json"),
      uglify: {
         options: {
            banner: ""
         },
         build: {
            src: "src/**/*.js",
            dest: "build/js/<%= pkg.name %>.min.js"
         }
      },
      copy: {
         main: {
            files: [
            {
               src: "src/index.html",
               dest: "build/index.html",
               clone: "tmp"
            },
            {
               src: "CNAME",
               dest: "build/CNAME",
               clone: "tmp"
            }, 
            {
               cwd: "src/images/",
               src: ["*"],
               dest: "build/images/",
               expand: true
            }
            ]
         }
      },
      watch: {
         options: {
            livereload: true
         },
         scripts: {
            files: ["src/**/*", "src/*"],
            tasks: ["build"]
         }
      },
      clean: ["build"],
      connect: {
         server: {
            options: {
               livereload: {
                  open: true,
                  appName: 'open'
               },
               port: 9000,
               base: "build"
            }
         }
      },
      cssmin: {
         options: {
            report: "gzip",
            root: "build/css/"
         },
         target: {
            src: ["build/css/style.css"],
            dest: "build/css/style.css"
         }
      },
      uncss: {
         options: {
            htmlroot: "src"
         },
         dist: {
            files: {
               "build/css/style.css": ["src/index.html"]
            }
         }
      },
      processhtml: {
         options: {
            strip: true
         },
         dist: {
            files: {
               "build/index.html": ["src/index.html"]
            }
         }
      },
      htmlmin: {
         dist: {
            options: {
               removeComments: true,
               collapseWhitespace: true
            },
            files: {
               "build/index.html": "build/index.html"
            }
         }
      }
   });

   grunt.loadNpmTasks("grunt-contrib-uglify");
   grunt.loadNpmTasks("grunt-contrib-copy");
   grunt.loadNpmTasks("grunt-contrib-connect");
   grunt.loadNpmTasks("grunt-contrib-watch");
   grunt.loadNpmTasks("grunt-contrib-clean");
   grunt.loadNpmTasks("grunt-contrib-cssmin");
   grunt.loadNpmTasks("grunt-uncss");
   grunt.loadNpmTasks("grunt-processhtml");
   grunt.loadNpmTasks("grunt-contrib-htmlmin");
   
   grunt.registerTask("build", ["clean", "uncss", "uglify", "copy", "processhtml"]);
   grunt.registerTask("dist", ["clean", "uncss", "uglify", "cssmin", "copy", "processhtml", "htmlmin"]);
   grunt.registerTask("serve", ["build", "connect:server", "watch"]);
   grunt.registerTask("default", ["serve"]);
};