<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default CORS Settings
    |--------------------------------------------------------------------------
    |
    | Here you may configure the default CORS settings for your application.
    | These options control how cross-origin requests are handled by your
    | application. You are free to adjust these settings as needed.
    |
    */

    'paths' => ['api/*'],  // Paths që do të lejohen për CORS, në këtë rast të gjitha rruget që fillojnë me 'api/'

    'allowed_methods' => ['*'],  // Lejon çdo metodë HTTP (GET, POST, PUT, DELETE, etj.)

    'allowed_origins' => ['http://localhost:3000'],  // Mund të shtosh edhe origjinën tënde tjetër nëse React është në një server tjetër

    'allowed_origins_patterns' => [],  // Nëse ke pattern-e të veçanta për origjina, mund të shtosh këtu (p.sh. http://*.mydomain.com)

    'allowed_headers' => ['*'],  // Lejon çdo header të dërguar nga frontend-i (për shembull Authorization, Content-Type, etj.)

    'exposed_headers' => [],  // Këto janë headers që mund të dërgohen mbrapa në frontend për shikim

    'max_age' => 0,  // Kjo tregon sa gjatë mund të keqinterpretohet CORS (në sekonda). 0 do të thotë asnjë cache

    'supports_credentials' => false,  // Përdor për të mbështetur cookies ose sesi (true/false)

];
