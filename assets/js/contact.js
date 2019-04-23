
jQuery(document).ready(function ($) { // wait until the document is ready
    $('#send').click(function(){ // when the button is clicked the code executes
        $('.error').fadeOut('slow'); // reset the error messages (hides them)

        $.ajaxSetup({
            headers: {
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            }
        });

        var error = false; // we will set this true if the form isn't valid

        var name = $('input#name').val(); // get the value of the input field
        if(name == "" || name == " ") {
            $('#err-name').fadeIn('slow'); // show the error message
            error = true; // change the error state to true
        }

        var email_compare = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // Syntax to compare against input
        var email = $('input#email').val(); // get the value of the input field
        if (email == "" || email == " ") { // check if the field is empty
            $('#err-email').fadeIn('slow'); // error - empty
            error = true;
        }else if (!email_compare.test(email)) { // if it's not empty check the format against our email_compare variable
            $('#err-emailvld').fadeIn('slow'); // error - not right format
            error = true;
        }

        if(error == true) {
            $('#err-form').slideDown('slow');
            return false;
        }

        var data_string = $('#ajax-form').serialize(); // Collect data from form


        $.ajax({
            type: "POST",
            url: $('#ajax-form').attr('action'),
            data: data_string,
            timeout: 6000,
            error: function(request,error) {

                if (error == "timeout") {
                    $('#err-timedout').slideDown('slow');
                }
                else {
                    $('#err-state').slideDown('slow');
                    $("#err-state2").html("Une erreur s'est produite: " + error + "");
                }
            },
            success: function(data) {

                if(data.success != null){
                    $('#ajax-form').slideUp('slow');
                    $('#ajaxsuccess').slideDown('slow');
                }else{
                    $('#err-state').slideDown('slow');
                    $("#err-state2").html("Une erreur s'est produite: Veuillez recharger la page. ");
                }

            }
        });

        return false; // stops user browser being directed to the php file
    }); // end click function


    $('#sendNewsLetter').click(function(){ // when the button is clicked the code executes


        $.ajaxSetup({
            headers: {
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            }
        });

        var error = false; // we will set this true if the form isn't valid


        var email_compare = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // Syntax to compare against input
        var email = $('input#email').val(); // get the value of the input field
        if (email == "" || email == " ") { // check if the field is empty
            $('#err-email').fadeIn('slow'); // error - empty
            error = true;
        }else if (!email_compare.test(email)) { // if it's not empty check the format against our email_compare variable
            $('#err-emailvld').fadeIn('slow'); // error - not right format
            error = true;
        }

        if(error == true) {
            $('#err-form2').slideDown('slow');
            return false;
        }

        var data_string = $('#ajax-form2').serialize(); // Collect data from form


        $.ajax({
            type: "POST",
            url: $('#ajax-form2').attr('action'),
            data: data_string,
            timeout: 6000,
            error: function(request,error) {

                if (error == "timeout") {
                    $('#err-timedout2').slideDown('slow');
                }
                else {
                    $('#err-state2').slideDown('slow');
                    $("#err-state22").html("Une erreur s'est produite: " + error + "");
                }
            },
            success: function(data) {

                if(data.error != null){
                    $('#err-state2').slideDown('slow');
                    $("#err-state22").html("Vous nous suivez déjà !!");
                }else{
                    $(location).attr('href', 'http://aljazeeramall.ma/');
                }

            }
        });

        return false; // stops user browser being directed to the php file
    }); // end click function
});


