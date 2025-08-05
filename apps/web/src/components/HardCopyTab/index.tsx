'use client';

import { useState } from 'react';
import { createOrder } from '@/app/actions/order';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface HardCopyTabProps {
  name: string;
  town: string;
  phone: string;
}

export function HardCopyTab({ name, town, phone }: HardCopyTabProps) {
  const [shippingAddress, setShippingAddress] = useState('');
  const [currentTown, setCurrentTown] = useState(town); // State for town input
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null); // Clear previous errors
    const result = await createOrder({
      name,
      town: currentTown, // Use currentTown from state
      phone,
      shippingAddress,
    });
    setLoading(false);
    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error?.message || 'Failed to create order.');
    }
  };

  const isFormValid = shippingAddress && confirmed && currentTown; // Include currentTown in validation

  if (success) {
    return <div className="text-green-500">Order Confirmed!</div>;
  }

  return (
    <div className="space-y-4 p-4">
      {error && <div className="text-red-500">{error}</div>}
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" type="text" value={name}  />
      </div>
      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" type="tel" value={phone}  />
      </div>
      <div>
        <Label htmlFor="town">Town</Label>
        <Input
          id="town"
          type="text"
          placeholder="Town"
          value={currentTown}
          onChange={(e) => setCurrentTown(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="shippingAddress">Shipping Address</Label>
        <Input
          id="shippingAddress"
          type="text"
          placeholder="Shipping Address"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="confirmed"
          checked={confirmed}
          onCheckedChange={(checked) => setConfirmed(!!checked)}
        />
        <Label htmlFor="confirmed">I confirm my address is correct</Label>
      </div>
      <Button onClick={handleSubmit} disabled={!isFormValid || loading}>
        {loading ? 'Confirming...' : 'Confirm Order'}
      </Button>
    </div>
  );
}
