import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GeneratePage from '@/app/generate/page';
import React from 'react';

// Mock the Select component from shadcn/ui
jest.mock('@/components/ui/select', () => {
  const Select = ({ children, onValueChange, value }) => (
    <select data-testid="district-select" value={value} onChange={(e) => onValueChange(e.target.value)}>
      {children}
    </select>
  );
  Select.displayName = 'Select';

  const SelectContent = ({ children }) => <>{children}</>;
  SelectContent.displayName = 'SelectContent';

  const SelectItem = ({ children, value }) => <option value={value}>{children}</option>;
  SelectItem.displayName = 'SelectItem';

  const SelectTrigger = ({ children }) => <>{children}</>;
  SelectTrigger.displayName = 'SelectTrigger';

  const SelectValue = ({ placeholder, value }) => <>{value || placeholder}</>;
  SelectValue.displayName = 'SelectValue';

  return { Select, SelectContent, SelectItem, SelectTrigger, SelectValue };
});

// Mock the Tabs component from shadcn/ui
jest.mock('@/components/ui/tabs', () => {
  const ActualTabs = jest.requireActual('@/components/ui/tabs');
  return {
    ...ActualTabs,
    Tabs: ({ children, defaultValue, className }) => {
      const [activeTab, setActiveTab] = React.useState(defaultValue);
      return (
        <div data-testid="tabs" data-default-value={defaultValue} className={className}>
          {React.Children.map(children, child => {
            if (child.type === ActualTabs.TabsList) {
              return React.cloneElement(child, {
                children: React.Children.map(child.props.children, trigger => {
                  if (trigger.type === ActualTabs.TabsTrigger) {
                    return React.cloneElement(trigger, {
                      onClick: () => setActiveTab(trigger.props.value),
                      'data-state': activeTab === trigger.props.value ? 'active' : 'inactive',
                    });
                  }
                  return trigger;
                }),
              });
            } else if (child.type === ActualTabs.TabsContent) {
              return React.cloneElement(child, {
                hidden: activeTab !== child.props.value,
              });
            }
            return child;
          })}
        </div>
      );
    },
  };
});

// Mock the new EcertificateTab and HardCopyTab components to render their children
jest.mock('@/components/sections/EcertificateTab', () => {
  const ActualEcertificateTab = jest.requireActual('@/components/sections/EcertificateTab');
  return ({ children }) => <div data-testid="ecertificate-tab">{children || <ActualEcertificateTab />}</div>;
});
jest.mock('@/components/sections/HardCopyTab', () => {
  const ActualHardCopyTab = jest.requireActual('@/components/sections/HardCopyTab');
  return ({ children }) => <div data-testid="hardcopy-tab">{children || <ActualHardCopyTab />}</div>;
});