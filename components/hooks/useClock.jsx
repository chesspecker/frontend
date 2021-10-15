const useClock = count => {
	return count < 10
		? '00:0' + count
		: count < 60
		? '00:' + count
		: count < 600
		? '0' +
		  Math.floor(count / 60) +
		  ':' +
		  (count % 60 < 10 ? '0' + (count % 60) : count % 60)
		: Math.floor(count / 60) +
		  ':' +
		  (count % 60 < 10 ? '0' + (count % 60) : count % 60);
};

export default useClock;
