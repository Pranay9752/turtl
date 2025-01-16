'use client'
import { Web3Storage } from 'web3.storage'

export function makeStorageClient() {
    
  return new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGMxNUZhZEEyNDM1MDNjZTMzNDk1Qjc3ZDgzYzNkNGZlNzA1MTFDNjYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODcxMjYyOTUwMjgsIm5hbWUiOiJUdXJ0bCJ9.INPfgschetP1V7kvkzXGg-EETh8TL_Elcf4F6vF_GPA" })
}