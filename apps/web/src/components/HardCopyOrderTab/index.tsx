'use client';

import { useState } from 'react';
import { createOrder } from '@/app/actions/order';
import { Input } from '@/components/ui/input';
import { PhoneNumberInput } from '@/components/PhoneNumberInput';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useUserStore } from '@/stores/useUserStore';



export function HardCopyOrderTab() {
  const [shippingAddress, setShippingAddress] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { user } = useUserStore();
  const { name, town, phone } = user;

  const handleSubmit = async () => {
    setLoading(true);
    if (error) {
      setLoading(false);
      return;
    }
    const result = await createOrder({
      name: name || '',
      town: town || '',
      phone: phone || '',
      shippingAddress,
    });
    setLoading(false);
    if (result.success) {
      toast.success('Order Confirmed!', {
        description: 'Your hard copy order has been placed successfully.',
      });
    } else {
      toast.error('Order Failed', {
        description: result.error?.message || 'Failed to create order.',
      });
    }
  };

  const isFormValid = shippingAddress && confirmed && !error;

  return (
    <div className="space-y-4 p-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" type="text" value={name} readOnly />
      </div>
      <PhoneNumberInput setError={setError} />
      <div>
        <Label htmlFor="town">Town</Label>
        <Input id="town" type="text" value={town} readOnly />
      </div>
      <div>
        <Label htmlFor="shippingAddress">Shipping Address</Label>
        <Textarea
          id="shippingAddress"
          placeholder="Enter your shipping address"
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
