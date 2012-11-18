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
        $('.login-or-register').removeClass('hidden').transition({ y: '295px' });
    });

    $('.upload-picture').filestyle({
        image: "/assets/upload-picture.png",
        imageheight : 31,
        imagewidth : 148,
        width : 150
    });
    $('.file.upload-picture').css('display', 'none');
});