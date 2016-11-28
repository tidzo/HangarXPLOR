
var HangarXPLOR = HangarXPLOR || {};

// Render a toggle that sets the value of an element
HangarXPLOR.Toggle = function(label, value1, value2, className, callback, defaultValue)
{
  if (HangarXPLOR.logsEnabled) {
    console.log('Rendering Toggle', label, value1, value2, className);
  }
  
  var $toggle = $('<div class="status-selector tag-wrapper" />');
  var $tag = $(
    '<div class="tag js-tag">' +
    '  <div class="left"><div class="effect trans-02s trans-opacity"></div></div>' +
    '  <div class="tag-content"><div class="effect trans-02s trans-opacity"></div>' + 
    '    <span class="text">' + label + '</span>' +
    '  </div>' +
    '</div>');
    
  defaultValue = defaultValue || '';
  
  // TODO: Set default value
  var $value = $('<input type="hidden" class="' + className + '" value="' + defaultValue + '" />');
  
  $toggle.append($tag);
  $toggle.append($value);
  
  $toggle.Value1 = value1 || '';
  $toggle.Value2 = value2 || '';
  
  var getState = function() {
    if ($value.val() == '')
      return null;
    else if ($value.val() == $toggle.Value2)
      return false;
    else
      return true;
  }
  
  var updateState = function() {
    var state = getState();
    
    $tag.removeClass('off');
    $tag.removeClass('on');

    switch (state)
    {
      case true: $tag.addClass('on'); break;
      case false: $tag.addClass('off'); break;
    }
  };
  
  updateState();
  
  $toggle.bind('click', function(e) {
  
    var state = getState();
    
    switch (state)
    {
      case null:  $value.val($toggle.Value1); break;
      case true:  $value.val($toggle.Value2); break;
      case false: $value.val(null); break;
    }
    
    updateState();
    
    if (typeof callback === 'function') callback.call(this, e, label, $value.val());
  });
  
  return $toggle;
}
