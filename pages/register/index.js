import Link from 'next/link'
import { useState, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { APP_CONFIG } from '../../constant/config'
import SnakBar from "../../components/SnakBar"
import { useRouter } from 'next/router'
import NoAuth from '../../components/NoAuth'



export default function Register() {

    const router = useRouter()
    const [snakMessage, setSnakMessage] = useState('')

    const { register, handleSubmit, errors, formState, watch } = useForm({
        mode: "onSubmit"
    })

    function onSubmit(data) {
        setSnakMessage('')
        axios.post(`${APP_CONFIG.baseUrl}/${APP_CONFIG.appVersion}/auth/register`, data)
            .then(res => {
                localStorage.setItem('token', res.data.token)
                router.push('/')

            })
            .catch(err => {
                setSnakMessage(err.response.data.message)
            })
    }

    return (
        <NoAuth>
            <div className="centered">
                {snakMessage != '' ? <SnakBar open={true}>{snakMessage}</SnakBar> : null}
                <div className="login-box">
                    <h3 align="center">REGISTER</h3>
                    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                        <input className={`input ${errors.username ? "input-err" : null}`} name="username" placeholder="Username" id="username" ref={register({
                            required: true,
                            minLength: 6,
                            pattern: /^[A-Za-z]+$/i,
                        })} />
                        {
                            errors.username ? <small className="text-err">username is required and min length is 6</small> : null
                        }
                        <input className={`input ${errors.email ? "input-err" : null}`} name="email" placeholder="Email" id="email" type="text" ref={register({
                            required: true,
                            pattern: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                        })} />
                        {
                            errors.email ? <small className="text-err">email is required</small> : null
                        }
                        <input className={`input ${errors.password ? "input-err" : null}`} name="password" placeholder="Password" id="password" type="password" ref={register({
                            required: true,
                            minLength: 6,
                        })} />
                        {
                            errors.password ? <small className="text-err">password is required and min length is 6</small> : null
                        }
                        <input className={`input ${errors.newPassword ? "input-err" : null}`} type="text" name="newPassword" ref={register({
                            validate: (value) => value === watch('password')
                        })} placeholder="Password Confirmation" type="password" />
                        {
                            errors.newPassword ? <small className="text-err">password doesn't match</small> : null
                        }
                        <button className="button" disabled={formState.isSubmitting}>
                            {
                                formState.isSubmitting ? <CircularProgress className="progress-circle" size={15} /> : "submit"
                            }
                        </button>
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
        </NoAuth>
    )
}