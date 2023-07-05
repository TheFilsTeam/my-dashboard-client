import { useEffect } from 'react';

class TimerService {
	constructor(setTimerStatus, setRemainingSeconds) {
		this.timer = null;
		this.timerType = 'Break';
		this.setTimerStatus = setTimerStatus;
		this.setRemainingSeconds = setRemainingSeconds;
		this.timerStatus = TimerStatus.Stopped;
		this.remainingSeconds = 0;
		this.initialTime = 0;
		this.elapsedTime = 0;
		this.startTime = 0;
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
		this.remainingSeconds = this.initialTime;
		this.setRemainingSeconds(this.remainingSeconds);
		this.setTimerStatus(this.timerStatus);
		this.timerType = 'Break';
	};

	toggleTimer = () => {
		this.timerStatus =
			this.timerStatus !== TimerStatus.InProgress
				? TimerStatus.InProgress
				: TimerStatus.Paused;

		this.setTimerStatus(this.timerStatus);

		if (this.timerType === 'Break') {
			this.timerType = 'Work';
		} else if (this.timerType === 'Work') {
			this.timerType = 'Break';
		}
	};

	finishedTimer = () => {
		if (Notification.permission === 'granted') {
			var options = {
				body: 'Please take a break!',
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

	trackElapsedTime = () => {
		useEffect(() => {
			console.log('timer status: ', this.timerStatus);
			if (this.timerStatus === TimerStatus.InProgress) {
				console.log('in progress');
				this.startTime = Date.now();
			} else if (
				(this.timerStatus === TimerStatus.Paused ||
					this.timerStatus === TimerStatus.Stopped) &&
				this.startTime !== 0
			) {
				this.elapsedTime = Date.now() - this.startTime;

				let elapsedSeconds = Math.round(this.elapsedTime / 1_000);
				console.log('elapsed seconds', elapsedSeconds);
				this.saveElapsedTime(elapsedSeconds);
			}
		}, [this.timerStatus]);
	};

	saveElapsedTime = (elapsedSeconds) => {
		let previousElapsedWorking = JSON.parse(
			localStorage.getItem('workingTime')
		);
		let previousElapsedBreaking = JSON.parse(
			localStorage.getItem('breakingTime')
		);

		console.log('prev working', previousElapsedWorking);
		console.log('prev breaking', previousElapsedBreaking);

		if (this.timerType === 'Work') {
			localStorage.setItem(
				'breakingTime',
				JSON.stringify(previousElapsedWorking + elapsedSeconds)
			);
			console.log('breakingTime', localStorage.getItem('workingTime'));
		} else if (this.timerType === 'Break') {
			localStorage.setItem(
				'workingTime',
				JSON.stringify(previousElapsedBreaking + elapsedSeconds)
			);
		}
	};
}

console.log('local storage elapsed', localStorage.getItem('elapsedTime'));

const TimerStatus = {
	Stopped: 'Stopped',
	InProgress: 'In progress',
	Paused: 'Paused',
};

export { TimerService, TimerStatus };
