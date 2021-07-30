const ChatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const socket = io()

// Get Username and Room from the URL
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

socket.emit('joinRoom', {username, room})

// Message from Server
socket.on('message', message => {
    console.log(message)
    outputMessage(message)

    // Sroll Down
    chatMessages.scrollTop = chatMessages.scrollHeight
})

// When the Message's Submit
ChatForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // Get the Message text from input
    const msg = e.target.elements.msg.value;

    // Emmiting the Chat message to server
    socket.emit('chatMessage', msg)

    // Clearing the input
    e.target.elements.msg.value = ''
    e.target.elements.msg.focus()
})

// Output message to the DOM
function outputMessage(message) {
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
        <p class="text">
        ${message.text}
    </p>`;

    chatMessages.appendChild(div)
}