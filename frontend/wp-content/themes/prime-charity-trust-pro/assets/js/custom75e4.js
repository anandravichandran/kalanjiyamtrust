/**
 * Exoplanet Custom JS
 *
 * @package Exoplanet
 *
 * Distributed under the MIT license - http://opensource.org/licenses/MIT
 */


/* Mobile responsive Menu*/

jQuery(function($) {



  $('.search-icon > i').click(function() {
    $(".serach_outer").slideDown(700);
  });

  $('.closepop i').click(function() {
    $(".serach_outer").slideUp(700);
  });

  /*-------- BLOG --------*/
  $(".blog-contents").hover(function() {
    var st = $(this).attr('style-attr');
    $(this).attr('style', st);
  }, function() {
    $(this).removeAttr('style');
  });

  // Accordian
  $(".collapse").on('show.bs.collapse', function() {
    $(this).parent().find(".fa-plus").removeClass("fa-plus").addClass("fa-minus");

  }).on('hide.bs.collapse', function() {
    $(this).parent().find(".fa-minus").removeClass("fa-minus").addClass("fa-plus");

  });

  $(window).scroll(function() {
    var sticky = $('.sticky-header'),
      scroll = $(window).scrollTop();

    if (scroll >= 100) sticky.addClass('fixed-header');
    else sticky.removeClass('fixed-header');
  });

  // AOS.init();
  AOS.init({
    disable: function() {
      var maxWidth = 800;
      return window.innerWidth < maxWidth;
    }
  });

});

// --------preloader----------

var interval = null;

function show_loading_box() {
  jQuery(".spinner-loading-box").css("display", "none");
  clearInterval(interval);
}
jQuery('document').ready(function() {

  interval = setInterval(show_loading_box, 1000);

});
// ------Sidebar---------
// jQuery(function($) {
//   // document.getElementById("open_nav").addEventListener("click", open);
//
//   function open() {
//     // document.getElementById("sidebar1").style.width = "250px";
//     // document.getElementById("sidebar1").style.display = "block";
//   }
//   // document.getElementById("close_nav").addEventListener("click", close);
//
//   function close() {
//     // document.getElementById("sidebar1").style.width = "0";
//     // document.getElementById("sidebar1").style.display = "none";
//   }
// });

