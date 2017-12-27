## create music player by react

#### 安装依赖

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

#### 配置项目案例开发环境

```
1. 配置微型node服务器
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