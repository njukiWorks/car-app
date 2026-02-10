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
    mileageKm: 35000,
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
      <h1 className="text-xl font-bold">New Car</h1>

      <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="title">
            Title
          </label>
          <Input
            id="title"
            placeholder="Toyota Premio 2016"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="make">
              Make
            </label>
            <Input
              id="make"
              placeholder="Toyota"
              value={form.make}
              onChange={(e) => setForm({ ...form, make: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="model">
              Model
            </label>
            <Input
              id="model"
              placeholder="Premio"
              value={form.model}
              onChange={(e) => setForm({ ...form, model: e.target.value })}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="year">
              Year
            </label>
            <Input
              id="year"
              placeholder="2016"
              type="number"
              value={form.year}
              onChange={(e) =>
                setForm({ ...form, year: Number(e.target.value) })
              }
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="price">
              Price
            </label>
            <Input
              id="price"
              placeholder="1200000"
              type="number"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: Number(e.target.value) })
              }
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="currency">
              Currency
            </label>
            <Input
              id="currency"
              placeholder="KES"
              value={form.currency}
              onChange={(e) => setForm({ ...form, currency: e.target.value })}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="mileageKm">
              Mileage (km)
            </label>
            <Input
              id="mileageKm"
              placeholder="85000"
              type="number"
              value={form.mileageKm}
              onChange={(e) =>
                setForm({ ...form, mileageKm: Number(e.target.value) })
              }
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="location">
              Location
            </label>
            <Input
              id="location"
              placeholder="Nairobi"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="description">
            Description
          </label>
          <Textarea
            id="description"
            placeholder="Clean unit. Well maintained."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="images">
            Images (comma-separated URLs)
          </label>
          <Input
            id="images"
            placeholder="https://example.com/image.jpg"
            value={form.images}
            onChange={(e) => setForm({ ...form, images: e.target.value })}
          />
        </div>

        <div className="flex gap-3">
          <Button type="submit">Add Car</Button>
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