jQuery('document').ready(function() {

  jQuery('.slider-content-box').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    navText: ['<i class="fa fa-caret-left" aria-hidden="true"></i>', '<i class="fa fa-caret-right" aria-hidden="true"></i>'],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 1
      }
    }
  });

  // Upcoming Events Slider
  jQuery('.post-slider-wrapper').owlCarousel({
    loop: true,
    margin: 20,
    nav: true,
    dots: false,
    navText: ['<i class="fa fa-caret-left" aria-hidden="true"></i>', '<i class="fa fa-caret-right" aria-hidden="true"></i>'],
    responsive: {
      0: {
        items: 1
      },
      800: {
        items: 2
      },
      1000: {
        items: 3
      }
    }
  });
  // Team
  var owl = jQuery('#team-o .owl-carousel');
  owl.owlCarousel({
    margin: 45,
    stagePadding: 10,
    nav: true,
    autoplay: false,
    lazyLoad: true,
    autoplayTimeout: 3000,
    loop: true,
    dots: false,
    navText: ['<i class="fa fa-caret-left" aria-hidden="true"></i>', '<i class="fa fa-caret-right" aria-hidden="true"></i>'],
    responsive: {
      0: {
        items: 1
      },
      800: {
        items: 2
      },
      1200: {
        items: 4
      }
    },
    autoplayHoverPause: true,
    mouseDrag: true,
  });
  // Our Blog
  var owl = jQuery('#blog .owl-carousel');
  owl.owlCarousel({
    margin: 45,
    stagePadding: 10,
    nav: true,
    autoplay: false,
    lazyLoad: true,
    autoplayTimeout: 3000,
    loop: true,
    dots: false,
    navText: ['<i class="fa fa-caret-left" aria-hidden="true"></i>', '<i class="fa fa-caret-right" aria-hidden="true"></i>'],
    responsive: {
      0: {
        items: 1
      },
      800: {
        items: 2
      },
      1200: {
        items: 3
      }
    },
    autoplayHoverPause: true,
    mouseDrag: true,
  });

  // Event Videos

  var owl = jQuery('.nav-tabs.owl-carousel');
  owl.owlCarousel({
    nav: false,
    dots: false,
    mouseDrag: false,
    responsive: {
      0: {
        items: 2,
        nav: false
      },
      480: {
        items: 2,
        nav: false
      },
      767: {
        items: 3,
        nav: false
      },
      1200: {
        items: 5,
        nav: false
      }
    },
    autoplayHoverPause: true,
    mouseDrag: true,
  });


  // Upcoming Events

  var owl = jQuery('.event.owl-carousel');
  owl.owlCarousel({
    margin: 45,
    stagePadding: 10,
    nav: true,
    autoplay: false,
    lazyLoad: true,
    autoplayTimeout: 3000,
    loop: true,
    dots: false,

    navText: ['<i class="fa fa-arrow-left" aria-hidden="true"></i>', '<i class="fa fa-arrow-right" aria-hidden="true"></i>'],
    responsive: {
      0: {
        items: 1
      },
      767: {
        items: 1
      },
      1200: {
        items: 1,
      }
    },
    autoplayHoverPause: true,
    mouseDrag: true,
  });

  var owl = jQuery('.slider-nav.owl-carousel');
  owl.owlCarousel({
    margin: 45,
    stagePadding: 10,
    nav: false,
    autoplay: false,
    lazyLoad: true,
    autoplayTimeout: 3000,
    loop: true,
    dots: false,

    navText: ['<i class="fa fa-arrow-left" aria-hidden="true"></i>', '<i class="fa fa-arrow-right" aria-hidden="true"></i>'],
    responsive: {
      0: {
        items: 1
      },
      767: {
        items: 2
      },
      1200: {
        items: 3
      }
    },
    autoplayHoverPause: true,
    mouseDrag: true,
  });



  var owl = jQuery('.donation-wrapper.owl-carousel');
  owl.owlCarousel({
    margin: 20,
    dots: false,
    responsive: {
      0: {
        items: 1
      },
      767: {
        items: 2
      },
      1200: {
        items: 3
      }
    },
    autoplayHoverPause: true,
    mouseDrag: true,
  });


  var owl = jQuery('.event-wrapper.owl-carousel');
  owl.owlCarousel({
    margin: 45,
    stagePadding: 10,
    nav: true,
    autoplay: false,
    lazyLoad: true,
    autoplayTimeout: 3000,
    loop: true,
    dots: false,
    navText: ['<i class="fa fa-caret-left" aria-hidden="true"></i>', '<i class="fa fa-caret-right" aria-hidden="true"></i>'],
    responsive: {
      0: {
        items: 1
      },
      868: {
        items: 2
      },
      1200: {
        items: 3
      }
    },
    autoplayHoverPause: true,
    mouseDrag: true,
  });



  var owl = jQuery('.brands-i.owl-carousel');
  owl.owlCarousel({
    responsive: {
      0: {
        items: 2
      },
      767: {
        items: 3
      },
      1200: {
        items: 5
      }
    },
    autoplayHoverPause: true,
    mouseDrag: true,
  });
  // jQuery(".counter").counterUp({
  //   delay: 10,
  //   time: 1000
  // });


  // jQuery('.counter').counterUp({
  //   delay: 10,
  //   time: 2000
  // });
  // jQuery('.counter').addClass('animated fadeInDownBig');
  // jQuery('h5').addClass('animated fadeIn');


  jQuery('.menu-item').map(function() {
    jQuery(this).click(function() {
      jQuery(this).children('ul').slideToggle('drop').parent().siblings().children('ul').slideUp('drop');
    })
  })


  jQuery('#open_nav').click(function() {
    // console.log('clicked');
    jQuery('#sidebar1').addClass('ham-toggle');
  });

  jQuery('#close_nav').click(function() {
    jQuery(this).parent('#sidebar1').removeClass('ham-toggle');
  })


  jQuery('label#give-gateway-option-offline').click(function() {
    jQuery('section#form-o #give_purchase_form_wrap').addClass('nadada');
  });

  jQuery('label#give-gateway-option-manual').click(function() {
    jQuery('section#form-o #give_purchase_form_wrap').removeClass('nadada');

  });


  jQuery('span#form-close,.get_tt,.proud_partner_wrapper a,.donate-heart,.donation-i .donation-card-content .btn-price a,.donate-heart').click(function(e) {
    jQuery('#form-o').toggleClass('close-form');
  });

  // jQuery(document).click(function(e) {
  //   var v = e.target.closest('.form-wrapper');
  //   // console.log(v);
  //   if (!v) {
  //     jQuery('#form-o').css('display', 'none');
  //   }
  // });





  jQuery('.nav-item').map(function(i) {
    jQuery(this).click(function(e) {
      e.preventDefault();
      console.log(i);
      var v = i;
      var w = i;
      if (v != 0) {
        jQuery('.tab-pane1').css('display', 'none');
      } else {
        jQuery('.tab-pane1').css('display', 'block');
      }
      jQuery('.tab-pane').map(function(i) {
        if (v == i) {
          jQuery(this).addClass('cl').siblings('.tab-pane').removeClass('cl');
        }
      })
      // if (w != 0) {
      //   jQuery('.nav-item1').css('background', 'red');
      // } else {
      //   jQuery('.nav-item1').css('background', '#000');
      // }
      jQuery('.nav-item').map(function(i) {
        if (w == i) {
          jQuery(this).addClass('cll').parent().siblings().children('.nav-item').removeClass('cll');
        }
      })
    })
  })

});
jQuery(document).ready(function() {
  jQuery('.nav-item1').addClass('cll');



  var logo_source = jQuery('.nav-logo').attr("src");
  console.log(logo_source);
  if (logo_source == '') {
    jQuery('.nav-logo').css('display', 'none');
    jQuery('.nav-text').css('display', 'inline');
  } else {
    jQuery('.nav-logo').css('display', 'block');
    jQuery('.nav-text').css('display', 'none');
  }

  var top_bar_icon_source = jQuery('.tp-br-icon').attr("src");
  if (top_bar_icon_source == '') {
    jQuery('.tp-br-icon').css('display', 'none');
  }

})







