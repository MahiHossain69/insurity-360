"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Check, Pencil, Trash2, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { GoArrowRight, GoDotFill } from "react-icons/go";
import { IoMdCheckmark } from "react-icons/io";
import { useRouter } from "next/navigation";
import allPolicyData from "@/data/all-policy";
import { useClaimsContext } from "@/contexts/ClaimsContext";

import {
  CalendarIcon,
  CheckIcon,
  DropdownIcon,
  DropInfoIcon,
} from "@/components/shared/svgs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PiClockCountdown, PiFolderFill, PiUploadSimple } from "react-icons/pi";

export default function AddNewClaimForm() {
  const router = useRouter();
  const { addNewClaim } = useClaimsContext();
  const [claimType, setClaimType] = useState("");
  const [status, setStatus] = useState("Filed");
  const [selectedPolicy, setSelectedPolicy] = useState("");
  const [selectedPolicyData, setSelectedPolicyData] = useState(null);
  const [claimCode, setClaimCode] = useState("CLM-1011");

  const [filedDate, setFiledDate] = useState(new Date("2025-01-29"));
  const [occurrenceDate, setOccurrenceDate] = useState(null);
  const [occurrenceTime, setOccurrenceTime] = useState("12:00");

  const currencyOptions = ["$ USD", "€ EUR", "£ GBP"];

  const [claimAmountRequested, setClaimAmountRequested] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [approvedAmount, setApprovedAmount] = useState("");

  const [selectedCurrency1, setSelectedCurrency1] = useState("$ USD");
  const [selectedCurrency2, setSelectedCurrency2] = useState("$ USD");
  const [selectedCurrency3, setSelectedCurrency3] = useState("$ USD");

  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [dropdownOpen3, setDropdownOpen3] = useState(false);

  const dropdownRef1 = useRef(null);
  const dropdownRef2 = useRef(null);
  const dropdownRef3 = useRef(null);

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [documentName, setDocumentName] = useState("");
  const [documentNotes, setDocumentNotes] = useState("");
  const [editingFileId, setEditingFileId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const fileInputRef = React.useRef(null);

  const [incidentDescription, setIncidentDescription] = useState("");
  const [claimNotes, setClaimNotes] = useState("");

  // Generate claim code on component mount
  useEffect(() => {
    // Generate a temporary claim code for display
    const generateTempClaimId = () => {
      const timestamp = Date.now();
      const randomNum = Math.floor(Math.random() * 1000);
      return `CLM-${(timestamp % 10000 + randomNum).toString().padStart(4, '0')}`;
    };
    
    setClaimCode(generateTempClaimId());
  }, []);

  // Handle policy selection
  const handlePolicySelection = (policyNumber) => {
    setSelectedPolicy(policyNumber);
    const policyData = allPolicyData.find(policy => policy.policyNumber === policyNumber);
    setSelectedPolicyData(policyData);
  };

  // Function to handle form submission
  const handleSave = () => {
    if (!claimType || !claimAmountRequested || !selectedPolicy) {
      
      return;
    }

    const formatDate = (date) => {
      if (!date) return "";
      return date.toISOString().split('T')[0];
    };

    const formatDateTime = (date, time) => {
      if (!date) return "";
      const dateStr = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit', 
        year: 'numeric'
      });
      return `${dateStr} ${time || '00:00'}`;
    };

    const formatCurrency = (amount, currency) => {
      if (!amount || !currency) return "";
      
      // Extract currency symbol and code from currency string like "$ USD"
      const parts = currency.trim().split(' ');
      const symbol = parts[0] || "$"; // "$"
      const code = parts[1] || ""; // "USD"
      
      // Format number with commas
      const numericAmount = parseFloat(amount);
      if (isNaN(numericAmount)) return `${amount} ${symbol}`;
      
      const formattedAmount = numericAmount.toLocaleString();
      
      // Format as "amount $ USD" to match existing format
      return `${formattedAmount} ${symbol} `;
    };

    const newClaimData = {
      policyTitle: selectedPolicyData ? selectedPolicyData.policyType : "Unknown Policy",
      clientName: selectedPolicyData ? selectedPolicyData.client.name : "Unknown Client",
      clientType: selectedPolicyData ? selectedPolicyData.client.type : "Individual", 
      clientImage: selectedPolicyData ? selectedPolicyData.client.avatar : "/clientimages/blake.svg",
      claimType: claimType,
      claimAmount: formatCurrency(claimAmountRequested, selectedCurrency1),
      filedDate: formatDate(filedDate),
      dateOfOccurrence: formatDateTime(occurrenceDate, occurrenceTime),
      lastUpdated: formatDate(new Date()),
      assignedAgent: selectedPolicyData ? selectedPolicyData.agentName : "Sarah Hudson",
      status: status,
    };

    // Add claim using context
    try {
      const savedClaim = addNewClaim(newClaimData);
     
      
      // Navigate back to claims page
      router.push('/policies/claims');
    } catch (error) {
      console.error('Error saving claim:', error);
      alert("Error: Unable to save claim. Please try again.");
    }
  };

  const handleCurrencySelect = (option, setter, dropdownSetter) => {
    setter(option);
    dropdownSetter(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef1.current &&
        !dropdownRef1.current.contains(event.target) &&
        dropdownRef2.current &&
        !dropdownRef2.current.contains(event.target) &&
        dropdownRef3.current &&
        !dropdownRef3.current.contains(event.target)
      ) {
        setDropdownOpen1(false);
        setDropdownOpen2(false);
        setDropdownOpen3(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const newFile = {
        id: Date.now(),
        name: documentName || file.name,
        size: (file.size / 1024).toFixed(1) + " KB",
        type: file.type.split("/")[1]?.toUpperCase() || "FILE",
        date: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        uploader: "Faiz Ahmed Jiad",
        authorAvatar: "/images/users/user.png",
        notes: documentNotes,
      };
      setUploadedFiles([...uploadedFiles, newFile]);
      setDocumentName("");
      setDocumentNotes("");
      event.target.value = "";
    }
  };
  const handleEditClick = (fileId, currentName) => {
    setEditingFileId(fileId);
    setEditedName(currentName);
  };

  const handleSaveEdit = (fileId) => {
    setUploadedFiles((prev) =>
      prev.map((file) =>
        file.id === fileId ? { ...file, name: editedName } : file,
      ),
    );
    setEditingFileId(null);
    setEditedName("");
  };

  const handleRemoveFile = (fileId) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const times = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      const hour = h.toString().padStart(2, "0");
      const minute = m.toString().padStart(2, "0");
      times.push(`${hour}:${minute}`);
    }
  }

  return (
    <div className="mt-11 max-w-200 space-y-8">
      <section className="space-y-6">
        <div>
          <h2 className="mb-1 text-2xl font-semibold text-neutral-900">
            Claim Information
          </h2>
          <p className="text-sm text-neutral-500 sm:max-w-150">
            Basic information to identify and track this claim. This section
            captures the title, type, and filing details of the claim to help
            categorize and manage it effectively.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <div>
            <Label
              htmlFor="claim-type"
              className="text-sm font-medium text-neutral-900"
            >
              Claim Type
            </Label>
            <Select value={claimType} onValueChange={setClaimType}>
              <SelectTrigger
                id="claim-type"
                className="mt-1.5 h-9 w-full border-neutral-300 bg-white focus:border-neutral-300"
              >
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="health">Health</SelectItem>
                <SelectItem value="auto">Auto</SelectItem>
                <SelectItem value="property">Property</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label
              htmlFor="claim-code"
              className="text-sm font-medium text-neutral-900"
            >
              Claim Code
            </Label>
            <Input
              id="claim-code"
              value={claimCode}
              onChange={(e) => setClaimCode(e.target.value)}
              className="mt-1.5 border-neutral-300 bg-white focus:border-neutral-300 sm:w-64"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <Label
                htmlFor="filed-date"
                className="text-sm font-medium text-neutral-900"
              >
                Filed Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="mt-1.5 w-full border border-neutral-300 bg-white pr-10 pl-3 text-left"
                  >
                    {filedDate ? filedDate.toDateString() : "Select date"}
                    <CalendarIcon className="ml-auto h-4 w-4 text-neutral-500" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto border border-neutral-100 bg-white p-0">
                  <Calendar
                    mode="single"
                    selected={filedDate}
                    onSelect={setFiledDate}
                    className="rounded-md border border-neutral-100"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label
                htmlFor="date-occurrence"
                className="text-sm font-medium text-neutral-900"
              >
                Date of Occurrence
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="mt-1.5 w-full border border-neutral-300 bg-white pr-10 pl-3 text-left"
                  >
                    {occurrenceDate ? occurrenceDate.toDateString() : ""}
                    <CalendarIcon className="ml-auto h-4 w-4 text-neutral-500" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto border border-neutral-100 bg-white p-0">
                  <Calendar
                    mode="single"
                    selected={occurrenceDate}
                    onSelect={setOccurrenceDate}
                    className="rounded-md border border-neutral-100"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="relative">
              <Label
                htmlFor="time-occurrence"
                className="text-sm font-medium text-neutral-900"
              >
                Time of Occurrence
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="time-occurrence"
                    variant="outline"
                    className="mt-1.5 w-full border border-neutral-300 bg-white pr-10 pl-3 text-left"
                  >
                    {occurrenceTime || "Select time"}
                    <PiClockCountdown className="ml-auto h-4 w-4 text-neutral-500" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="h-30 max-w-65 overflow-auto border border-neutral-300 bg-white p-2">
                  {times.map((time) => (
                    <Button
                      key={time}
                      className="w-full rounded bg-transparent px-2 py-1 text-left shadow-none hover:bg-neutral-100"
                      onClick={() => setOccurrenceTime(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div>
            <Label
              htmlFor="status"
              className="text-sm font-medium text-neutral-900"
            >
              Status
            </Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger
                id="status"
                className="mt-1.5 w-full border-neutral-300 bg-white text-neutral-900 focus:border-neutral-300 sm:w-64"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="Filed">Filed</SelectItem>
                <SelectItem value="Pending">Approved</SelectItem>
                <SelectItem value="Approved">Under Review</SelectItem>
                <SelectItem value="Rejected">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <div className="h-[1px] w-full bg-neutral-200"></div>

      <section>
        <div className="mb-7">
          <h2 className="mb-2 text-2xl font-semibold text-neutral-900">
            Policy Details
          </h2>
          <p className="text-sm text-neutral-500 sm:max-w-150">
            Connect the claim to an existing policy. Link this claim to a
            specific policy so relevant data like the policyholder name, number,
            and type can be pulled in automatically.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label
              htmlFor="select-policy"
              className="text-sm font-medium text-neutral-900"
            >
              Select Policy
            </Label>
            <Select value={selectedPolicy} onValueChange={handlePolicySelection}>
              <SelectTrigger
                id="select-policy"
                className="mt-1.5 w-full border-neutral-300 bg-white text-neutral-900 focus:border-neutral-300"
              >
                <SelectValue placeholder="Select a policy" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {allPolicyData.map((policy) => (
                  <SelectItem key={policy.policyNumber} value={policy.policyNumber}>
                    {policy.policyNumber}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-lg border border-neutral-200 p-2">
            {selectedPolicyData ? (
              <div className="flex flex-col gap-2 md:flex-row">
                <div className="flex-1 space-y-4 rounded-[2px] bg-neutral-50 p-4">
                  <div>
                    <div className="font-urbanist mb-1 text-sm font-medium text-neutral-900">
                      {selectedPolicyData.policyNumber}
                    </div>
                    <h3 className="font-urbanist mb-2 text-xl font-semibold text-neutral-900">
                      {selectedPolicyData.policyType}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Badge className="rounded-full bg-neutral-500/8 text-xs text-neutral-900">
                        {selectedPolicyData.type}
                      </Badge>
                      <Badge className={`flex rounded-full border-0 text-xs ${
                        selectedPolicyData.status === 'Active' 
                          ? 'bg-teal-100 text-teal-700'
                          : selectedPolicyData.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : selectedPolicyData.status === 'Expired'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-neutral-100 text-neutral-700'
                      }`}>
                        <GoDotFill className={`h-8 w-8 ${
                          selectedPolicyData.status === 'Active' 
                            ? 'text-teal-500'
                            : selectedPolicyData.status === 'Pending'
                            ? 'text-yellow-500'
                            : selectedPolicyData.status === 'Expired'
                            ? 'text-red-500'
                            : 'text-neutral-500'
                        }`} />
                        {selectedPolicyData.status}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <div className="font-urbanist mb-1 text-sm font-medium text-neutral-500">
                      Duration
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="font-urbanist text-sm font-medium text-neutral-900">
                        {selectedPolicyData.dateRange.split(' - ')[0]}
                      </div>
                      <GoArrowRight className="h-4 w-4 text-neutral-500" />
                      <div className="font-urbanist text-sm font-medium text-neutral-900">
                        {selectedPolicyData.dateRange.split(' - ')[1]}
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-neutral-500">
                    <div className="font-urbanist mb-1 font-medium">
                      Product Plan
                    </div>
                    <div className="font-urbanist font-medium text-neutral-900">
                      {selectedPolicyData.productPlan}
                    </div>
                  </div>
                </div>

                <div className="flex-1 border-neutral-300 bg-neutral-50 p-4">
                  <Avatar className="mb-3 h-32 w-32 rounded-none">
                    <AvatarImage
                      src={selectedPolicyData.client.avatar}
                      className="rounded-lg object-cover"
                      alt={selectedPolicyData.client.name}
                    />
                    <AvatarFallback>
                      {selectedPolicyData.client.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <h4 className="font-urbanist mb-1 text-2xl font-bold text-neutral-900">
                        {selectedPolicyData.client.name}
                      </h4>
                      <div className="font-urbanist mb-7 text-sm text-neutral-500">
                        {selectedPolicyData.client.type}
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="grid grid-cols-[100px_1fr] gap-2">
                          <span className="font-urbanist font-medium text-neutral-500">
                            Coverage
                          </span>
                          <span className="font-urbanist font-medium text-neutral-900">
                            {selectedPolicyData.coverage}
                          </span>
                        </div>
                        <div className="grid grid-cols-[100px_1fr] gap-2">
                          <span className="font-urbanist font-medium text-neutral-500">
                            Premium
                          </span>
                          <span className="font-urbanist font-medium text-neutral-900">
                            {selectedPolicyData.premium}
                          </span>
                        </div>
                        <div className="grid grid-cols-[100px_1fr] gap-2">
                          <span className="font-urbanist font-medium text-neutral-500">
                            Agent
                          </span>
                          <span className="font-urbanist font-medium text-neutral-900">
                            {selectedPolicyData.agentName}
                          </span>
                        </div>
                        <div className="grid grid-cols-[100px_1fr] gap-2">
                          <span className="font-urbanist font-medium text-neutral-500">
                            Duration
                          </span>
                          <span className="font-urbanist font-medium text-neutral-900">
                            {selectedPolicyData.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center py-8 text-neutral-500">
                <p>Please select a policy to view details</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="h-[1px] w-full bg-neutral-200"></div>

      <section>
        <div className="mb-7">
          <h2 className="mb-2 text-2xl font-semibold text-neutral-900">
            Claim Amount
          </h2>
          <p className="text-sm text-neutral-500 sm:max-w-150">
            Financial breakdown of the claim request. Input the total amount
            being requested, any previous payments, and details that help with
            financial tracking and approval decisions.
          </p>
        </div>

        <div className="space-y-6">
          <div ref={dropdownRef1} className="relative sm:w-98">
            <Label htmlFor="claim-amount-requested">
              Claim Amount Requested
            </Label>
            <Input
              id="claim-amount-requested"
              type="number"
              value={claimAmountRequested}
              onChange={(e) => setClaimAmountRequested(e.target.value)}
              className="mt-1.5 h-9 border border-neutral-300 bg-white p-3 pr-28 focus:border-neutral-300 sm:w-98"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              <Button
                onClick={() => setDropdownOpen1(!dropdownOpen1)}
                className="mt-5 flex items-center border-none bg-transparent text-neutral-900 shadow-none hover:bg-transparent"
              >
                <span className="font-urbanist mr-1">{selectedCurrency1}</span>
                <DropdownIcon className="h-3 w-3" />
              </Button>
              {dropdownOpen1 && (
                <div className="absolute right-0 mt-2 w-40 rounded-lg border border-neutral-100 bg-white shadow-md">
                  {currencyOptions.map((option) => (
                    <Button
                      key={option}
                      onClick={() =>
                        handleCurrencySelect(
                          option,
                          setSelectedCurrency1,
                          setDropdownOpen1,
                        )
                      }
                      className={`font-urbanist flex w-full items-center bg-transparent px-4 py-2 text-sm shadow-none ${
                        selectedCurrency1 === option
                          ? "bg-blue-50 font-medium text-blue-600"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {selectedCurrency1 === option && (
                        <IoMdCheckmark className="mr-2 h-4 w-4 text-blue-600" />
                      )}
                      {option}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div ref={dropdownRef2} className="relative sm:w-98">
            <Label htmlFor="paid-amount">Paid Amount</Label>
            <Input
              id="paid-amount"
              type="number"
              value={paidAmount}
              onChange={(e) => setPaidAmount(e.target.value)}
              className="mt-1.5 h-9 border border-neutral-300 bg-white p-3 pr-28 focus:border-neutral-300 sm:w-98"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              <Button
                onClick={() => setDropdownOpen2(!dropdownOpen2)}
                className="mt-5 flex items-center border-none bg-transparent text-neutral-900 shadow-none hover:bg-transparent"
              >
                <span className="font-urbanist mr-1">{selectedCurrency2}</span>
                <DropdownIcon className="h-3 w-3" />
              </Button>
              {dropdownOpen2 && (
                <div className="absolute right-0 mt-2 w-40 rounded-lg border border-neutral-100 bg-white shadow-md">
                  {currencyOptions.map((option) => (
                    <Button
                      key={option}
                      onClick={() =>
                        handleCurrencySelect(
                          option,
                          setSelectedCurrency2,
                          setDropdownOpen2,
                        )
                      }
                      className={`font-urbanist flex w-full items-center bg-transparent px-4 py-2 text-sm shadow-none ${
                        selectedCurrency2 === option
                          ? "bg-blue-50 font-medium text-blue-600"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {selectedCurrency2 === option && (
                        <IoMdCheckmark className="mr-2 h-4 w-4 text-blue-600" />
                      )}
                      {option}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div ref={dropdownRef3} className="relative sm:w-98">
            <Label htmlFor="approved-amount">Approved Amount</Label>
            <Input
              id="approved-amount"
              type="number"
              value={approvedAmount}
              onChange={(e) => setApprovedAmount(e.target.value)}
              className="mt-1.5 h-9 border border-neutral-300 bg-white p-3 pr-28 focus:border-neutral-300 sm:w-98"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              <Button
                onClick={() => setDropdownOpen3(!dropdownOpen3)}
                className="mt-5 flex items-center border-none bg-transparent text-neutral-900 shadow-none hover:bg-transparent"
              >
                <span className="font-urbanist mr-1">{selectedCurrency3}</span>
                <DropdownIcon className="h-3 w-3" />
              </Button>
              {dropdownOpen3 && (
                <div className="absolute right-0 mt-2 w-40 rounded-lg border border-neutral-100 bg-white shadow-md">
                  {currencyOptions.map((option) => (
                    <Button
                      key={option}
                      onClick={() =>
                        handleCurrencySelect(
                          option,
                          setSelectedCurrency3,
                          setDropdownOpen3,
                        )
                      }
                      className={`font-urbanist flex w-full items-center bg-transparent px-4 py-2 text-sm shadow-none ${
                        selectedCurrency3 === option
                          ? "bg-blue-50 font-medium text-blue-600"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {selectedCurrency3 === option && (
                        <IoMdCheckmark className="mr-2 h-4 w-4 text-blue-600" />
                      )}
                      {option}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="h-[1px] w-full bg-neutral-200"></div>

      <section>
        <div className="mb-4">
          <h2 className="mb-1 text-2xl font-semibold text-neutral-900">
            Supporting Documents
          </h2>
          <p className="text-sm text-neutral-500 sm:max-w-150">
            Attach proof or documentation for the claim. Upload necessary files
            like invoices, reports, or medical records to support and validate
            the claim being filed.
          </p>
        </div>

        <div className="mt-8 space-y-4 rounded-lg bg-neutral-50 p-4">
          <div>
            <Label
              htmlFor="document-name"
              className="text-sm font-medium text-neutral-900"
            >
              Name
            </Label>
            <Input
              id="document-name"
              className="mt-1.5 border-neutral-300 bg-white focus:border-neutral-300"
              placeholder=""
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
            />
          </div>

          <div>
            <Label
              htmlFor="upload-file"
              className="text-sm font-medium text-neutral-900"
            >
              Upload File
            </Label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="mt-1.5 cursor-pointer rounded-lg border-2 border-dashed border-neutral-300 bg-white p-8 text-center transition-colors hover:bg-neutral-100 sm:h-9"
            >
              <PiUploadSimple className="mx-auto mb-1 h-6 w-6 text-neutral-500 sm:-mt-6" />
              <p className="text-sm text-neutral-500">
                Drag your file here or click to upload
              </p>
              <Input
                ref={fileInputRef}
                id="upload-file"
                type="file"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
          </div>

          <div>
            <Label
              htmlFor="document-notes"
              className="text-sm font-medium text-neutral-900"
            >
              Document Notes
              <span className="-mt-2 text-[10px] font-semibold text-neutral-400 uppercase">
                Optional
              </span>
            </Label>
            <Textarea
              id="document-notes"
              className="mt-1.5 h-18 resize-none border-neutral-300 bg-white focus-visible:ring-0"
              placeholder=""
              value={documentNotes}
              onChange={(e) => setDocumentNotes(e.target.value)}
            />
          </div>

          <Button
            variant="outline"
            className="h-9 w-23 border-neutral-300 bg-transparent hover:bg-neutral-200"
          >
            Save File
          </Button>
        </div>
        {uploadedFiles.length > 0 && (
          <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
            {uploadedFiles.map((file) => (
              <Card
                key={file.id}
                className="rounded-lg border-none bg-neutral-50 p-2 shadow-none sm:w-99"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-32 w-32 items-center justify-center rounded bg-[#dbeafe]">
                    <PiFolderFill className="h-25 w-25 text-blue-300" />
                  </div>
                  <div className="mt-2 min-w-0 flex-1">
                    <div className="mb-1 flex items-start justify-between gap-2">
                      {editingFileId === file.id ? (
                        <div className="flex w-full items-center gap-2">
                          <Input
                            className="h-7 border-neutral-300 text-sm"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            className="p-1 text-green-600 hover:bg-green-50"
                            onClick={() => handleSaveEdit(file.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="p-1 text-red-500 hover:bg-red-50"
                            onClick={() => setEditingFileId(null)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <h4 className="truncate text-sm font-semibold text-neutral-900">
                            {file.name}
                          </h4>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button className="-mt-2 bg-transparent text-neutral-500 shadow-none hover:bg-transparent hover:text-neutral-500">
                                <DropInfoIcon className="h-4 w-4 text-neutral-900" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="border-neutral-50 bg-white"
                            >
                              <DropdownMenuItem
                                className="flex cursor-pointer items-center gap-2 text-sm"
                                onClick={() =>
                                  handleEditClick(file.id, file.name)
                                }
                              >
                                <Pencil className="h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="flex cursor-pointer items-center gap-2 text-sm text-red-600 focus:text-red-600"
                                onClick={() => handleRemoveFile(file.id)}
                              >
                                <Trash2 className="h-4 w-4" /> Remove
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </>
                      )}
                    </div>

                    <p className="-mt-2 mb-2 text-xs text-neutral-400">
                      {file.size} • {file.type} • {file.date}
                    </p>

                    <div className="mt-12.5 flex items-center gap-2">
                      <Avatar className="h-5 w-5">
                        <AvatarImage
                          src={file.authorAvatar || "/placeholder.svg"}
                          alt={file.uploader || "Unknown"}
                        />
                        <AvatarFallback className="bg-[#dbeafe] text-xs text-neutral-900">
                          {file.uploader?.[0] || "?"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-neutral-500">
                        {file.uploader}
                      </span>
                    </div>
                  </div>
                </div>
                {file.notes && (
                  <p className="-mt-4 text-xs text-neutral-500">{file.notes}</p>
                )}
              </Card>
            ))}
          </div>
        )}
      </section>
      <div className="h-[1px] w-full bg-neutral-200"></div>

      <section>
        <div className="mb-4">
          <h2 className="mb-1 text-2xl font-semibold text-neutral-900">
            Additional Details
          </h2>
          <p className="text-sm text-neutral-500 sm:max-w-150">
            Provide context and relevant notes. Include a description of what
            happened, and optionally leave notes for internal use to assist with
            review or auditing later.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <div>
            <Label
              htmlFor="incident-description"
              className="text-sm font-medium text-neutral-900"
            >
              Incident Description
            </Label>
            <Textarea
              id="incident-description"
              value={incidentDescription}
              onChange={(e) => setIncidentDescription(e.target.value)}
              className="mt-1.5 h-18 resize-none border-neutral-300 bg-white focus-visible:ring-0"
              placeholder=""
            />
          </div>

          <div>
            <Label
              htmlFor="claim-notes"
              className="text-sm font-medium text-neutral-900"
            >
              Claim Notes (Internal)
            </Label>
            <Textarea
              id="claim-notes"
              value={claimNotes}
              onChange={(e) => setClaimNotes(e.target.value)}
              className="mt-1.5 h-18 resize-none border-neutral-300 bg-white focus-visible:ring-0"
              placeholder=""
            />
          </div>
        </div>
      </section>

      <div className="flex gap-4">
        <Button 
          className="h-9 w-23 bg-blue-500 text-white hover:bg-blue-400"
          onClick={handleSave}
        >
          <CheckIcon className="h-5 w-5 text-white" />
          Save
        </Button>
        <Button
          variant="outline"
          className="border-none bg-transparent px-8 text-neutral-900 shadow-none"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
