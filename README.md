![react_music_player](/scrrenshot/screen.png)

# Create music player by react

### 源码使用方法：

```
git clone https://github.com/RiversCoder/react_music_player.git

cd react_music_player && npm install

npm start
```






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
9.音乐列表循环
10.列表模块分离，将每一项列表分离成一个单独的组件，通过父组件传递参数( 每项ID,当前播放的音乐,音乐列表对象 )进行调用
```

> 7. 路由控制切换页面

```
import { Router,IndexRouter,Link,Route,HashHistory } from 'react-router'
```

```
render(){
	let This = this;
	const MusicLists = () => (
		<MusicList currentMusicItem={This.state.currentMusicItem} musicList={this.state.musicList} />
	);
	const Players = () => (
		<Player currentMusicItem={This.state.currentMusicItem} repeatType='1' />
	);
	return (
		<Router >
			<section>
				<Header />
				<Switch>
					<Route path="/" component={Players} />
					<Route path="/list" component={MusicLists} />
				</Switch>
			</section>
		</Router>
	);
}
```

> 8. 事件订阅 ( 更加方便子组件与父组件进行事件交互和响应 )

```	
1. cnpm install pubsub-js --save
2. 在子组件中有条件地发布( 触发 )自定义事件 , 在父组件中处理该事件	
```

 