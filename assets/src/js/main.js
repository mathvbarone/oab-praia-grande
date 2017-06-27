//START

var start = {



    //FUNCTIONS

    functions : {

        //FUNCTION CLICK BTNS SWIPER

        swiperBtn : function( element, type ){

            $( element + ' .swiper-button-' + type).click();

        },

        framesSlider : function ( object ) {

            var int = 1;

            var frames = $( object ).find( '.frames__img' ).length;

            var interval = $( object ).data( 'frames-time' );

            

            function framesChange() {

                if(int === frames) {

                    int = 1;

                    $( object ).find( '.frames__img[data-active="true"]' ).attr( 'data-active', 'false' );

                    $( object ).find( '.frames__img.frames__primary' ).attr( 'data-active', 'true' );

                }else{

                    $( object ).find( '.frames__img[data-active="true"]' ).attr( 'data-active', 'false' )

                    .next( '.frames__img' ).attr( 'data-active', 'true' );

                    int++;

                }

            }

            

            var framesStart = window.setInterval(framesChange, interval);

        },

        changeActive : function( object, value ){

            object.attr( 'data-active', value );

        },

        checkScrollWindow : function( action, object, position, minPosition ){

            console.log("veio aqui");

            var checkScroll = position > minPosition;

            action( object, checkScroll );

        }

    },

    //EVENTS

    events : {

        init : function(){

            $( function(){

                //SCROLL HEADER

                start.functions.checkScrollWindow( start.functions.changeActive, $( ".header" ),  $( window ).scrollTop(), 0);

                start.functions.checkScrollWindow( start.functions.changeActive, $( ".goTop" ),  $(window).scrollTop() + ($(window).height() / 2), ($(document).outerHeight() / 2));

                $( window ).on( 'scroll', function() {

                    start.functions.checkScrollWindow( start.functions.changeActive, $( ".header" ),  $( window ).scrollTop(), 0);

                    start.functions.checkScrollWindow( start.functions.changeActive, $( ".goTop" ),  $(window).scrollTop() + ($(window).height() / 2), ($(document).outerHeight() / 2));

                });

                

                //GO TOP

                $( '.goTop' ).on( 'click', function(){

                 $('html, body').animate({ scrollTop: 0 }, 500); 

             });

                



               //TOGGLE

                $('.toggle-trigger').click(function(){

                    $('.toggle-content').toggleClass('open');

                });
                


                //FIXED MENU

                $(window).bind('scroll', function () {
                    if ($(window).scrollTop() > 1) {
                        $('.header').addClass("header-fixed");
                    }
                    else{
                        $('.header').removeClass('header-fixed');
                    }
                });

                

                //ELEMENTS EVENT SWIPER

                $( '[data-swiper]' ).on( 'click', function(){

                    var element = $( this ).attr( 'data-swiper' );

                    var type = $( this ).attr( 'data-action' );

                    start.functions.swiperBtn( element, type );

                });


            });

}

},



    //PLUGINS

    plugins : {

        init : function(){

            $( function(){

                //MASKS

                $( "[type-mask='date']" ).mask( '00/00/0000' )

                .attr("placeholder", "dd/mm/yyyy");

                $( "[type-mask='time']" ).mask( '00:00:00' )

                .attr("placeholder", "hh:mm:ss");

                $( "[type-mask='date-time']" ).mask( '00/00/0000 00:00:00' )

                .attr("placeholder", "dd/mm/yyyy hh:mm:ss");

                $( "[type-mask='prefixo']" ).mask( '000.0000.000-00' )

                .attr("placeholder", "000.0000.000-00");

                $( "[type-mask='cep']" ).mask( '00000-000' )

                .attr("placeholder", "00000-000");

                $( "[type-mask='rg']" ).mask( '00.000.000-X', {

                    translation: {

                        'X': {

                            pattern: /[0-9Xx]/,

                            optional: true

                        }

                    }

                }).attr("placeholder", "00.000.000-0");

                $( "[type-mask='cpf']" ).mask( '000.000.000-00' , {reverse: true})

                .attr("placeholder", "000.000.000-00");

                $( "[type-mask='cnpj']" ).mask( '00.000.000/0000-00' , {reverse: true})

                .attr("placeholder", "00.000.000/0000-00");

                $( "[type-mask='placa']" ).mask( 'ZZZ-0000', {

                    clearIfNotMatch: true,

                    translation: {

                        'Z': {

                            pattern: /[A-Za-z0-9]/,

                            optional: true

                        }

                    }

                } ).attr("placeholder", "PLA-0000");

                $( "[type-mask='tell']" ).mask( '(D00) 0000SS000Z', {

                    clearIfNotMatch: true,

                    translation: {

                        'D': {

                            pattern: /[0]/,

                            optional: true

                        },

                        'Z': {

                            pattern: /[0-9]/,

                            optional: true

                        },

                        'S': {pattern: /[0-9-]/}

                    }

                } ).attr("placeholder", "(00) 00000-0000");

                

                String.prototype.splice = function(idx, rem, str) {

                    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));

                };

                $("[type-mask='tell']").keyup(correctTell);

                function correctTell () {



                    tamanho = $(this).val().length;

                    valor_telefone_cel = $(this).val();

                    posicao = valor_telefone_cel.indexOf("-");

                    

                    console.log(posicao);

                    console.log("--" + tamanho);

                    

                    if (tamanho == 13 && posicao < 0) {



                        novo_valor = valor_telefone_cel.splice(9, 0, "-");

                        

                        $(this).val(novo_valor);

                        

                    }else if (tamanho == 14 && posicao == 10) {



                        valor_sem_hifen = valor_telefone_cel.replace("-", "");

                        

                        novo_valor = valor_sem_hifen.splice(9, 0, "-");



                        $(this).val(novo_valor);



                    }

                    

                    if (tamanho == 15){



                        valor_sem_hifen = valor_telefone_cel.replace("-", "");

                        

                        novo_valor = valor_sem_hifen.splice(10, 0, "-");

                        

                        $(this).val(novo_valor);



                    }

                }

            });

            

            //SWIPER DEPOSITIONS

            var swiper = new Swiper('.depositions__swiper', {

                nextButton: '.swiper-depositions-next',

                prevButton: '.swiper-depositions-prev',

                paginationClickable: true,

                autoplay: 7000,

                autoplayDisableOnInteraction: false,

                spaceBetween: 50,

                loop: true

            });

            

            //SWIPER PARTNERS

            var swiper = new Swiper('.partners__swiper', {

                nextButton: '.swiper-partners-next',

                prevButton: '.swiper-partners-prev',

                paginationClickable: true,

                autoplay: 2500,

                autoplayDisableOnInteraction: false,

                slidesPerView: 4,

                spaceBetween: 50,

                loop: true,

                breakpoints: {

                    1100: {

                        slidesPerView: 3,

                        spaceBetween: 40

                    },

                    800: {

                        slidesPerView: 2,

                        spaceBetween: 30

                    },

                    600: {

                        slidesPerView: 1,

                        spaceBetween: 10

                    }

                }

            });

            

            //FANCYBOX - LINKS

            $(".fancybox").fancybox({

                helpers: {

                    overlay: {

                      locked: false

                  }

              },



              'transitionIn'	:	'elastic',

              'transitionOut'	:	'elastic',

              'speedIn'		:	600, 

              'speedOut'		:	200, 

              'overlayShow'	:	false

          });

            

            //FANCYBOX - YOUTUBE

            $(".fancybox-youtube").on('click', function() {

              $.fancybox({

                  helpers: {

                    overlay: {

                      locked: false

                  }

              },



              'padding'		: 0,

              'autoScale'		: false,

              'transitionIn'	: 'none',

              'transitionOut'	: 'none',

              'title'			: this.title,

              'width'			: 640,

              'height'		: 385,

              'href'			: this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),

              'type'			: 'swf',

              'swf'			: {

                 'wmode'				: 'transparent',

                 'allowfullscreen'	: 'true'

             }

         });



              return false;

          });

        }

    },

    

    forms : {

        init : function(){

            $( function(){

                $( '.form' ).on( 'submit', function(event){

                    var styleValidate = 'input--' + $( this ).attr( 'style-validate' );

                    if(!validateForm.functions.validation($( this ), styleValidate, "input--danger")) {

                        event.preventDefault();

                    }

                });

            });

        }

    },

    

    //INIT OBJECT

    init : function(){

        start.events.init();

        start.plugins.init();

        start.forms.init();

    }



};

// /START



//INIT OBJECTS

start.init();