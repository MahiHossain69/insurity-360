import BackButton from "@/components/shared/backButton";
import {
  ArrowUpRightIcon,
  EditPencil,
  PdfDocumentIcon,
} from "@/components/shared/svgs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CancelPolicyModal from "@/components/shared/cancelPolicyModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, Download, FileX, MoreVertical, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import StatusBadge from "./statusBadge";
import Image from "next/image";
import { PiArrowClockwise } from "react-icons/pi";
import { PrintPolicyIcon } from "../../../shared/svgs";
import { Fragment } from "react";

const getFileExtension = (filename) => {
  if (!filename) return "FILE";
  const parts = filename.split(".");
  return parts.length > 1 ? parts.pop().toUpperCase() : "FILE";
};

const getFileType = (extension) => {
  const imageExtensions = [
    "JPG",
    "JPEG",
    "PNG",
    "GIF",
    "SVG",
    "WEBP",
    "BMP",
    "ICO",
  ];
  const documentExtensions = ["PDF", "DOC", "DOCX", "TXT", "RTF"];
  const spreadsheetExtensions = ["XLS", "XLSX", "CSV"];
  const presentationExtensions = ["PPT", "PPTX"];
  const archiveExtensions = ["ZIP", "RAR", "7Z", "TAR", "GZ"];

  if (imageExtensions.includes(extension)) return "Image";
  if (documentExtensions.includes(extension)) return "Document";
  if (spreadsheetExtensions.includes(extension)) return "Spreadsheet";
  if (presentationExtensions.includes(extension)) return "Presentation";
  if (archiveExtensions.includes(extension)) return "Archive";
  return "File";
};

const isImageFile = (extension) => {
  return ["JPG", "JPEG", "PNG", "GIF", "SVG", "WEBP", "BMP", "ICO"].includes(
    extension,
  );
};

const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return "Unknown";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const DocumentCard = ({ doc, extension, fileType, isImage }) => {
  const [fileSize, setFileSize] = useState(null);

  useEffect(() => {
    const fetchFileSize = async () => {
      if (doc.src) {
        try {
          const response = await fetch(doc.src, { method: "HEAD" });
          const contentLength = response.headers.get("content-length");
          if (contentLength) {
            setFileSize(formatFileSize(parseInt(contentLength, 10)));
          } else {
            // Fallback: fetch the file to get size
            const fullResponse = await fetch(doc.src);
            const blob = await fullResponse.blob();
            setFileSize(formatFileSize(blob.size));
          }
        } catch (error) {
          setFileSize("Unknown");
        }
      }
    };

    fetchFileSize();
  }, [doc.src]);

  return (
    <div className="flex gap-2 rounded-lg bg-neutral-50 p-1">
      {isImage ? (
        <Image
          src={doc.src}
          alt={doc.name}
          width={96}
          height={96}
          className="my-auto h-24 w-24 shrink-0 rounded-sm object-cover"
        />
      ) : (
        <Image
          src="/clientimages/file-image.png"
          alt={doc.name}
          width={96}
          height={96}
          className="my-auto h-24 w-24 shrink-0 rounded-sm object-cover"
        />
      )}
      <div className="flex h-full w-full flex-col justify-between py-1">
        <div className="space-y-1">
          <p className="text-sm leading-[1.4em] font-semibold text-neutral-900">
            {doc.name}
          </p>
          <p className="text-xs leading-none text-neutral-400">
            {fileSize || "Loading..."} &nbsp; • &nbsp; {extension}
            {doc.uploadDate && <> &nbsp; • &nbsp; {doc.uploadDate}</>}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src={doc.creator?.avatar || "/clientimages/blake.svg"}
            alt={doc.creator?.name || "Creator"}
            width={24}
            height={24}
            className="rounded-full object-cover"
          />
          <p className="text-xs leading-none text-neutral-500">
            {doc.creator?.name || "Unknown"}
          </p>
        </div>
      </div>
      <Button className="h-8 w-8 rounded-md bg-transparent text-neutral-900 shadow-none duration-300 hover:bg-neutral-500/16">
        <MoreVertical />
      </Button>
    </div>
  );
};

