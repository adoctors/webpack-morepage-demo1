const path=require('path');
const webpack=require('webpack');
const uglify=require('uglifyjs-webpack-plugin');
const htmlPlugin=require('html-webpack-plugin');
const extractTextPlugin=require('extract-text-webpack-plugin');
module.exports={
	entry:{
		index:'./src/module/index/index.js',
		student:'./src/module/student/index.js'
	},
	output:{
		path:path.resolve(__dirname,'dist'),
		filename:'js/[name].[chunkhash].js'
	},
	module:{
		rules:[
			{
				test:/\.css$/,
				// loader:['style-loader','css-loader']
				use:extractTextPlugin.extract({
					fallback:'style-loader',
					use:'css-loader'
				})
			}
		]
	},
	plugins:[
		// new uglify(),
		new htmlPlugin({
			filename:'index.html',
			title:"index",
			minify:{
				removeAttributeQuotes:true
			},
			hash:true,
			chunks:['index'],
			template:'./index.html'
		}),
		new htmlPlugin({
			filename:'student.html',
			title:"student",
			minify:{
				removeAttributeQuotes:true
			},
			hash:true,
			chunks:['student'],
			template:'./index.html'
		}),
		new extractTextPlugin('css/[name].[chunkhash].css'),
		new webpack.BannerPlugin({banner:'adoctors版权所有,如有问题请联系qkeliang@163.com'})
	],
	devServer:{
		contentBase:path.resolve(__dirname,'dist'),
		host:'192.168.1.122',
		compress:true,
		port:7000

	},
	watchOptions:{
		poll:1000,
		aggregateTimeout:500,
		ignored:/node_modules/
	}
}