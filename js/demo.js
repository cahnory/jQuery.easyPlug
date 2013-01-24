'use strict';
(function($) {

  $('li')
  .on($.exemple.events.ready, function(e) {
    console.log(e.type);
  })
  .on('click', function() {
    $(this).exemple('foo');
  })
  .exemple({foo: 'bar'});

})(jQuery);