import Router from 'next/router.js';
import Image from 'next/image.js';
import Link from 'next/link.js';
import {useEffect, useState} from 'react';
import STYLE from './index.module.scss';
import http from '@/services/http-service.js';
import Container from '@/layouts/container/index.jsx';
import Button from '@/components/button/index.jsx';
import plus from '@/public/images/plus.svg';
import ConfirmRemovePopup from '@/components/popup/confirm-remove.jsx';
import PuzzleSet from '@/components/puzzle-set/index.jsx';
import useSetsDashboard from '@/hooks/use-sets-dashboard.jsx';
import {useUserContext} from '@/context/user-context.jsx';

export default function Dashboard() {
	const api = process.env.API;
	const setsDatabase = useSetsDashboard();
	const [sets, setSets] = useState([]);
	const [toggleConfirm, setToggleConfirm] = useState(false);
	const [setToRemove, setSetToRemove] = useState('');

	useEffect(() => {
		setSets(() => setsDatabase);
	}, [setsDatabase]);

	const {updateCurrentSet} = useUserContext();

	const handleCurrentSet = set => {
		updateCurrentSet(set);
		Router.push('/playing');
	};

	const handleConfirm = set => {
		setSetToRemove(() => set);
		setToggleConfirm(() => true);
	};

	const removeSet = async value => {
		if (!value) return setToggleConfirm(() => false);
		const setInArray = sets.find(s => s._id === setToRemove);
		const index = sets.indexOf(setInArray);
		setSets(oldArray => {
			const array = [...oldArray];
			array.splice(index, 1);
			return array;
		});
		setToggleConfirm(() => false);
		try {
			await http.delete(`${api}/set/id/${setToRemove}`, {
				withCredentials: true,
			});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Container>
			<div className={STYLE.container}>
				{toggleConfirm && <ConfirmRemovePopup onRemove={removeSet} />}
				<div className={STYLE.content}>
					<h1 className={STYLE.title}>Here are your sets!</h1>
					<p className={STYLE.description}>
						Solve the same puzzles again and again, only faster. It’s not a lazy
						shortcut to success – hard work is required. But the reward can be
						re-programming your unconscious mind. Benefits include sharper
						tactical vision, fewer blunders, better play when in time trouble
						and improved intuition.
					</p>
					<div className={STYLE.gameSet}>
						{sets &&
							sets.map(s => (
								<PuzzleSet
									key={s._id}
									sets={s}
									number={sets.indexOf(s)}
									id={s._id}
									setCurrentSet={() => handleCurrentSet(s._id)}
									onDelete={handleConfirm}
								/>
							))}
						<div className={STYLE.set}>
							<Link href='./create'>
								<div className={STYLE.bluer}>
									<Image src={plus} />
									<p>Create a set</p>
								</div>
							</Link>
							<Button>START ⚔️</Button>
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
}
