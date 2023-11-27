import { useContext } from 'react'
import { AppContext } from '../context/myContext'

export const useApp = () => {
    return useContext(AppContext)
}
