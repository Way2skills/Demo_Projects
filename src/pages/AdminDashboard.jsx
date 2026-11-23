//---- ADMIN DASHBOARD ----
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Activity, BookOpen, BriefcaseBusiness, ChevronLeft, ChevronRight, FileBadge, Inbox, LogOut, MessageSquare, Users, X } from "lucide-react";
import api, { getErrorMessage } from "../services/api";
import "./AdminDashboard.css";

const PAGE_SIZE = 10;

function formatWorkshopDate(value) {
  if (!value) return "—";
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

function formatWorkshopTime(value) {
  if (!value) return "—";
  const [hours, minutes] = value.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  return `${hours % 12 || 12}:${String(minutes).padStart(2, "0")} ${period}`;
}

function formatCourseFee(value) {
  if (value === null || value === undefined || value === "") return "—";
  const fee = Number(value);
  if (!Number.isFinite(fee)) return "—";
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(fee);
}

const metrics = [
  ["students", "Students", Users], ["courses", "Courses", BookOpen], ["enquiries", "Course enquiries", Inbox], ["pending_enquiries", "Pending enquiries", MessageSquare],
  ["internship_applications", "Internship applications", BriefcaseBusiness], ["certificates_issued", "Certificates issued", FileBadge], ["trainers", "Trainers", Activity], ["contact_messages", "Contact messages", MessageSquare],
];

const navigationGroups = [
  { label: "Manage", items: [
    ["students", "Students"],
    ["courses", "Courses"],
    ["workshops", "Internship & Workshop"],
    ["internship_applications", "Internship Applications", BriefcaseBusiness],
    ["trainers", "Trainers"],
    ["testimonials", "Testimonials"],
    ["gallery", "Gallery"],
    ["contact_messages", "Contact Messages"],
    ["faqs", "FAQs"],
    ["course_categories", "Course Categories"],
    ["authorized_programs", "Authorized Programs"],
  ] },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const [resource, setResource] = useState("dashboard");
  const [rows, setRows] = useState([]);
  const [fields, setFields] = useState([]);
  const [courses, setCourses] = useState([]);
  const [workshopTrainers, setWorkshopTrainers] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loadingRecords, setLoadingRecords] = useState(false);
  const [trainerPhoto, setTrainerPhoto] = useState(null);
  const [trainerPhotoPreview, setTrainerPhotoPreview] = useState("");
  const [courseImage, setCourseImage] = useState(null);
  const [courseImagePreview, setCourseImagePreview] = useState("");
  const [recordImage, setRecordImage] = useState(null);
  const [courseActiveCount, setCourseActiveCount] = useState(0);
  const [viewingTrainer, setViewingTrainer] = useState(null);
  const [savingStudentStatusId, setSavingStudentStatusId] = useState(null);
  const [savingContactStatusId, setSavingContactStatusId] = useState(null);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const navigate = useNavigate();
  useEffect(() => { api.get("/dashboard/stats").then(({ data }) => setStats(data)).catch((reason) => setError(getErrorMessage(reason))); }, []);
  useEffect(() => {
    if (!trainerPhoto) {
      setTrainerPhotoPreview("");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setTrainerPhotoPreview(reader.result);
    };
    reader.onerror = () => setError("Could not load the selected trainer photo preview.");
    reader.readAsDataURL(trainerPhoto);
    return () => {
      if (reader.readyState === FileReader.LOADING) reader.abort();
    };
  }, [trainerPhoto]);
  useEffect(() => {
    if (!courseImage) {
      setCourseImagePreview("");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setCourseImagePreview(reader.result);
    };
    reader.onerror = () => setError("Could not load the selected course image preview.");
    reader.readAsDataURL(courseImage);
    return () => {
      if (reader.readyState === FileReader.LOADING) reader.abort();
    };
  }, [courseImage]);
  useEffect(() => {
    setPage(1); setFormOpen(false); setNotice(""); setError("");
    setTrainerPhoto(null); setCourseImage(null); setRecordImage(null); setViewingTrainer(null);
    if (resource === "dashboard" || resource === "students" || resource === "workshops" || resource === "courses") {
      setFields([]);
      setRows([]);
      setTotal(0);
      if (resource !== "courses") setCourseActiveCount(0);
      return;
    }
    if (resource === "trainers") {
      setFields([]);
      return;
    }
    api.get(`/admin/${resource}/schema`).then(({ data }) => setFields(data.fields)).catch((reason) => setError(getErrorMessage(reason)));
  }, [resource]);
  useEffect(() => {
    if (resource !== "workshops") return undefined;
    let active = true;
    async function loadTrainers() {
      try {
        const pageSize = 100;
        const { data } = await api.get("/admin/trainers", { params: { page: 1, page_size: pageSize } });
        const trainerItems = data.items || [];
        const pageCount = Math.ceil((data.total || trainerItems.length) / pageSize);
        const laterPages = await Promise.all(Array.from({ length: Math.max(0, pageCount - 1) }, (_, index) =>
          api.get("/admin/trainers", { params: { page: index + 2, page_size: pageSize } })));
        if (active) setWorkshopTrainers([...trainerItems, ...laterPages.flatMap((result) => result.data.items || [])]);
      } catch (reason) {
        if (active) setError(getErrorMessage(reason));
      }
    }
    loadTrainers();
    return () => { active = false; };
  }, [resource]);
  useEffect(() => {
    if (resource !== "students") return;
    api.get("/courses")
      .then(({ data }) => setCourses(data.items || []))
      .catch((reason) => setError(getErrorMessage(reason)));
  }, [resource]);
  useEffect(() => {
    if (resource === "dashboard") return;
    setLoadingRecords(true);
    api.get(`/admin/${resource}`, { params: { page, page_size: PAGE_SIZE, search: search || undefined } })
      .then(({ data }) => {
        const items = data.items || data;
        setRows(items);
        setTotal(data.total ?? items.length);
        if (resource === "courses") setCourseActiveCount(data.active_count ?? items.filter((item) => item.is_active !== false).length);
      })
      .catch((reason) => { setRows([]); setTotal(0); setError(getErrorMessage(reason)); })
      .finally(() => setLoadingRecords(false));
  }, [resource, page, search]);
  function logout() { window.localStorage.removeItem("decode_token"); window.localStorage.removeItem("decode_user"); navigate("/admin/login"); }
  function beginCreate() {
    const values = {};
    for (const field of fields) values[field.name] = field.type === "BOOLEAN" ? "true" : "";
    setEditingId(null); setFormValues(values); setRecordImage(null); setFormOpen(true); setError("");
  }
  function beginWorkshopCreate() {
    setEditingId(null);
    setFormValues({
      trainer_id: "",
      program: "",
      duration: "",
      admission_start_date: "",
      admission_end_date: "",
      program_start_date: "",
      program_end_date: "",
      mode: "",
      start_time: "",
      end_time: "",
      is_active: "true",
    });
    setFormOpen(true);
    setError("");
  }
  function beginWorkshopEdit(workshop) {
    setEditingId(workshop.id);
    setFormValues({
      trainer_id: String(workshop.trainer_id || ""),
      program: workshop.program || "",
      duration: workshop.duration || "",
      admission_start_date: workshop.admission_start_date || "",
      admission_end_date: workshop.admission_end_date || "",
      program_start_date: workshop.program_start_date || "",
      program_end_date: workshop.program_end_date || "",
      mode: workshop.mode || "",
      start_time: workshop.start_time?.slice(0, 5) || "",
      end_time: workshop.end_time?.slice(0, 5) || "",
      is_active: workshop.is_active === false ? "false" : "true",
    });
    setFormOpen(true);
    setError("");
  }
  async function saveWorkshop(event) {
    event.preventDefault();
    if (formValues.admission_end_date < formValues.admission_start_date) {
      setError("Admission end date cannot be earlier than admission start date.");
      return;
    }
    if (formValues.program_end_date < formValues.program_start_date) {
      setError("Program end date cannot be earlier than program start date.");
      return;
    }
    const payload = {
      trainer_id: Number(formValues.trainer_id),
      program: formValues.program.trim(),
      duration: formValues.duration.trim(),
      admission_start_date: formValues.admission_start_date,
      admission_end_date: formValues.admission_end_date,
      program_start_date: formValues.program_start_date,
      program_end_date: formValues.program_end_date,
      mode: formValues.mode,
      start_time: formValues.start_time,
      end_time: formValues.end_time,
      is_active: formValues.is_active === "true",
    };
    const wasEditing = Boolean(editingId);
    setSaving(true);
    setError("");
    try {
      if (editingId) await api.put(`/admin/workshops/${editingId}`, payload);
      else await api.post("/admin/workshops", payload);
      setFormOpen(false);
      setNotice(wasEditing ? "Internship & Workshop updated." : "Internship & Workshop created.");
      const { data } = await api.get("/admin/workshops", { params: { page, page_size: PAGE_SIZE, search: search || undefined } });
      setRows(data.items || []);
      setTotal(data.total ?? (data.items || []).length);
    } catch (reason) {
      setError(getErrorMessage(reason));
    } finally {
      setSaving(false);
    }
  }
  function beginStudentCreate() {
    setEditingId(null);
    setFormValues({
      student_id_digits: "",
      full_name: "",
      email: "",
      phone: "",
      course_id: "",
      total_course_fee: "",
      amount_paid: "0",
      fee_status: "Pending",
      date_of_join: new Date().toISOString().slice(0, 10),
    });
    setFormOpen(true);
    setError("");
  }
  function beginStudentEdit(student) {
    setEditingId(student.id);
    setCourses((current) => current.some((course) => course.id === student.course_id) || !student.course_id
      ? current
      : [...current, { id: student.course_id, name: student.course_name }]);
    setFormValues({
      student_id_digits: (student.student_code || "").replace(/^D/, ""),
      full_name: student.full_name || "",
      email: student.email || "",
      phone: student.phone || "",
      course_id: student.course_id == null ? "" : String(student.course_id),
      total_course_fee: String(student.total_course_fee ?? ""),
      amount_paid: String(student.amount_paid ?? "0"),
      fee_status: student.fee_status || "Pending",
      date_of_join: student.date_of_join || "",
    });
    setFormOpen(true);
    setError("");
  }
  async function saveStudent(event) {
    event.preventDefault();
    const isEditing = Boolean(editingId);
    if (!/^[0-9]{5}$/.test(formValues.student_id_digits || "")) {
      setError("Student ID must contain exactly five digits after D.");
      return;
    }
    if (!formValues.full_name?.trim()) return setError("Student name is required.");
    if (!formValues.email?.trim()) return setError("Email address is required.");
    if (!formValues.phone?.trim()) return setError("Phone number is required.");
    const courseId = Number(formValues.course_id);
    const totalCourseFee = Number(formValues.total_course_fee);
    const amountPaid = Number(formValues.amount_paid);
    if (!Number.isInteger(courseId) || courseId < 1) return setError("Select a course.");
    if (formValues.total_course_fee === "" || !Number.isFinite(totalCourseFee) || totalCourseFee < 0) return setError("Enter a valid total course fee.");
    if (formValues.amount_paid === "" || !Number.isFinite(amountPaid) || amountPaid < 0) return setError("Enter a valid amount paid.");
    if (!formValues.date_of_join) return setError("Date of join is required.");
    setSaving(true);
    setError("");
    const payload = {
      student_code: `D${formValues.student_id_digits}`,
      full_name: formValues.full_name.trim(),
      email: formValues.email.trim(),
      phone: formValues.phone.trim(),
      course_id: courseId,
      total_course_fee: totalCourseFee,
      amount_paid: amountPaid,
      fee_status: formValues.fee_status,
      date_of_join: formValues.date_of_join,
    };
    try {
      await (editingId
        ? api.put(`/admin/students/${editingId}`, payload)
        : api.post("/admin/students", payload));
      setFormOpen(false);
      setNotice(isEditing ? "Student updated." : "Student added.");
      const targetPage = isEditing ? page : 1;
      if (!isEditing) setPage(1);
      try {
        const { data } = await api.get("/admin/students", { params: { page: targetPage, page_size: PAGE_SIZE, search: search || undefined } });
        setRows(data.items || []);
        setTotal(data.total ?? (data.items || []).length);
      } catch (reason) {
        setError(`Student was saved, but the list could not be refreshed: ${getErrorMessage(reason)}`);
      }
    } catch (reason) {
      setError(getErrorMessage(reason));
    } finally {
      setSaving(false);
    }
  }
  async function updateStudentFeeStatus(student, feeStatus) {
    setSavingStudentStatusId(student.id);
    setError("");
    try {
      const { data } = await api.patch(`/admin/students/${student.id}/fee-status`, { fee_status: feeStatus });
      setRows((currentRows) => currentRows.map((row) => row.id === student.id ? data : row));
      setNotice(`${student.full_name} fee status updated.`);
    } catch (reason) {
      setError(getErrorMessage(reason));
    } finally {
      setSavingStudentStatusId(null);
    }
  }
  function beginEdit(row) {
    const values = {};
    for (const field of fields) values[field.name] = row[field.name] == null ? "" : String(row[field.name]);
    setEditingId(row.id); setFormValues(values); setRecordImage(null); setFormOpen(true); setError("");
  }
  function beginCourseCreate() {
    setEditingId(null);
    setCourseImage(null);
    setFormValues({ id: "", name: "", fee: "", syllabus: "" });
    setFormOpen(true);
    setError("");
  }
  function beginCourseEdit(course) {
    setEditingId(course.id);
    setCourseImage(null);
    setFormValues({
      id: String(course.id),
      name: course.name || "",
      fee: course.fee == null ? "" : String(course.fee),
      syllabus: course.syllabus || "",
    });
    setFormOpen(true);
    setError("");
  }
  async function saveCourse(event) {
    event.preventDefault();
    const name = formValues.name?.trim() || "";
    const feeValue = formValues.fee?.trim() || "";
    const syllabus = formValues.syllabus?.trim() || "";
    const fee = Number(feeValue);
    if (!name) return setError("Course name is required.");
    if (!feeValue || !/^\d+(?:\.\d{1,2})?$/.test(feeValue) || !Number.isFinite(fee) || fee < 0 || fee > 99999999.99) {
      return setError("Enter a valid non-negative course fee with up to two decimal places.");
    }
    if (!syllabus) return setError("Course topics are required.");
    if (!editingId && !courseImage) return setError("Choose a course image before saving.");
    if (courseImage && !["image/png", "image/jpeg", "image/webp"].includes(courseImage.type)) {
      return setError("Upload a PNG, JPEG or WebP course image.");
    }
    if (courseImage && courseImage.size > 8 * 1024 * 1024) {
      return setError("Course image must be 8 MB or smaller.");
    }

    const coursePayload = { name, fee, syllabus };
    const payload = courseImage ? new FormData() : coursePayload;
    if (courseImage) {
      payload.append("name", name);
      payload.append("fee", feeValue);
      payload.append("syllabus", syllabus);
      payload.append("course_image", courseImage);
    }

    const wasEditing = Boolean(editingId);
    setSaving(true);
    setError("");
    try {
      if (wasEditing && !courseImage) {
        await api.put(`/admin/courses/${editingId}`, coursePayload, { headers: { "Content-Type": "application/json" } });
      } else if (wasEditing) {
        await api.put(`/admin/courses/${editingId}`, payload);
      } else {
        await api.post("/admin/courses", payload);
      }
      setFormOpen(false);
      setCourseImage(null);
      setNotice(wasEditing ? "Course updated." : "Course added.");
      const nextPage = wasEditing ? page : 1;
      const nextSearch = wasEditing ? search : "";
      if (!wasEditing) {
        setPage(1);
        setSearch("");
      }
      try {
        const { data } = await api.get("/admin/courses", {
          params: { page: nextPage, page_size: PAGE_SIZE, search: nextSearch || undefined },
        });
        const items = data.items || [];
        setRows(items);
        setTotal(data.total ?? items.length);
        setCourseActiveCount(data.active_count ?? items.filter((item) => item.is_active !== false).length);
      } catch (reason) {
        setError(`Course was saved, but the list could not be refreshed: ${getErrorMessage(reason)}`);
      }
    } catch (reason) {
      setError(getErrorMessage(reason));
    } finally {
      setSaving(false);
    }
  }
  function beginTrainerCreate() {
    setEditingId(null);
    setTrainerPhoto(null);
    setFormValues({ name: "", experience_years: "0", designation: "", expertise: "", is_active: "true" });
    setFormOpen(true);
    setError("");
  }
  function beginTrainerEdit(trainer) {
    setEditingId(trainer.id);
    setTrainerPhoto(null);
    setFormValues({
      name: trainer.name || "",
      experience_years: String(trainer.experience_years ?? 0),
      designation: trainer.designation || "",
      expertise: (trainer.expertise || trainer.specialization?.split(",") || []).join(", "),
      is_active: String(trainer.is_active),
    });
    setFormOpen(true);
    setError("");
  }
  async function saveTrainer(event) {
    event.preventDefault();
    const name = formValues.name.trim();
    const designation = formValues.designation.trim();
    const years = Number(formValues.experience_years);
    const expertise = formValues.expertise.split(",").map((tag) => tag.trim()).filter(Boolean);
    if (!name) return setError("Trainer name is required.");
    if (!editingId && !trainerPhoto) return setError("Choose a trainer photo before saving.");
    if (!Number.isInteger(years) || years < 0) return setError("Years of experience must be a non-negative whole number.");
    if (!designation) return setError("Trainer designation is required.");
    if (expertise.length === 0) return setError("Add at least one area of expertise.");

    const payload = new FormData();
    payload.append("name", name);
    payload.append("experience_years", String(years));
    payload.append("designation", designation);
    payload.append("expertise", JSON.stringify(expertise));
    payload.append("is_active", formValues.is_active === "false" ? "false" : "true");
    if (trainerPhoto) payload.append("photo", trainerPhoto);

    setSaving(true);
    setError("");
    try {
      const { data: savedTrainer } = editingId
        ? await api.put(`/admin/trainers/${editingId}`, payload)
        : await api.post("/admin/trainers", payload);
      setFormOpen(false);
      setTrainerPhoto(null);
      setNotice(editingId ? "Trainer updated." : "Trainer added.");
      try {
        const { data } = await api.get("/admin/trainers", { params: { page, page_size: PAGE_SIZE, search: search || undefined } });
        setRows(data.items);
        setTotal(data.total);
      } catch (reason) {
        setError(`Trainer was saved, but the list could not be refreshed: ${getErrorMessage(reason)}`);
      }
      if (viewingTrainer?.id === savedTrainer.id) setViewingTrainer(savedTrainer);
    } catch (reason) {
      setError(getErrorMessage(reason));
    } finally {
      setSaving(false);
    }
  }
  async function toggleTrainerActive(trainer) {
    setError("");
    try {
      const { data: updatedTrainer } = await api.patch(`/admin/trainers/${trainer.id}/status`, { is_active: !trainer.is_active });
      setRows((currentRows) => currentRows.map((row) => row.id === trainer.id ? updatedTrainer : row));
      setViewingTrainer((current) => current?.id === trainer.id ? updatedTrainer : current);
      setNotice(`Trainer ${updatedTrainer.is_active ? "activated" : "deactivated"}.`);
    } catch (reason) {
      setError(getErrorMessage(reason));
    }
  }
  function payloadForSubmit() {
    return Object.fromEntries(fields.filter((field) => formValues[field.name] !== undefined).flatMap((field) => {
      const value = formValues[field.name];
      if (value === "" && !field.required) return [[field.name, null]];
      if (value === "" && field.required) return [];
      if (field.type.includes("BOOLEAN")) return [[field.name, value === "true"]];
      if (field.type.includes("INTEGER")) return [[field.name, Number(value)]];
      if (field.type.includes("NUMERIC")) return [[field.name, Number(value)]];
      return [[field.name, value]];
    }));
  }
  async function saveRecord(event) {
    event.preventDefault(); setSaving(true); setError("");
    try {
      const payload = payloadForSubmit();
      let requestPayload = payload;
      if (recordImage) {
        delete payload.image_url;
        requestPayload = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
          if (value !== null && value !== undefined) requestPayload.append(key, value);
        });
        requestPayload.append("image", recordImage);
      }
      if (editingId) await api.put(`/admin/${resource}/${editingId}`, requestPayload);
      else await api.post(`/admin/${resource}`, requestPayload);
      setFormOpen(false); setNotice(editingId ? "Record updated." : "Record created.");
      setRecordImage(null);
      const { data } = await api.get(`/admin/${resource}`, { params: { page, page_size: PAGE_SIZE, search: search || undefined } });
      setRows(data.items); setTotal(data.total);
    } catch (reason) { setError(getErrorMessage(reason)); }
    finally { setSaving(false); }
  }
  function beginContactMessageEdit(message) {
    setEditingId(message.id);
    setFormValues({
      name: message.name || "",
      email: message.email || "",
      phone: message.phone || "",
      message: message.message || "",
    });
    setFormOpen(true);
    setError("");
  }
  async function saveContactMessage(event) {
    event.preventDefault();
    const payload = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      phone: formValues.phone.trim(),
      message: formValues.message.trim(),
    };
    setSaving(true);
    setError("");
    try {
      const { data } = await api.put(`/admin/contact_messages/${editingId}`, payload);
      setRows((currentRows) => currentRows.map((row) => row.id === data.id ? data : row));
      setFormOpen(false);
      setNotice("Contact message updated.");
    } catch (reason) {
      setError(getErrorMessage(reason));
    } finally {
      setSaving(false);
    }
  }
  async function markContactMessageChecked(message) {
    if (message.status === "Checked") return;
    setSavingContactStatusId(message.id);
    setError("");
    try {
      const { data } = await api.patch(`/admin/contact_messages/${message.id}/status`);
      setRows((currentRows) => currentRows.map((row) => row.id === message.id ? data : row));
      setNotice("Contact message marked Checked.");
    } catch (reason) {
      setError(getErrorMessage(reason));
    } finally {
      setSavingContactStatusId(null);
    }
  }
  async function removeItem(item) {
    const recordType = resource === "students" ? "student" : resource === "contact_messages" ? "contact message" : resource === "courses" ? "course" : "record";
    if (!window.confirm(`Delete this ${recordType}? This action cannot be undone.`)) return;
    try {
      await api.delete(`/admin/${resource}/${item.id}`);
      const remainingRows = rows.filter((row) => row.id !== item.id);
      setRows(remainingRows);
      setTotal(Math.max(0, total - 1));
      if (resource === "courses" && item.is_active !== false) setCourseActiveCount((count) => Math.max(0, count - 1));
      if (["students", "contact_messages"].includes(resource) && remainingRows.length === 0 && page > 1) setPage((currentPage) => currentPage - 1);
      setNotice(resource === "students" ? "Student deleted." : resource === "contact_messages" ? "Contact message deleted." : resource === "courses" ? "Course deleted." : "Record deleted.");
    }
    catch (reason) { setError(getErrorMessage(reason)); }
  }
    function renderTableToolbar() {
      if (resource === "courses") {
        return <div className="admin-table-head">
          <div><h2>Courses</h2><p>{courseActiveCount} active courses</p></div>
          <button className="button button-primary" onClick={beginCourseCreate}>+ Add Course</button>
        </div>;
      }
      if (resource === "workshops") {
        return <div className="workshop-admin-toolbar"><button className="button button-primary" onClick={beginWorkshopCreate}>+ Add Internship &amp; Workshop</button></div>;
      }
      if (resource === "internship_applications") {
        return <div className="workshop-admin-toolbar"><button className="button button-primary" onClick={beginCreate}>+ Add record</button></div>;
      }
      if (resource === "contact_messages") return null;
      return <div className="admin-table-head"><div><h2>{navigationGroups.flatMap((group) => group.items).find(([key]) => key === resource)?.[1] || resource.replaceAll("_", " ")}</h2>{resource !== "students" && <p>Manage records stored in the Decode Institution database.</p>}</div>{resource !== "students" && <button className="button button-primary" onClick={resource === "trainers" ? beginTrainerCreate : beginCreate}>{resource === "trainers" ? "+ Add trainer" : "+ Add record"}</button>}</div>;
    }
  function fieldControl(field) {
    const value = formValues[field.name] ?? "";
    const change = (event) => setFormValues({ ...formValues, [field.name]: event.target.value });
    if (field.name === "image_url" && ["internships", "gallery"].includes(resource)) {
      return <><input type="file" accept="image/png,image/jpeg,image/webp" required={field.required && !editingId} onChange={(event) => setRecordImage(event.target.files?.[0] || null)} />{editingId && <small>Leave empty to keep the current image.</small>}{recordImage && <small>Selected: {recordImage.name}</small>}</>;
    }
    if (field.type.includes("BOOLEAN")) return <select value={value || "true"} onChange={change}><option value="true">Yes</option><option value="false">No</option></select>;
    if (field.type.includes("TEXT")) return <textarea value={value} onChange={change} rows="4" required={field.required} />;
    const type = field.type.includes("INTEGER") || field.type.includes("NUMERIC") ? "number" : field.type.includes("DATETIME") ? "datetime-local" : field.name === "email" ? "email" : field.name.endsWith("_url") ? "url" : field.name.includes("date") ? "date" : "text";
    return <input type={type} value={value} onChange={change} required={field.required} min={type === "number" ? "0" : undefined} step={field.type.includes("NUMERIC") ? "0.01" : "1"} />;
  }
  const editingTrainer = editingId ? rows.find((row) => row.id === editingId) : null;
  const trainerPreviewSource = trainerPhoto ? trainerPhotoPreview : editingTrainer?.image_url;
  const editingCourse = editingId ? rows.find((row) => row.id === editingId) : null;
  const courseImageSource = courseImage ? courseImagePreview : editingCourse?.image_url;
  return <main className="admin-shell"><aside className="admin-sidebar"><a className="brand admin-brand" href="/"><span className="brand-mark">&lt;/&gt;</span><span>DECODE <span className="brand-light">INSTITUTION</span><small>ADMIN CONSOLE</small></span></a><nav aria-label="Admin sections"><button className={resource === "dashboard" ? "active" : ""} aria-current={resource === "dashboard" ? "page" : undefined} onClick={() => setResource("dashboard")}>Overview</button>{navigationGroups.map((group) => <div className="admin-nav-group" key={group.label}>{group.items.map(([item, label, Icon]) => <button key={item} className={resource === item ? "active" : ""} aria-current={resource === item ? "page" : undefined} onClick={() => setResource(item)}>{Icon && <Icon size={15} />} {label}</button>)}</div>)}</nav><button className="sidebar-logout" onClick={logout}><LogOut size={16} /> Sign Out</button></aside>
    <section className="admin-content"><header><div><span className="admin-caption">DECODE INSTITUTION / ADMIN</span><h1>{resource === "dashboard" ? "Overview" : resource === "students" ? "Decode Institution Admin Students" : navigationGroups.flatMap((group) => group.items).find(([key]) => key === resource)?.[1] || resource.replaceAll("_", " ")}</h1></div></header>
      {error && <div className="notice notice-error" role="alert">{error}<button onClick={() => setError("")}>Dismiss</button></div>}
      {notice && <div className="notice" role="status">{notice}</div>}
      {resource === "dashboard" ? <><div className="admin-overview-intro"><h2>Welcome back</h2><p>Review institution activity and manage training, student, and website records.</p></div>{stats ? <div className="stats-grid">{metrics.map(([key, title, Icon]) => <article key={key}><span><Icon size={18} /></span><p>{title}</p><strong>{stats[key] ?? "—"}</strong></article>)}</div> : !error && <div className="empty-table">Loading dashboard statistics…</div>}</> : <>
        {renderTableToolbar()}
        <div className={`admin-search ${resource === "students" ? "admin-students-toolbar" : ""}`}>
          <input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder={resource === "students" ? "Search Student" : `Search ${resource.replaceAll("_", " ")}…`} aria-label={resource === "students" ? "Search Student" : `Search ${resource.replaceAll("_", " ")}`} />
          {resource === "students"
            ? <button className="button button-primary" onClick={beginStudentCreate}>Add Records</button>
            : <span>{total} records</span>}
        </div>
        <div className="admin-table-wrap"><table className={resource === "courses" ? "admin-courses-table" : resource === "students" ? "admin-students-table" : resource === "contact_messages" ? "admin-contact-messages-table" : resource === "workshops" ? "admin-workshops-table" : resource === "internship_applications" ? "admin-internship-applications-table" : undefined} aria-label={resource === "courses" ? "Course records" : resource === "students" ? "Student records" : resource === "contact_messages" ? "Contact messages" : resource === "workshops" ? "Internship and workshop records" : resource === "internship_applications" ? "Internship applications" : undefined}>
          <thead><tr>{resource === "courses"
            ? ["Course Name", "Fees", "Topics", "Actions"].map((heading) => <th key={heading}>{heading}</th>)
            : resource === "students"
            ? ["Student ID", "Student Name", "Contact", "Course", "Fee Status", "Date of Join", "Actions"].map((heading) => <th key={heading}>{heading}</th>)
            : resource === "contact_messages"
              ? ["Name", "Contact Us Message", "Date", "Status", "Action"].map((heading) => <th key={heading}>{heading}</th>)
              : resource === "workshops"
                ? ["Trainer Name", "Program", "Duration", "Admission Start & End Date", "Program Start & End Date", "Mode", "Timing", "Actions"].map((heading) => <th key={heading}>{heading}</th>)
                : resource === "internship_applications"
                  ? ["Name", "Contact Us", "Date of Applied", "Program Details", "Actions"].map((heading) => <th key={heading}>{heading}</th>)
            : ["Record", "Status", "Created", "Actions"].map((heading) => <th key={heading}>{heading}</th>)}</tr></thead>
          <tbody>{rows.map((row) => {
          const status = row.status ?? (row.is_approved === false ? "Pending approval" : typeof row.is_active === "boolean" ? row.is_active ? "Active" : "Inactive" : null);
          const recordName = row.name || row.title || row.full_name || row.student_name || row.question || row.email || `Record #${row.id}`;
          if (resource === "courses") return <tr key={row.id}>
            <td><b>{row.name}</b></td>
            <td>{formatCourseFee(row.fee)}</td>
            <td className="admin-course-topics">{row.syllabus || "—"}</td>
            <td className="table-actions"><button className="edit-action" onClick={() => beginCourseEdit(row)}>Edit</button><button className="delete-action" onClick={() => removeItem(row)}>Delete</button></td>
          </tr>;
          if (resource === "students") return <tr key={row.id}>
            <td>{row.student_code || "—"}</td>
            <td><b>{row.full_name}</b></td>
            <td className="student-contact"><span>{row.email}</span><small>{row.phone}</small></td>
            <td>{row.course_name || "—"}</td>
            <td><select
              className={`student-fee-status student-fee-status-${(row.fee_status || "Pending").toLowerCase()}`}
              aria-label={`Fee Status for ${row.full_name}`}
              value={row.fee_status || "Pending"}
              disabled={savingStudentStatusId === row.id}
              onChange={(event) => updateStudentFeeStatus(row, event.target.value)}
            >
              <option>Paid</option><option>Unpaid</option><option>Pending</option>
            </select></td>
            <td>{row.date_of_join ? new Date(`${row.date_of_join}T00:00:00`).toLocaleDateString() : "—"}</td>
            <td className="table-actions"><button className="edit-action" onClick={() => beginStudentEdit(row)}>Edit</button><button className="delete-action" onClick={() => removeItem(row)}>Delete</button></td>
          </tr>;
          if (resource === "contact_messages") return <tr key={row.id}>
            <td><b>{row.name}</b></td>
            <td className="contact-message-cell">
              <span>{row.email}</span>
              <small>{row.phone || "No phone number"}</small>
              <p>{row.message}</p>
            </td>
            <td>{row.created_at ? new Date(row.created_at).toLocaleDateString() : "—"}</td>
            <td>
              <button
                className={`contact-message-status${row.status === "Checked" ? " is-checked" : ""}`}
                disabled={row.status === "Checked" || savingContactStatusId === row.id}
                onClick={() => markContactMessageChecked(row)}
              >
                {row.status === "Checked" ? "Checked" : "Unchecked"}
              </button>
            </td>
            <td className="table-actions">
              <button className="edit-action" onClick={() => beginContactMessageEdit(row)}>Edit</button>
              <button className="delete-action" onClick={() => removeItem(row)}>Delete</button>
            </td>
          </tr>;
          if (resource === "workshops") return <tr key={row.id}>
            <td>{row.trainer_name || "—"}</td>
            <td>{row.program}</td>
            <td>{row.duration}</td>
            <td>{formatWorkshopDate(row.admission_start_date)} &amp; {formatWorkshopDate(row.admission_end_date)}</td>
            <td>{formatWorkshopDate(row.program_start_date)} &amp; {formatWorkshopDate(row.program_end_date)}</td>
            <td>{row.mode || "—"}</td>
            <td>{formatWorkshopTime(row.start_time)} – {formatWorkshopTime(row.end_time)}</td>
            <td className="table-actions"><button className="edit-action" onClick={() => beginWorkshopEdit(row)}>Edit</button><button className="delete-action" onClick={() => removeItem(row)}>Delete</button></td>
          </tr>;
          if (resource === "internship_applications") return <tr key={row.id}>
            <td><b>{row.full_name}</b></td>
            <td className="application-contact"><span>{row.email}</span><small>{row.phone || "No phone number"}</small></td>
            <td>{row.created_at ? new Date(row.created_at).toLocaleDateString() : "—"}</td>
            <td>{row.internship_title}</td>
            <td className="table-actions"><button className="edit-action" onClick={() => beginEdit(row)}>Edit</button><button className="delete-action" onClick={() => removeItem(row)}>Delete</button></td>
          </tr>;
          return <tr key={row.id}>
            <td>{resource === "trainers" ? <div className="trainer-admin-record">
              {row.image_url && <img src={row.image_url} alt="" />}
              <span><b>{recordName}</b><small>{row.designation || "No designation"} · {row.experience_years ?? 0}+ years</small></span>
              </div> : ["internships", "gallery"].includes(resource) ? <div className="trainer-admin-record">
                {row.image_url && <img src={row.image_url} alt="" />}
                <span><b>{recordName}</b><small>{row.email || row.description || row.answer || ""}</small></span>
              </div> : <><b>{recordName}</b><small>{row.email || row.description || row.answer || ""}</small></>}</td>
            <td>{status ? <span className={`status-tag ${row.is_active === false || row.is_approved === false || status === "rejected" ? "status-off" : ""}`}>{status}</span> : "—"}</td>
            <td>{row.created_at ? new Date(row.created_at).toLocaleDateString() : "—"}</td>
            <td className="table-actions">
              {resource === "trainers" && <button className="trainer-view-action" onClick={() => setViewingTrainer(row)}>View</button>}
              <button className="edit-action" onClick={() => resource === "trainers" ? beginTrainerEdit(row) : beginEdit(row)}>Edit</button>
              {resource === "trainers" && <button className="trainer-active-action" onClick={() => toggleTrainerActive(row)}>{row.is_active ? "Deactivate" : "Activate"}</button>}
              <button className="delete-action" onClick={() => removeItem(row)}>Delete</button>
            </td>
          </tr>;
        })}</tbody></table>{loadingRecords ? <div className="empty-table">Loading records…</div> : rows.length === 0 && <div className="empty-table">No records found for this section.</div>}</div>
        <div className="table-pagination">
          <span>Page {page} of {totalPages}</span>
          <div>
            <button disabled={page <= 1} onClick={() => setPage(page - 1)}><ChevronLeft size={15} /> Previous</button>
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              return <button key={pageNumber} aria-label={`Page ${pageNumber}`} aria-current={page === pageNumber ? "page" : undefined} onClick={() => setPage(pageNumber)}>{pageNumber}</button>;
            })}
            <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next <ChevronRight size={15} /></button>
          </div>
        </div>
      </>}
      {formOpen && <div className="admin-modal-backdrop" role="presentation" onClick={(event) => event.target === event.currentTarget && setFormOpen(false)}><form className="admin-record-form" onSubmit={resource === "courses" ? saveCourse : resource === "students" ? saveStudent : resource === "trainers" ? saveTrainer : resource === "contact_messages" ? saveContactMessage : resource === "workshops" ? saveWorkshop : saveRecord}>
        <header><div><span className="admin-caption">{resource === "courses" ? editingId ? "EDIT COURSE" : "NEW COURSE" : resource === "students" ? editingId ? "EDIT STUDENT" : "NEW STUDENT" : resource === "contact_messages" ? "EDIT CONTACT MESSAGE" : resource === "workshops" ? editingId ? "EDIT INTERNSHIP & WORKSHOP" : "NEW INTERNSHIP & WORKSHOP" : editingId ? "EDIT RECORD" : "NEW RECORD"}</span><h2>{resource === "courses" ? editingId ? "Edit Course" : "Add Course" : resource === "students" ? editingId ? "Edit Student" : "Add Student" : resource === "contact_messages" ? "Edit Contact Message" : resource === "workshops" ? `${editingId ? "Edit" : "Add"} Internship & Workshop` : `${editingId ? "Update" : "Create"} ${resource.replaceAll("_", " ")}`}</h2></div><button type="button" className="close-modal" onClick={() => setFormOpen(false)} aria-label="Close"><X size={19} /></button></header>
        {resource === "contact_messages" ? <div className="admin-form-fields contact-message-edit-fields">
          <label>Name *<input required maxLength={120} value={formValues.name || ""} onChange={(event) => setFormValues({ ...formValues, name: event.target.value })} /></label>
          <label>Email *<input required type="email" maxLength={254} value={formValues.email || ""} onChange={(event) => setFormValues({ ...formValues, email: event.target.value })} /></label>
          <label>Phone *<input required type="tel" minLength={7} maxLength={30} value={formValues.phone || ""} onChange={(event) => setFormValues({ ...formValues, phone: event.target.value })} /></label>
          <label>Message *<textarea required minLength={2} maxLength={5000} rows="5" value={formValues.message || ""} onChange={(event) => setFormValues({ ...formValues, message: event.target.value })} /></label>
        </div> : resource === "courses" ? <div className="admin-form-fields course-form-fields">
          <label>Course ID<input value={editingId ? formValues.id : "Generated automatically"} readOnly disabled /></label>
          <label>Course Name *<input required maxLength={180} value={formValues.name || ""} onChange={(event) => setFormValues({ ...formValues, name: event.target.value })} /></label>
          <label>Fees *<input required type="number" min="0" max="99999999.99" step="0.01" value={formValues.fee ?? ""} onChange={(event) => setFormValues({ ...formValues, fee: event.target.value })} /></label>
          <label>Topics *<textarea required rows="5" value={formValues.syllabus || ""} onChange={(event) => setFormValues({ ...formValues, syllabus: event.target.value })} /></label>
          <label>Course Image {!editingId && <span>*</span>}<input type="file" accept="image/png,image/jpeg,image/webp" required={!editingId} onChange={(event) => setCourseImage(event.target.files?.[0] || null)} />{editingId && <small>Leave empty to keep the current image.</small>}{courseImage && <small>Selected: {courseImage.name}</small>}{courseImageSource && <div className="course-image-preview"><img src={courseImageSource} alt="Course image preview" /></div>}</label>
        </div> : resource === "students" ? <div className="admin-form-fields student-form-fields">
          <label>Student ID *<div className="student-id-input"><span className="student-id-prefix" aria-hidden="true">D</span><input aria-label="Student ID digits" required type="text" inputMode="numeric" pattern="[0-9]{5}" maxLength={5} value={formValues.student_id_digits || ""} onChange={(event) => setFormValues({ ...formValues, student_id_digits: event.target.value.replace(/\D/g, "").slice(0, 5) })} /></div></label>
          <label>Student Name *<input required maxLength={120} value={formValues.full_name || ""} onChange={(event) => setFormValues({ ...formValues, full_name: event.target.value })} /></label>
          <label>Email Address *<input required type="email" maxLength={254} value={formValues.email || ""} onChange={(event) => setFormValues({ ...formValues, email: event.target.value })} /></label>
          <label>Phone Number *<input required type="tel" minLength={7} maxLength={30} value={formValues.phone || ""} onChange={(event) => setFormValues({ ...formValues, phone: event.target.value })} /></label>
          <label>Course *<select required value={formValues.course_id || ""} onChange={(event) => setFormValues({ ...formValues, course_id: event.target.value })}><option value="">Select a course</option>{courses.map((course) => <option key={course.id} value={course.id}>{course.name}</option>)}</select></label>
          <label>Total Course Fee *<input required type="number" min="0" step="0.01" value={formValues.total_course_fee ?? ""} onChange={(event) => setFormValues({ ...formValues, total_course_fee: event.target.value })} /></label>
          <label>Amount Paid *<input required type="number" min="0" step="0.01" value={formValues.amount_paid ?? ""} onChange={(event) => setFormValues({ ...formValues, amount_paid: event.target.value })} /></label>
          <label>Fee Status *<select required value={formValues.fee_status || "Pending"} onChange={(event) => setFormValues({ ...formValues, fee_status: event.target.value })}><option>Paid</option><option>Unpaid</option><option>Pending</option></select></label>
          <label>Date of Join *<input required type="date" value={formValues.date_of_join || ""} onChange={(event) => setFormValues({ ...formValues, date_of_join: event.target.value })} /></label>
        </div> : resource === "trainers" ? <div className="admin-form-fields trainer-form-fields">
          <label>Trainer Name *<input required maxLength={120} value={formValues.name || ""} onChange={(event) => setFormValues({ ...formValues, name: event.target.value })} /></label>
          <label>Years of Experience *<input required type="number" min="0" step="1" value={formValues.experience_years ?? "0"} onChange={(event) => setFormValues({ ...formValues, experience_years: event.target.value })} /></label>
          <label>Designation *<input required maxLength={160} value={formValues.designation || ""} onChange={(event) => setFormValues({ ...formValues, designation: event.target.value })} /></label>
          <label>Areas of Expertise *<textarea required rows="3" placeholder="Core Programming, Full Stack" value={formValues.expertise || ""} onChange={(event) => setFormValues({ ...formValues, expertise: event.target.value })} /></label>
          <label>Trainer Photo {!editingId && <span>*</span>}<input type="file" accept="image/png,image/jpeg,image/webp" required={!editingId} onChange={(event) => setTrainerPhoto(event.target.files?.[0] || null)} />{editingId && <small>Leave empty to keep the current photo.</small>}{trainerPhoto && <small>Selected: {trainerPhoto.name}</small>}{trainerPreviewSource && <div className="trainer-photo-preview"><img src={trainerPreviewSource} alt="Trainer photo preview" /></div>}</label>
          {editingId && <label>Active Status<select value={formValues.is_active || "true"} onChange={(event) => setFormValues({ ...formValues, is_active: event.target.value })}><option value="true">Active</option><option value="false">Inactive</option></select></label>}
        </div> : resource === "workshops" ? <div className="admin-form-fields workshop-form-fields">
          <label>Trainer Name *<select required value={formValues.trainer_id || ""} onChange={(event) => setFormValues({ ...formValues, trainer_id: event.target.value })}><option value="">Select a trainer</option>{workshopTrainers.map((trainer) => <option key={trainer.id} value={trainer.id}>{trainer.name}</option>)}</select></label>
          <label>Program *<input required maxLength={180} value={formValues.program || ""} onChange={(event) => setFormValues({ ...formValues, program: event.target.value })} /></label>
          <label>Duration *<input required maxLength={100} placeholder="1 Month, 2 Months, 3 Months" value={formValues.duration || ""} onChange={(event) => setFormValues({ ...formValues, duration: event.target.value })} /></label>
          <label>Admission Start Date *<input required type="date" value={formValues.admission_start_date || ""} onChange={(event) => setFormValues({ ...formValues, admission_start_date: event.target.value })} /></label>
          <label>Admission End Date *<input required type="date" min={formValues.admission_start_date || undefined} value={formValues.admission_end_date || ""} onChange={(event) => setFormValues({ ...formValues, admission_end_date: event.target.value })} /></label>
          <label>Program Start Date *<input required type="date" value={formValues.program_start_date || ""} onChange={(event) => setFormValues({ ...formValues, program_start_date: event.target.value })} /></label>
          <label>Program End Date *<input required type="date" min={formValues.program_start_date || undefined} value={formValues.program_end_date || ""} onChange={(event) => setFormValues({ ...formValues, program_end_date: event.target.value })} /></label>
          <label>Mode *<select required value={formValues.mode || ""} onChange={(event) => setFormValues({ ...formValues, mode: event.target.value })}><option value="">Select mode</option><option>Online</option><option>Offline</option></select></label>
          <label>Start Time *<input required type="time" value={formValues.start_time || ""} onChange={(event) => setFormValues({ ...formValues, start_time: event.target.value })} /></label>
          <label>End Time *<input required type="time" value={formValues.end_time || ""} onChange={(event) => setFormValues({ ...formValues, end_time: event.target.value })} /></label>
          <label>Publish to public website<select value={formValues.is_active || "true"} onChange={(event) => setFormValues({ ...formValues, is_active: event.target.value })}><option value="true">Published</option><option value="false">Unpublished</option></select></label>
        </div> : <div className="admin-form-fields">{fields.map((field) => <label key={field.name}>{field.name.replaceAll("_", " ")}{field.required && <span> *</span>}{fieldControl(field)}</label>)}</div>}
        <div className="admin-form-actions"><button type="button" className="button button-outline" onClick={() => setFormOpen(false)}>Cancel</button><button type="submit" className="button button-primary" disabled={saving}>{saving ? "Saving…" : resource === "courses" ? editingId ? "Update Course" : "Add Course" : resource === "students" ? "Save" : resource === "trainers" ? editingId ? "Update trainer" : "Add trainer" : resource === "contact_messages" ? "Save changes" : resource === "workshops" ? editingId ? "Update Internship & Workshop" : "Add Internship & Workshop" : "Save record"}</button></div>
      </form></div>}
      {viewingTrainer && <div className="admin-modal-backdrop" role="presentation" onClick={(event) => event.target === event.currentTarget && setViewingTrainer(null)}>
        <section className="admin-record-form trainer-view-dialog" role="dialog" aria-modal="true" aria-labelledby="trainer-view-title">
          <header><div><span className="admin-caption">TRAINER PROFILE</span><h2 id="trainer-view-title">{viewingTrainer.name}</h2></div><button type="button" className="close-modal" onClick={() => setViewingTrainer(null)} aria-label="Close"><X size={19} /></button></header>
          {viewingTrainer.image_url && <img className="trainer-view-photo" src={viewingTrainer.image_url} alt={viewingTrainer.name} />}
          <p>{viewingTrainer.experience_years ?? 0}+ Years Experience · {viewingTrainer.designation}</p>
          <ul className="trainer-view-expertise">{(viewingTrainer.expertise || []).map((area) => <li key={area}>{area}</li>)}</ul>
          <span className={`status-tag ${viewingTrainer.is_active ? "" : "status-off"}`}>{viewingTrainer.is_active ? "Active" : "Inactive"}</span>
        </section>
      </div>}
    </section>
  </main>;
}
