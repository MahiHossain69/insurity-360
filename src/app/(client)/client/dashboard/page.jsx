import React from 'react'
import DashboardImage from "@/components/scenes/client/client-dashboard/dashboardImage"
import DashboardCard from '@/components/scenes/client/client-dashboard/dashboardCard'
import DashboardDown from '@/components/scenes/client/client-dashboard/dashboardDown'
const ClientDashboardPage = () => {
  return (
    <div className='space-y-4'>
      <DashboardImage/>
      <DashboardCard/>
      <DashboardDown/>
    </div>
  )
}

export default ClientDashboardPage
