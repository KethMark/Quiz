import React from 'react'
import { Spinner } from '../ui/spinner'

export const LoadingQuestion = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner />
    </div>
  )
}
