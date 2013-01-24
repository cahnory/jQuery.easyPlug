'use strict';
(function($) {

  $('li')
  .on($.demo.events.ready, function(e) {
    console.log(e.type);
  })
  .on('click', function() {
    $(this).demo('foo');
  })
  .demo({foo: 'bar'});

})(jQuery);