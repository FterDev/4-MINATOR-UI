
import "./fmloading.css";
import { Flex } from "antd";
import FmCard from "../fmcard/fmcard";
import { LoadingOutlined } from "@ant-design/icons";




let FmLoading = () => {

    return (
        <Flex justify="center" align="center" className="fm-loading">
            <FmCard>
                <Flex justify="center" align="center" vertical className="fm-loading-card">
                    <LoadingOutlined className="fm-loading-spiner" />
                    <label className="fm-loading-text">Loading</label>
                </Flex> 
            </FmCard>
        </Flex>
    );
}



export default FmLoading;