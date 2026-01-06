import insuranceTypes from "@/data/insurance_types.json";
import {
  coverageSelectionOptions,
  garageTypeOptions,
  ownershipOptions,
  petsOptions,
  primaryUseOptions,
  relationshipsToInsured,
  states,
  vehicleModels,
  vehicleYears,
  yearBuiltOptions,
} from "@/data/options";
import { useEffect, useMemo } from "react";
import { useFieldArray } from "react-hook-form";

function slugify(title) {
  return String(title || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function singularFromTitle(title) {
  const t = String(title || "").trim();
  const cleaned = t.replace(/^Additional\s+/i, "");
  return cleaned.replace(/s$/i, "");
}

const titleMapping = {
  primaryInsured: "Insured",
  additionalDrivers: "Additional Drivers",
  vehicles: "Vehicles",
  address: "Address",
  insuranceDetails: "Insurance Details",
  propertyAddress: "Property Address",
  mailingAddress: "Mailing Address",
};

function getTitle(key) {
  return (
    titleMapping[key] ||
    key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())
  );
}

function transformFields(fields) {
  return (
    fields?.map((f) => ({
      name: f.key,
      label: f.label,
      type: f.type,
      required: false,
      validation: f.validation || {},
      placeholder: f.placeholder,
      rows: f.rows,
      className: f.className,
      fullWidth: f.fullWidth,
    })) || []
  );
}

function transformSection(key, value) {
  const title = getTitle(key);
  const section = {
    title,
    repeatable: value.repeatable || false,
    fields: transformFields(value.fields),
    subsections: [],
  };

  if (["Additional Drivers", "Vehicles", "Property Address"].includes(title)) {
    section.backgroundColor = true;
  }

  for (const [subKey, subValue] of Object.entries(value)) {
    if (subKey !== "fields" && subKey !== "repeatable") {
      section.subsections.push({
        title: getTitle(subKey),
        fields: transformFields(subValue.fields),
        backgroundColor: true,
      });
    }
  }

  if (section.subsections.length === 0) delete section.subsections;
  return section;
}

export function useInsuranceSelect(control, policyType) {
  const schema = useMemo(() => {
    const found = insuranceTypes.find((i) => i.insuranceType === policyType);
    if (!found) return [];

    if (found.sections) return found.sections;
    if (found.schema) {
      return Object.entries(found.schema).map(([key, value]) =>
        transformSection(key, value),
      );
    }
    return [];
  }, [policyType]);

  function getOptions(fieldName) {
    switch (fieldName) {
      case "state":
        return states;
      case "relationshipToInsured":
        return relationshipsToInsured;
      case "yearMake":
        return vehicleYears;
      case "model":
        return vehicleModels;
      case "primaryUse":
        return primaryUseOptions;
      case "ownership":
        return ownershipOptions;
      case "coverageSelection":
        return coverageSelectionOptions;
      case "yearBuilt":
        return yearBuiltOptions;
      case "type":
        return garageTypeOptions;
      case "pets":
        return petsOptions;
      default:
        return [];
    }
  }

  function getSectionKey(title) {
    return slugify(title);
  }

  function getFieldPath(sectionTitle, index, fieldName, subsectionTitle) {
    const sectionKey = getSectionKey(sectionTitle);
    if (typeof index === "number") {
      if (subsectionTitle) {
        const subKey = slugify(subsectionTitle);
        return `${sectionKey}.${index}.${subKey}.${fieldName}`;
      }
      return `${sectionKey}.${index}.${fieldName}`;
    }
    if (subsectionTitle) {
      const subKey = slugify(subsectionTitle);
      return `${sectionKey}.${subKey}.${fieldName}`;
    }
    return `${sectionKey}.${fieldName}`;
  }

  function useRepeating(sectionTitle) {
    const name = getSectionKey(sectionTitle);
    const fa = useFieldArray({ control, name });
    useEffect(() => {
      if (!fa.fields.length) fa.append({});
    }, [fa.fields.length]);
    return fa;
  }

  function getAddLabel(title) {
    return `Add ${singularFromTitle(title)}`;
  }

  function getValidation(field) {
    const rules = {};
    if (field?.required) rules.required = true;
    const v = field?.validation || {};
    if (typeof v.min === "number") rules.min = v.min;
    if (typeof v.max === "number") rules.max = v.max;
    if (typeof v.minLength === "number") rules.minLength = v.minLength;
    if (typeof v.maxLength === "number") rules.maxLength = v.maxLength;
    if (typeof v.pattern === "string") rules.pattern = new RegExp(v.pattern);
    return rules;
  }

  function isBackground(section) {
    return !!section?.backgroundColor;
  }

  return {
    schema,
    getOptions,
    getFieldPath,
    useRepeating,
    getAddLabel,
    getValidation,
    isBackground,
  };
}