jQuery('.side-navigation li').click(function() {
  jQuery('this').toggleClass('active-search');
});

jQuery('.search-main').click(function() {
  // console.log('clic');
  jQuery('.search-form-main').toggleClass('active-search');
});


jQuery('.search').click(function() {
  jQuery('.search, .search-bar').toggleClass('active');
  jQuery('input').focus();
});


// // On Click slider Nav button
jQuery('.owl-prev').click(function() {
  jQuery(this).addClass('background-class').siblings('.owl-next').removeClass('background-class');
  jQuery()
});
jQuery('.owl-next').click(function() {
  jQuery(this).addClass('background-class').siblings('.owl-prev').removeClass('background-class');
  jQuery()
});
// jQuery('.owl-next').click(function() {
//   jQuery(this).css('background', '#EC1D29');
// });





jQuery(window).resize(function() {
  if (jQuery(window).width() < 1040) {
    jQuery('.ham-toggle').addClass('testing')
  }
});


jQuery(document).click(function(e) {
  var v = e.target.closest('.search-main');
  var s = e.target.closest('.fa-search');
  var search = e.target.closest('.top_search');
  var a = e.target.closest('.search-form-main');
  var input = e.target.closest('.search-input');
  if (e.target != v) {
    if (e.target != s) {
      if (e.target != a) {
        if (e.target != input) {
          if (e.target != search) {
            jQuery('.search-form-main').removeClass('active-search');
          }
        }
      }
    }
  }
});

jQuery('.tab-repeater .nav').click(function() {
  jQuery(this).siblings('.tab-content').addClass("visible");
  jQuery(this).closest('.tab-repeater').siblings().find('.tab-content').removeClass('visible');
});
jQuery('.tab-repeater .nav').click(function() {
  jQuery('.tab-repeater .nav').addClass('visibility');
  jQuery(this).closest('.tab-repeater').siblings().find('.nav-pills').removeClass('visibility');
});
jQuery(function() {
  jQuery('.tab-repeater:last-child .nav').addClass('expand');
});
jQuery('.tab-repeater .nav').click(function() {
  jQuery('.tab-repeater .nav').removeClass('expand');
});


