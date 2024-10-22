import { Web3Storage } from 'web3.storage'

export function makeStorageClient() {
    
  return new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGMyYUE2RUVlOUYyNTIyOTAxY0M5YTM3MDM0MkZmOTRGZjFDMTIzMUYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzQ5MDg5MjA5ODMsIm5hbWUiOiJ0dXJ0bCJ9.tJMJuq1DfC7SyOaUzaCaZRRp-Sbap1EGAhhNA71gwiA" })
}