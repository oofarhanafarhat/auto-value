// Commit: setup: Add car valuation form with all fields matching Sanity schema

'use client'

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import slugify from 'slugify';

type CarForm = {
  title: string;
  make: string;
  model: string;
  year: number;
  condition: 'New' | 'Used' | 'Like New' | 'Old';
  mileage: number;
  price: number;
  description: string;
  image: string;
};

export default function EstimatePage() {
  const { register, handleSubmit, reset } = useForm<CarForm>();

  // Commit: feat: Add message state for form feedback
  const [message, setMessage] = useState<string>('');

  // Commit: feat: Add onSubmit handler to send form data to valuation API
  const onSubmit = async (data: CarForm) => {
    const slug = slugify(data.title, { lower: true });
    const body = { ...data, slug };

    try {
      const res = await fetch('/api/valuation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const result = await res.json();
        if (res.ok) {
            setMessage(`Estimated price: ${result.estimatedPrice}`);
            reset();
        } else {
            const errorMsg:any = result?.error ?? 'Unknown error occurred';
            setMessage(`Error: ${errorMsg}`);
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        setMessage('Error submitting form. Please try again.');
        }
    }
  return (
    <div className="max-w-xl mx-auto mt-10">
      {/* Commit: ui: Add car form fields mapped to Sanity schema */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register('title')} placeholder="Title" className="w-full border p-2 rounded" />
        <input {...register('make')} placeholder="Make" className="w-full border p-2 rounded" />
        <input {...register('model')} placeholder="Model" className="w-full border p-2 rounded" />
        <input type="number" {...register('year')} placeholder="Year" className="w-full border p-2 rounded" />
        <select {...register('condition')} className="w-full border p-2 rounded">
          <option value="">Condition</option>
          <option value="New">New</option>
          <option value="Used">Used</option>
          <option value="Like New">Like New</option>
          <option value="Old">Old</option>
        </select>
        <input type="number" {...register('mileage')} placeholder="Mileage" className="w-full border p-2 rounded" />
        <input type="number" {...register('price')} placeholder="Price" className="w-full border p-2 rounded" />
        <textarea {...register('description')} placeholder="Description" className="w-full border p-2 rounded" />
        <input {...register('image')} placeholder="Image URL" className="w-full border p-2 rounded" />

        {/* Commit: ui: Add submit button for car valuation form */}
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
          Submit
        </button>
      </form>

      {/* Commit: ui: Show submission feedback message below form */}
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}