// Show the first tab and hide the rest
jQuery('#tabs-nav li:first-child').addClass('active');
jQuery('.tab-content').hide();
jQuery('.tab-content:first').show();

// Click function
jQuery('#tabs-nav li').click(function() {
  jQuery('#tabs-nav li').removeClass('active');
  jQuery(this).addClass('active');
  jQuery('.tab-content').hide();

  var activeTab = jQuery(this).find('a').attr('href');
  jQuery(activeTab).fadeIn();
  return false;
});



// --------------

jQuery('a.accordion-toggle').click(function() {
  jQuery("i", this).toggleClass("fas fa-plus fas fa-minus");
});
new WOW().init();
// -------collection title------
var str = jQuery('.feature-boxx h2').text().split(" ");
jQuery('.feature-boxx h2').empty();
str.forEach(function(a) {
  jQuery('.feature-boxx h2').append('<span>' + a.slice(0, 5) + '</span>' + a.slice(5))
})
// --------scroll to next section-------------
if (jQuery('.scroll-to-next-section').length > 0) {
  jQuery(".scroll-to-next-section button").click(function() {
    jQuery('html, body').animate({
      scrollTop: jQuery(this).closest("section").next().offset().top
    }, "slow");
  });
}


/* Counter */
jQuery(document).ready(function() {
  jQuery('.count').each(function() {
    jQuery(this).prop('Counter', 0).animate({
      Counter: jQuery(this).text()
    }, {
      duration: 30000,
      easing: 'swing',
      step: function(now) {
        jQuery(this).text(Math.ceil(now));
      }
    });
  });

  // Back to top
  jQuery(document).ready(function() {
    jQuery(window).scroll(function() {
      if (jQuery(this).scrollTop() > 0) {
        jQuery('.scrollup').fadeIn();
      } else {
        jQuery('.scrollup').fadeOut();
      }
    });
    jQuery('.scrollup').click(function() {
      jQuery("html, body").animate({
        scrollTop: 0
      }, 500);
      return false;
    });
  });


  // shop page filter
  jQuery('.multivendor-filter [type="radio"]').on('change', function(event) {
    ti_multivendor_ecommerce_filters(event);
  });

  function ti_multivendor_ecommerce_filters(event, ui) {
    var data_obj = {};

    data_obj['values'] = jQuery('#product-price-slider').slider("values");

    jQuery('.multivendor-filter [type="radio"]:checked').each(function(index, element) {
      if (!Array.isArray(data_obj[jQuery(element).attr('name')])) {
        data_obj[jQuery(element).attr('name')] = new Array();
      }
      data_obj[jQuery(element).attr('name')].push(jQuery(element).val())
    });

    jQuery.post(ti_customscripts_object.ajaxurl, {
        'action': 'get_shop_page_filter',
        'data': data_obj
      },
      function(response) {
        jQuery('.products.columns-3').html(response.html)
      });

    jQuery('.category-filter-checkbox').map(function() {
      jQuery(this).click(function() {
        if (jQuery(this).is(":checked")) {
          jQuery(this).siblings('.name-count').addClass("checked").parent().parent().siblings('li').children().children('.name-count').removeClass('checked');
        }
      })
    })

  }



  // Price Range Slider

  const rangeInput = document.querySelectorAll(".range-input input"),
    priceInput = document.querySelectorAll(".price-input input"),
    range = document.querySelector(".slider .progress");
  let priceGap = 1000;

  priceInput.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minPrice = parseInt(priceInput[0].value),
        maxPrice = parseInt(priceInput[1].value);

      if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
        if (e.target.className === "input-min") {
          rangeInput[0].value = minPrice;
          range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
        } else {
          rangeInput[1].value = maxPrice;
          range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
        }
      }
    });
  });

  rangeInput.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minVal = parseInt(rangeInput[0].value),
        maxVal = parseInt(rangeInput[1].value);

      if (maxVal - minVal < priceGap) {
        if (e.target.className === "range-min") {
          rangeInput[0].value = maxVal - priceGap;
        } else {
          rangeInput[1].value = minVal + priceGap;
        }
      } else {
        priceInput[0].value = minVal;
        priceInput[1].value = maxVal;
        range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
        range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
      }
    });
  });









  jQuery('.product-offer-date').map(function(value, index) {
    const elem = jQuery(this);
    let old_date = elem.attr('upcoming-date') * 1000;
    const new_date = new Date(old_date);
    var timer;
    var compareDate = new_date;
    timer = setInterval(function() {
      var now = new Date();
      var difference = compareDate.getTime() - now.getTime();
      if (difference <= 0) {
        // Timer done
        clearInterval(timer);
      } else {
        var seconds = Math.floor(difference / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        var days = Math.floor(hours / 24);
        hours %= 24;
        minutes %= 60;
        seconds %= 60;
        elem.find(".days").text(days);
        elem.find(".hours").text(hours);
        elem.find(".minutes").text(minutes);
        elem.find(".seconds").text(seconds);
      }
    }, 1000);
  });

});

