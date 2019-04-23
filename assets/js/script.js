

//------------------google map---------------------------//
$('.google-map')
 .click(function(){
   $(this).find('iframe').addClass('clicked')})
 .mouseleave(function(){
   $(this).find('iframe').removeClass('clicked')});
 
 
//------------duplicate menu---------------//

var ww = document.body.clientWidth;
$(document).on('ready', function () {
    if (ww < 979) {
        if ($('.navbar-collapse > ul > li .sub-menu').length) {
            $('ul.sub-menu').each(function () {
                $(this).siblings('a').clone().prependTo(this).wrap('<li />');
                $(this).siblings('a').removeAttr("href");
            });
            $('.nav-menu ul li a').on('click', function () {
                var Self = $(this);
                Self.parent().children('.sub-menu').slideToggle();
                return true;
            });

        };
    }
});


//------------page loader---------------//
$(window).load(function() {
	$(".se-pre-con").fadeOut("slow");;
});



//------------Home Page Contact Form Validation-----------------//

$(document).ready(function(e){
    $('form#home-contact').submit(function(e){
        var ret = true;
        var firstName = $('#first-name').val();
        var lastName  = $('#last-name').val();
        var phone     = $('#your-phone').val();
        var email     = $('#your-email').val();
        var message   = $('#your-message').val();
        if(firstName == ''){
            $('#first-name').parent('div').addClass('form-error');
            ret = false;
        }else{
            $('#first-name').parent('div').removeClass('form-error')
        }
        
         if(lastName == ''){
            $('#last-name').parent('div').addClass('form-error');
            ret = false;
        }else{
            $('#last-name').parent('div').removeClass('form-error')
        }
        
         if(phone == ''){
            $('#your-phone').parent('div').addClass('form-error');
            ret = false;
        }else{
            $('#your-phone').parent('div').removeClass('form-error')
        }
         if(email == ''){
            $('#your-email').parent('div').addClass('form-error');
            ret = false;
        }else if(validateEmail(email) == false){
            $('#your-email').parent('div').addClass('form-error');
            ret = false;
        }else{
            $('#your-email').parent('div').removeClass('form-error')
        }
          if(message == ''){
            $('#your-message').parent('div').addClass('form-error');
            ret = false;
        }else{
            $('#your-message').parent('div').removeClass('form-error')
        } 
        
         if(ret == true){             
            var rand = getRandom();$('.mail-msg').html('');           
        jQuery.ajax({
            type: "post",
            url: 'sendmail/home-email.php',
            async:true,
            data: {                
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                email: email,
                message: message,
                rands: rand
            },
            cache: false,
            success: function (data) {                
                if(data == 'success'){
                    $('.mail-msg').html('Thank you very much for contacting us.We will reach you shortly.');                   
                }               
            },
            error: function () {
                console.log("Error")
            }
        });
         }
        
        return false;
        
    });
});


//------------Contact Page Contact Form Validation-----------------//

$(document).ready(function(e){
    
	
			$('form#contact-us').submit(function(e){
				
				var ret = true;
				var name      = jQuery.trim($('#your-name').val());
				var email     = jQuery.trim($('#your-email').val());
				var subject   = jQuery.trim($('#your-subject').val());
				var message   = jQuery.trim($('#your-message').val());
				if(name == ''){
					$('#your-name').parent('div').addClass('form-error');
					ret = false;
				}else{
					$('#your-name').parent('div').removeClass('form-error')
				}        
				if(email == ''){
					$('#your-email').parent('div').addClass('form-error');
					ret = false;
				}else if(validateEmail(email) == false){
					$('#your-email').parent('div').addClass('form-error');
					ret = false;
				}else{
					$('#your-email').parent('div').removeClass('form-error')
				}
				if(subject == ''){
					$('#your-subject').parent('div').addClass('form-error');
					ret = false;
				}else{
					$('#your-subject').parent('div').removeClass('form-error')
				}    
				
				if(message == ''){
					$('#your-message').parent('div').addClass('form-error');
					ret = false;
				}else{
					$('#your-message').parent('div').removeClass('form-error')
				}           
				if(ret == true){             
					
					var rand = getRandom();            
					jQuery.ajax({
						type: "post",
						url: 'sendmail/contact-email.php',
						async:true,
						data: {                
							name: name,                
							email: email,
							subject: subject,
							message: message,
							rands: rand
						},
						cache: false,
						success: function (data) {
							
							if(data == 'success'){
								$('.mail-msg').html('Thank you very much for contacting us.We will reach you shortly.');  
							}               
						},
						error: function () {
							console.log("Error")
						}
					});
				}
				
				return false;       
			});
	

	

});

