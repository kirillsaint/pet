function setPassword(password: string | null) {
	if (password === null) {
		window.localStorage.removeItem("auth-key");
		return;
	}
	window.localStorage.setItem("auth-key", password);
}

function getPassword() {
	return window.localStorage.getItem("auth-key")
		? "Bearer " + window.localStorage.getItem("auth-key")
		: null;
}

const auth = {
	setPassword: setPassword,
	getPassword: getPassword,
};

export default auth;