// ------------ Sticky Navbar -------------------

var stickyon = jQuery('#sticky-onoff').text().trim();
var a1 = stickyon.length;
var navbar = document.getElementById("site-sticky-menu");
window.onscroll = function() {
  if (a1 == 3) {
    if (navbar != null) {
      myScrollNav();
    }
  }
}

if (navbar != null) {
  var sticky = jQuery(navbar).offset().top;
}

function myScrollNav() {
  if (window.pageYOffset > sticky) {
    //alert(window.pageYOffset);
    navbar.classList.add("sticky");
    navbar.classList.add("stickynavbar");
  } else {
    navbar.classList.remove("sticky");
    navbar.classList.remove("stickynavbar");
  }
}


// topbar timer
// var userDate = document.getElementById("timer").innerHTML;
// var deadline = new Date(userDate).getTime();
// // var deadline = new Date("march 5, 2022 15:37:25").getTime();
// var x = setInterval(function() {
//   var now = new Date().getTime();
//   var t = deadline - now;
//   var days = Math.floor(t / (1000 * 60 * 60 * 24));
//   var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
//   var seconds = Math.floor((t % (1000 * 60)) / 1000);
//   document.getElementById("timer").innerHTML = days + " days " +
//     hours + ":" + minutes + ":" + seconds + " HURRY UP!!!";
//   if (t < 0) {
//     clearInterval(x);
//     document.getElementById("timer").innerHTML = "EXPIRED";
//   }
// }, 1000);



// jQuery('document').ready(function() {
//
//   jQuery('.multiple-items').slick({
//     infinite: true,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     arrows: true
//   });
//
//
//   jQuery('.multiple-items-1').slick({
//     infinite: true,
//     slidesToShow: 7,
//     slidesToScroll: 1
//   });
//   if (screen.availWidth < 1024) {
//     jQuery('.brands-i').slick({
//       infinite: true,
//       slidesToShow: 5,
//       slidesToScroll: 1,
//       responsive: [{
//           breakpoint: 990,
//           settings: {
//             slidesToShow: 5,
//             slidesToScroll: 2
//           }
//         },
//         {
//           breakpoint: 767,
//           settings: {
//             slidesToShow: 4,
//             slidesToScroll: 1
//           }
//         },
//         {
//           breakpoint: 640,
//           settings: {
//             slidesToShow: 3,
//             slidesToScroll: 1
//           }
//         },
//         {
//           breakpoint: 480,
//           settings: {
//             slidesToShow: 2,
//             slidesToScroll: 1
//           }
//         }
//       ]
//     });
//   }
// })
jQuery("#pop-close").click(function() {
  jQuery('#newsletter').css('display', 'none')
});
jQuery("#pop-close-1").click(function() {
  console.log('test');
  jQuery('#newsletter').css('display', 'none')
});



// function hide() {
//   jQuery.Cookies.set('test', '1');
//   jQuery('#newsletter').css('display', 'none');
//   var cookieValue = jQuery.Cookies.get('test');
//   console.log(cookieValue);
// }
// jQuery('#newsletter').css('display', 'none');

function hide() {
  jQuery('#newsletter').css('display', 'none')
}