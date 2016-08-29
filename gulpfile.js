var elixir = require('laravel-elixir');

elixir(function(mix) {
    mix.sass('app.scss');
    mix.browserSync({
        proxy: 'getatlas.dev',
        host: '192.168.0.12'
    });
});
