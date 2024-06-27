import { z } from "zod";
import ValidationErrorResponse from "./validationerrorresponse";




export default class EmailValidationProvider
{
    validateEmail(email:string | undefined):ValidationErrorResponse
    {
        if(email === "" || email === null || email === undefined)
        {
            return {errorText: "E-mail is required!", isErrored: true};
        }
        else
        {
            try
            {
                z.string().email().parse(email);
                return {errorText: null, isErrored: false};
            }
            catch(error)
            {
                return {errorText: "Invalid e-mail address!", isErrored: true};
            }
        }
    }

}


