import { Flex } from "antd";
import { PasswordValidationResponse, PasswordValidatorCriteria } from "../../app/validations/passwordvalidationprovider";
import { CancelOutlined, CheckCircleOutline } from "@mui/icons-material";
import "./fmpasswordvalidator.css";


interface IFmPasswordValidatorProps {
    criteria: PasswordValidatorCriteria;
    errors: PasswordValidationResponse;
    className?: string;
}


let FmPasswordValidator: React.FC<IFmPasswordValidatorProps> = ({ criteria, errors, className }) => {

    return (

        <Flex vertical  className={"fm-pw-validator " + className}>
            <p>
                <span className={"fm-pw-validator-icon" }>{errors.lengthError ? <CancelOutlined className="red" /> : <CheckCircleOutline className="green" />}</span>
                <span className="fm-pw-validator-text">Minmum {criteria.min} and maximum {criteria.max} characters</span>
            </p>
            {criteria.hasUpperLowerCase ?
            <p>
                <span className={"fm-pw-validator-icon" }>{errors.hasUpperLowerCaseError ? <CancelOutlined className="red" /> : <CheckCircleOutline className="green" />}</span>
                <span className="fm-pw-validator-text">At least one uppercase and one lowercase letter</span>
            </p> : null}
            {criteria.hasNumber ? 
            <p>
                <span className={"fm-pw-validator-icon" }>{errors.hasNumberError ? <CancelOutlined className="red" /> : <CheckCircleOutline className="green" />}</span>
                <span className="fm-pw-validator-text" >At least one number</span>
            </p> : null}
            {criteria.hasSpecial ?
            <p>
                <span className={"fm-pw-validator-icon" }>{errors.hasSpecialError ? <CancelOutlined className="red" /> : <CheckCircleOutline className="green" />}</span>
                <span className="fm-pw-validator-text">At least one special character</span>
            </p> : null}
        </Flex>
        
    )
    
}

export default FmPasswordValidator;


