import React from 'react'
import PoliciesTopCard from "@/components/scenes/client/client-policies/policiesTopCard"
import PoliciesDownCard from '@/components/scenes/client/client-policies/policiesDownCard'
const ClientPoliciesPage = () => {
  return (
    <div className='space-y-4'>
      <PoliciesTopCard/>
      <PoliciesDownCard/>
    </div>
  )
}

export default ClientPoliciesPage
