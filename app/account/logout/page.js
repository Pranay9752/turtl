'use client';
import generateName from "@/app/utils/genName";
import Link from "next/link"
import { useEffect, useState } from "react";
import { useAccountContext } from "../context/AccountContext";
import axios from 'axios';
import { useRouter } from 'next/navigation';

function Logout() {
    const router = useRouter()
    useEffect(() => {
        window.localStorage.clear()
        router.push('/account/wallet/')
    },[])
}

export default Logout