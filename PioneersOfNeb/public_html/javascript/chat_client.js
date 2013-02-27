var socket = io.connect('http://localhost:8080');

// on connection to server, ask for username with an anon callback
socket.on('connect', function () {
    // call the server-side function 'adduser' and send one param (value of prompt)
    socket.emit('adduser', prompt("What's your name?"));
});

// listener, whenever the server emits 'updatechat', this updates chat body
socket.on('updatechat', function (username, data) {
    $('#conversation').append('<p><b>' + username + ':</b> ' + data + '</p><br>');
});

// listener, whenever the server emits 'updateusers', this updates the username list
socket.on('updateusers', function (data) {
    $('#users').empty();
    $.each(data, function (key, value) {
        $('#users').append('<div>' + key + '</div>');
    });
});

// on load of page
$(function() {
    // when the client clicks send
    $('#datasend').click(function() {
        var message = $('#data').val();
        // tell server to execute 'sendchat' and send along one param
        socket.emit('sendchat', message);
    });

    // when the client hits enter on keyboard
    $('#data').keypress(function(e) {
        if (e.which == 13) {
            $(this).blur();
            $('#datasend').focus().click();
        }
    });
});