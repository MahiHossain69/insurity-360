"use client";
import { useCallback, useMemo, useState } from "react";
import { generateFieldName, slugify } from "@/lib/utils";

function emptySection() {
  return { title: "New Section", backgroundColor: false, repeatable: false, fields: [], subsections: [] };
}

function emptySubsection() {
  return { title: "New Subsection", backgroundColor: false, fields: [] };
}

function emptyField() {
  return { label: "Field Label", name: "field", type: "text", required: false, validation: {}, options: [] };
}

export function useInsuranceBuilder(initial) {
  const [typeName, setTypeName] = useState(initial?.insuranceType || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [sections, setSections] = useState(initial?.sections || []);

  const addSection = useCallback(() => {
    setSections((prev) => [...prev, emptySection()]);
  }, []);

  const updateSectionTitle = useCallback((index, title) => {
    setSections((prev) => prev.map((s, i) => (i === index ? { ...s, title } : s)));
  }, []);

  const toggleSectionFlag = useCallback((index, key) => {
    setSections((prev) => prev.map((s, i) => (i === index ? { ...s, [key]: !s[key] } : s)));
  }, []);

  const moveSection = useCallback((from, to) => {
    setSections((prev) => {
      if (from === to || from < 0 || to < 0 || from >= prev.length || to >= prev.length) return prev;
      const next = [...prev];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
  }, []);

  const removeSection = useCallback((index) => {
    setSections((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const addSubsection = useCallback((sectionIndex) => {
    setSections((prev) => prev.map((s, i) => (i === sectionIndex ? { ...s, subsections: [...(s.subsections || []), emptySubsection()] } : s)));
  }, []);

  const updateSubsectionTitle = useCallback((sectionIndex, subIndex, title) => {
    setSections((prev) => prev.map((s, i) => {
      if (i !== sectionIndex) return s;
      const subs = (s.subsections || []).map((sub, j) => (j === subIndex ? { ...sub, title } : sub));
      return { ...s, subsections: subs };
    }));
  }, []);

  const toggleSubsectionFlag = useCallback((sectionIndex, subIndex, key) => {
    setSections((prev) => prev.map((s, i) => {
      if (i !== sectionIndex) return s;
      const subs = (s.subsections || []).map((sub, j) => (j === subIndex ? { ...sub, [key]: !sub[key] } : sub));
      return { ...s, subsections: subs };
    }));
  }, []);

  const removeSubsection = useCallback((sectionIndex, subIndex) => {
    setSections((prev) => prev.map((s, i) => {
      if (i !== sectionIndex) return s;
      const subs = (s.subsections || []).filter((_, j) => j !== subIndex);
      return { ...s, subsections: subs };
    }));
  }, []);

  const addField = useCallback((sectionIndex, subIndex) => {
    setSections((prev) => prev.map((s, i) => {
      if (i !== sectionIndex) return s;
      const field = emptyField();
      const existingNames = subIndex == null ? s.fields.map((f) => f.name) : (s.subsections?.[subIndex]?.fields || []).map((f) => f.name);
      field.name = generateFieldName(field.label, existingNames);
      if (subIndex == null) {
        return { ...s, fields: [...s.fields, field] };
      }
      const subs = [...(s.subsections || [])];
      const target = { ...(subs[subIndex] || emptySubsection()) };
      target.fields = [...(target.fields || []), field];
      subs[subIndex] = target;
      return { ...s, subsections: subs };
    }));
  }, []);

  const appendField = useCallback((sectionIndex, payload) => {
    setSections((prev) => prev.map((s, i) => {
      if (i !== sectionIndex) return s;
      const existingNames = s.fields.map((f) => f.name);
      const name = payload?.name || generateFieldName(payload?.label || "Field", existingNames);
      const next = { ...emptyField(), ...payload, name };
      return { ...s, fields: [...s.fields, next] };
    }));
  }, []);

  const appendSubField = useCallback((sectionIndex, subIndex, payload) => {
    setSections((prev) => prev.map((s, i) => {
      if (i !== sectionIndex) return s;
      const subs = [...(s.subsections || [])];
      const sub = { ...(subs[subIndex] || emptySubsection()) };
      const existingNames = (sub.fields || []).map((f) => f.name);
      const name = payload?.name || generateFieldName(payload?.label || "Field", existingNames);
      const nextField = { ...emptyField(), ...payload, name };
      sub.fields = [...(sub.fields || []), nextField];
      subs[subIndex] = sub;
      return { ...s, subsections: subs };
    }));
  }, []);

  const updateField = useCallback((sectionIndex, fieldIndex, updates) => {
    setSections((prev) => prev.map((s, i) => {
      if (i !== sectionIndex) return s;
      const fields = s.fields.map((f, j) => (j === fieldIndex ? { ...f, ...updates } : f));
      return { ...s, fields };
    }));
  }, []);

  const updateSubField = useCallback((sectionIndex, subIndex, fieldIndex, updates) => {
    setSections((prev) => prev.map((s, i) => {
      if (i !== sectionIndex) return s;
      const subs = [...(s.subsections || [])];
      const sub = { ...(subs[subIndex] || emptySubsection()) };
      sub.fields = (sub.fields || []).map((f, j) => (j === fieldIndex ? { ...f, ...updates } : f));
      subs[subIndex] = sub;
      return { ...s, subsections: subs };
    }));
  }, []);

  const removeField = useCallback((sectionIndex, fieldIndex) => {
    setSections((prev) => prev.map((s, i) => (i === sectionIndex ? { ...s, fields: s.fields.filter((_, j) => j !== fieldIndex) } : s)));
  }, []);

  const removeSubField = useCallback((sectionIndex, subIndex, fieldIndex) => {
    setSections((prev) => prev.map((s, i) => {
      if (i !== sectionIndex) return s;
      const subs = [...(s.subsections || [])];
      const sub = { ...(subs[subIndex] || emptySubsection()) };
      sub.fields = (sub.fields || []).filter((_, j) => j !== fieldIndex);
      subs[subIndex] = sub;
      return { ...s, subsections: subs };
    }));
  }, []);

  const moveField = useCallback((sectionIndex, from, to) => {
    setSections((prev) => prev.map((s, i) => {
      if (i !== sectionIndex) return s;
      const arr = [...s.fields];
      if (from === to || from < 0 || to < 0 || from >= arr.length || to >= arr.length) return s;
      const [item] = arr.splice(from, 1);
      arr.splice(to, 0, item);
      return { ...s, fields: arr };
    }));
  }, []);

  const moveSubField = useCallback((sectionIndex, subIndex, from, to) => {
    setSections((prev) => prev.map((s, i) => {
      if (i !== sectionIndex) return s;
      const subs = [...(s.subsections || [])];
      const sub = { ...(subs[subIndex] || emptySubsection()) };
      const arr = [...(sub.fields || [])];
      if (from === to || from < 0 || to < 0 || from >= arr.length || to >= arr.length) return s;
      const [item] = arr.splice(from, 1);
      arr.splice(to, 0, item);
      sub.fields = arr;
      subs[subIndex] = sub;
      return { ...s, subsections: subs };
    }));
  }, []);

  const setFieldLabel = useCallback((sectionIndex, fieldIndex, label) => {
    setSections((prev) => prev.map((s, i) => {
      if (i !== sectionIndex) return s;
      const existing = s.fields.map((f, j) => (j === fieldIndex ? null : f.name)).filter(Boolean);
      const name = generateFieldName(label, existing);
      const fields = s.fields.map((f, j) => (j === fieldIndex ? { ...f, label, name } : f));
      return { ...s, fields };
    }));
  }, []);

  const setSubFieldLabel = useCallback((sectionIndex, subIndex, fieldIndex, label) => {
    setSections((prev) => prev.map((s, i) => {
      if (i !== sectionIndex) return s;
      const subs = [...(s.subsections || [])];
      const sub = { ...(subs[subIndex] || emptySubsection()) };
      const existing = (sub.fields || []).map((f, j) => (j === fieldIndex ? null : f.name)).filter(Boolean);
      const name = generateFieldName(label, existing);
      sub.fields = (sub.fields || []).map((f, j) => (j === fieldIndex ? { ...f, label, name } : f));
      subs[subIndex] = sub;
      return { ...s, subsections: subs };
    }));
  }, []);

  const schema = useMemo(() => ({ insuranceType: typeName, description, sections }), [typeName, description, sections]);

  const canSave = useMemo(() => {
    if (!typeName?.trim()) return false;
    if (!sections.length) return false;
    for (const s of sections) {
      if (!s.title?.trim()) return false;
      for (const f of s.fields || []) {
        if (!f.label?.trim() || !f.name?.trim() || !f.type) return false;
      }
      for (const sub of s.subsections || []) {
        if (!sub.title?.trim()) return false;
        for (const sf of sub.fields || []) {
          if (!sf.label?.trim() || !sf.name?.trim() || !sf.type) return false;
        }
      }
    }
    return true;
  }, [typeName, sections]);

  function reset() {
    setTypeName("");
    setDescription("");
    setSections([]);
  }

  return {
    typeName,
    setTypeName,
    description,
    setDescription,
    sections,
    setSections,
    addSection,
    updateSectionTitle,
    toggleSectionFlag,
    moveSection,
    removeSection,
    addSubsection,
    updateSubsectionTitle,
    toggleSubsectionFlag,
    removeSubsection,
    addField,
    appendField,
    updateField,
    updateSubField,
    appendSubField,
    removeField,
    removeSubField,
    moveField,
    moveSubField,
    setFieldLabel,
    setSubFieldLabel,
    schema,
    canSave,
    reset,
  };
}