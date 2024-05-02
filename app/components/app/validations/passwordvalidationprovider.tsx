import { z } from "zod";



interface PasswordValidatorCriteria {
    min: number;
    max: number;
    hasNumber: boolean;
    hasSpecial: boolean;
    hasUpperCase: boolean;
    hasLowerCase: boolean;
}

interface PasswordValidationResponse {
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

        if(criteria.hasUpperCase)
        {
            try
            {
                z.string().regex(/[A-ZÄÖÜ]/).parse(password);
            }
            catch(error)
            {
                hasUpperLowerCaseError = true;
                error = true;
            }
        }

        if(criteria.hasLowerCase)
        {
            try
            {
                z.string().regex(/[a-zäöüß]/).parse(password);
            }
            catch(error)
            {
                hasUpperLowerCaseError = true;
                error = true;
            }
        }
    }
    
}