$(document).ready( function(){
		/*$('#contact-us input').blur(function(){
			if ($(this).val()) {
				$(this).parent('div').addClass('form-error');   
			}
		});*/
		$('#contact-us input,#contact-us textarea,#home-contact input,#home-contact textarea').focus(function(){
												
			$(this).parent('div').removeClass('form-error');  
		});
});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function getRandom() {
    var l = Math.floor(1729 * Math.random() * (9271 * Math.random())),
        e = (new Date).getTime(),
        o = l + e;
    return o
}


//-------- equalheight -------//

equalheight = function(container){

var currentTallest = 0,
     currentRowStart = 0,
     rowDivs = new Array(),
     $el,
     topPosition = 0;
 $(container).each(function() {

   $el = $(this);
   $($el).height('auto')
   topPostion = $el.position().top;

   if (currentRowStart != topPostion) {
     for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
       rowDivs[currentDiv].height(currentTallest);
     }
     rowDivs.length = 0; // empty the array
     currentRowStart = topPostion;
     currentTallest = $el.height();
     rowDivs.push($el);
   } else {
     rowDivs.push($el);
     currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
  }
   for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
     rowDivs[currentDiv].height(currentTallest);
   }
 });
}

$(window).load(function() {
 equalheight('.about-top [class^="col-"]');
 equalheight('.service [class^="col-"]');
 equalheight('.contact-col'); 
 equalheight('.company-ethos [class^="col-"]'); 
 equalheight('.service-btm-banner [class^="col-"]'); 
 equalheight('.service-list ul li a i, .service-list-text');
 equalheight('.team-single-grid [class^="col-"]');
 equalheight('.blue-merits ul li');
 equalheight('.contact-left, .contact-right');
 equalheight('.team-col');
 equalheight('.three-col-sec [class^="col-"]');
 equalheight('.two-col-sec [class^="col-"]');
 equalheight('.contact-single [class^="col-"]');
 equalheight('.blog-grid');
});


$(window).resize(function(){
 equalheight('.about-top [class^="col-"]');
 equalheight('.service [class^="col-"]');
 equalheight('.contact-col');
 equalheight('.company-ethos [class^="col-"]');
 equalheight('.service-btm-banner [class^="col-"]');
 equalheight('.service-list ul li a i, .service-list-text');
 equalheight('.team-single-grid [class^="col-"]');
 equalheight('.blue-merits ul li');
 equalheight('.contact-left, .contact-right');
 equalheight('.team-col');
 equalheight('.three-col-sec [class^="col-"]');
 equalheight('.two-col-sec [class^="col-"]');
 equalheight('.contact-single [class^="col-"]');
 equalheight('.blog-grid');
});



//-------- flexslider ----- //

	$(window).load(function(){
		if( $('.banner-slider').length )         // use this if you are using class to check
		{
		
			$('.banner-slider').flexslider({
				animation: "slide",
				directionNav: false,
				pauseOnAction:false,
				controlNav: true,
				start: function(slider){
				  $('body').removeClass('loading');
				}
			});
			
		}
	});
	

	$(window).load(function(){
		if( $('.image-slide').length )         
		{
		
			$('.image-slide').flexslider({
				animation: "slide",
				directionNav: true,
				pauseOnAction:false,
				controlNav: true,
				start: function(slider){
					$('body').removeClass('loading');
				}
			});
		
		}
	});
	
	
	$(window).load(function(){
		if( $('.test-slider').length )         
		{
			$('.test-slider').flexslider({
				animation: "fade",
				directionNav: false,
				pauseOnAction:false,
				controlNav: true,
				start: function(slider){
					$('body').removeClass('loading');
				}
			});
		}
	});


	$(window).load(function() {
		if( $('.partner-carousel').length )         
		{
			$('.partner-carousel').flexslider({
				animation: "slide",
				animationLoop: true,
				directionNav: false,
				pauseOnAction:false,
				controlNav: true,
				itemWidth:177,
				itemMargin: 10,
				minItems: 1,
				maxItems: 5,
			});
		}
	});



