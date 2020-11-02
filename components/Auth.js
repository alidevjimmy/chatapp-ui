import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Auth(props) {
    const router = useRouter()
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push('/login')
        }
    })

    return (
        <>
            {props.children}
        </>
    )
}