$(document).ready(function() {
    $('.vote-link').click(function(link) {
        var id = $(this).data('id');
        var url = "/nominees/" + id + "/votes";
        $.post(url, function(result) {
        });
    });
});