(function (name, definition) {
    if (typeof define === 'function') define(definition);
    else if (typeof module !== 'undefined' && module.exports) module.exports = definition();
    else this[name] = definition();
}('mario', function () {
    /**
     * navigator.userAgent =>
     * Chrome:  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_7) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.57 Safari/534.24"
     * Opera:   "Opera/9.80 (Macintosh; Intel Mac OS X 10.6.7; U; en) Presto/2.7.62 Version/11.01"
     * Safari:  "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_7; en-us) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1"
     * IE:      "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C)"
     * Firefox: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:2.0) Gecko/20100101 Firefox/4.0"
     * iPhone:  "Mozilla/5.0 (iPhone Simulator; U; CPU iPhone OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8H7 Safari/6533.18.5"
     * iPad:    "Mozilla/5.0 (iPad; U; CPU OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8H7 Safari/6533.18.5",
     * Android: "Mozilla/5.0 (Linux; U; Android 2.3.4; en-us; T-Mobile G2 Build/GRJ22) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"
     * PhantomJS: "Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/534.34 (KHTML, like Gecko) PhantomJS/1.5.0 Safari/534.34"
     * IE10 on a touch-enabled device: "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; ARM; Trident/6.0; Touch)"
     */

    var t = true;

    function mario(ua) {
        function getFirstMatch(regexp) {
            var match = ua.match(regexp);
            return match && match[1];
        }

        var windows = /windows/i.test(ua) || /win32/i.test(ua);
        var macos = /mac os/i.test(ua);
        var linux = /linux/i.test(ua);
        var chrome = /chrome/i.test(ua);
        var firefox = /firefox/i.test(ua);
        var seamonkey = /seamonkey\//i.test(ua);
        var opera = /opera/i.test(ua);
        var operaBlink = /OPR/.test(ua);
        var safari = /safari/i.test(ua);
        var ie = /msie/i.test(ua);
        var spartan = /edge/i.test(ua);
        var trident = /trident/i.test(ua);
        var phantom = /phantom/i.test(ua);
        var touch = /touch/i.test(ua);
        var iphone = /\(iphone;/i.test(ua);
        var ipad = /\(ipad;/i.test(ua);
        var ipod = /\(ipod( touch)?;/i.test(ua);
        var crios = /crios\//i.test(ua);
        var android = /android/i.test(ua);
        var windowsPhone = /Windows Phone/i.test(ua);
        var gecko = /gecko\//i.test(ua);
        var likeGecko = /like gecko/i.test(ua);
        var webkit = /webkit/i.test(ua);
        var blackBerry = /\(BB\d+;/i.test(ua);

        var detected = {};

        if (ie) {
            detected.msie = t;
            detected.name = 'Internet Explorer';
            detected.version = getFirstMatch(/msie (\d+(\.\d+)?);/i);
        } else if (spartan) {
            detected.name = 'Edge';
            detected.msedge = t;
            detected.edge = t;
            detected.version = getFirstMatch(/Edge\/(\d+)/i);
        } else if (operaBlink) {
            detected.name = 'Opera';
            detected.opera = t;
            detected.version = getFirstMatch(/OPR\/(\d+(\.\d+)?)/i);
        } else if (chrome) {
            detected.name = 'Chrome';
            detected.chrome = t;
            detected.version = getFirstMatch(/chrome\/(\d+(\.\d+)?)/i);
        } else if (firefox) {
            detected.name = 'Firefox';
            detected.firefox = t;
            detected.version = getFirstMatch(/firefox\/(\d+(\.\d+)?)/i);
        } else if (phantom) {
            detected.phantom = t;
            detected.version = getFirstMatch(/phantomjs\/(\d+(\.\d+)+)/i);
        } else if (seamonkey) {
            detected.seamonkey = t;
            detected.version = getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i);
        } else if (opera) {
            detected.name = 'Opera';
            detected.opera = t;
            detected.version = getFirstMatch(/version\/(\d+(\.\d+)?)/i);
        } else if (safari && !android && !blackBerry) {
            detected.name = 'Safari';
            detected.safari = t;
            detected.version = getFirstMatch(/version\/(\d+(\.\d+)?)/i);
        } else {
            // No browser detected
            if (ipad || iphone || ipod) {
                detected.safari = t;
                detected.webkit = t;
            } else if (trident) {
                detected.msie = t;
            } else if (android || blackBerry) {
                detected.webkit = t;
                detected.version = getFirstMatch(/version\/(\d+(\.\d+)?)/i);
            }
        }

        if (!detected.version) {
            delete detected.version;
        }

        if (windows) {
            detected.windows = t;
        }
        if (macos && !trident) {
            detected.macos = t;
        }
        if (linux) {
            detected.linux = t;
        }

        if (touch) {
            detected.touch = t;
        }

        if (windowsPhone) {
            detected.touch = t;
        }

        if (ipad || iphone || ipod) {
            detected.touch = t;
            detected.ios = t;
            if (!detected.version && crios) {
                delete detected.safari;
                detected.name = 'Chrome';
                detected.chrome = t;
                detected.version = getFirstMatch(/crios\/(\d+(\.\d+)?)/i);
            } else {
                detected.name = 'Safari';
            }
            var osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
            if (osVersion) {
                detected.osversion = osVersion.replace(/[_\s]/g, '.');
            }
        }

        if (blackBerry) {
            detected.name = 'Blackberry';
            detected.blackberry = t;
            detected.osversion = getFirstMatch(/\(BB(\d+);/i);
        }

        if (ipad) {
            detected.ipad = t;
        }

        if (iphone) {
            detected.iphone = t;
        }

        if (ipod) {
            detected.ipod = t;
        }

        if (gecko) {
            detected.mozilla = t;
            detected.gecko = t;
        }

        if (likeGecko) {
            if (trident) {
                // IE11 represents as 'Trident like Gecko'
                detected.name = 'Internet Explorer';
                detected.msie = t;
                // Should IE11 detect as a Gecko variant?
                // detected.gecko = t;
                detected.version = getFirstMatch(/rv:(\d+(?:\.\d+))/i);
            }
        }

        if (android && !trident) {
            if (!detected.name) {
                detected.name = 'Android';
            }
            detected.touch = t;
            detected.android = t;
            var androidVersion = getFirstMatch(/android[ \/](\d+(\.\d+)*)/i);
            if (androidVersion) {
                detected.osversion = androidVersion;
            }
        }

        if (operaBlink ||
            (chrome && detected.version >= 28) ||
            (android && detected.osversion >= 4.4)) {
            detected.blink = t;
        }

        if (!detected.blink && !trident && webkit) {
            detected.webkit = t;
        }

        // Aliases
        if (detected.msie) {
            detected.explorer = t;
            if (windowsPhone) {
                detected.explorermobile = t;
            }
        }

        return detected;
    }

    // If we're in an environment that exposes navigator.userAgent (a browser), call mario on the
    // string and copy the properties to the mario function. This makes it possible to still just
    // require mario on those platforms, while also gaining access to a function that
    // does the actual work.
    if (typeof navigator !== 'undefined' && navigator && typeof navigator.userAgent === 'string') {
        var detected = mario(navigator.userAgent);
        for (var propertyName in detected) {
            if (detected.hasOwnProperty(propertyName)) {
                mario[propertyName] = detected[propertyName];
            }
        }
    }

    return mario;
}));
