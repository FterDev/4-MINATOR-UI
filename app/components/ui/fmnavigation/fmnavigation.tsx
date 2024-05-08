import './fmnavigation.css';
import FmCard from "../fmcard/fmcard";




interface FmNavigationProps {
    username: string;
    picture: string;
}


let FmNavigation: React.FC<FmNavigationProps> = (props) => {
    return (
        <FmCard className='fm-navigation'>
             Welcome {props.username}
        </FmCard>
    );
}

export default FmNavigation;

