module.exports = function(grunt) {

  grunt.initConfig({
    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'compressed',
          loadPath: ['sass'],
          sourcemap: 'none'
        },
        files: [{
          expand: true,
          cwd: 'sass/themes/oriclone',
          src: ['*.scss'],
          dest: 'static/assets/css',
          ext: '.css'
        }]
      }
    },
    watch: {
      css: {
        files: 'sass/themes/oriclone/*.scss',
        tasks: ['sass']
      }
    }
  });
 
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
 
  grunt.registerTask('default', ['watch', 'sass']);

};
