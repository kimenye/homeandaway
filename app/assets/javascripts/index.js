$(document).ready(function() {
//    $('.vote-link').click(function(link) {
//        var link = $(this);
//        var id = link.data('id');
//
//        var url = "/nominees/" + id + "/votes";
//
//        $.post(url, function(result) {
//            link.remove();
//        });
//    });

    $('.icon-drop-down').click(function() {
        console.log("Clicked the drop down", $('.login-or-register'));
        $('.login-or-register').removeClass('hidden').transition({ y: '265px' });
    });
});