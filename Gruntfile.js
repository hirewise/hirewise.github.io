module.exports = function (s) {
   s.initConfig({
      pkg: s.file.readJSON("package.json"),
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
            files: [{
               src: "src/index.html",
               dest: "build/index.html",
               clone: "tmp"
            }, {
               cwd: "src/images/",
               src: ["*"],
               dest: "build/images/",
               expand: true
            }]
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
               livereload: true,
               port: 9e3,
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

   s.loadNpmTasks("grunt-contrib-uglify");
   s.loadNpmTasks("grunt-contrib-copy");
   s.loadNpmTasks("grunt-contrib-connect");
   s.loadNpmTasks("grunt-contrib-watch");
   s.loadNpmTasks("grunt-contrib-clean");
   s.loadNpmTasks("grunt-contrib-cssmin");
   s.loadNpmTasks("grunt-uncss");
   s.loadNpmTasks("grunt-processhtml");
   s.loadNpmTasks("grunt-contrib-htmlmin");
   
   s.registerTask("build", ["clean", "uncss", "uglify", "copy", "processhtml"]);
   s.registerTask("dist", ["clean", "uncss", "uglify", "cssmin", "copy", "processhtml", "htmlmin"]);
   s.registerTask("serve", ["build", "connect:server", "watch"]);
   s.registerTask("default", ["serve"]);
};