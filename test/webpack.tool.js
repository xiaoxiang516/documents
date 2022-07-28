var path = require('path')
var glob = require('glob')
var utils = require('./utils')
var config = require('../config')
var srcConfig = require('../src/config')

// 获取入口页面实体
function getPageEnties (pageFiles) {
    let pagesAttr = [];
    let entryPages = [
        'login.html',
        'index.html',
        'sso.html',
        'weiWoHarvestDrawing.html',
        'harvestLibrary/index.html',
        'xiaoxiang/index.html',
    ]

    pageFiles.map(pageFile => {
        // key为home/login、system/user/selectuser等
        let key = path.dirname(path.relative(path.resolve(config.build.srcPath, 'pages'), pageFile)).replace(/\\/g, '/')
        if (!srcConfig.build.includePages.length || srcConfig.build.includePages.indexOf(key) !== -1) {
            let sysName = key.split('/')[0]
            if (srcConfig.build.excludeDirs.indexOf(sysName) === -1) {
                let js = path.resolve(path.dirname(pageFile), 'main.js')
                let html = require(pageFile)

                if (entryPages.includes(html.filename)) {
                    pagesAttr.push({
                        key,
                        js,
                        html
                    })
                }
            }
        }
    })
    return pagesAttr
}

// 获取入口对象
function getEntryObject (pagesAttr) {
    let entry = {}
    pagesAttr.map(page => {
        Object.assign(entry, {
            [page.key]: [page.js]
        })
    })

    return entry
}

// 获取公共模块插件的配置数据的数组
function getCommonPluginConfigArray (sysDirs, entryKeys) {
    let commonConfig = []
    var chunkHash = process.env.NODE_ENV === 'production' ? '.[chunkhash:8]' : ''

    // 提取第三方js到vendor
    commonConfig.push({
        name: 'vendor',
        filename: utils.assetsPath(`js/[name]${chunkHash}.js`),
        minChunks: function (module, count) {
            return (
              module.resource &&
              /\.js$/.test(module.resource) &&
              module.resource.indexOf(
                path.join(__dirname, '../node_modules')
              ) === 0
            )
        },
        chunks: entryKeys
    })

    // 提取自定义的公共js到core
    commonConfig.push({
        name: 'core',
        filename: utils.assetsPath(`js/[name]${chunkHash}.js`),
        minChunks: function (module, count) {
            return (
              module.resource &&
              /\.js$/.test(module.resource) &&
              module.resource.indexOf(
                path.join(__dirname, '../src/static/js')
              ) === 0
            )
        },
        chunks: entryKeys
    })

    // 提取各子系统自定义的公共js到common.[name]
    sysDirs.map(dir => {
        let sysName = dir.split(/[/\\]/).reverse()[2]
        if (srcConfig.build.excludeDirs.indexOf(sysName) === -1) {
            commonConfig.push({
                name: sysName,
                filename: utils.assetsPath(`js/${sysName}/common${chunkHash}.js`),
                minChunks: function (module, count) {
                    return (
                      module.resource &&
                      /\.js$/.test(module.resource) &&
                      module.resource.indexOf(
                        path.resolve(dir)
                      ) === 0
                    )
                },
                chunks: entryKeys.filter(entryKey => entryKey.split('/')[0] === sysName)
            })
        }
    })



    // 提取webpack运行时和模块清单信息到manifest，保持vendor、core和各common的hash稳定性
    commonConfig.push({
        name: 'manifest',
        filename: utils.assetsPath(`js/[name]${chunkHash}.js`),
        chunks: commonConfig.map(conf => conf.name)
    })

    return commonConfig
}

// 获取HTML页面插件配置数据的数组
function getHtmlPluginsConfigArray (pagesAttr, commons) {
    return pagesAttr.map(page => {
        let dependencies = []
        let sysName
        let chunks
        var template
        let inject
        let htmlConfig

        sysName = page.key.split('/')[0]

        if (!(page.html.vendor === false)) {
            dependencies.push('vendor')
        }
        if (!(page.html.core === false)) {
            dependencies.push('core')
        }
        if (!(page.html.common === false) && commons.some(conf => conf.name === sysName)) {
            dependencies.push(sysName)
        }
        if (dependencies.length) {
            dependencies.unshift('manifest')
        }
        dependencies.push(page.key)

        chunks = dependencies

        template = page.html.template
        if (!template) {
            template = 'template.html'
        }
        if (template.indexOf('/') === -1 && template.indexOf('\\') === -1) {
            template = page.js.replace('main.js', template)
        } else {
            template = path.resolve(config.build.srcPath, page.html.template)
        }

        inject = true
        htmlConfig = {
            filename: page.html.filename ? page.html.filename : `${page.key}.html`,
            template: template,
            title: page.html.title,
            //chunksSortMode: 'dependency',
            chunksSortMode: function (chunk1, chunk2) {
                return chunks.indexOf(chunk1.names[0]) - chunks.indexOf(chunk2.names[0])
            },
            favicon: srcConfig.build.favicon,
            js: page.html.js,
            env: process.env.NODE_ENV === 'production' ? config.build.env : config.dev.env,
            css: page.html.css,
            chunks,
            inject
        }

        // html压缩
        if (process.env.NODE_ENV === 'production' && config.build.productionHtmlMinify) {
            Object.assign(htmlConfig, {
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                }
            })
        }

        return htmlConfig
    })
}

// 获取页面配置
function getPagesConfig () {
    try {
        let pageFiles = glob.sync(`${config.build.srcPath}/pages/**/page.js`)
        //let pageFiles = glob.sync(`${config.build.srcPath}/pages/pdm/page.js`)
        let sysDirs = glob.sync(`${config.build.srcPath}/pages/*/static/js`)
        let pagesAttr = getPageEnties(pageFiles)
        let entries = getEntryObject(pagesAttr) // Object
        let commons = getCommonPluginConfigArray(sysDirs, Object.keys(entries))
        let htmls = getHtmlPluginsConfigArray(pagesAttr, commons) // Array

        return {
            entries,
            commons,
            htmls
        }
    } catch (err) {
        console.log('\\007') // Beep
        console.error(err)
    }
}

module.exports = getPagesConfig()
