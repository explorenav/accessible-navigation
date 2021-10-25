(function($){

    var $mainMenu = $('#topmenu .mainMenu > .nav-item > a');
    var $dropdownMenu = $('#topmenu li.dropdown');
    var $dropdownToggleLink = $('#topmenu .dropdown-menu a.dropdown-toggle');
    var $selectedDropdown = $('#topmenu .mainMenu > li.show');
    var $selectedUL = $('#topmenu .mainMenu > li.show ul.show');
    var $dropdownLink = $('#topmenu .dropdown-item');
    var mainMenuSel = '.nav-item';
    var $secondLevelMenuClass = 'submenu';
    var $thirdLevelMenuClass = 'subsubmenu';



 $dropdownToggleLink.on('click', function (e) {
    if (!$(this).next().hasClass('show')) {
        $(this).parents('.dropdown-menu').first().find('.show').removeClass('show');
    }
    var $dropdownLink = $(this).next('ul');
    $(this).parent('li').toggleClass('show');
    $dropdownLink.toggleClass('show');
    $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
        $dropdownLink.removeClass('show');
    });
    return false;
});
//For removing the active dropdown on hovering other
$mainMenu.on('mouseover', function (e) {
    $('#topmenu .mainMenu > li.show ul.show').removeClass('show');
    $selectedDropdown.removeClass('show');
   
})
if($(window).width()>767){
    $dropdownMenu.hover(
        function(e) {
            //console.log('in');
            $(this).find('.dropdown-menu').first().toggleClass('show');
        }, 
        function(e) {
            //console.log('out');
            $(this).find('.dropdown-menu').first().toggleClass('show');
        });
}
var firstLevelMenu = function(sel){
    let parent = $(sel).parent('li');
    return $(parent).parent('ul').parent('li').hasClass('nav-item');
}
var toggleMenu = function(sel, key){
    if(key == "open"){
     $(sel).closest('li').toggleClass('show');
     $(sel).next('ul').toggleClass('show');
     $(sel).attr('aria-expanded', 'true');
     $(sel).next('ul').find('li:first-child a').focus();
    }
    if(key == "close"){
     $(sel).closest('ul').toggleClass('show');
     $(sel).closest('ul').prev('a').closest('li').toggleClass('show');
     $(sel).closest('ul').prev('a').attr('aria-expanded', 'false');
     $(sel).closest('ul').prev('a').focus();
    }
}
var rightKeyFunction = function(sel, mainFlag){
   let parent = $(sel).parent('li');
   let nextSel = mainMenuSel;
   if(mainFlag){
     if(!$(parent).is(":last-child")){
         $(parent).next(nextSel).find('a').first().focus();
     }
   }else{
     if($(sel).next('ul').length>0 && !($(sel).next('ul').hasClass('show'))){
         toggleMenu(sel, 'open');
     }
     else if($(sel).next('ul').hasClass('show')){
        $(sel).next('ul').find('li:first-child a').focus();
     }
   }     
}
var leftKeyFunction = function(sel, mainFlag){
     let parent = $(sel).parent('li');
     let prevSel = mainMenuSel;
     if(mainFlag){
         if(!$(parent).is(":first-child")){
             $(parent).prev(prevSel).find('a').first().focus();
         }
     }else{
         if($(parent).is(":first-child") && !firstLevelMenu(sel)){
                toggleMenu(sel, 'close');              
         }
     }     
 }
 var downKeyFunction = function(sel, mainFlag){
     let parent = $(sel).parent('li');
     if(mainFlag){
         if($(sel).next('ul').length>0){
             $(sel).next('ul:first-child').find('li:first-child a').focus();
         }
     }else{
         if(!$(parent).is(":last-child")){
             $(parent).next('li').find('a').first().focus();
         }
     }     
 }
 var upKeyFunction = function(sel, mainFlag){
    let parent = $(sel).parent('li');
    if(mainFlag){
        if($(sel).next('ul').length>0){
            console.log('hi');
            $(sel).next('ul:first-child').find('li:last-of-type a').focus();
        }
    }else{
        if(!$(parent).is(":first-child")){
            $(parent).prev('li').find('a').first().focus();
        }
    }     
}
var escKeyFunction = function(sel, mainFlag){
    let parent = $(sel).parent('li');
    if(!mainFlag){
        if($(parent).parent('ul').hasClass('show')){
            toggleMenu(parent, 'close'); 
        }
    }  
}


    $mainMenu.on('keydown', function(e){
        //right key
        if(e.keyCode === 39){
            rightKeyFunction( $(this), true );
        }
        //left key
        else if(e.keyCode === 37){
            leftKeyFunction( $(this), true );
        }
        //down key
        else if(e.keyCode === 40){
            downKeyFunction( $(this), true);
        }
        //up key
        else if(e.keyCode === 38){
            upKeyFunction( $(this), true);
        }
    });
   $dropdownLink.on('keydown', function(e){
       // Down key
        if(e.keyCode === 40){
            e.preventDefault();
            e.stopPropagation();
            downKeyFunction( $(this), false);
        }
        // up key
        else if(e.keyCode === 38){
             //console.log('up');
            e.preventDefault();
            e.stopPropagation();
            upKeyFunction( $(this), false);
        }
        //right key
        else if(e.keyCode === 39){
            rightKeyFunction( $(this), false );
        }
        // left key
        else if(e.keyCode === 37){
            e.preventDefault();
            e.stopPropagation();
            leftKeyFunction( $(this), false );
            
        }
        //esc key
        else if(e.keyCode === 27){
           e.preventDefault();
           e.stopPropagation();
           escKeyFunction( $(this), false);
        }
        
   });
    
    $dropdownLink.on('focus', function(){
        let activeElem = document.activeElement;
        let activeLi = $(activeElem).parent();
        let activeUl = $(activeLi).parent();
        if($(activeUl).hasClass($secondLevelMenuClass) && $(activeUl).hasClass('show')){
            if(activeUl.find('ul.show')){
                let activeList = activeUl.find('ul.show');
                activeList.removeClass('show');
                activeList.prev('a').closest('li').toggleClass('show');
                activeList.prev('a').prev('a').attr('aria-expanded', 'false');
            }
        }else{
            if(activeUl.find('ul.show')){
                let activeList = activeUl.find('ul.show');
                activeList.removeClass('show');
                activeList.prev('a').closest('li').toggleClass('show');
                activeList.prev('a').prev('a').attr('aria-expanded', 'false');
            }
            
        }
     })
     


 })(jQuery);