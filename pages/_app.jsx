import Head from 'next/head.js';
import {useState, useMemo, useCallback} from 'react';
import {NewSetContext} from '@/context/new-set-context.jsx';
import '@/styles/globals.css';
import '@/styles/chessground.css';
import '@/styles/pieces.css';

function MyApp({Component, pageProps}) {
	const [newSet, setNewSet] = useState({
		title: '',
		size: 0,
		themeArray: [],
	});

	const updateNewSetOptions = useCallback(
		data => setNewSet(rest => ({...rest, themeArray: data})),
		[],
	);

	const updateNewSetSize = useCallback(
		data => setNewSet(rest => ({...rest, size: data})),
		[],
	);

	const updateNewSetTitle = useCallback(
		data => setNewSet(rest => ({...rest, title: data})),
		[],
	);

	const newSetContextValue = useMemo(
		() => ({
			newSet,
			updateNewSetOptions,
			updateNewSetSize,
			updateNewSetTitle,
		}),
		[newSet, updateNewSetOptions, updateNewSetSize, updateNewSetTitle],
	);

	return (
		<>
			<Head>
				<meta property='og:title' content='Chesspecker' />
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>
			<NewSetContext.Provider value={newSetContextValue}>
				<Component {...pageProps} />
			</NewSetContext.Provider>
		</>
	);
}

export default MyApp;
