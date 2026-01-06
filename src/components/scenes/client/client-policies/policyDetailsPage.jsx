import { X, Check, FileText, Printer, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CancelPolicyIcon, CheckIcon, ClientCheckIcon, ExportPolicyIcon, PdfIcon, PrintPolicyIcon, RenewPolicyIcon, RightIcon } from "@/components/shared/svgs"

export default function PolicyDetailsPage() {
  return (
    <div className="min-h-screen">
     
      <div className="bg-blue-50  px-8 py-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-neutral-900 font-urbanist mb-1">POL-2024-101</p>
            <h1 className="text-2xl font-medium font-urbanist text-neutral-900">Health Essentials</h1>
          </div>
          
        </div>
      </div>

     
      <div className=" px-8 py-8">
        
        <div className=" mb-4">
          <div className="grid grid-cols-3 border-b-2 border-dashed border-neutral-200 gap-8 pb-10">
            <div className="border-l border-neutral-200 pl-4">
              <p className="text-sm font-medium text-neutral-500 mb-1">Policy type</p>
              <p className="text-sm font-medium text-neutral-900">Health</p>
            </div>
            <div className="border-l border-neutral-200 pl-4 ">
              <p className="text-sm font-medium text-neutral-500 mb-1">Product</p>
              <p className="text-sm font-medium text-neutral-900">Med Secure Basic</p>
            </div>
            <div className="border-l border-neutral-200 pl-4">
              <p className="text-sm font-medium text-neutral-500 mb-1">Issuer</p>
              <p className="text-sm  font-medium text-neutral-900">NRMA Insurance</p>
            </div>
          </div>
        </div>

        
        <div className=" mb-8">
          <h2 className="text-lg p-4 font-medium text-neutral-900 mb-4">Policy Coverage</h2>

          <div className="grid grid-cols-3 gap-8 mb-8 pb-10 border-b-2 border-neutral-200 border-dashed">
            <div className="border-l border-neutral-200 pl-4">
              <p className="text-sm text-neutral-500 font-medium mb-1">Coverage Type</p>
              <p className="text-sm font-medium text-neutral-900">Full Coverage</p>
            </div>
            <div className="border-l border-neutral-200 pl-4">
              <p className="text-sm text-neutral-500 font-medium mb-1">Coverage Limit</p>
              <p className="text-sm font-medium text-neutral-900">5,000 $ USD</p>
            </div>
          </div>

          
          <div className="mb-8 border-l border-neutral-200 pl-4">
            <p className="text-sm text-neutral-500 mb-2">Covered Benefits</p>
            <div className="flex gap-3 flex-wrap">
              <Badge className="px-4 py-2 bg-neutral-500/4 text-neutral-900 rounded-full text-sm  ">
                Hospitalization
              </Badge>
              <Badge className="px-4 py-2 bg-neutral-500/4 text-neutral-900 rounded-full text-sm  ">
                Ambulance
              </Badge>
              <Badge className="px-4 py-2 bg-neutral-500/4 text-neutral-900 rounded-full text-sm  ">
                ICU
              </Badge>
            </div>
          </div>
        </div>


        <div className="mb-8">
            <div className="bg-neutral-50 w-full py-5 px-4 rounded-md ">
                <h1 className="text-sm font-medium text-neutral-900 mb-1">
                    Covered Benefits
                </h1>
                <h3 className="text-sm text-neutral-600 mb-6">This policy does not cover any pre-existing conditions diagnosed within 24 months prior to the policy start date. The following exclusions also apply:</h3>

                <ul className="text-sm list-disc pl-5 text-neutral-600 space-y-1 decoration-dotted">
                    <li>Cosmetic or elective procedures not deemed medically necessary, including plastic surgery, hair restoration, and weight-loss surgery.</li>
                    <li>Injuries resulting from self-harm, suicide attempts, or substance abuse, including alcohol or drug-related incidents.</li>
                    <li>Treatment received outside the country of residence unless explicitly included in the policy rider.</li>
                    <li>War-related injuries or illnesses, including those caused by active military duty, riots, or civil commotion.</li>
                    <li>Pregnancy and childbirth-related expenses, unless the maternity benefit rider is selected.</li>
                    <li>Experimental treatments or unapproved therapies, including clinical trial participation or unlicensed procedures.</li>
                </ul>
            </div>
        </div>

       
       <div className="mb-8 border-b-2 border-neutral-200 border-dashed">
         <div className=" mb-8 border-l border-neutral-200 pl-4  ">
          <h3 className="text-sm font-medium text-neutral-500 mb-2">Add-ons</h3>
          <div className="flex gap-3 flex-wrap">
            <Badge className="px-4 py-2 bg-neutral-500/4 text-neutral-900 rounded-full text-sm ">
              Maternity Coverage
            </Badge>
            <Badge className="px-4 py-2 bg-neutral-500/4 text-neutral-900 rounded-full text-sm ">
              Personal Accident Protection
            </Badge>
          </div>
        </div>
       </div>

       <div className="mb-8">
        <h1 className="font-medium text-lg text-neutral-900 mb-6">Policy Period</h1>

        <div className="grid grid-cols-3 border-b-2 border-dashed border-neutral-200 gap-8 pb-10">
            <div>
              <p className="text-[16px] font-bold text-neutral-900 mb-1">01 year duration</p>
              <p className=" text-[10px] sm:text-sm flex items-center gap-1 font-medium text-neutral-500">
                <span>01 March 2024</span>
                <RightIcon className="sm:w-5 sm:h-5" />
                <span>01 March 2025</span>
                 </p>
            </div>
            <div className="border-l border-neutral-200 pl-4 ">
              <p className="text-sm font-medium text-neutral-500 mb-1">Renewal</p>
              <div className="text-sm flex items-center gap-1.5 font-medium text-neutral-900">
                <div className="py-1 bg-teal-500 px-1 rounded-full">
                    <ClientCheckIcon className="w-3 h-3"/>

                </div>
                 Yes</div>
            </div>
            <div className="border-l border-neutral-200 pl-4">
              <p className="text-sm font-medium text-neutral-500 mb-1">Waiting Period</p>
              <p className="text-sm  font-medium text-neutral-900">30 days from start</p>
            </div>
          </div>
       </div>

       
        <div >
          <h2 className="text-lg font-medium text-neutral-900 ">Premium & Payment</h2>

        </div>
      </div>
          <div className="bg-neutral-50 py-4 px-4">
            <div className="flex gap-2 items-center sm:justify-end justify-center flex-wrap">
            <Button variant="outline" className=" text-neutral-900 hover:bg-neutral-500/4 text-sm font-semibold border-none shadow-none bg-transparent">
              <CancelPolicyIcon  className="w-5 h-5" />
              Cancel Policy
            </Button>
            <Button variant="outline" className="border-none shadow-none font-semibold text-sm text-neutral-900 hover:bg-neutral-500/4 bg-transparent">
              <RenewPolicyIcon className="w-5 h-5" />
              Renew Policy
            </Button>
            <div className="ml-3 mr-3 w-px h-6 hidden sm:block bg-neutral-200"></div>
            <Button variant="outline" className="border-neutral-300 border text-neutral-900 hover:bg-neutral-500/4 text-sm font-semibold -mr-1 bg-transparent">
              <ExportPolicyIcon  className="w-5 h-5" />
              Export to PDF
            </Button>
            <Button variant="outline" className="border-neutral-300 border text-neutral-900 hover:bg-neutral-500/4 text-sm font-semibold bg-transparent">
              <PrintPolicyIcon  className="w-5 h-5" />
              Print
            </Button>
             <div className="ml-3 mr-3 w-px h-6 hidden sm:block bg-neutral-200"></div>
            <Button className="bg-blue-500 hover:bg-blue-800 text-white ">
              Claim Recovery
            </Button>
          </div>
          </div>
    </div>
  )
}
