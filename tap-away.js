
if (require) {
  var library = require("nrtv-library")(require)
  module.exports = library.export(
    "tap-away",
    ["web-element"],
    generator
  )
} else {
  var tapAway = generator(element)
}

function generator(element) {

  // CATCH DEM TAPS

  function tapOutCatcher(child, callback) {

    var catcher = element(
      ".tap-catcher",
      {
        onclick: tapOutScript(callback)
      },
      element.style({
        "position": "fixed",
        "top": "0",
        "left": "0",
        "width": "100%",
        "height": "100%",
        "z-index": "1000"
      }),
      child
    )

    function tapOutScript(callback) {
      return functionCall(tapOut).withArgs(functionCall.raw("event"), callback).evalable()
    }

    catcher.assignId()

    catcher.onTapOut =
      function(callback) {
        document.getElementById(this.id).setAttribute("onclick", tapOutScript(callback))
      }

    catcher.show =
      function() {
        document.getElementById(this.id).style.display = "block"
      }

    catcher.hide =
      function() {
        document.getElementById(this.id).style.display = "none"
      }

    return catcher
  }

  function tapOut(event, callback) {
    var catcherElement = event.target
    
    if (!catcherElement.classList.contains("tap-catcher")) {
      return
    }

    catcherElement.style.display = "none"

    callback && callback()
  }

  tapOut.catcher = tapOutCatcher

  return tapOut
}