import React from 'react';
import { BrowserRouter as Router,Link,Route,Switch} from 'react-router-dom';
import Header from './components/header';
import Player from './page/player';
import MusicList from './page/musiclist';
import { MUSIC_LIST } from './config/musiclist';
import Pubsub from 'pubsub-js';

let musiclist = require('./config/musiclist');


class App extends React.Component{
	render(){
		return (
				<Header />
		);
	}
}

class Root extends React.Component{
	constructor(props){
		super(props);
		this.state = {currentMusicItem: musiclist.MUSIC_LIST[0] , musicList: MUSIC_LIST, playState : false};
	}

	//播放音乐
	musicPlay(musicItem,playState){
		
		let playStateBool = false;
		
		$('#player').jPlayer('setMedia',{
			mp3: musicItem.file 
		}).jPlayer(playState);

		//判断当前传入的操作是暂停还是播放 设置对应的播放暂停按钮
		if(playState === 'play'){
			playStateBool = true;
		}else{
			playStateBool = false;
		}

		this.setState({
			currentMusicItem: musicItem,
			playState : playStateBool
		});
	}

	//播放下一曲
	playNextPrev(type='next'){

		let musicCurrentIndex = this.findCurrentPlayMusicIndex(this.state.currentMusicItem);
		let newIndex = 0;
		let length = this.state.musicList.length;

		if(type === 'next'){
			newIndex = (musicCurrentIndex + 1) % length;
		}
		else{
			newIndex = (musicCurrentIndex - 1 + length) % length;
		}

		this.musicPlay(this.state.musicList[newIndex],'play');
	}

	//获取当前播放音乐的index
	findCurrentPlayMusicIndex(musicItem){
		return this.state.musicList.indexOf(musicItem);
	}

	//-- 生命周期 组件渲染完成 
	componentDidMount(){
		let This = this;
		
		$('#player').jPlayer({
			supplied: 'mp3',
			wmode: 'window'
		});
		
		//初始化音乐状态
		this.musicPlay(this.state.currentMusicItem,'pause');

		//监听当前播放音乐是否结束 -> 自动播放下一曲
		$('#player').bind($.jPlayer.event.ended,(e)=>{
			this.playNextPrev('next');
		})

		//处理事件的执行
		this.playmusic = Pubsub.subscribe('PLAY_MUSIC',(message,musicItem) => {
			this.musicPlay(musicItem,'play');	
		});
		this.deletemusic = Pubsub.subscribe('DELETE_MUSIC',(message,musicItem) => {
			This.setState({
				musicList : this.state.musicList.filter(item => {
					return item !== musicItem;
				})
			})
		});
		this.musicPrev = Pubsub.subscribe('MUSIC_PREV',(message) => {
			This.playNextPrev('next');
		});
		this.musicNext = Pubsub.subscribe('MUSIC_NEXT',(message) => {
			This.playNextPrev('prev');
		});		
	}

	componentWillUnmount(){	
		//事件的注销
		Pubsub.unsubscribe(this.playmusic);
		Pubsub.unsubscribe(this.deletemusic);
		Pubsub.unsubscribe(this.musicPrev);
		Pubsub.unsubscribe(this.musicNext);
		$('#player').unbind($.jPlayer.event.ended);

	}
	render(){

		let This = this;

		const MusicLists = () => (
			<MusicList currentMusicItem={This.state.currentMusicItem} musicList={this.state.musicList}/>
		);

		const Players = () => (
			<Player currentMusicItem={This.state.currentMusicItem} repeatType='1' isPlay={This.state.playState} />
		);

		return (
			<Router >
				<section>
					<Header />
					<Route exact path="/" component={Players} />
					<Route path="/list" component={MusicLists} />
				</section>
			</Router>
		);
	}
}



export default Root;