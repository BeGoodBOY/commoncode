var cookieUtil = (function(window, undefined) {
    var doc = window.document;

    var cookieUtil = {

        // 根据opt设置cookie
        // opt{
        // 	key(string),
        // 	value,(string)
        // 	maxAge(number)有效期
        // 	domain(string)
        // 	path(string)
        // 	secure(boolean)
        // }
        // return cookie
        // 
        setItem: function(opt) {
            var result = [];
            var str;

            if (opt.key) {
                result.push(encodeURIComponent(opt.key) + '=' + encodeURIComponent(opt.value));
                if ('maxAge' in opt) {
                    result.push('max-age=' + opt.maxAge);
                }
                if ('domain' in opt) {
                    result.push('domain=' + opt.domain);
                }
                if ('path' in opt) {
                    result.push('path=' + opt.path);
                }
                if (opt.secure) {
                    result.push('secure')
                }
                str = result.join(';');
                doc.cookie = str;

            }

            return str;
        },

        // 根据key读取cookie，如果key有多个值，返回数组，如果没有对应值返回undefined
        // key（string）
        // return string|Array|undefined
        getItem: function(key) {
            var key = encodeURIComponent(key);

            var result;
            var pairs = doc.cookie.split('; ');
            var i, len, item, value;

            for (i = 0, len = pairs.length; i < len; ++i) {
                item = pairs[i];
                if (item.indexOf(key) === 0) {
                    value = decodeURIComponent(item.slice(item.indexOf('=') + 1));
                    if (typeof result === 'undefined') {
                        result = value;
                    } else if (typeof result === 'string') {
                        result = [result];
                        result.push(value);
                    } else {
                        result.push(value);
                    }
                }
            }

            return result;
        },

        /**
         * 解析cookie返回对象，键值对为cookie存储信息
         * 
         * @return {Object} 包含cookie信息的对象
         */
        getAll: function() {
            var obj = {};
            var i, len, item, key, value, pairs;

            pairs = doc.cookie.split('; ');
            for (i = 0, len = pairs.length; i < len; ++i) {
                item = pairs[i].split('=');
                key = decodeURIComponent(item[0]);
                value = decodeURIComponent(item[1]);
                obj[key] = value;
            }
            return obj;
        },

        clear: function() {
            var i, len, key, pairs;
            pairs = doc.cookie.split('; ');

            for (i = 0, len = pairs.length; i < len; ++i) {
            	item = pairs[i];
            	key = item.slice(0, item.indexOf('='));
            	doc.cookie = key + '=; max-age=0'; 
            }

        }
    }


return cookieUtil;
}(window));
