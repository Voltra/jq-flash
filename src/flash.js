import "@/flash.scss";

(function UniversalJQueryPluginDefinition(factory){
    if(typeof define == "function" && define.amd)
        //AMD: register as anonymous module
        define(["jquery"], factory);
    else if(typeof exports == "object" && typeof module != "undefined")
        //Node(npm)/CommonJS
        module.exports = factory;
    else
        //regular use of the plugin
        factory(jQuery);

})($ => {
    $(document).ready(() => {
        //////On first DOM load
        $(".flash").click(function(){
            const $this = $(this);
            $this.addClass("flash-folded");
            setTimeout(
                () => $this.remove(),
                2000//wait 2s before removing node
            );
        });

        $(".flash.flash-folded").each((_, e) => $(e).removeClass("flash-folded"));
        //////On first DOM load
    });


    /**
     * Display a flash message
     * @param {string} type - Type of the message (eg. success, info)
     * @param {string} message - The actual body of the message
     */
    $.flash = (type, message) => {
        message = message ? `${message}` : "";//to string
        message.replace(/</g, "&lt;").replace(/>/g, "&gt;");//Protect again XSS

        let ret = null, div = null;

        if(typeof type == "string"){
            const className = `flash-${type}`;
            div = document.createElement("div");
            div.classList.add("flash");
            div.classList.add("flash-folded");
            if(type!="")
                div.classList.add(className);

            const p = document.createElement("p");
            p.appendChild(document.createTextNode(message));

            const button = document.createElement("button");
            button.classList.add("flash-close");
            button.innerHTML = "&#x2716;";//a nice X


            div.appendChild(button);
            div.appendChild(p);

            document.querySelector("body").prepend(div);

            //ret = Array.prototype.slice.apply(document.querySelector("body > .flash")).filter(e=>e == div);
        }else
            throw new TypeError(`expected a string, got ${typeof type}`);

        setTimeout(() => div.classList.remove("flash-folded"), 100);

        $(div).click(function(){
            const $this = $(this);
            $this.addClass("flash-folded");
            setTimeout(
                () => $this.remove(),
                2000//wait 2s before removing node
            );
        });
    };


    //Exposes $.flash.success, $.flash.failure, $.flash.info
    //as shorthand functions
    ["success", "failure", "info"]
    .forEach(type => $.flash[type] = $.flash.bind($, type));

    //Provides a way to get the default styles
    $.flash.default = $.flash.bind($, "");
});