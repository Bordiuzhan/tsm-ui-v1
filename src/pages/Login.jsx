import LoginForm from "../components/forms/LoginForm";

const Login = () => {

    return (<div className="peers ai-s fxw-nw h-100vh">
        <div
            className="d-n@sm- peer peer-greed h-100 pos-r bgr-n bgpX-c bgpY-c bgsz-cv"
            style={{backgroundImage: 'url("assets/static/images/bg.jpg")'}}
        >
            <div className="pos-a centerXY">
                <div
                    className="bgc-white bdrs-50p pos-r"
                    style={{width: '170px', height: '170px'}}
                >
                    <img
                        className="pos-a centerXY"
                        src="./assets/static/images/DNM Logo.svg"
                        alt=""
                    />
                </div>
            </div>
        </div>
        <LoginForm/>
    </div>);
};

export default Login;