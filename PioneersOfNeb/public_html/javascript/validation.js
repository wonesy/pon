// validates an email address, and ignore complicated emails, because i don't give a shit
// only returns true for emails with a single instance of '@' and the domain must have 
// at least one '.' with two substrings on either side of it.
function validateEmail(email) {
    if (typeof email != "string") return false;
    emailSplit = email.split("@");
    if (emailSplit.length < 2) return false;
    emailDot = emailSplit[1].split('.');
    if (emailDot.length < 2 || emailDot[emailDot.length-1].length < 2) return false;
    return true;
}

// simply checks that two strings are the same
function validatePasswords(password, confirm_password) {
	if (password === confirm_password)
		return true;
	return false;
}

// sends login information across the websocket
function sendLoginInfo(username, password) {
	//
}

// sends registration information across the websocket
function sendRegistrationInfo(email, username, password) {
	//
}