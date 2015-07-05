var host = new URL(document.URL).host;
var path = new URL(document.URL).pathname;

KeyboardJS.on('ctrl+enter', function (event, keysPressed, keyComboString) {
    var url = document.getElementById('snippet-url');
    var codeEdit = document.getElementById('code-edit');

    if (codeEdit.value.trim().length > 0) {
        var request = new XMLHttpRequest();
        request.open('POST', path, true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                KeyboardJS.clear('ctrl+enter');
                codeEdit.disabled = true;
                var data = JSON.parse(request.responseText);
                url.textContent = host + '/' + data.id;
                url.style.display = "inline-block";
                url.focus();
                url.select();
            } else {
                // oops
            }
        };
        request.onerror = function() { /* damnit */ };
        request.send(JSON.stringify({ code: codeEdit.value }));
    }

});
