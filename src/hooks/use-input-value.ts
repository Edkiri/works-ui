import React, { useState } from 'react';

export const useInputValue = (initialValue: string | number) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (e: React.FormEvent<HTMLInputElement>) =>
    setValue(e.currentTarget.value);

  return { value, onChange };
};
