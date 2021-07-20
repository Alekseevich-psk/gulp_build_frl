// system params
let project_flr = "dist";
let source_flr = "app";
let baseDir = "./" + project_flr + "/";
let fs = require('fs');

// main path
let path = {
    build: {
        html: project_flr + "/",
        css: project_flr + "/assets/template/css/",
        js: project_flr + "/assets/template/js/",
        img: project_flr + "/assets/template/images/",
        fonts: project_flr + "/assets/template/fonts/",
        libs: project_flr + "/assets/template/libs/",
        svg: project_flr + "/assets/template/images/svg/"
    },
    src: {
        html: source_flr + "/html/*.html",
        css: source_flr + "/scss/style.scss",
        js: source_flr + "/scripts/main.js",
        img: source_flr + "/images/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: source_flr + "/fonts/*.{otf,woff2,woff}",
        svg: source_flr + "/html/svg/*.svg"
    },
    watch: {
        html: source_flr + "/**/*.html",
        css: source_flr + "/scss/**/*.scss",
        js: source_flr + "/scripts/**/*.js",
        libs: source_flr + "/libs/**/*.{js}",
        img: source_flr + "/images/**/*.{jpg,png,svg,gif,ico,webp}",
        svg: source_flr + "/html/svg/*.svg"
    },
    clean: baseDir,
}

// plugins
let { src, dest } = require("gulp"),
    gulp = require("gulp"),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    fileinclude = require('gulp-file-include'),
    del = require('del'),
    formatHtml = require('gulp-format-html'),
    scss = require('gulp-sass'),
    gcmq = require('gulp-group-css-media-queries'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    rename = require("gulp-rename"),
    uglify = require('gulp-uglify-es').default,
    babel = require('gulp-babel'),
    imagemin = require('gulp-imagemin'),
    webp = require('gulp-webp'),
    webpHTML = require('gulp-webp-html'),
    webpcss = require("gulp-webpcss"),
    svgSprite = require('gulp-svg-sprite'),
    ttf2woff = require('gulp-ttf2woff'),
    ttf2woff2 = require('gulp-ttf2woff2'),
    fonter = require('gulp-fonter'),
    concat = require('gulp-concat'),
    browsersync = require("browser-sync").create();


const jsFiles = [
    'node_modules/swiper/swiper-bundle.js',
];

function browserSync() {
    browsersync.init({
        server: {
            baseDir: baseDir
        },
        port: 3000,
        notify: false
    })
}

function clean() {
    return del(path.clean);
}

function html() {
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(webpHTML())
        .pipe(formatHtml())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function css() {
    return src(path.src.css)
        .pipe(sourcemaps.init())
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )
        // .pipe(
        //     gcmq()
        // )
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 5 version'],
                cascade: true
            })
        )
        // .pipe(webpcss())
        .pipe(dest(path.build.css))
        .pipe(cleanCSS())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(sourcemaps.write())
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function js() {
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(
            rename({
                basename: "scripts",
                extname: ".js"
            })
        )
        .pipe(dest(path.build.js))
        .pipe(
            uglify()
        )
        .pipe(
            rename({
                basename: "scripts",
                extname: ".min.js"
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function libs() {
    return src(jsFiles)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('libs.js'))
        .pipe(uglify())
        .pipe(rename('libs.min.js'))
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest(path.build.libs))
        .pipe(browsersync.stream())
}

function fonts() {
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts))
        .pipe(browsersync.stream())
}

function svg() {
    return gulp.src([source_flr + '/html/svg/*.svg'])
        .pipe(dest(path.build.svg))
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: "../icons/icons.svg",
                    example: true,
                }
            },
        }
    ))
    .pipe(gulp.dest(path.build.svg))
}

function images() {
    return src(path.src.img)
        .pipe(
            webp({
                quality: 70
            })
        )
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                interlaced: true,
                optimizationLevel: 3 // 0 to 7
            })
        )
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}

// eventListener
function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.libs], libs);
    gulp.watch([path.watch.img], images);
    gulp.watch([path.watch.svg], svg);
}

// add fonts in style.scss
function fontsStyle() {
    let file_content = fs.readFileSync(source_flr + '/scss/fonts.scss');
    if (file_content == '') {
        fs.writeFile(source_flr + '/scss/fonts.scss', '', cb);
        return fs.readdir(path.build.fonts, function (err, items) {
            if (items) {
                let c_fontname;
                for (var i = 0; i < items.length; i++) {
                    let fontname = items[i].split('.');
                    fontname = fontname[0];
                    if (c_fontname != fontname) {
                        fs.appendFile(source_flr + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
                    }
                    c_fontname = fontname;
                }
            }
        })
    }
}

function cb() { }

// fonts otf2ttf
gulp.task('fonter', function () {
    return src([source_flr + '/fonts/*.otf'])
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(dest(source_flr + '/fonts/'))
})

let build = gulp.series(clean, html, libs, gulp.parallel(css, js, images, svg), fonts)
let watch = gulp.parallel(build, watchFiles, browserSync);


exports.fontsStyle = fontsStyle;
exports.images = images;
exports.fonts = fonts;
exports.libs = libs;
exports.svg = svg;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;