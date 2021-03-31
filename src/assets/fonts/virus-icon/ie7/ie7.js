/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function () {
  function addIcon(el, entity) {
    var html = el.innerHTML;
    el.innerHTML =
      "<span style=\"font-family: 'follower'\">" + entity + "</span>" + html;
  }
  var icons = {
      "follower-icon-font-size": "&#xe900;",
      "follower-icon-font-color": "&#xe901;",
      "follower-icon-striket": "&#xe902;",
      "follower-icon-unlink": "&#xe903;",
      "follower-icon-link": "&#xe904;",
      "follower-icon-undo": "&#xe905;",
      "follower-icon-redo": "&#xe906;",
      "follower-icon-grid": "&#xe907;",
      "follower-icon-eraser": "&#xe908;",
      "follower-icon-clipboard": "&#xe909;",
      "follower-icon-orderlist": "&#xe90a;",
      "follower-icon-paragraph": "&#xe90b;",
      "follower-icon-h": "&#xe90c;",
      "follower-icon-image": "&#xe90d;",
      "follower-icon-html": "&#xe90e;",
      "follower-icon-css": "&#xe90f;",
      "follower-icon-columns-s": "&#xe910;",
      "follower-icon-columns": "&#xe911;",
      "follower-icon-table-menu": "&#xe912;",
      "follower-icon-table": "&#xe913;",
      "follower-icon-save": "&#xe914;",
      "follower-icon-type": "&#xe915;",
      "follower-icon-underline": "&#xe916;",
      "follower-icon-trash": "&#xe917;",
      "follower-icon-rotate-ccw": "&#xe918;",
      "follower-icon-rotate-cw": "&#xe919;",
      "follower-icon-plus": "&#xe91a;",
      "follower-icon-more-vertical": "&#xe91b;",
      "follower-icon-more-horizontal": "&#xe91c;",
      "follower-icon-minus": "&#xe91d;",
      "follower-icon-menu": "&#xe91e;",
      "follower-icon-list": "&#xe91f;",
      "follower-icon-layers": "&#xe920;",
      "follower-icon-layout": "&#xe921;",
      "follower-icon-italic": "&#xe922;",
      "follower-icon-file-text": "&#xe923;",
      "follower-icon-edit": "&#xe924;",
      "follower-icon-delete": "&#xe925;",
      "follower-icon-crop": "&#xe926;",
      "follower-icon-x": "&#xe927;",
      "follower-icon-bold": "&#xe928;",
      "follower-icon-code": "&#xe929;",
      "follower-icon-chevrons-right": "&#xe92a;",
      "follower-icon-check": "&#xe92b;",
      "follower-icon-chevrons-left": "&#xe92c;",
      "follower-icon-chevrons-up": "&#xe92d;",
      "follower-icon-chevron-up": "&#xe92e;",
      "follower-icon-chevron-right": "&#xe92f;",
      "follower-icon-chevrons-down": "&#xe930;",
      "follower-icon-chevron-down": "&#xe931;",
      "follower-icon-chevron-left": "&#xe932;",
      "follower-icon-copy": "&#xe933;",
      "follower-icon-align-right": "&#xe934;",
      "follower-icon-align-center": "&#xe935;",
      "follower-icon-align-justify": "&#xe936;",
      "follower-icon-align-left": "&#xe937;",
      0: 0,
    },
    els = document.getElementsByTagName("*"),
    i,
    c,
    el;
  for (i = 0; ; i += 1) {
    el = els[i];
    if (!el) {
      break;
    }
    c = el.className;
    c = c.match(/follower-icon-[^\s'"]+/);
    if (c && icons[c[0]]) {
      addIcon(el, icons[c[0]]);
    }
  }
})();
