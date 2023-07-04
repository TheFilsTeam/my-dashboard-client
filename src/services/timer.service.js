class TimerService {
	constructor(setTimerStatus, setRemainingSeconds) {
		this.timer = null;
		this.setTimerStatus = setTimerStatus;
		this.setRemainingSeconds = setRemainingSeconds;
		this.timerStatus = TimerStatus.Stopped;
		this.remainingSeconds = 0;
		this.initialTime = 0;
	}

	startTimer = (initialTime) => {
		if (this.timer !== null || initialTime === 0) {
			return;
		}

		this.initialTime = initialTime;
		this.timerStatus = TimerStatus.InProgress;
		this.remainingSeconds = initialTime;
		this.setRemainingSeconds(this.remainingSeconds);

		this.timer = setInterval(() => {
			if (this.timerStatus !== TimerStatus.InProgress) {
				return;
			}

			console.log('Ticking....Updating value....');
			this.remainingSeconds--;

			if (
				this.timerStatus === TimerStatus.InProgress &&
				this.remainingSeconds === 0
			) {
				this.stopTimer();
				this.finishedTimer();
			} else {
				this.setRemainingSeconds(this.remainingSeconds);
			}
		}, 1000);
	};

	setInitialTime = (initialTime) => {
		if (this.timer !== null || initialTime === 0) {
			return;
		}

		this.initialTime = initialTime;
		this.remainingSeconds = initialTime;
		this.setRemainingSeconds(this.remainingSeconds);
	};

	stopTimer = () => {
		clearInterval(this.timer);
		this.timerStatus = TimerStatus.Stopped;
		this.timer = null;
		console.log('reset to initial', this.initialTime);
		this.setRemainingSeconds(this.initialTime);
		this.setTimerStatus(this.timerStatus);
	};

	toggleTimer = () => {
		this.timerStatus =
			this.timerStatus !== TimerStatus.InProgress
				? TimerStatus.InProgress
				: TimerStatus.Paused;

		this.setTimerStatus(this.timerStatus);
	};

	finishedTimer = () => {
		if (Notification.permission === 'granted') {
			var options = {
				body: 'Please make a break!',
				icon: './hourglass.png',
			};
			new Notification('Time is up!', options);
		} else {
			alert('Timer finished!');
		}
	};

	// updateRemainingSeconds(seconds) {
	//     this.remainingSeconds = seconds;
	//     console.log('timer:', seconds);
	// }

	getTime = () => {
		return this._timeFormat(this.remainingSeconds);
	};

	_timeFormat = (s) => {
		let minutes = Math.floor(s / 60);
		let seconds = (s % 60).toString().padStart(2, '0');

		return `${minutes}:${seconds}`;
	};

	getStatus = () => this.timerStatus;
}

const TimerStatus = {
	Stopped: 'Stopped',
	InProgress: 'In progress',
	Paused: 'Paused',
};

export { TimerService, TimerStatus };
