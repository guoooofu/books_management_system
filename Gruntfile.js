/**
 * Created by guoooofu on 2017/4/24.
 */
//配置任务的代码，所有的grunt代码必须指定在下面这个函数中
module.exports=function (grunt) {
    //加载之前安装的一些任务插件
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-nodemon')
    grunt.loadNpmTasks('grunt-concurrent')

    //对插件进行一些设置
    grunt.initConfig({
        watch: {
            jade: {
                files: ['views/**'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['public/js/**', 'models/**/*.js', 'schemas/**/*.js'],
                //tasks: ['jshint'],
                options: {
                    livereload: true
                }
            }

        },
        nodemon: {
            dev: {
                options: {
                    file: 'app.js',
                    args: [],
                    ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['./'],
                    // watchedFolders: ['app','config'],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 8080
                    },
                    cwd: __dirname
                }
            }
        },
        mochaTest: {
            options: {
                reporter: 'spec'
            },
            src: ['test/**/*.js']
        },
        concurrent: {
            // tasks: ['nodemon', 'watch', 'less', 'uglify', 'jshint'],
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    })

    //防止开发时因为一些语法错误或者一些警告中断了整个服务
    grunt.option("force",true)
    //注册一个默认的任务
    grunt.registerTask("default",["concurrent"])
}
