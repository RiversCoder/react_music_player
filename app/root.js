import React from 'react';
import Header from './components/header';
import Progress from './components/progress';



class Root extends React.Component{
	constructor(props){
		super(props);
		$('#player').unbind($.jPlayer.event.timeupdate);
		this.state = { progress: 200};
	}
	componentDidMount(){
		let This = this;
		$('#player').jPlayer({
			ready: function(){
				$(this).jPlayer('setMedia',{
					mp3: 'http://fs.w.kugou.com/201712312219/ca31d9fd73ba15c0f0cf65ce4d1ee22b/G016/M00/0E/19/sIYBAFUvJliAdTPrAC2ULCXywQ8320.mp3'
				});
			},
			supplied: 'mp3',
			wmode: 'window'
		}).jPlayer('play');
		$('#player').bind($.jPlayer.event.timeupdate,(e) => {
			this.setState({
				progress: Math.round(e.jPlayer.status.currentTime)
			})
		});
	}
	render(){
		return (
			<div>
				<Header />
				<Progress progress={this.state.progress} />
			</div>
		);
	}
}

export default Root;