import { useState } from "react";
import { useTimer } from "react-timer-hook";

export const useAchievementCounter = () => {
	const [timesTaskChecked, setTimesTaskChecked] = useState(0);
	const [checkboxClickedRecently, setCheckboxClickedRecently] = useState(false);
	const [isSnackbarOpen, setSnackbarOpen] = useState(false);
	const [previousClickTime, setPreviousClickTime] = useState(null);

	const onTimerExpire = () => {
		setCheckboxClickedRecently(false);
		setSnackbarOpen(false);
		setTimesTaskChecked(0);
	};

	const time = new Date();
	time.setSeconds(time.getSeconds() + 2);
	const myTimer = useTimer({autoStart: false, expiryTimestamp: time, onExpire: onTimerExpire});

	const startCount = () => {
		const currentClickTime = Date.now();

		setTimesTaskChecked(timesTaskChecked + 1);

		if (checkboxClickedRecently && (currentClickTime - previousClickTime < 2000)) {
			myTimer.restart(time, true);
			return;
		}

		setCheckboxClickedRecently(true);
		setPreviousClickTime(Date.now());

		if (myTimer.isRunning) {
			return;
		}

		myTimer.start();

		setSnackbarOpen(true);
	}

	return {
		startCount,
		isSnackbarOpen,
		timesTaskChecked
	}
};