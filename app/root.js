import React from 'react';
import Header from './components/header';
import Player from './page/player';
import MusicList from './page/musiclist';
import { MUSIC_LIST } from './config/musiclist';
let musiclist = require('./config/musiclist');

console.log(MUSIC_LIST);
console.log(musiclist.MUSIC_LIST);
console.log(musiclist.MUSIC_LIST[0]);
class Root extends React.Component{
	constructor(props){
		super(props);
		this.state = {currentMusicItem: musiclist.MUSIC_LIST[1] , musicList: MUSIC_LIST};
	}
	componentDidMount(){
		let This = this;
		$('#player').jPlayer({
			ready: function(){
				$(this).jPlayer('setMedia',{
					mp3: This.state.currentMusicItem.file
				}).jPlayer('pause');
			},
			supplied: 'mp3',
			wmode: 'window'
		});
	}
	render(){

		return (
			<div>
				<Header />
				<MusicList currentMusicItem={this.state.currentMusicItem} repeatType='1' musicList={this.state.musicList}/>
			</div>
		);
	}
}



export default Root;