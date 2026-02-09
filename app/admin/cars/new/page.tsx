"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function NewCarPage() {
  const router = useRouter();
  const create = useMutation(api.cars.create);

  const [form, setForm] = useState({
    title: "Toyota Premio 2016",
    make: "Toyota",
    model: "Premio",
    year: 2016,
    price: 1200000,
    currency: "KES",
    mileageKm: 85000,
    location: "Nairobi",
    description: "Clean unit. Well maintained.",
    images: "https://example.com/image.jpg",
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    await create({
      title: form.title,
      make: form.make,
      model: form.model,
      year: Number(form.year),
      price: Number(form.price),
      currency: form.currency,
      mileageKm: Number(form.mileageKm),
      location: form.location,
      description: form.description,
      images: form.images
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    });

    router.push("/admin/cars");
  }

  return (
    <div>
      <h1 className="text-xl font-bold">New car</h1>

      <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
        <Input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            placeholder="Make"
            value={form.make}
            onChange={(e) => setForm({ ...form, make: e.target.value })}
          />
          <Input
            placeholder="Model"
            value={form.model}
            onChange={(e) => setForm({ ...form, model: e.target.value })}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Input
            placeholder="Year"
            type="number"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
          />
          <Input
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: Number(e.target.value) })
            }
          />
          <Input
            placeholder="Currency"
            value={form.currency}
            onChange={(e) => setForm({ ...form, currency: e.target.value })}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            placeholder="Mileage (km)"
            type="number"
            value={form.mileageKm}
            onChange={(e) =>
              setForm({ ...form, mileageKm: Number(e.target.value) })
            }
          />
          <Input
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
        </div>

        <Textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <Input
          placeholder="Images (comma-separated URLs)"
          value={form.images}
          onChange={(e) => setForm({ ...form, images: e.target.value })}
        />

        <div className="flex gap-3">
          <Button type="submit">Create (Draft)</Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/cars")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
