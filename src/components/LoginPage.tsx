import React, {Component} from 'react';


class LoginPage extends Component<{}, {}> {
    render() {
        return (
            <div className={"login-page"}>
                <h2>Logg inn</h2>
                <form>
                    <div className={"form-group username"}>
                        <label className={"input-label"} htmlFor={"username"}>Brukernavn</label>
                        <input name={"username"} className={"input"} autoFocus placeholder={"OlaNormann"}/>
                    </div>

                    <div className={"form-group password"}>
                        <label className={"input-label"} htmlFor={"password"}>Passord</label>
                        <input name={"password"} className={"input"} type={"password"} autoFocus
                               placeholder={"Passord"}/>
                    </div>
                </form>

            </div>

        );
    }


}

export default LoginPage;