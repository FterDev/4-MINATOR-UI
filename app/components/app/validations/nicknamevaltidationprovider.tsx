import { z } from "zod";
import ValidationErrorResponse from "./validationerrorresponse";


export default class NciknameValidationProvider {
    

    validateNickname(nickname:string | undefined):ValidationErrorResponse
    {
        if(nickname === "" || nickname == null)
            {
                return {errorText: "Nickname is required!", isErrored: true};
            }
            else
            {
                try
                {
                    z.string().min(3).max(32).parse(nickname);
                    return {errorText: null, isErrored: false};
                }
                catch(error)
                {
                    return {errorText: "Nickname must be between 3 and 32 characters!", isErrored: true};
                }
            }
    }

}