'use client';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

type CarFormData = {
  title: string;
  make: string;
  model: string;
  year: number;
  condition: string;
  mileage: number;
  price: number;
  description?: string;
};

export default function ValuationPage() {
  const [message, setMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CarFormData>();

  const onSubmit = async (data: CarFormData) => {
    try {
      const res = await fetch('/api/valuation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      console.log('Result from API:', result);

      if (res.ok) {
        setMessage(`Estimated Value:  ${result.estimatedPrice}`);
        // reset();
      } else {
        setMessage('Failed to submit car!');
      }
    } catch (error) {
      setMessage('Something went wrong!');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">Get Your Car&apos;s Estimated Value</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Title */}
        <input {...register('title', { required: true })} placeholder="Car Title" className="w-full p-2 border rounded" />
        {errors.title && <p className="text-red-500">Title is required</p>}

        {/* Make */}
        <input {...register('make', { required: true })} placeholder="Make (e.g., Toyota)" className="w-full p-2 border rounded" />
        {errors.make && <p className="text-red-500">Make is required</p>}

        {/* Model */}
        <input {...register('model', { required: true })} placeholder="Model (e.g., Corolla)" className="w-full p-2 border rounded" />
        {errors.model && <p className="text-red-500">Model is required</p>}

        {/* Year */}
        <input type="number" {...register('year', { required: true })} placeholder="Year" className="w-full p-2 border rounded" />
        {errors.year && <p className="text-red-500">Year is required</p>}

        {/* Condition */}
        <select {...register('condition', { required: true })} className="w-full p-2 border rounded">
          <option value="">Select Condition</option>
          <option value="New">New</option>
          <option value="Used">Used</option>
          <option value="Like New">Like New</option>
          <option value="Old">Old</option>
        </select>
        {errors.condition && <p className="text-red-500 bg-gray-300">Condition is required</p>}

        {/* Mileage */}
        <input type="number" {...register('mileage', { required: true })} placeholder="Mileage (KM)" className="w-full p-2 border rounded" />
        {errors.mileage && <p className="text-red-500">Mileage is required</p>}

        {/* Price */}
        <input type="number" {...register('price', { required: true })} placeholder="Price (PKR)" className="w-full p-2 border rounded" />
        {errors.price && <p className="text-red-500">Price is required</p>}

        {/* Description */}
        <textarea {...register('description')} placeholder="Description" className="w-full p-2 border rounded" />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>

      {message && (
        <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
          {message}
        </div>
      )}
    </div>
  );
}
