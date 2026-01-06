"use client"
import { DownIcon, RightSettingIcon } from "@/components/shared/svgs";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react"
import Link from "next/link";
import { useEffect, useRef, useState } from "react";


export default function settingMain() {
     const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);



  
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        
        <h1 className="text-[16px] font-medium text-neutral-900 mb-3">General Settings</h1>

    
        <div className="space-y-1.5 mb-5">
         
          <Link href="/settings/company-profile" className="block">
          <div className="bg-neutral-50 h-16.5 max-w-198 border border-neutral-200 rounded-lg px-4 flex items-center justify-between hover:bg-neutral-100 transition-colors cursor-pointer">
            <div className="flex-1">
              <h2 className="text-sm text-neutral-900 mb-1">Company Profile</h2>
              <p className="text-neutral-500 text-xs">Company Name, Logo Upload, Address, Contact Email & Phone, Timezone</p>
            </div>
            <RightSettingIcon className="w-5 h-5 text-neutral-900  ml-4" />
          </div>
          </Link>

         
          <div className="bg-neutral-50 h-16.5  max-w-198  border border-neutral-200 rounded-lg px-4 flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-sm text-neutral-900 mb-1">Default Currency</h2>
              <p className="text-neutral-500 text-xs">Base Currency for the system</p>
            </div>
           <div className="relative  ml-4" ref={dropdownRef}>
      
      <Button
        onClick={() => setIsOpen((prev) => !prev)}
        className="border w-37.5 border-neutral-300 h-9 rounded-lg px-6 py-2 bg-white text-neutral-900 font-medium flex items-center justify-between hover:bg-neutral-50 transition-colors"
      >
        <span>$ USD</span>
        <DownIcon className={`w-2.5 h-1.5 transition-transform  text-neutral-500 duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`} />

      </Button>

      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-white border border-neutral-200 rounded-lg shadow-md z-50">
          <ul className="py-1 text-sm text-neutral-800">
            <li>
              <Button className="w-full bg-transparent shadow-none text-left px-4 py-2 hover:bg-neutral-100">
                $ USD
              </Button>
            </li>
            <li>
              <Button className="w-full bg-transparent shadow-none text-left px-4 py-2 hover:bg-neutral-100">
                € EUR
              </Button>
            </li>
            <li>
              <Button className="w-full bg-transparent shadow-none text-left px-4 py-2 hover:bg-neutral-100">
                £ GBP
              </Button>
            </li>
           
          </ul>
        </div>
      )}
    </div>
          </div>

         
         <Link href="/commission-ledger/commission-rules">
          <div className="bg-neutral-50 h-16.5  max-w-198  border border-neutral-200 rounded-lg px-4 flex items-center justify-between hover:bg-neutral-100 transition-colors cursor-pointer">
            <div className="flex-1">
              <h2 className="text-sm text-neutral-900 mb-1">Commission Rules</h2>
              <p className="text-neutral-500 text-xs">Set your preferred commissions rules via policy types</p>
            </div>
            <RightSettingIcon className="w-5 h-5 text-neutral-900  ml-4" />
          </div>
         </Link>
        </div>

       
        <h2 className="text-[16px] font-medium text-neutral-900 mb-3">User & Access Management</h2>
        <div className="space-y-1.5">
          
        <Link href="/user-management/roles" className="block">
          <div className="bg-neutral-50 h-16.5  max-w-198  border border-neutral-200 rounded-lg px-4 flex items-center justify-between hover:bg-neutral-100 transition-colors cursor-pointer">
            <div className="flex-1">
              <h2 className="text-sm text-neutral-900 mb-1">Roles & Permissions</h2>
              <p className="text-neutral-500 text-xs">
                Create/Edit/Delete Roles, Assign module-level and action-level permissions
              </p>
            </div>
            <RightSettingIcon className="w-5 h-5 text-neutral-900  ml-4" />
          </div>
        </Link>

         
         <Link href="/user-management/team" className="block">
          <div className="bg-neutral-50 h-16.5  max-w-198  border border-neutral-200 rounded-lg px-4 flex items-center justify-between hover:bg-neutral-100 transition-colors cursor-pointer">
            <div className="flex-1">
              <h2 className="text-sm text-neutral-900 mb-1">Team Members</h2>
              <p className="text-neutral-500 text-xs">Add/Edit/Delete users, Assign roles, Activate/Deactivate accounts</p>
            </div>
            <RightSettingIcon className="w-5 h-5 text-neutral-900  ml-4" />
          </div>
         </Link>

          
          <div className="bg-neutral-50 h-16.5 max-w-198  border border-neutral-200 rounded-lg px-4 flex items-center justify-between hover:bg-neutral-100 transition-colors cursor-pointer">
            <div className="flex-1">
              <h2 className="text-sm text-neutral-900 mb-1">Audit Logs</h2>
              <p className="text-neutral-500 text-xs">View system activities by user, module, date</p>
            </div>
            <RightSettingIcon className="w-5 h-5 text-neutral-900  ml-4" />
          </div>
        </div>
      </div>
    </main>
  )
}
