import { z } from "zod";



export interface PasswordValidatorCriteria {
    min: number;
    max: number;
    hasNumber: boolean;
    hasSpecial: boolean;
    hasUpperLowerCase: boolean;
}

export interface PasswordValidationResponse {
    error : boolean;
    lengthError : boolean;
    hasNumberError : boolean;
    hasSpecialError : boolean;
    hasUpperLowerCaseError : boolean;
    
}



export default function PasswordValidationProvider(password:string, criteria: PasswordValidatorCriteria) {
    
    let error = false;
    let lengthError = false;
    let hasNumberError = false;
    let hasSpecialError = false;
    let hasUpperLowerCaseError = false;
    

    function validatePassword() {
                
        if(password.length < criteria.min)
        {
            lengthError = true;
            error = true;
        }
        if(password.length > criteria.max)
        {
            lengthError = true;
            error = true;
        }

        if(criteria.hasNumber)
        {
            try
            {
                z.string().regex(/\d/).parse(password);
            }
            catch(error)
            {
                hasNumberError = true;
                error = true;
            }
        }

        if(criteria.hasSpecial)
        {
            try
            {
                z.string().regex(/[^A-Za-z0-9äöüÄÖÜß]/).parse(password);
            }
            catch(error)
            {
                hasSpecialError = true;
                error = true;
            }
        }

        if(criteria.hasUpperLowerCase)
        {
            try
            {
                z.string().regex(/[a-zäöüßA-ZÄÖÜ]/).parse(password);
            }
            catch(error)
            {
                hasUpperLowerCaseError = true;
                error = true;
            }
        }
    }
    
}