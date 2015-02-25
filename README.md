# Evernote Email Builder

> Evernote Email Builder is made up of Grunt tasks that allow our email builds to be more scaleable for re-using code, supporting multiple languages and leveraging new technologies like Sass.

> The email builder allows email developers to create Handlebars templates, JSON content, Sass that compiles to CSS and in the final HTML file inlines all the CSS.

## Getting Started

### Install
```bash
npm install evernote-email
```

_If you haven't used [grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide._

From the same directory as your project's [Gruntfile](http://gruntjs.com/api/grunt.file) and [package.json](https://www.npmjs.org/doc/files/package.json.html), install the build tasks from the package.json by running the following command:

```bash
npm install
```

Once that's done, you will have added all the npm_modules necessary for the Grunt tasks to run.

To start the tasks as a watcher. The tasks will watch for changes in your templates, Sass, CSS, HTML and JSON files. To start the grunt watch simply run:

```bash
grunt
```

### Options
In the gruntfile.js in the globalConfig object you can set the name of the template, JSON, language and directory name you want to build.

```js
var globalConfig = {
    language: 'en',
    content: 'welcome-content', // JSON file name without -lang
    template: 'welcome-template', // template file name
    contentDirectory: 'welcome', // content directory for JSON file
    templateDirectory: 'messages', // template directory
    buildDirectory: 'welcome-email' // final build directory name
  };
```

You can also pass the variables through command line.

```bash
grunt email-builder --content=welcome-content --template=welcome-template --contentDirectory=welcome --templateDirectory=messages --buildDirectory=welcome-email --lang=en
```

## Directories:
### Templates
The templates diretory can contain sub-directories that contain handlebars template files.

### Content
The content diretory can contain sub-directories that contain JSON files that are made up content that feeds into the handlebars templates. Each JSON file has a language code appended to the end of the filename. (Example: welcome-en.json).

### Build
The build diretory contains the final HTML email files that are compiled from the build. These files shouldn't be edited because the build will overwrite any changes made.

### Sass
Leveraging the [Evernote SASS Structure Boilerplate](https://github.com/evernote/sass-build-structure) this is where all the Sass files are saved.

### Assets
The assets directory is where all images and CSS can be stored. If you are using Sass the compiled CSS will automatically be added to the CSS directory.

### For additional help:
* [grunt](http://gruntjs.com/)
* [Getting Started](https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md)
* [package.json](https://npmjs.org/doc/json.html)

### Tasks used in build:
* [Grunt Compile Handlebars](https://github.com/patrickkettner/grunt-compile-handlebars)
* [Grunt Sass](https://github.com/sindresorhus/grunt-sass)
* [Grunt Juice Email](https://github.com/disintegrator/grunt-juice-email)
* [Grunt JSONLint](https://github.com/brandonramirez/grunt-jsonlint)
* [Grunt Prettify](https://github.com/jonschlinkert/grunt-prettify)

### Sass build structure:
* [Evernote SASS Structure Boilerplate](https://github.com/evernote/sass-build-structure)

