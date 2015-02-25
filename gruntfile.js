module.exports = function(grunt) {
  var fs = require('fs');
  
  // to change the template you want to compile into HTML update the global config variables
  var globalConfig = {
    language: 'en',
    content: 'welcome-content', // JSON file name without -lang
    template: 'welcome-template', // template file name
    contentDirectory: 'welcome', // content directory for JSON file
    templateDirectory: 'messages', // template directory
    buildDirectory: 'welcome-email' // final build directory name
  };

  if(grunt.option('lang') != undefined){
    globalConfig.language = grunt.option('lang');
  }

  if(grunt.option('content') != undefined){
    globalConfig.content = grunt.option('content');
  }

  if(grunt.option('template') != undefined){
    globalConfig.template = grunt.option('template');
  }

  if(grunt.option('contentDirectory') != undefined){
    globalConfig.contentDirectory = grunt.option('contentDirectory');
  }

  if(grunt.option('templateDirectory') != undefined){
    globalConfig.templateDirectory = grunt.option('templateDirectory');
  }

  if(grunt.option('buildDirectory') != undefined){
    globalConfig.buildDirectory = grunt.option('buildDirectory');
  }

  grunt.registerTask('email-builder', function(){
      var filename = 'emails/content/'+ globalConfig.directory + '/'+ globalConfig.data +'-'+ globalConfig.language +'.json',
        fileContent = fs.readFileSync(filename),
        content = JSON.parse(fileContent);

      if(globalConfig.language !== 'en'){
        content.email[0].intl = 'yes';
      }
      
      //Serialize as JSON and Write it to a file
      fs.writeFileSync(filename, JSON.stringify(content, null, 4));

      //call compile handlebars
      grunt.task.run('compile-handlebars');
  });

  grunt.initConfig({
    globalConfig: globalConfig,
    sass: {
        dist: {
            options: {
              //outputStyle: 'compressed'
            },
            files: [
              {
                expand: true,
                cwd: 'sass/',
                src: ['**/*.scss'],
                dest: 'build/css/',
                ext: '.css',
              },
            ],
        }
    },
    juice: {
      options: {
        removeStyleTags: false
      },
      dynamic_mappings: {
         files: [
           {
             expand: true,
             cwd: 'build/**/*',
             src: ['**/*.html'],
             dest: 'build/**/*',
             ext: '.html'
           }
         ]
      }
     },
     'compile-handlebars': {
       allStatic: {
        templateData: 'emails/content/<%= globalConfig.contentDirectory %>/<%= globalConfig.content %>-<%= globalConfig.language %>.json',
        template: 'emails/templates/<%= globalConfig.templateDirectory %>/<%= globalConfig.template %>.handlebars',
        output: 'build/<%= globalConfig.buildDirectory %>/<%= globalConfig.content %>-<%= globalConfig.language %>.html',
        partials: [
          'emails/partials/*.handlebars',
          'emails/partials/language/<%= globalConfig.language %>/language.handlebars'
        ],
        globals: [
        ],
      },
    },
    jsonlint: {
      sample: {
        src: [ 'content/**/*.json' ]
      }
    },
     prettify: {
      options: {
        indent: 3,
        indent_char: ' ',
        wrap_line_length: 500,
        brace_style: 'expand',
        unformatted: ['a', 'sub', 'sup', 'b', 'i', 'u']
      },
      all: {
        expand: true,
        cwd: 'build/',
        ext: '.html',
        src: ['**/*.html'],
        dest: 'build/'
      },
    },
     watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass:dist'],
        options: { 
            spawn: false
        },
      },
      handlebars:{
        files: ['templates/**/*.handlebars'],
        tasks: ['newer:compile-handlebars'],
        options: { 
            spawn: false
        },
      },
      html:{
        files: ['build/**/*.html'],
        tasks: ['newer:juice', 'newer:prettify'],
        options: { 
            spawn: false
        },
      },
      json: {
        files: ['content/**/*'],
        tasks: ['newer:jsonlint'],
        options: {
          spawn: false
        }
      },
      livereload: {
        files: ['*.html', '*.php', 'js/**/*.{js,json}', 'css/*.css','img/**/*.{png,jpg,jpeg,gif,webp,svg}'],
        options: {
           livereload: true
        }
      }
    }
   });
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-prettify');
    grunt.loadNpmTasks('grunt-compile-handlebars');
    grunt.loadNpmTasks('grunt-juice-email');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.registerTask('default',['watch']);
};