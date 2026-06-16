"use client";

import { useEffect, useMemo, useState } from "react";

import ProjectsHeader from "@/components/projects/ProjectsHeader";
import SearchBar from "@/components/projects/SearchBar";
import ProjectsTable from "@/components/projects/ProjectsTable";
import ProjectModal from "@/components/projects/ProjectModal";

import { ErrorType, FormType, Project } from "@/types/project";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  const [showForm, setShowForm] = useState(false);

  const [editId, setEditId] = useState<string | null>(null);

  const [search, setSearch] = useState("");

  const [dark, setDark] = useState(false);

  const [form, setForm] = useState<FormType>({
    customer: "",
    contact: "",
    place: "",
    product: "",
    amount: "",
    received: "",
  });

  const [errors, setErrors] = useState<ErrorType>({});

  // Dark Mode
  useEffect(() => {
    const root = document.documentElement;

    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [dark]);

  // Fetch Projects
  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");

      const data = await res.json();

      setProjects(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Validation

  const validate = (): boolean => {
    let err: ErrorType = {};

    if (!form.customer.trim()) {
      err.customer = "Customer required";
    }
    // ==========
    if (!form.contact.trim()) {
      err.contact = "Contact required";
    }

    if (!form.place.trim()) {
      err.place = "Place required";
    }
    // =================
    if (!form.product.trim()) {
      err.product = "Product required";
    }

    if (!form.amount) {
      err.amount = "Amount required";
    }

    if (!form.received) {
      err.received = "Received required";
    }

    setErrors(err);

    return Object.keys(err).length === 0;
  };

  // Save
  const handleSave = async () => {
    if (!validate()) return;

    const payload = {
      customer: form.customer,
      contact: form.contact,
      place: form.place,
      product: form.product,
      amount: Number(form.amount),
      received: Number(form.received),
    };

    try {
      if (editId) {
        await fetch(`/api/projects/${editId}`, {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(payload),
        });
      } else {
        await fetch("/api/projects", {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(payload),
        });
      }

      fetchProjects();

      setShowForm(false);

      setEditId(null);

      setForm({
        customer: "",
        contact: "",
        place: "",
        product: "",
        amount: "",
        received: "",
      });

      setErrors({});
    } catch (error) {
      console.log(error);
    }
  };

  // Edit
  const handleEdit = (p: Project) => {
    setForm({
      customer: p.customer,
      contact: p.contact,
      place: p.place,
      product: p.product,
      amount: String(p.amount),
      received: String(p.received),
    });

    setEditId(p._id!);

    setShowForm(true);
  };

  // Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Delete project?")) return;

    await fetch(`/api/projects/${id}`, {
      method: "DELETE",
    });

    fetchProjects();
  };

  // Search
  const filtered = useMemo(() => {
    return projects.filter((p) =>
      p.customer.toLowerCase().includes(search.toLowerCase()),
    );
  }, [projects, search]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-4 md:p-8">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-4 md:p-6">
        <ProjectsHeader
          dark={dark}
          setDark={setDark}
          onAdd={() => {
            setEditId(null);

            setForm({
              customer: "",
              contact: "",
              place: "",
              product: "",
              amount: "",
              received: "",
            });

            setShowForm(true);
          }}
        />

        <SearchBar search={search} setSearch={setSearch} />

        <ProjectsTable
          projects={filtered}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <ProjectModal
          open={showForm}
          form={form}
          errors={errors}
          editId={editId}
          setForm={setForm}
          onClose={() => setShowForm(false)}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}
