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
import ConfirmRemovePopup from '../../components/layouts/popup/ConfirmRemovePopup.jsx';
import style from './index.module.scss';

function GameMap() {
	const api = process.env.API;
	const setsDatabase = useSets();
	console.log(setsDatabase);
	const [sets, setSets] = useState([]);
	const [toggleConfirm, setToggleCOnfirm] = useState(false);
	const [setToRemove, setSetToRemove] = useState('');

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

	const handleConfirm = set => {
		setSetToRemove(() => set);
		setToggleCOnfirm(() => true);
	};

	const removeSet = async value => {
		if (value) {
			const setInArray = sets.find(s => s._id === setToRemove);
			const index = sets.indexOf(setInArray);
			setSets(oldArray => {
				array = [...oldArray];
				array.splice(index, 1);
				return array;
			});
			setToggleCOnfirm(() => false);
			await http.delete(`${api}/puzzles/set/id/${setToRemove}`, {
				withCredentials: true,
			});
		} else {
			setToggleCOnfirm(() => false);
		}
	};

	return (
		<div className={style.container}>
			{toggleConfirm && <ConfirmRemovePopup onRemove={removeSet} />}
			<div className={style.content}>
				<h1 className={style.title}>Here are your sets!</h1>
				<p className={style.description}>
					Solve the same puzzles again and again, only faster. It’s not a lazy
					shortcut to success – hard work is required. But the reward can be
					re-programming your unconscious mind. Benefits include sharper
					tactical vision, fewer blunders, better play when in time trouble and
					improved intuition.
				</p>
				<div className={style.gameSet}>
					{sets &&
						sets.map(s => (
							<GameSet
								key={s._id}
								sets={s}
								number={sets.indexOf(s)}
								id={s._id}
								setCurrentSet={() => handleCurrentSet(s._id)}
								onDelete={handleConfirm}
							/>
						))}
					<div className={style.set}>
						<Link href='./new-set'>
							<div className={style.bluer}>
								<Image src={plus} />
								<p>Create a new Set</p>
							</div>
						</Link>
						<h3>Set exemple</h3>
						<div className={style.list}>
							<div className={style.list_element}>🏆: 24:37</div>
							<div className={style.list_element}>⛔ : 18</div>
						</div>
						<Stars />
						<Btn>START ⚔️</Btn>
					</div>
				</div>
			</div>
		</div>
	);
}

export default GameMap;
