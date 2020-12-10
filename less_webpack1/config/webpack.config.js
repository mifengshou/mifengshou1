const path = require('path');//nodejs  模块写法.
const HtmlWebpackPlugin = require('html-webpack-plugin');//加载html-webpack-plugin 插件模块
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// console.log(path.resolve(__dirname));
module.exports = {
  mode: 'production',//development
  entry: {
    index: './src/index.js',
    product_list: './src/product.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist/'),//打包完成输出文件的路径  绝对路径
    filename: '[name].js' //[hash]. 输出文件的名称 [name] 默认是main 如果多文件入口就是入口的键名  hash 文件的hash码
  },
  devServer: {//开发服务器配置
    contentBase: path.join(__dirname, "../dist"),//输出路径
    compress: true,//是否压缩
    port: 9000,//端口号 开启的服务器的端口
    open: true//是否自动打开浏览器
  },
  module: {
    rules: [//解析规则
      {
        test: /\.css$/,// 文件解析匹配规则 正则规则.
        use: [//表示匹配到的文件 需要用哪些loader来处理
          //{loader:'style-loader'},//把引入css写入style标签
          { loader: miniCssExtractPlugin.loader },//用 miniCssExtractPlugin插件的loader处理css
          { loader: 'css-loader' }//把css文件引入并处理
        ]
      },
      {
        test: /\.less$/,//匹配less结尾的文件
        use: [
          //{loader:'style-loader'},//把引入css写入style标签
          { loader: miniCssExtractPlugin.loader },//用 miniCssExtractPlugin插件的loader处理css
          { loader: 'css-loader' },//把css文件引入并处理
          { loader: 'less-loader' }//把css文件引入并处理
        ]
      },
      // { //配置的file-loader
      //   test:/\.(jpg|png|gif|webp|jpeg)$/,
      //   use:[
      //     {loader:'file-loader'}
      //   ]
      // },
      {//配置 url-loader
        test: /\.(jpg|png|gif|webp|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 102400  //单位byte 图片小于100k的时候转化base64
            }
          }
        ]
      },
      {
        test: /\.js$/,//匹配js文件
        //babel转化的时候 排除 node_modules 和  brower_components文件夹
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',//用babel-loader处理
            options: {//选项参数
              presets: ['env'] //预设env  es6转化 es5
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {loader: miniCssExtractPlugin.loader },//用 miniCssExtractPlugin插件的loader处理css
          { loader: 'css-loader' },//把css文件引入并处理
          { loader: 'sass-loader' }//把css文件引入并处理
        ]
      }

    ]
  },
  plugins: [
    new HtmlWebpackPlugin({//构造函数传参
      title: "网页标题aaa",//网页标题
      template: './src/tpl.html',//处理html模板路径
      inject: 'head',//true 默认值，script标签位于html文件的 body 底部； body：script标签位于html文件的 body底部；
      //head： script标签位于html文件的 head中；false：不插入生成的js文件
      minify: {//html压缩规则
        removeComments: true, //是否移除注释
        removeAttributeQuotes: true,//是否移除属性的引号
        collapseWhitespace: true//是否移除空白
      },
      filename: 'tpl.html'//输出模板名称
    }),

    new HtmlWebpackPlugin({//构造函数传参
      title: "网页标题bbbb",//网页标题
      template: './src/tpl2.html',//处理html模板路径
      inject: 'head',//true 默认值，script标签位于html文件的 body 底部； body：script标签位于html文件的 body底部；
      //head： script标签位于html文件的 head中；false：不插入生成的js文件
      minify: {//html压缩规则
        removeComments: true, //是否移除注释
        removeAttributeQuotes: true,//是否移除属性的引号
        collapseWhitespace: true//是否移除空白
      },
      chunks: ['tpl2'],
      filename: 'tpl2.html'//输出模板名称
    }),

    new miniCssExtractPlugin({//初始化插件
      // filename: '[name].[hash].css'
      filename: '[name].css'
    }),
    new CleanWebpackPlugin()
  ]
}