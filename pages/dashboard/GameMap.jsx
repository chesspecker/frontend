import Router from 'next/router.js';
import Image from 'next/image.js';
import Link from 'next/link.js';
import {useEffect, useState} from 'react';
import {array} from 'prop-types';
import useSets from '../../components/hooks/useSets.jsx';
import GameSet from '../../components/layouts/sets/GameSet.jsx';
import {useUserContext} from '../../components/context/UserContext.jsx';
import Stars from '../../components/layouts/stars/Stars.jsx';
import Btn from '../../components/layouts/btn/Btn.jsx';
import plus from '../../public/images/plus.svg';
import http from '../../services/http-service.js';
import style from './index.module.scss';

function GameMap() {
	const api = process.env.API;
	const setsDatabase = useSets();
	const [sets, setSets] = useState([]);

	useEffect(() => {
		setSets(() => {
			return setsDatabase;
		});
	}, [setsDatabase]);

	const {updateCurrentSet} = useUserContext();

	const handleCurrentSet = set => {
		updateCurrentSet(set);
		Router.push('/playing');
	};

	const handleSupress = async set => {
		const setToRemove = sets.find(s => s._id === set);
		const index = sets.indexOf(setToRemove);
		setSets(oldArray => {
			array = [...oldArray];
			array.splice(index, 1);
			return array;
		});
		await http.delete(`${api}/puzzles/set/id/${set}`, {withCredentials: true});
	};

	return (
		<div className={style.container}>
			<div className={style.gameSet}>
				{sets &&
					sets.map(s => (
						<GameSet
							key={s._id}
							sets={s}
							number={sets.indexOf(s)}
							id={s._id}
							setCurrentSet={() => handleCurrentSet(s._id)}
							onDelete={handleSupress}
						/>
					))}
				<div className={style.set}>
					<Link href='./new-set'>
						<div className={style.bluer}>
							<Image src={plus} />
							<p>Create a new Set</p>
						</div>
					</Link>
					<h3 className={style.title}>Set exemple</h3>
					<div className={style.list}>
						<div className={style.list_element}>🏆: 24:37</div>
						<div className={style.list_element}>⛔ : 18</div>
					</div>
					<Stars />
					<Btn>Start</Btn>
				</div>
			</div>
		</div>
	);
}

export default GameMap;
