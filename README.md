# Create music player by react

> 1. 安装依赖

```JSON
"dependencies": {
	"autoprefixer": "^7.2.3",
	"babel-core": "^6.26.0",
	"babel-loader": "^7.1.2",
	"babel-plugin-react-transform": "^3.0.0",
	"babel-preset-es2015": "^6.24.1",
	"babel-preset-react": "^6.24.1",
	"css-loader": "^0.28.7",
	"extract-text-webpack-plugin": "^3.0.2",
	"html-webpack-plugin": "^2.30.1",
	"install": "^0.10.2",
	"json-loader": "^0.5.7",
	"less": "^2.7.3",
	"less-loader": "^4.0.5",
	"pubsub-js": "^1.5.7",
	"react": "^16.2.0",
	"react-dom": "^16.2.0",
	"react-hot-loader": "^3.1.3",
	"react-router": "^4.2.0",
	"style-loader": "^0.19.1",
	"webpack": "^3.10.0",
	"webpack-dev-server": "^2.9.7"
}
```

> 2. 配置项目案例开发环境

```
1. 配置微型node服务器 webpack-dev-server
2. 实现热加载
3. 更新 webpack.config.js 植入相关插件信息以及入口和出口的相关修改 
4. 更改app目录下相关文件引用
```
```js
//index.js
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Hello from './components/hello';
...
```

3. webpack.config.js 相关webpack配置：

```
var webpack = require('webpack');
var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry : [
		'webpack-dev-server/client?http://localhost:3000',
		'webpack/hot/only-dev-server',
		'react-hot-loader/patch',
		path.join(__dirname,'app/index.js')
	],
	output : { 
		path : path.join(__dirname,'/dist/'),
		filename : '[name].js',
		publicPath : '/'
	},
	plugins: [
		new htmlWebpackPlugin({
			template : './index.tpl.html',
			inject : 'body',
			filename : './index.html'
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV':JSON.stringify('development')
		})
	],
	module : {
		loaders : [
			{
				test : /\.js$/,
				exclude : /node_modules/,
				loader : 'babel-loader',
				query : {
					presets:['react','es2015']
				} 
			},
			{
				test : /\.css$/,
				loader : 'style!css'
			},
			{
				test : /\.less/,
				loader : 'style-loader!css-loader!less-loader'
			}
		]
	}
};
```

> 4. 创建 Header组件 Progress组件

```js
1. conponents目录下新建 header.js和header.less
2. conponents目录下新建 progress.js和progress.less
```

> 5. React组件加载的生命周期

```
getDefaultProps getInitialState componentWillMount render componentDidMount componentWillUnmount

```

> 6. 组件间的通信

```
1.父组件与子组件之间的通信
2.子组件与父组件之间的通信
3.创建播放器页面
4.分离组件
5.导入静态音乐数据
6.default导出和不用default导出的区别
7.音量按钮的数据交互设置
8.播放暂停交互设置
9.
```