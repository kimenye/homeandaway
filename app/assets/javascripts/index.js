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

    var visible = false;

    $('.icon-drop-down').click(function() {
        if (!visible)
            $('.login-or-register').transition({ y: '295px' });
        else
            $('.login-or-register').transition({ y: '0px' });
        visible = !visible;
    });

    $('.icon-drop-down-nominate').click(function() {
        if (!visible)
            $('.nominate-your-hero').transition({ y: '295px' });
        else
            $('.nominate-your-hero').transition({ y: '0px' });
        visible = !visible;
    });

    $('.upload-picture').filestyle({
        image: "/assets/upload-picture.png",
        imageheight : 31,
        imagewidth : 148,
        width : 150
    });
    $('.file.upload-picture').css('display', 'none');

    $('.next').click(function() {

    });
});