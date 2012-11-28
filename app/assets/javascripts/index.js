$(document).ready(function() {
    var visible = false;

    $('#slider').orbit({ fluid: '16x6', timer: true,
        afterSlideChange: function(prev, active) {
            var currSlide = currentSlideIdx(active);
            if (currSlide == 1) {
                $('.slider-nav .right').removeClass('right-1').addClass('right-2');
                $('.slider-nav .left').removeClass('left-1').addClass('left-0');
            }
            else if (currSlide == 2) {
                $('.slider-nav .right').removeClass('right-2').addClass('right-0');
                $('.slider-nav .left').removeClass('left-2').addClass('left-1');
            }
            else {
                $('.slider-nav .right').removeClass('right-0').addClass('right-1');
                $('.slider-nav .left').removeClass('left-0').addClass('left-2');
            }
        },
        afterLoadComplete: function() {
            $('.slider-nav .right').addClass('right-1');
            $('.slider-nav .left').addClass('left-2');
        }
    });


    function currentSlideIdx(elem) {
        if (elem.hasClass('slide-1'))
            return 0;
        else if (elem.hasClass('slide-2'))
            return 1;
        else
            return 2;
    }


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

//    if(true) {
//        dropDown($('.nominate-your-hero'));
//        visible = true;
//    }

    $('.accept').click(function() {
        $('#terms-and-conditions-modal').trigger('reveal:close');
        $('#terms-and-conditions').attr('checked', 'true');
    });

    $('#terms-and-conditions').change(function() {
        if ($(this).is(':checked')) {
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
        hideSlider();
        element.transition({ y: '295px' });
        $('.icon-holder').transition({ y: '295px' });
    }

    function dragUp(element) {
        showSlider();
        element.transition({ y: '0px' });
        $('.icon-holder').transition({ y: '0px' });
    }

    function hideSlider() {
        $('.orbit-wrapper').transition({ opacity: 0, zIndex: 0 }, function() {
            $('.orbit-wrapper').toggleClass('hidden');
        });
    }

    function showSlider() {
        $('.orbit-wrapper').transition({ opacity: 1 }, function() {
            $('.orbit-wrapper').toggleClass('hidden');
        });
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
        postRunning = true;
        $('.finish').addClass('waiting');

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

        hasNominee = nomineeName != "" && nomineeName.length > 0;
        hasMtcn = mtcn != "" || mtcn.length > 0;
        if (hasNominee || hasMtcn) {
            //then should have both
            if (hasNominee && hasMtcn) {
                $('#mtcn').removeClass('error');
                $('#nominee').removeClass('error');
                //check if terms and conditions has been setup
                var tacChecked = $('#terms-and-conditions').is(':checked');

                if (!tacChecked) {
                    hasError = true;
                    $('.tac-error').removeClass('hidden');
                }
            }
            else
            {
                if (!hasNominee)
                    $('#nominee').addClass('error');
                if (!hasMtcn)
                    $('#mtcn').addClass('error');
                hasError = true;
            }
        }

        if (hasError) {
            postRunning = false;
            $('.finish').removeClass('waiting');
            return;
        }
        else {
            var s = showSpinner('story-spinner');
            var options = {
                clearForm: true,
                success: function() {
                    postRunning = false;
                    $('.finish').removeClass('waiting');
                    $('.add-story').transition({
                        opacity: 0
                    }, function() {
                        $('.add-story').addClass('hidden');
                    });
                }
            }
            $('#add-story-form').ajaxForm(options);
            $('#add-story-form').submit();
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
            var s = showSpinner('spinner');
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