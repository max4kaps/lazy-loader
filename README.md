# Lazy loader

This mini library has been written to implement lazy loading for ads on our website [voetbalprimeur.nl](https://www.voetbalprimeur.nl) and can be used freely to implement the same functionality on other websites.
 
## Requirements
This library depends on jQuery. If you don't already include jQuery on your site it can be done by downloading it on their [website](http://jquery.com/download/) or by using a CDN:
```html
<script
  src="https://code.jquery.com/jquery-3.2.1.min.js"
  integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
  crossorigin="anonymous"></script>
``` 

## How to use

Download either `lazy-load.js` or `lazy-load.min.js` from this repository

Include the javascript file in your HTML before the closing `</body>` tag:
```html
<script src="/path/to/lazy-load.js"></script>
```

Place an element in your HTML, add the `lazy` class and two data-attrubtes:
```html
<div class="lazy" data-function="placement-1" data-threshold="0"></div>
```

Define the functions to run when the element is in view:
```html
<script>
    window.lazyLoad = window.lazyLoad || {};
    window.lazyLoad['placement-1'] = function() {
    	// Javascript to run
    }
</script>
```

## Full Example

The following example uses [postscribe](https://github.com/krux/postscribe) to asynchronously load a javascript file containing a `document.write`.
```html
...
<body>
    ...
    <div id="ad-1" class="lazy" data-function="placement-1" data-threshold="0">
        <!-- content will be replaced -->
    </div>
    
    <script src="/path/to/lazy-load.js"></script>
    <script>
        window.lazyLoad = window.lazyLoad || {};
        window.lazyLoad['placement-1'] = function() {
            postscribe('#ad-1', '<scr'+'ipt src="https://secure.adnxs.com/ttj?id=0000000&size=728x90&promo_alignment=center"></scri'+'pt>');
        }
    </script>
</body>
```