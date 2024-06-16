"use client"
import dynamic from 'next/dynamic'
import React from 'react'

const NoSSR_ = (props: { children: React.ReactNode }) => (
    <React.Fragment>{props.children}</React.Fragment>
)

export const NoSSR = dynamic(() => Promise.resolve(NoSSR_), {
    ssr: false
})