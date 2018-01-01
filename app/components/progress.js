import React from 'react';
import './progress.less';

class Progress extends React.Component{
	handleClick(e){
		let musicBox = this.refs.progressBar;
		let progress = (e.clientX - musicBox.getBoundingClientRect().left) / musicBox.getBoundingClientRect().width;
		
		this.props.onProfressChange && this.props.onProfressChange(progress);
	}
	render(){
		return (
			<div className='components-progress' onClick={this.handleClick.bind(this)} ref='progressBar' >
				<div className='progress' style={{width: `${this.props.progress}%`, background: `${this.props.barColor}`}}></div>
			</div>
		);
	}
}

//声明默认属性

Progress.defaultProps = {
	barColor : '#2f9842'
};

export default Progress;