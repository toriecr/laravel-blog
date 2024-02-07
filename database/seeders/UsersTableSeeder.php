<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'name' => env('SEEDER_USER_NAME'),
            'email' => env('SEEDER_USER_EMAIL'),
            'password' => Hash::make(env('SEEDER_USER_PASSWORD', 'default_password')),
        ]);
    }
}
