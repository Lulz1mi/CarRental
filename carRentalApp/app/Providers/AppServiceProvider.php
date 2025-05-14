<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Contracts\Foundation\MaintenanceMode as MaintenanceModeContract;
use Illuminate\Foundation\FileBasedMaintenanceMode;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(MaintenanceModeContract::class, function ($app) {
            return new FileBasedMaintenanceMode($app->storagePath());
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
