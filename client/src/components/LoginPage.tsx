import React, {Component} from 'react';


class LoginPage extends Component<Props, State> {
    render() {
        return (
            <div className={"login-page"} >
                <div className={"login-section"}>

                    <h2 className={"login-page-title"}>Logg inn</h2>
                    <form className={"login-page-form"}>
                        <div className={"form-group username"}>
                            <label className={"input-label"} htmlFor={"username"}>Brukernavn</label>
                            <input name={"username"} className={"input"} autoFocus placeholder={"OlaNormann"}/>
                        </div>

                        <div className={"form-group password"}>
                            <label className={"input-label"} htmlFor={"password"}>Passord</label>
                            <input name={"password"} className={"input"} type={"password"} autoFocus
                                   placeholder={"Passord"}/>
                        </div>

                        <div className={"form-group"}>
                            <button type={"submit"}>Logg inn</button>
                        </div>
                    </form>
                </div>

            </div>

        );
    }


}

export default LoginPage;

interface Props{
    
}

interface State{

}