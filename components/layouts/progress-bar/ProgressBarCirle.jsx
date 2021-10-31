import style from './ProgressBarCircle.module.scss';

const cleanPercentage = percentage => {
	const isNegativeOrNaN =
		!Number.isFinite(Number(percentage)) || percentage < 0; // We can set non-numbers to 0 here
	const isTooHigh = percentage > 100;
	return isNegativeOrNaN ? 0 : isTooHigh ? 100 : Number(percentage);
};

function Circle({colour, percentage}) {
	const r = 70;
	const circ = 2 * Math.PI * r;
	const strokePct = ((100 - percentage) * circ) / 100; // Where stroke will start, e.g. from 15% to 100%.
	return (
		<circle
			r={r}
			cx={100}
			cy={100}
			fill='transparent'
			stroke={strokePct === circ ? '' : colour} // Remove colour as 0% sets full circumference
			strokeWidth='2rem'
			strokeDasharray={circ}
			strokeDashoffset={percentage ? strokePct : 0}
		/>
	);
}

function Text({percentage}) {
	return (
		<text
			className={style.text}
			x='50%'
			y='50%'
			dominantBaseline='central'
			textAnchor='middle'
			color='yellow'
			fontSize='2rem'
		>
			{percentage.toFixed(0)}%
		</text>
	);
}

export function ProgressBarCircle({percentage, colour, colourFont}) {
	const pct = cleanPercentage(percentage);
	return (
		<svg width={200} height={200}>
			<g transform={`rotate(-90 ${'100 100'})`}>
				<Circle colour={colourFont} />
				<Circle colour={colour} percentage={pct} />
			</g>
			<Text percentage={pct} />
		</svg>
	);
}
