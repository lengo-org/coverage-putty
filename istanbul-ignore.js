//
//  Copyright © Daniel T. Gorski <dtg [at] lengo [dot] org> et al.
//

module.exports.process = function(src, path, config) {
    var disarm, regexp;

    if (typeof src !== "string") {
        return src;
    }

    var patterns = [
        "var __extends = (this && this.__extends) || (function () {"
    ];

    for (var i = 0; i < patterns.length; i++) {
        disarm = patterns[i].replace(/[|\\{()[^$+*?.-]/g, "\\$&");
        regexp = new RegExp("(" + disarm.replace(/\s/g, "\\s*") + ")", "gi");

        src = src.replace(regexp, "/* istanbul ignore next */\n$1")
    }

    return src;
};