const PolicyDetails = ({ policy }) => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current && contentRef.current.scrollHeight > 200) {
      setShowReadMore(true);
    }
  }, [policy]);

  if (!policy) return null;

  const [firstName, ...lastNameParts] = policy?.client?.name?.split(" ") || [
    "-",
    "-",
  ];
  const lastName = lastNameParts.join(" ");
  const [startDate, endDate] = policy?.dateRange?.split(" - ") || ["-", "-"];

  return (
    <div className="flex flex-col 2xl:h-full 2xl:overflow-hidden">
      <div className="z-10 flex flex-shrink-0 items-center justify-between bg-blue-50 p-4">
        <div className="w-full space-y-3">
          <span className="font-urbanist text-sm leading-none text-neutral-900">
            {policy.policyNumber}
          </span>
          <h2 className="font-urbanist text-2xl leading-none font-medium text-neutral-900">
            {policy.productPlan}
          </h2>
        </div>

        <BackButton className="size-8 rounded-md bg-transparent text-neutral-900 shadow-none hover:bg-neutral-500/15">
          <X />
        </BackButton>
      </div>
      <div className="flex-1 space-y-8 px-4 pt-8 pb-[100px] 2xl:overflow-y-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex h-fit flex-col gap-2 border-l border-neutral-200 pl-4">
            <span className="text-sm leading-none font-medium text-neutral-500">
              Policy type
            </span>
            <p className="text-sm leading-[1.2] font-medium text-neutral-900">
              {policy.type}
            </p>
          </div>
          <div className="flex h-fit flex-col gap-2 border-l border-neutral-200 pl-4">
            <span className="text-sm leading-none font-medium text-neutral-500">
              Issuer
            </span>
            <p className="text-sm leading-[1.2] font-medium text-neutral-900">
              {policy.issuer}
            </p>
          </div>
        </div>
        <hr className="border-dashed border-neutral-200" />
        <h3 className="pl-4 text-lg leading-[1.2em] font-medium text-neutral-900">
          Policy Details
        </h3>
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex h-fit flex-col gap-2 border-l border-neutral-200 pl-4">
              <span className="text-sm leading-none font-medium text-neutral-500">
                First Name
              </span>
              <p className="text-sm leading-[1.2] font-medium text-neutral-900">
                {firstName}
              </p>
            </div>
            <div className="flex h-fit flex-col gap-2 border-l border-neutral-200 pl-4">
              <span className="text-sm leading-none font-medium text-neutral-500">
                Middle Name
              </span>
              <p className="text-sm leading-[1.2] font-medium text-neutral-900">
                -
              </p>
            </div>
            <div className="flex h-fit flex-col gap-2 border-l border-neutral-200 pl-4">
              <span className="text-sm leading-none font-medium text-neutral-500">
                Last Name
              </span>
              <p className="text-sm leading-[1.2] font-medium text-neutral-900">
                {lastName}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex h-fit flex-col gap-2 border-l border-neutral-200 pl-4">
              <span className="text-sm leading-none font-medium text-neutral-500">
                Date of Birth
              </span>
              <p className="text-sm leading-[1.2] font-medium text-neutral-900">
                {policy.client.dob}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex h-fit flex-col gap-2 border-l border-neutral-200 pl-4">
              <span className="text-sm leading-none font-medium text-neutral-500">
                SSN
              </span>
              <p className="text-sm leading-[1.2] font-medium text-neutral-900">
                {policy.client.ssn}
              </p>
            </div>
            <div className="flex h-fit flex-col gap-2 border-l border-neutral-200 pl-4 md:col-span-2">
              <span className="text-sm leading-none font-medium text-neutral-500">
                Address
              </span>
              <div className="flex flex-col gap-2 text-sm leading-[1.2] font-medium text-neutral-900">
                <span>{policy.client.address}</span>
                <span>{policy.client.phone}</span>
                <span>{policy.client.email}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex h-fit flex-col gap-2 border-l border-neutral-200 pl-4">
              <span className="text-sm leading-none font-medium text-neutral-500">
                Gender
              </span>
              <p className="text-sm leading-[1.2] font-medium text-neutral-900">
                {policy.client.gender}
              </p>
            </div>
            <div className="flex h-fit flex-col gap-2 border-l border-neutral-200 pl-4">
              <span className="text-sm leading-none font-medium text-neutral-500">
                Tobacco Use
              </span>
              <p className="text-sm leading-[1.2] font-medium text-neutral-900">
                {policy.client.tobaccoUse}
              </p>
            </div>
            <div className="flex h-fit flex-col gap-2 border-l border-neutral-200 pl-4">
              <span className="text-sm leading-none font-medium text-neutral-500">
                Height & Weight
              </span>
              <p className="text-sm leading-[1.2] font-medium text-neutral-900">
                {policy.client.height} &nbsp; • &nbsp; {policy.client.weight}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 bg-neutral-50 p-4 md:grid-cols-3">
            <div className="flex h-fit flex-col gap-2">
              <span className="text-sm leading-none font-medium text-neutral-500">
                Current Insurance
              </span>
              <p className="text-sm leading-[1.2] font-medium text-neutral-900">
                {policy.currentInsurance}
              </p>
            </div>
          </div>
          <div className="flex items-end justify-between gap-8 rounded-md bg-neutral-50 p-4">
            <div className="flex h-fit flex-col gap-2">
              <span className="text-sm leading-none font-medium text-neutral-900">
                Pre Existing Conditions
              </span>
              <div
                ref={contentRef}
                className={`w-full text-sm leading-[1.4] text-neutral-600 md:max-w-[800px] ${
                  !isExpanded && showReadMore ? "line-clamp-[9]" : ""
                }`}
              >
                {policy.preExistingConditions?.description}
              </div>
            </div>
            {showReadMore && (
              <Button
                onClick={() => setIsExpanded(!isExpanded)}
                className="group relative h-fit bg-transparent px-0 py-0 text-sm leading-none font-semibold text-neutral-900 shadow-none hover:bg-transparent"
              >
                {isExpanded ? "Read Less" : "Read More"}
                <span className="absolute -bottom-px left-0 h-px w-0 bg-neutral-900 duration-300 ease-out group-hover:w-full" />
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex h-fit flex-col gap-2 border-l border-neutral-200 pl-4">
              <span className="text-sm leading-none font-medium text-neutral-500">
                Number of Dependents
              </span>
              <p className="text-sm leading-[1.2] font-medium text-neutral-900">
                {policy.client.dependents}
              </p>
            </div>
            <div className="flex h-fit flex-col gap-2 border-l border-neutral-200 pl-4">
              <span className="text-sm leading-none font-medium text-neutral-500">
                Annual Income Estimate
              </span>
              <p className="text-sm leading-[1.2] font-medium text-neutral-900">
                {policy.client.annualIncome}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 bg-neutral-50 p-4">
            <span className="text-xs leading-[1.2em] font-semibold text-neutral-900">
              Household Members - {policy.householdMembers?.length || 0}
            </span>
            {policy.householdMembers && policy.householdMembers.length > 0 && (
              <div className="grid w-fit grid-cols-2 gap-x-8 gap-y-2">
                <span className="w-fit text-sm leading-none font-medium text-neutral-500">
                  Name
                </span>
                <span className="w-fit text-sm leading-none font-medium text-neutral-500">
                  Relation
                </span>
                {policy.householdMembers.map((member, index) => (
                  <Fragment key={index}>
                    <span className="text-sm leading-[1.2em] font-medium text-neutral-800">
                      {member.name}
                    </span>
                    <span className="text-sm leading-[1.2em] font-medium text-neutral-800">
                      {member.relation}
                    </span>
                  </Fragment>
                ))}
              </div>
            )}
          </div>
          <div className="flex h-fit flex-col gap-2 border-l border-neutral-200 pl-4">
            <span className="text-sm leading-none font-medium text-neutral-500">
              Add-ons
            </span>
            <div className="flex flex-wrap gap-0.5">
              {policy.addOns?.map((addon, index) => (
                <div
                  key={index}
                  className="rounded-full bg-neutral-500/4 px-3 py-2 text-sm leading-none text-neutral-900"
                >
                  {addon}
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr className="border-dashed border-neutral-200" />
        <h3 className="pl-4 text-lg leading-[1.2em] font-medium text-neutral-900">
          Policy Period
        </h3>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex h-fit flex-col gap-1 border-l border-neutral-200 pl-4">
            <span className="text-base leading-[1.2em] font-bold text-neutral-900">
              {policy.duration} duration
            </span>
            <div className="flex items-center gap-2 text-sm leading-[1.4] font-medium text-neutral-500">
              <span>{startDate}</span>{" "}
              <ArrowUpRightIcon className="w-4 rotate-45" />{" "}
              <span>{endDate}</span>
            </div>
          </div>
          <div className="flex h-fit flex-col gap-2 border-l border-neutral-200 pl-4">
            <span className="text-sm leading-none font-medium text-neutral-500">
              Renewal
            </span>
            <div className="flex items-center gap-1 text-sm leading-[1.2] font-medium text-neutral-900">
              <div
                className={`flex h-[18px] w-[18px] items-center justify-center rounded-full ${policy.renewal ? "bg-teal-500" : "bg-red-500"}`}
              >
                {policy.renewal ? (
                  <Check className="h-auto w-3 text-white" />
                ) : (
                  <X className="h-auto w-3 text-white" />
                )}
              </div>
              <span>{policy.renewal ? "Yes" : "No"}</span>
            </div>
          </div>
          <div className="flex h-fit flex-col gap-2 border-l border-neutral-200 pl-4">
            <span className="text-sm leading-none font-medium text-neutral-500">
              Waiting Period
            </span>
            <p className="text-sm leading-[1.2] font-medium text-neutral-900">
              {policy.waitingPeriod}
            </p>
          </div>
        </div>
        <hr className="border-dashed border-neutral-200" />
        <h3 className="pl-4 text-lg leading-[1.2em] font-medium text-neutral-900">
          Premium & Payment
        </h3>
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex h-fit flex-col gap-2 border-l border-neutral-200 pl-4">
              <span className="text-sm leading-none font-medium text-neutral-500">
                Premium Amount
              </span>
              <p className="text-sm leading-[1.2] font-medium text-neutral-900">
                {policy.premium}
              </p>
            </div>
            <div className="flex h-fit flex-col gap-2 border-l border-neutral-200 pl-4">
              <span className="text-sm leading-none font-medium text-neutral-500">
                Payment Mode
              </span>
              <p className="text-sm leading-[1.2] font-medium text-neutral-900">
                {policy.paymentMode}
              </p>
            </div>
            <div className="flex h-fit flex-col gap-2 border-l border-neutral-200 pl-4">
              <span className="text-sm leading-none font-medium text-neutral-500">
                Installment Option
              </span>
              <div className="flex items-center gap-1 text-sm leading-[1.2] font-medium text-neutral-900">
                <div
                  className={`flex h-[18px] w-[18px] items-center justify-center rounded-full ${policy.installmentOption ? "bg-teal-500" : "bg-red-700"}`}
                >
                  {policy.installmentOption ? (
                    <Check className="h-auto w-3 text-white" />
                  ) : (
                    <X className="h-auto w-3 text-white" />
                  )}
                </div>
                <span>
                  {policy.installmentOption ? "Enabled" : "Not Enabled"}
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex h-fit flex-col gap-2 border-l border-neutral-200 pl-4">
              <span className="text-sm leading-none font-medium text-neutral-500">
                Due Date
              </span>
              <p className="text-sm leading-[1.2] font-medium text-neutral-900">
                {policy.dueDate}
              </p>
            </div>
            <div className="flex h-fit flex-col gap-2 border-l border-neutral-200 pl-4">
              <span className="text-sm leading-none font-medium text-neutral-500">
                Last Paid On
              </span>
              <p className="text-sm leading-[1.2] font-medium text-neutral-900">
                {policy.lastPaidOn}
              </p>
            </div>
          </div>
        </div>
        <hr className="border-dashed border-neutral-200" />
        <h3 className="pl-4 text-lg leading-[1.2em] font-medium text-neutral-900">
          Payment History Table
        </h3>
        <Table>
          <TableHeader>
            <TableRow className="border-b border-neutral-200 bg-neutral-50">
              <TableHead className="px-4 py-3.5 text-sm leading-[1.4em] font-semibold text-neutral-900">
                #
              </TableHead>
              <TableHead className="px-4 py-3.5 text-sm leading-[1.4em] font-semibold text-neutral-900">
                Date
              </TableHead>
              <TableHead className="px-4 py-3.5 text-sm leading-[1.4em] font-semibold text-neutral-900">
                Amount
              </TableHead>
              <TableHead className="px-4 py-3.5 text-sm leading-[1.4em] font-semibold text-neutral-900">
                Status
              </TableHead>
              <TableHead className="px-4 py-3.5 text-sm leading-[1.4em] font-semibold text-neutral-900">
                Method
              </TableHead>
              <TableHead className="px-4 py-3.5 text-right text-sm leading-[1.4em] font-semibold text-neutral-900">
                Receipt
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {policy.paymentHistory?.map((payment, index) => (
              <TableRow
                key={payment.id || index}
                className="!border-b border-neutral-500/4"
              >
                <TableCell className="px-4 align-middle text-sm leading-normal text-neutral-500">
                  {index + 1}
                </TableCell>
                <TableCell className="px-4 align-middle text-sm leading-normal text-neutral-500">
                  {payment.date}
                </TableCell>
                <TableCell className="px-4 align-middle text-sm leading-normal text-neutral-500">
                  {payment.amount}
                </TableCell>
                <TableCell className="px-4 align-middle">
                  <StatusBadge status={payment.status} />
                </TableCell>
                <TableCell className="px-4 align-middle text-sm leading-normal text-neutral-500">
                  {payment.method}
                </TableCell>
                <TableCell className="px-4 text-right align-middle">
                  <Button className="h-8 w-8 rounded-md bg-transparent text-neutral-900 shadow-none duration-300 hover:bg-neutral-500/16">
                    <Download />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <hr className="border-dashed border-neutral-200" />
        <h3 className="pl-4 text-lg leading-[1.2em] font-medium text-neutral-900">
          Documents
        </h3>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          {policy.documents?.map((doc, index) => {
            const extension = getFileExtension(doc.name);
            const fileType = getFileType(extension);
            const isImage = isImageFile(extension);

            return (
              <DocumentCard
                key={index}
                doc={doc}
                extension={extension}
                fileType={fileType}
                isImage={isImage}
              />
            );
          })}
        </div>
        <hr className="border-dashed border-neutral-200" />
        <h3 className="pl-4 text-lg leading-[1.2em] font-medium text-neutral-900">
          Activity Log
        </h3>

        <div className="flex flex-col gap-4 pl-4">
          {policy.activityLog?.map((log, index) => (
            <div key={index} className="flex gap-10">
              <p className="font-urbanist text-sm leading-[1.4em] font-medium text-neutral-500">
                {log.date} &nbsp; | &nbsp; {log.time}
              </p>
              <div className="flex flex-col gap-1">
                <p className="font-urbanist text-sm leading-[1.4em] font-medium text-neutral-500">
                  {log.author}
                </p>
                <p className="font-urbanist text-sm leading-[1.4em] font-medium text-neutral-900">
                  {log.action}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative bottom-0 flex w-full flex-shrink-0 flex-col items-center justify-end gap-6 border-t border-neutral-500/16 bg-neutral-50 p-4 md:flex-row">
        <div className="flex items-center gap-3">
          <Dialog open={isCancelModalOpen} onOpenChange={setIsCancelModalOpen}>
            <DialogTrigger asChild>
              <Button className="group h-fit gap-2 bg-transparent !px-0 py-0 text-sm leading-none font-semibold text-neutral-900 shadow-none hover:bg-transparent">
                <FileX className="size-4" />
                <span className="relative">
                  Cancel Policy{" "}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-neutral-900 duration-300 group-hover:w-full" />
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent
              overlayClassName="bg-black/25 duration-300 ease-out"
              className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-100 data-[state=closed]:zoom-out-100 data-[state=open]:slide-in-from-bottom-[48vh] data-[state=closed]:slide-out-to-bottom-[48vh] data- w-auto max-w-fit border-none bg-transparent p-0 shadow-none duration-300 ease-out"
              showCloseButton={false}
            >
              <DialogTitle className="sr-only">Cancel Policy</DialogTitle>
              <CancelPolicyModal
                onClose={() => setIsCancelModalOpen(false)}
                onConfirm={() => setIsCancelModalOpen(false)}
              />
            </DialogContent>
          </Dialog>
          <Button className="group h-fit gap-2 bg-transparent !px-0 py-0 text-sm leading-none font-semibold text-neutral-900 shadow-none hover:bg-transparent">
            <PiArrowClockwise className="size-4" />
            <span className="relative">
              Renew Policy{" "}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-neutral-900 duration-300 group-hover:w-full" />
            </span>
          </Button>
        </div>
        <div className="hidden h-6 w-px bg-neutral-200 md:block" />
        <div className="flex items-center gap-1">
          <Button className="group h-9 gap-2 rounded-md border border-neutral-300 bg-transparent !px-4 text-sm leading-none font-semibold text-neutral-900 shadow-none duration-300 hover:bg-neutral-500/16">
            <PdfDocumentIcon className="size-4" />
            Export to PDF
          </Button>
          <Button className="group h-9 gap-2 rounded-md border border-neutral-300 bg-transparent !px-4 text-sm leading-none font-semibold text-neutral-900 shadow-none duration-300 hover:bg-neutral-500/16">
            <PrintPolicyIcon className="size-4" />
            Print
          </Button>
          <Button className="group h-9 gap-2 rounded-md bg-blue-500 !px-4 text-sm leading-none font-semibold text-white shadow-none duration-300 hover:bg-blue-700">
            <EditPencil className="size-4" />
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PolicyDetails;
