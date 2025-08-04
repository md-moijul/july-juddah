import React from 'react';

export const Select = ({ children }) => <>{children}</>;
export const SelectTrigger = ({ children }) => <button>{children}</button>;
export const SelectContent = ({ children }) => <div>{children}</div>;
export const SelectItem = ({ children, value }) => <option value={value}>{children}</option>;
export const SelectValue = () => <span>Select a district</span>;
