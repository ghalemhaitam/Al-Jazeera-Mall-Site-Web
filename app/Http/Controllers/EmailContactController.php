<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use League\Flysystem\Exception;

class EmailContactController extends Controller
{
    public function ContactNousSendMail( Request $request){

        try{

            $name = $request->input('name');
            $lastname = $request->input('lastname');
            $phone = $request->input('phone');
            $email = $request->input('email');
            $subject = "Al Jazeera Mall Site Contact";
            $message = $request->input('message');

            $to = "contact@aljazeera.ma";
            $body = "L'email poster par Mr/Mme $name $lastname : $email \n\n Le Téléphone : $phone \n\n Le suject : $subject \n\n Le Message : $message ";

            if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
                // The email address is valid
                if(mail($to,$subject,$body)){
                    return response()->json(['success'=>'true']);
                }else{
                    return response()->json(['error'=>'false']);
                }
            } else {
                return response()->json(['error'=>'false']);
            }


        }catch (Exception $exception){

            return response()->json(['error'=>'false']);
        }
    }
}
