$(document).ready(function() {
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

    $('.vote-link').click(function(link) {
        var link = $(this);

        var id = link.data('id');

        var url = "/nominees/" + id + "/votes";
        $.post(url, function(result) {
            link.addClass('icon-thank-you');
            link.removeClass('vote-link');
            var numVotes = $('.num-votes').data('num-votes') + 1;
            var totalVotes = $('.summary-num-votes').data('num-votes') + 1;
            $('.summary-num-votes').html(totalVotes);

            $('.num-votes').html(numVotes + " Votes");
        });
    });

    $('.file.upload-picture').css('display', 'none');

    $('.finish').click(function() {
        var hasError = false;
        var hasNominee = false;
        var hasMtcn = false;
        var title = $('#story-title').val();
        var body = $('#story-body').val();

        var nomineeName = $('#nominee').val();
        var mtcn = $('#mtcn').val();


        if (title == "" || title.length == 0) {
            $('#story-title').addClass('error');
            hasError = true;
        }
        else
            $('#story-title').removeClass('error');


        if (body == "" || body.length == 0) {
            $('#story-body').addClass('error');
            hasError = true;
        }
        else
            $('#story-body').removeClass('error');

        hasNominee = nomineeName == "" || nomineeName.length == 0;
        hasMtcn = mtcn == "" || mtcn.length == 0;

        if (hasNominee || hasMtcn) {
            //then should have both
            if (hasNominee && hasMtcn) {
                $('#mtcn').removeClass('error');
                $('#nominee').removeClass('error');
            }
            else
            {
                if (!hasNominee)
                    $('#nominee').addClass('error');
                if (!hasMtcn)
                    $('#mtcn').addClass('error');
            }
        }

        if (hasError)
            return;
        else {
            $('#add-story-form').ajaxForm(function() {
                $('.add-story').transition({
                    opacity: 0
                }, function() {
                    $('.add-story').addClass('hidden');
                });
            });
            $('#add-story-form').submit();
        }
    });

    $('.next').click(function() {
        var hasError = false;
        var hasConfirmedPassword = false;
        var email = $('#email').val();
        var name = $('#name').val();
        var city = $('#city').val();
        var country = $('#country').val();
        var password = $('#password').val();
        var passwordConfirm = $('#password-confirm').val();

        if (!validateEmail(email)) {
            $('#email').addClass('error');
            hasError = true;
        }
        else {
            $('#email').removeClass('error');
        }

        if (name == "" || name.length == 0) {
            $('#name').addClass('error');
            hasError = true;
        }
        else
            $('#name').removeClass('error');

        if (city == "" || city.length == 0) {
            hasError = true;
            $('#city').addClass('error');
        }
        else
            $('#city').removeClass('error');

        if (country == "" || country.length == 0) {
            hasError = true;
            $('#country').addClass('error');
        }
        else
            $('#country').removeClass('error');

        if (password == "" || password.length == 0) {
            hasError = true;
            $('#password').addClass('error');
        }
        else
            $('#password').removeClass('error');

        if (passwordConfirm == "" || passwordConfirm.length == 0) {
            hasError = true;
            $('#password-confirm').addClass('error');
        }
        else {
            hasConfirmedPassword = true;
            $('#password-confirm').removeClass('error');
        }

        if (password != passwordConfirm) {
            $('#password-confirm').addClass('error');
            hasError = true;
        }
        else
        {
            if (hasConfirmedPassword)
                $('#password-confirm').removeClass('error');
        }

        if (hasError)
            return;
        else {
            var s = showSpinner('spinner');
            $('.progress').toggleClass('hidden');

            var url = "/users";
            var location = city + ", " + country;

            $('#location').val(city + ", " + country);
            $('#registration-form').ajaxForm(function() {
                $.get('/verify_login', function(data) {
                    var id = data.id;
                    s.stop();
                    $('.progress').toggleClass('hidden');
                    $('#add-story-form').attr('action', "/users/" + id + "/stories");
                    hideLogin();
                });
            });
            $('#registration-form').submit();
        }
    });

    function hideLogin() {
        $('.login-or-register')
            .transition({ y: 0 },
            function() {
                console.log("Transition callback");
                $('.login-or-register').addClass('hidden');
                $('.nominate-your-hero').removeClass('hidden').transition({ y: '295px' });
                $('#story-title').focus();
            }
        );
    }

    function showSpinner(elem) {
        var opts = {
            lines: 13, // The number of lines to draw
            length: 7, // The length of each line
            width: 4, // The line thickness
            radius: 10, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            color: '#000', // #rgb or #rrggbb
            speed: 1, // Rounds per second
            trail: 60, // Afterglow percentage
            shadow: false, // Whether to render a shadow
            hwaccel: false, // Whether to use hardware acceleration
            className: 'spinner', // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            top: 'auto', // Top position relative to parent in px
            left: 'auto' // Left position relative to parent in px
        };
        var target = document.getElementById(elem);
        var spinner = new Spinner(opts).spin(target);
        return spinner;
    }

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
});