jQuery(function(e){var a,n,t;obj=xs_partical_obj,console.log(obj),a=JSON.parse(xs_partical_obj.color1),n=JSON.parse(xs_partical_obj.color2),a.length,t=n.length>0?n:["#d7daee","#ced1ea","#f7f9fb"],e(window).on("load",function(){e("#particles-js-sec").length>0&&e(".particles-js-1").each(function(){var a=e(this).attr("id");e("#"+a).length&&particlesJS(a,{particles:{number:{value:20},color:{value:t},shape:{type:["circle","triangle","polygon"]},opacity:{value:1,random:!1,anim:{enable:!1}},size:{value:3,random:!0,anim:{enable:!1}},line_linked:{enable:!1},move:{enable:!0,speed:2,direction:"none",random:!0,straight:!1,out_mode:"out"}},interactivity:{detect_on:"canvas",events:{onhover:{enable:!1},onclick:{enable:!1},resize:!0}},retina_detect:!0})});e(".particles-js-2").length>0&&e(".particles-js-2").each(function(){var a=e(this).attr("id");e("#"+a).length&&particlesJS(a,{particles:{number:{value:20},color:{value:t},shape:{type:["circle","triangle","polygon"]},opacity:{value:1,random:!1,anim:{enable:!1}},size:{value:3,random:!0,anim:{enable:!1}},line_linked:{enable:!1},move:{enable:!0,speed:2,direction:"none",random:!0,straight:!1,out_mode:"out"}},interactivity:{detect_on:"canvas",events:{onhover:{enable:!1},onclick:{enable:!1},resize:!0}},retina_detect:!0})})})});