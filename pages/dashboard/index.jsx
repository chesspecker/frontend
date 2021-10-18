import React, {useState, useEffect, useContext} from 'react';
import useSets from '../../components/hooks/useSets.jsx';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import GameSet from '../../components/layouts/sets/GameSet.jsx';
import style from './index.module.scss';
import LanguageContext from '../../components/layouts/LanguageContext.jsx';

function Dashboard(props) {
	const getSets = useSets();
	const [gameSets, setGameSets] = useState([]);
	const {language, setLanguage} = useContext(LanguageContext);

	useEffect(() => {
		setGameSets(() => getSets);
	});

	return (
		<PageHeader>
			<div className={style.container}>
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
		</PageHeader>
	);
}

export default Dashboard;
