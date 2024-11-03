$(document).ready(function() {
    $.ajax({
        url: 'https://wpmonitor.online/status',
        method: 'GET',
        success: function(response, textStatus, xhr) {
            if (xhr.status === 200 && response.status === 'Server is working') {
                $('#server-status-icon').addClass('blink green');
                $('#server-status-text').text('server is working');
            } else {
                $('#server-status-icon').addClass('blink red');
                $('#server-status-text').text('server down');
            }
        },
        error: function() {
            $('#server-status-icon').addClass('blink red');
            $('#server-status-text').text('server down');
        }
    });
});