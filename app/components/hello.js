import React from 'react';
import './hello.less'

class Hello extends React.Component {
	render(){
		return (
			<div className="hello-component" >
				Hello world, React webpack 终于解决组件加载问题
			</div>
		);
	}
}

export default Hello;
