<?php

namespace App\Enums;

enum Role: string
{
    case USER = 'user';
    case ADMIN = 'admin';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
