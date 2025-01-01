function myEscape( text ) {
  if (text) {
    return text.replace(new RegExp("[\\/\\[\\]]", "g"), "I")
  } else {
    return text
  }
}

function regexIndexOf( str, pattern, startIndex ) {
  startIndex = startIndex || 0;
  var searchResult = str.substr( startIndex ).search( pattern );
  return ( -1 === searchResult ) ? -1 : searchResult + startIndex;
}

(function( $ ) {
  $.widget( "ui.combobox", {
    _create: function() {
      var self = this,
        select = this.element.hide(),
        selected = select.children( ":selected" ),
        frozenValue = selected.val() ? selected.text() : "",
        value = frozenValue;
      var input = this.input = $( "<input>" )
        .insertAfter( select )
        .val( value )
        .autocomplete({
          delay: 0,
          minLength: 0,
          source: function( request, response ) {
            var escapedTerm = myEscape( request.term );
            var matcher = new RegExp( $.ui.autocomplete.escapeRegex( escapedTerm ), "i" );
            response( select.children( "option" ).map(function() {
              var text = $( this ).text();
              var escapedText = myEscape( text );
              if ( this.value && ( !escapedTerm || matcher.test( escapedText ) ) ) {
                var index = regexIndexOf( escapedText, matcher )
                var length = escapedTerm.length
                var displayText = text
                if ( index != -1 && length > 0 ) {
                  displayText = text.substring( 0, index ) + 
                  "<strong>" + text.substring( index, index + length ) + "</strong>" + 
                  text.substring( index + length );
                }
                return {
                  label: displayText,
                  value: text,
                  option: this
                };
              }
            }) );
          },
          select: function( event, ui ) {
            ui.item.option.selected = true;
            self._trigger( "selected", event, {
              item: ui.item.option
            });
          },
          change: function( event, ui ) {
            if ( !ui.item ) {
              var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( $(this).val() ) + "$", "i" ),
                valid = false;
              select.children( "option" ).each(function() {
                if ( $( this ).text().match( matcher ) ) {
                  this.selected = valid = true;
                  return false;
                }
              });
              if ( !valid ) {
                // remove invalid value, as it didn't match anything
                $( this ).val( frozenValue );
                select.val( "" );
                input.data( "autocomplete" ).term = "";
                return false;
              }
            }
          }
        })
        .addClass( "ui-widget ui-widget-content ui-corner-left" )
        .click(function() {
          if ( this.value == frozenValue ) {
            $( this ).val( "" );
            //this.value = "";
          }
        })
        .blur(function() {
          if ( this.value == "" ) {
            $( this ).val( frozenValue );
            //this.value = frozenValue
          }
        });

      input.data( "autocomplete" )._renderItem = function( ul, item ) {
        return $( "<li></li>" )
          .data( "item.autocomplete", item )
          .append( "<a>" + item.label + "</a>" )
          .appendTo( ul );
      };

      this.button = $( "<button type='button'>&nbsp;</button>" )
        .attr( "tabIndex", -1 )
        .attr( "title", "Show All Items" )
        .insertAfter( input )
        .button({
          icons: {
            primary: "ui-icon-triangle-1-s"
          },
          text: false
        })
        .removeClass( "ui-corner-all" )
        .addClass( "ui-corner-right ui-button-icon" )
        .click(function() {
          // close if already visible
          if ( input.autocomplete( "widget" ).is( ":visible" ) ) {
            input.autocomplete( "close" );
            return;
          }

          // work around a bug (likely same cause as #5265)
          $( this ).blur();

          // pass empty string as value to search for, displaying all results
          input.autocomplete( "search", "" );
          input.focus();
        });
    },

    destroy: function() {
      this.input.remove();
      this.button.remove();
      this.element.show();
      $.Widget.prototype.destroy.call( this );
    }
  });
})( jQuery );

$(function() {
  $( "#combobox" ).combobox();
  $( "#toggle" ).click(function() {
    $( "#combobox" ).toggle();
  });
});

$(function() {
  $( "#compare-button" ).button();
});