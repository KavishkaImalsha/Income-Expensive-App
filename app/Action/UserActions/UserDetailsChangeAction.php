<?php

namespace App\Action\UserActions;

use App\Models\RegisteredUser;

class UserDetailsChangeAction
{
    public function __invoke($user_id, $validateRequest)
    {
        $userDetails = RegisteredUser::find($user_id);
        $userDetails->firstName =  $validateRequest['firstName'];
        $userDetails->lastName = $validateRequest['lastName'];
        $userDetails->email = $validateRequest['email'];
        $userDetails->save();

        return [
            'message' => 'Details successfully changed'
        ];
    }
}
