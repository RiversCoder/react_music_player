import React from 'react';
import Progress from '../components/progress';
import './player.less';

let duration = 0, volume = 0;
class Player extends React.Component{
	constructor(props){
		super(props);
		$('#player').unbind($.jPlayer.event.timeupdate);
		this.state = { progress: 0 , volume: 0,isPlay: false};
	}
	componentDidMount(){	
		$('#player').bind($.jPlayer.event.timeupdate,(e) => {
			duration = e.jPlayer.status.duration;
			this.setState({
				progress: e.jPlayer.status.currentPercentAbsolute,
				volume: e.jPlayer.options.volume * 100
			})
		});
	}
	onProfressChangeHandel(percent){
		$('#player').jPlayer('play',duration*percent);
		console.log('The progress is : ',duration*percent);
	}
	onProfressVolumeHandel(percent){
		console.log(parseInt(percent*100)/100);
		$('#player').jPlayer('volume',parseInt(percent*100)/100);
	}
	play(e){
		let playState = this.state.isPlay;
		if(playState){
			$('#player').jPlayer('pause');
		}
		else
		{
			$('#player').jPlayer('play');
		}

		this.setState({ isPlay: !playState });
	}
	render(){
		return (
			<div className="player-page">
				<h1 className="caption">我的私人音乐坊 &gt;</h1>
	            <div className="mt20 row">
	            	<div className="controll-wrapper">
	            		<h2 className="music-title">{this.props.currentMusicItem.title}</h2>
	            		<h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
	            		<div className="row mt20">
	            			<div className="left-time -col-auto">-音乐总时间</div>
	            			<div className="volume-container">
	            				<i className="icon-volume rt" style={{top: 5, left: -5}}></i>
	            				<div className="volume-wrapper">
					               <Progress progress={this.state.volume} onProfressChange = {this.onProfressVolumeHandel} barColor='grey'/>
	            				</div>
	            			</div>
	            		</div>
	            		<div style={{height: 10, lineHeight: '10px'}}>
			               <Progress progress={this.state.progress} onProfressChange = {this.onProfressChangeHandel} />
	            		</div>
	            		<div className="mt35 row">
	            			<div>
	                			<i className="icon prev" onClick={this.prev}></i>
	                			<i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`} onClick={this.play.bind(this)}></i>
	                			<i className="icon next ml20" onClick={this.next}></i>
	            			</div>
	            			<div className="-col-auto">
	            				<i className={`icon repeat-${this.props.repeatType}`} onClick={this.changeRepeat}></i>
	            			</div>
	            		</div>
	            	</div>
	            	<div className="-col-auto cover">
	            		<img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title} />
	            	</div>
	            </div>
			</div>
		);
	}
}

export default Player;