//--------------banner height--------------//

	$(document).ready(function() {
		function setHeight() {
			windowHeight = $(window).innerHeight();
			
			$('.full-screen-height').css('height', windowHeight);
		};
		setHeight();
	
		$(window).resize(function() {
			setHeight();
		});
	});



//----------------------scroll header ----------------------//

 function init() {
    window.addEventListener('scroll', function(e){
            var distanceY = window.pageYOffset || document.documentElement.scrollTop,
                shrinkOn = 150,
                header = document.querySelector(".nav-bar");
            if (distanceY > shrinkOn) {
                classie.add(header,"smaller");
            } else {
                if (classie.has(header,"smaller")) {
                    classie.remove(header,"smaller");
                }
            }
        });
    }
    window.onload = init();



///------------------------- # scroll  -----------------------//

$('.page-scroll-wrap a[href*="#"], .logo a[href*="#"]').click(function() { 
    var bodyClass = $('body').attr('class');
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 500);
      return false;
    }
  }
});



//--------- wow ------//
	if( $('.wow').length )         
	{
		var wow = new WOW(
		{
			boxClass:     'wow',      
			animateClass: 'animated', 
			offset:       0,   
			mobile:       false,  
			live:         true,   
			callback:     function(box) {
			},
			scrollContainer: null
		}
		);
	
		wow.init();
	}
  


//-------- popup----- //

$(document).ready(function() {
    if( $('.inline').length )         
	  {
		$(".inline").colorbox({
			inline: true,		
			maxWidth: "900",
			width: "100%",		
			rel: 'inline',
			current: false,
			loop: false
		});	
	  }
});



//----------------------gallery pop-up-------------------//

	$(document).ready(function(){
		//Examples of how to assign the Colorbox event to elements
		if( $('.group1').length )         
		{
			$(".group1").colorbox({rel:'group1', className:"gallery-pop-up"});
			jQuery.colorbox.settings.maxWidth  = '95%';
			jQuery.colorbox.settings.maxHeight = '95%';
		}
		
		//Example of preserving a JavaScript event for inline calls.
		$("#click").click(function(){ 
			$('#click').css({"background-color":"#f00", "color":"#fff", "cursor":"inherit"}).text("Open this window again and this message will still be here.");
			return false;
		});
	});

	

	// ColorBox resize function
	var resizeTimer;
	function resizeColorBox()
	{
		if (resizeTimer) clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() {
				if (jQuery('#cboxOverlay').is(':visible')) {
						jQuery.colorbox.load(true);
				}
		}, 300);
	}

	// Resize ColorBox when resizing window or changing mobile device orientation
	jQuery(window).resize(resizeColorBox);
	window.addEventListener("orientationchange", resizeColorBox, false);


  
//--------- video ------//


//jQuery is required to run this code
$( document ).ready(function() {

    scaleVideoContainer();

    initBannerVideoSize('.video-container .poster img');
    initBannerVideoSize('.video-container .filter');
    initBannerVideoSize('.video-container video');

    $(window).on('resize', function() {
        scaleVideoContainer();
        scaleBannerVideoSize('.video-container .poster img');
        scaleBannerVideoSize('.video-container .filter');
        scaleBannerVideoSize('.video-container video');
    });

});

function scaleVideoContainer() {

    var height = $(window).height() + 5;
    var unitHeight = parseInt(height) + 'px';
    $('.homepage-hero-module').css('height',unitHeight);

}

function initBannerVideoSize(element){

    $(element).each(function(){
        $(this).data('height', $(this).height());
        $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);

}

function scaleBannerVideoSize(element){

    var windowWidth = $(window).width(),
    windowHeight = $(window).height() + 5,
    videoWidth,
    videoHeight;

    // console.log(windowHeight);

    $(element).each(function(){
        var videoAspectRatio = $(this).data('height')/$(this).data('width');

        $(this).width(windowWidth);

        if(windowWidth < 1000){
            videoHeight = windowHeight;
            videoWidth = videoHeight / videoAspectRatio;
            $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

            $(this).width(videoWidth).height(videoHeight);
        }

        $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

    });
}
