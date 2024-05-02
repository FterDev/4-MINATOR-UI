import { Flex } from "antd";
import { PasswordValidationResponse, PasswordValidatorCriteria } from "../../app/validations/passwordvalidationprovider";
import { CancelOutlined, CheckCircleOutline } from "@mui/icons-material";



interface IFmPasswordValidatorProps {
    criteria: PasswordValidatorCriteria;
    errors: PasswordValidationResponse;
}


let FmPasswordValidator: React.FC<IFmPasswordValidatorProps> = ({ criteria, errors }) => {

    return (

        <Flex className="fm-pw-validator">
            <p>
                <span className={"fm-pw-validator-icon" }>{errors.lengthError ? <CancelOutlined className="red" /> : <CheckCircleOutline className="green" />}</span>
                <span>Minmum {criteria.min} and maximum {criteria.max} characters</span>
            </p>
            criteria.hasUpperLowerCase ?
            <p>
                <span className={"fm-pw-validator-icon" }>{errors.hasUpperLowerCaseError ? <CancelOutlined className="red" /> : <CheckCircleOutline className="green" />}</span>
                <span>At least one uppercase and one lowercase letter</span>
            </p> : null
            criteria.hasNumber ? 
            <p>
                <span className={"fm-pw-validator-icon" }>{errors.hasNumberError ? <CancelOutlined className="red" /> : <CheckCircleOutline className="green" />}</span>
                <span>At least one number</span>
            </p> : null
            criteria.hasSpecial ?
            <p>
                <span className={"fm-pw-validator-icon" }>{errors.hasSpecialError ? <CancelOutlined className="red" /> : <CheckCircleOutline className="green" />}</span>
                <span>At least one special character</span>
            </p> : null
        </Flex>
        
    )
    
        
    
}