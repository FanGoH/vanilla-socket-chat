const socket = io();

const messages = document.querySelector("div.messages");
const nicknameInput = document.querySelector("input.nickname");
const messageInput = document.querySelector("input.message");

const sendButtton = document.querySelector("button.send-message-button");

const createMessage = (data) => {
	const element = document.createElement("div");
	element.innerHTML = `<p class="author">${data.sender}</p> <p class="message">${data.msg}</p>`;
	element.classList.add("other-message");

	return element;
};

sendButtton.addEventListener("click", () => {
	socket.emit("message", {
		id: socket.id,
		sender: nicknameInput.value,
		msg: messageInput.value,
	});

	const element = document.createElement("div");
	element.classList.add("my-message");
	element.innerHTML = `<p class="message">${messageInput.value}</p>`;
	messages.appendChild(element);
});

socket.on("message", (data) => {
	messages.appendChild(createMessage(data));
});
