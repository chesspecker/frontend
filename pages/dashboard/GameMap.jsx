import React, {useState, useEffect, useContext} from 'react';
import useSets from '../../components/hooks/useSets.jsx';
import GameSet from '../../components/layouts/sets/GameSet.jsx';
import LanguageContext from '../../components/layouts/LanguageContext.jsx';
import style from './index.module.scss';

function GameMap() {
	const getSets = useSets();
	const [gameSets, setGameSets] = useState([]);

	const {language} = useContext(LanguageContext);

	useEffect(() => {
		setGameSets(() => getSets);
	});

	return (
		<div className={style.container}>
			<h1>{language}</h1>
			<div className={style.gameSet}>
				{gameSets &&
					gameSets.map(s => (
						<GameSet
							sets={s}
							number={gameSets.indexOf(s)}
							id={s._id}
							setId={s._id}
						/>
					))}
			</div>
		</div>
	);
}

export default GameMap;
