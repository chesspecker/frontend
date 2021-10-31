import router from 'next/router.js';
import Image from 'next/image.js';
import Link from 'next/link.js';
import {useEffect, useState} from 'react';
import useSetsDashboard from '../../components/hooks/useSetsDashboard.jsx';
import GameSet from '../../components/layouts/sets/GameSet.jsx';
import {useUserContext} from '../../components/context/UserContext.jsx';
import Btn from '../../components/layouts/btn/Btn.jsx';
import plus from '../../public/images/plus.svg';
import http from '../../services/http-service.js';
import ConfirmRemovePopup from '../../components/layouts/popup/ConfirmRemovePopup.jsx';
import style from './index.module.scss';

function GameMap() {
	const api = process.env.API;
	const setsDatabase = useSetsDashboard();
	const [sets, setSets] = useState([]);
	const [toggleConfirm, setToggleCOnfirm] = useState(false);
	const [setToRemove, setSetToRemove] = useState('');

	useEffect(() => {
		setSets(() => setsDatabase);
	}, [setsDatabase]);

	const {updateCurrentSet} = useUserContext();

	const handleCurrentSet = set => {
		updateCurrentSet(set);
		router.push('/playing');
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
				const array = [...oldArray];
				array.splice(index, 1);
				return array;
			});
			setToggleCOnfirm(() => false);
			try {
				await http.delete(`${api}/set/id/${setToRemove}`, {
					withCredentials: true,
				});
			} catch (error) {
				console.error(error);
			}
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
						<Link href='./create'>
							<div className={style.bluer}>
								<Image src={plus} />
								<p>Create a set</p>
							</div>
						</Link>
						<Btn>START ⚔️</Btn>
					</div>
				</div>
			</div>
		</div>
	);
}

export default GameMap;
