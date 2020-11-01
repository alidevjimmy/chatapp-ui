import Link from 'next/link'


export default function Register() {
    
    return (
        <div className="centered">
            <div className="login-box">
                <h3 align="center">Register</h3>
                <form autoComplete="off">
                    <input className="input" placeholder="username" id="username" />
                    <input className="input" placeholder="email" id="email" type="email" />
                    <input className="input" placeholder="password" id="password" type="password" />
                    <button className="button">submit</button>
                </form>
                <br />
                <div className="div-or">
                    <span className="or">or</span>
                </div>
                <hr />
                <br />
                <Link href="/login">
                    <div className="login-button">login</div>
                </Link>
            </div>

        </div>
    )
}