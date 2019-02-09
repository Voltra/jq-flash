# Flash : A jQuery plugin for flash messages #
`jq-flash` is a lightweight jQuery plugins that aims to give you access to minimalistic and stylish flash messages.
What do I mean by "flash messages" ? These are, typically, the kind of messages displayed to the user when they successfully achieve an action (e.g. "You are now logged in") or when there has been an error (e.g. "Invalid credentials").

## How to install jq-flash ? ##
1. Grab the library :
  -  `npm install --save jq-flash`
  - download zip from [github](https://github.com/Voltra/jq-flash)
2. Set up the stylesheets in the following order :
  1.  reset stylesheet (it is recommended to use the given reset.css)
  2.  `dist/flash.css`
3. Load the JS dependencies in the following order :
  1. jQuery
4. Load the jQuery plugin
  - node : `require("path/to/jq-flash")(/*jQuery*/);`
  - load via AMD/UMD
  - script tag
    ​    

**WARNING**
The actual jQuery plugin is in {installation path}/dist/flash.js



## How to use jq-flash ? ##
`jq-flash` is quite straight forward, you can either use it dynamically or statically (or even both :O).

### Static usage ###
To use a flash message statically, use the following structure (very first in body tag, stack them if needed):
```html
<div class="flash flash-folded">
    <button class="flash-close">&#x2716;</button>
    <p>Your message here</p>
</div>
<!-- note that &#x2716; is a nice ✖ that fits perfectly-->
```

### Dynamic usage ###
You can trigger a new flash message using jQuery:
```javascript
$.flash("my_type", "my message");
```

This will insert at the very top of the body tag the following structure:
```html
<div class="flash flash-folded flash-my_type">
    <button class="flash-close">&#x2716;</button>
    <p>my message</p>
</div>
```
And will automatically unfold it to please your eyes!

### For both usage ###
Note that, whenever you close the flash message, there's a delay of 2s before it is removed from the DOM.
As you can see, you can use custom classes to define a number of additional CSS rules.



You can also add the `flash-embed` class if you want to manually put it inside a container (which should probably have `position: relative`).



## How to embed ?

Since v2.0.0 you can use the special class `flash-embed` to specify that the flash message isn't in the global scope (i.e. it is within another element than `<body>`).

Since v2.0.1 you can now flash has the following signature : `$.flash(type, message, context)`. You can provide the `context` argument (which expects an `HTMLElement`) to specify where to embed it. This works also with shorthands (e.g. `$.flash.info("PINGAS", document.getElementById("flash_holder"))`).



It now also exposes `$("#flash_holder").flash("info", "PINGAS")` as a shorthand for embedding.



The following is the basic HTML structure for an embed :

```html
<div class="someContainer">
    <div class="flash flash-folded flash-embed">
        <button class="flash-close">&#x2716;</button>
        <p>Dem Messages</p>
    </div>
    
    <div class="someOtherContent">
        [...]
    </div>
</div>
```







## How to customize jq-flash ? ##
Since v2.0.0, `jq-flash` has been using [Sass](https://sass-lang.com/), more specifically the scss syntax. You can find the source files under `src`.

You might have noticed that `$.flash(type, message)` needs a message but also authorizes you to pass along a type that is actually used to construct a class name : with `x` as your type, the generated class name is `flash-x`.

You can then use a custom rule to modify the colors of the flash message (there are already two examples, `flash-success` and `flash-failure`):
```scss
@import "~jq-flash/src/flash"; //using webpack
.flash-x{
  @include flashTheme(
      pink, //bg color
      yellow, //text color
      unset, //box shadow
      10px 10px #00ff00 //text shadow
  );
}
```

`jq-flash` comes with 4 built-in settings : the default one, `flash-success`,`flash-failure`, `flash-info` (a very basic demo is included).



Note that you can also change Sass variables like this :

```scss
$flashPadding: 3px;
$flashRed: orange;
@import "~jq-flash/src/flash"; //using webpack
```



## Is it responsive my good sir ? ##
If you use it as intended (at the very top of the body tag) then yes it is completely responsive, the text breaks on a new line if there would be overflow on the x-axis and the paragraph becomes scrollable if there's too much text for it to handle.

## Q&A ##
This section is empty for now, feel free to ask any questions, they might end up here :D!

## Show time ! ##
`jq-flash` is really handy if you use something like Slim+SlimViews+Twig for you back-end !
For instance, here is my general purpose `flash.twig` file:
```twig
{% if flash.success %}
    <div class="flash flash-folded flash-success">
        <button class="flash-close materialShadow">&#x2716;</button>
        <p>{{ flash.success }}</p>
    </div>
{% endif %}

{% if flash.failure %}
    <div class="flash flash-folded flash-failure">
        <button class="flash-close materialShadow">&#x2716;</button>
        <p>{{ flash.failure }}</p>
    </div>
{% endif %}

{% if flash.info %}
    <div class="flash flash-folded flash-info">
        <button class="flash-close materialShadow">&#x2716;</button>
        <p>{{ flash.info }}</p>
    </div>
{% endif %}
```
This allows me to use `$app->flash("failure", "Incorrect password")` and gets the job done in no time !

## Personnal recommendations ##
I'd like to emphatize on the fact that this plugin was conceived to be used with Roboto (built-in for most browsers) and the special character `&#x2176;`.

I'll probably drop a new CSS library called `material-shadows` (this part will be updated once released) that will allow you to use a variety of different inset shadows for your flash messages, I pulled out the best one yet for this plugin ;)!

An interesting behavior is that they stack on top of each other, which is pretty nice with dem shadows :3 !