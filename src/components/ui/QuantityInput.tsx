import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantityInputProps {
  quantity: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

const QuantityInput: React.FC<QuantityInputProps> = ({
  quantity,
  onChange,
  min = 1,
  max = 99,
  className = '',
}) => {
  const handleDecrease = () => {
    if (quantity > min) {
      onChange(quantity - 1);
      // setCart(Number(cart) - 1)

    }
  };

  // const { setCart, cart } = useCart();


  const handleIncrease = () => {
    if (quantity < max) {
      onChange(quantity + 1);
      // setCart(Number(cart) + 1)
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= min && value <= max) {
      onChange(value);
    }
  };

  return (
    <div className={`flex items-center border border-gray-300 rounded-md ${className}`}>
      <button
        type="button"
        onClick={handleDecrease}
        disabled={quantity <= min}
        className="flex items-center justify-center h-8 w-8 text-gray-600 hover:text-primary disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </button>

      <input
        type="text"
        value={quantity}
        onChange={handleChange}
        className="h-8 w-12 border-x border-gray-300 text-center text-sm focus:outline-none"
        aria-label="Quantity"
      />

      <button
        type="button"
        onClick={handleIncrease}
        disabled={quantity >= max}
        className="flex items-center justify-center h-8 w-8 text-gray-600 hover:text-primary disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
};

export default QuantityInput;