$(document).ready(function() {
    var visible = false;

    $('.icon-drop-down').click(function() {
        if (!visible)
            dropDown($('.login-or-register'));
        else
            dragUp($('.login-or-register'));
        visible = !visible;
    });

    $('.icon-drop-down-nominate').click(function() {
        if (!visible)
            dropDown($('.nominate-your-hero'));
        else
            dragUp($('.nominate-your-hero'));
        visible = !visible;
    });


    $('.accept').click(function() {
        $('#terms-and-conditions-modal').trigger('reveal:close');
        $('#terms-and-conditions').attr('checked', 'true');
    });

    $('.terms-and-conditions').change(function() {
        if ($(this).is(':checked')) {
            if ($(this).hasClass('b'))
                $('.tac-error.b').addClass('hidden');
            else
                $('.tac-error').addClass('hidden');
        }
    });

    $('.timeline .cta').click(function() {
        revealDropDown();
    });

    function revealDropDown() {
        if (isLoggedIn())
            dropDown($('.nominate-your-hero'));
        else
            dropDown($('.login-or-register'));
        visible = !visible;
    }

    function isLoggedIn() {
        return $('.icon-drop-down-nominate').length > 0;
    }

    function dropDown(element) {
//        hideSlider();
        element.transition({ y: '370px' });
        $('.icon-holder').transition({ y: '370px' });
    }

    function dragUp(element) {
        element.transition({ y: '0px' });
        $('.icon-holder').transition({ y: '0px' });
    }

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

    var postRunning = false;
    $('.finish').click(function() {
        if(postRunning) {
            return;
        }

        var isSidebar = $(this).hasClass('b');
        var cls = isSidebar ? 'b' : 'a';
        postRunning = true;
        $(".finish." + cls).addClass('waiting');

        var hasError = false;
        var hasNominee = false;
        var hasMtcn = false;
        var title = $(".story-title." + cls).val();
        var body = $('.story-body.' + cls).val();

        var nomineeName = $('.nominee.' + cls).val();
        var mtcn = $('.mtcn.' + cls).val();

        if (title == "" || title.length == 0) {
            $('.story-title.' + cls).addClass('error');
            hasError = true;
        }
        else
            $('.story-title.' + cls).removeClass('error');

        if (body == "" || body.length == 0) {
            $('.story-body.' + cls).addClass('error');
            hasError = true;
        }
        else
            $('.story-body.' + cls).removeClass('error');

        hasNominee = nomineeName != "" && nomineeName.length > 0;
        hasMtcn = mtcn != "" || mtcn.length > 0;
        if (hasNominee || hasMtcn) {
            //then should have both
            if (hasNominee && hasMtcn) {
                $('.mtcn.' + cls).removeClass('error');
                $('.nominee.' + cls).removeClass('error');
                //check if terms and conditions has been setup
                var tacChecked = $('.terms-and-conditions.' + cls).is(':checked');

                if (!tacChecked) {
                    hasError = true;
                    $('.tac-error.' + cls).removeClass('hidden');
                }
            }
            else
            {
                if (!hasNominee)
                    $('.nominee.' + cls).addClass('error');
                if (!hasMtcn)
                    $('.mtcn.' + cls).addClass('error');
                hasError = true;
            }
        }

        if (hasError) {
            postRunning = false;
            $('.finish.' + cls).removeClass('waiting');
            $('.story-title.' + cls).focus();
            return;
        }
        else {
            var spinnerId = isSidebar ? 'story-spinner-b' : 'story-spinner-a';
            var s = showSpinner(spinnerId);
            var options = {
                clearForm: true,
                success: function() {
                    postRunning = false;
                    s.stop();

                    var toHide = isSidebar ? '.sidebar' : '.add-story';

                    $('.finish.' + cls).removeClass('waiting');
                    $(toHide).transition({
                        opacity: 0
                    }, function() {
                        $(toHide).addClass('hidden');
                        $('.thank-you.' + cls).removeClass('hidden');
                    });
                }
            }
            var storyForm = isSidebar ? '#sidebar-add-story' : '#add-story-form';
            $(storyForm).ajaxForm(options);
            $(storyForm).submit();
        }
    });

    var registerRunning = false;
    $('.next').click(function() {
        if (registerRunning) {
            return;
        }
        registerRunning = true;
        $('.next').addClass('waiting');


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

        if (hasError) {
            registerRunning = false;
            return;
        }
        else {
            var s = showSpinner('spinner-a');
            var url = "/users";
            var location = city + ", " + country;
            $('#location').val(city + ", " + country);
            var options = {
                success: function() {
                    $.get('/verify_login', function(data) {
                        registerRunning = false;
                        var id = data.id;
                        s.stop();
                        $('#add-story-form').attr('action', "/users/" + id + "/stories");
                        hideLogin();
                    });
                },
                error: function(response) {
                    //most probably an issue with the email address
                    $('#email').addClass('error');
                    $('.next').removeClass('waiting');
                    s.stop();
                    registerRunning = false;
                },
                clearForm: true
            }

            $('#registration-form').ajaxForm(options);
            $('#registration-form').submit();
        }
    });

    function hideLogin() {
        $('.login-or-register')
            .transition({ y: 0 },
            function() {
                console.log("Transition callback");
                $('.login-or-register').addClass('hidden');
                $('.nominate-your-hero').removeClass('hidden').transition({ y: '370px' });
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