import React from 'react';
import MusicListItem from '../components/musiclistitem';

class MusicList extends React.Component{
	render(){
		let listItems = null;
		listItems = this.props.musicList.map((item) => {
			return <MusicListItem id={item.id} musicItem={item} focus={item === this.props.currentMusicItem}/>
		})
		return (
			<ul>
				{ listItems }
			</ul>
		);
	}
}

export default MusicList;