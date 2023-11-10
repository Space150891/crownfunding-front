import { useAppDispatch } from '@hooks/redux-typed-hooks'
import { getAllCampsRequest } from '@store/campaigns'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const useGlobal = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleUpdate = () => {
    if (!router.isReady) return
    dispatch(getAllCampsRequest())
    router.push('/')
  }

  useEffect(() => {
    handleUpdate()
  }, [router.isReady])
}
