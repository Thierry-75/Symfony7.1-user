<?php


namespace App\Service;


class IntraController
{
    static function confirmationEmail($user)
    {
        if(!$user == null){
            if($user->isVerified() == false){
                return true;
            }
        }
    }
}