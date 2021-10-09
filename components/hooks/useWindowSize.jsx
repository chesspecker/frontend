import {useState, useEffect} from 'react';
/* Usage
	function App() {
	const size = useWindowSize();
	return (
		<div>
			{size.width}px / {size.height}px
		</div>
	);
} */

export default function useWindowSize() {
	const [windowSize, setWindowSize] = useState({
		width: 0,
		height: 0,
	});
	useEffect(() => {
		const handleResize = () => {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return windowSize;
}