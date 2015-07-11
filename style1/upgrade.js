~(function(root){
	var fileName = 'upgrade.js';
	var loadStyle = function(url, id){
		if(!document.getElementById(id)){
            var link = document.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = url;
            link.id = id;
            document.getElementsByTagName("head")[0].appendChild(link);
        }
	};

	function getRealPath(file) {
		var scripts = document.getElementsByTagName('script'),
			len = scripts.length,
			tempFileName,
			path = '';
		do{
			len--;
			tempFileName = scripts[len].getAttribute('src');
			if(tempFileName && typeof tempFileName === 'string' && tempFileName.indexOf(file) !== -1) {
				path = tempFileName.replace(file, '');
				break;
			}
		}while(len > 0);

		return path;
	}

	var browserCheck = function(){
        var userAgent = navigator.userAgent.toLowerCase();
        var browser = {
            version: (userAgent.match( /.+(?:rv|it|ra|ie|me|on)[\/: ]([\d.]+)/ ) || [])[1],
            chrome: /chrome/.test( userAgent ),
            safari: /webkit/.test( userAgent ) && !/chrome/.test( userAgent ),
            webkit: /webkit/.test( userAgent ),
            opera: /opera/.test( userAgent ),
            msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ),
            mozilla: /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent ),
            ios: userAgent.match(/iPad/i) || userAgent.match(/iPhone/i),
            isMobile: /iPhone/.test( userAgent ) || /iPad/.test( userAgent ) || /iPod/.test( userAgent ) || /Android/.test( userAgent )
        };

        return browser;
    };

    var aimH = function(obj, start, end) {
    	var timer = setInterval(function(){
    		if(start >= end) {
    			clearInterval(timer);
    			obj.style.height = end + 'px';
    		} else {
    			start += 5;
    			obj.style.height = start +'px';
    		}    		
    	}, 50);
    };

    /**
     * 提示浏览器版本
     * @return
     */
    var upgrade =  function(browser, ieVer) {
    	browser = browser || msie;
    	ieVer = ieVer || 8;
        var b = browserCheck();
        if(b[browser] && b.version <= ieVer) {

        	loadStyle(getRealPath(fileName)+'upgrade.css');
        	var obj = document.createElement('div');
        	obj.className = 'browser-upgrade';
        	obj.innerHTML = '您的浏览器版本为Internet Explorer 8以下，为了更好的浏览体验，请升级到<a href="http://cdn.dmeng.net/upgrade-your-browser.html" target="_blank"><span>标准浏览器</span></a>！';
        	document.body.insertBefore(obj, document.body.firstChild);

        	aimH(obj, 0, 40);

            //var obj = $('<div class="browser-upgrade">您的浏览器版本为Internet Explorer 8以下，为了更好的浏览体验，请升级到<a href="http://cdn.dmeng.net/upgrade-your-browser.html" target="_blank"><span>标准浏览器</span></a>！</div>');
            //$('.g-topbar').before(obj.animate({ height: '40px'}, 600));
        }            
    }

    root.BrowserUpgrade = upgrade;
})(window);