function run() {
    window.__meteor_runtime_config__ = $$__meteor_runtime_config__$$;
    var scripts = $$scripts$$;
    for (var i = 0; i < scripts.length; i++) {
        var el = document.createElement('script');
        el.src = scripts[i];
        document.head.appendChild(el);
    }
}


WebApp.connectHandlers.use("/embedded", function(req, res, next) {
    let source = run.toString();
    const scripts = [];
    for (let file of Object.keys(WebAppInternals.staticFiles)) {
        if (file.endsWith('.js')) {
            scripts.push(Meteor.absoluteUrl(file.slice(1)));
        }
    }

    source = source.replace('$$__meteor_runtime_config__$$', JSON.stringify(__meteor_runtime_config__));
    source = source.replace('$$scripts$$', JSON.stringify(scripts));

    res.writeHead(200, {
        'Content-Type': 'application/javascript; charset=UTF-8'
    });
    res.end('(' + source + ')();');
});

WebApp.connectHandlers.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return next();
});