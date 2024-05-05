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



export default class PasswordValidationProvider {
    
    error = false;
    lengthError = false;
    hasNumberError = false;
    hasSpecialError = false;
    hasUpperLowerCaseError = false;

    criteria: PasswordValidatorCriteria = {
        min: 8,
        max: 32,
        hasNumber: true,
        hasSpecial: true,
        hasUpperLowerCase: true
    };
    
    constructor(criteria: PasswordValidatorCriteria) {
        this.criteria = criteria;
    }

    validatePassword(password:string | undefined | null) {

        if(password === null || password === undefined)
        {
            password = "";
        }
                
        if(password.length < this.criteria.min)
        {
            this.lengthError = true;
            this.error = true;
        }
        if(password.length > this.criteria.max)
        {
            this.lengthError = true;
            this.error = true;
        }

        if(this.criteria.hasNumber)
        {
            try
            {
                z.string().regex(/\d/).parse(password);
            }
            catch(error)
            {
                this.hasNumberError = true;
                this.error = true;
            }
        }

        if(this.criteria.hasSpecial)
        {
            try
            {
                z.string().regex(/[^A-Za-z0-9äöüÄÖÜß]/).parse(password);
            }
            catch(error)
            {
                this.hasSpecialError = true;
                this.error = true;
            }
        }

        if(this.criteria.hasUpperLowerCase)
        {
            try
            {
                z.string().regex(/[A-ZÄÖÜ]/).parse(password);
            }
            catch(error)
            {
                this.hasUpperLowerCaseError = true;
                this.error = true;
            }
        }


        if(this.criteria.hasUpperLowerCase)
            {
                try
                {
                    z.string().regex(/[a-zäöüß]/).parse(password);
                }
                catch(error)
                {
                    this.hasUpperLowerCaseError = true;
                    this.error = true;
                }
            }

        return {
            error: this.error,
            lengthError: this.lengthError,
            hasNumberError: this.hasNumberError,
            hasSpecialError: this.hasSpecialError,
            hasUpperLowerCaseError: this.hasUpperLowerCaseError
        };
    }
    
}

