$(document).ready(function() {
    $('.vote-link').click(function(link) {
        var link = $(this);
        var id = link.data('id');

        var url = "/nominees/" + id + "/votes";

        $.post(url, function(result) {
            link.remove();
        });
    });
});