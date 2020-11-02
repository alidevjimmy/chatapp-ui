import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function NoAuth(props) {
    const router = useRouter()
    useEffect(() => {
        if (localStorage.getItem('token')) {
            router.push('/')
        }
    })

    return (
        <>
            {props.children}
        </>
    )
}