import React from 'react';
import { BrowserRouter as Router,Link,Route,Switch} from 'react-router-dom';
import Header from './components/header';
import Player from './page/player';
import MusicList from './page/musiclist';
import { MUSIC_LIST } from './config/musiclist';

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
		this.state = {currentMusicItem: musiclist.MUSIC_LIST[0] , musicList: MUSIC_LIST};
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

		let This = this;

		const MusicLists = () => (
			<MusicList currentMusicItem={This.state.currentMusicItem} musicList={this.state.musicList}/>
		);

		const Players = () => (
			<Player currentMusicItem={This.state.currentMusicItem} repeatType='1' />
		);

		return (
			<Router >
				<section>
					<App />
					<Switch>
						<Route path="/" component={Players} />
						<Route path="/list" component={MusicLists} />
					</Switch>
				</section>
			</Router>
		);
	}
}



export default Root;