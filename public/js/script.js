KeyboardJS.on('ctrl+enter', function (event, keysPressed, keyComboString) {
    var data = { code: document.getElementById('code').value };
    var path = new URL(document.URL).pathname;

    var request = new XMLHttpRequest();
    request.open('POST', path, true);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);
            console.log(data);
        } else {
            // oops
        }
    };
    request.onerror = function() { /* damnit */ };
    request.send(JSON.stringify(data));
});
