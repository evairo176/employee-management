export type EmployeeStatus = 'Permanent' | 'Contract' | 'Probation';

export interface Employee {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string; // yyyy-MM-dd
  basicSalary: number;
  status: EmployeeStatus;
  group: string;
  description: string;
}

/** Parameter pencarian yang aktif bersamaan (AND), sesuai requirement assessment. */
export type SearchField = 'firstName' | 'lastName' | 'email' | 'username';

export const SEARCH_FIELDS: { value: SearchField; label: string }[] = [
  { value: 'firstName', label: 'First Name' },
  { value: 'lastName', label: 'Last Name' },
  { value: 'email', label: 'Email' },
  { value: 'username', label: 'Username' },
];

export const EMPLOYEE_GROUPS = [
  'Engineering',
  'Product',
  'Design',
  'Marketing',
  'Sales',
  'Finance',
  'Human Resources',
  'Operations',
  'Customer Support',
  'Legal',
] as const;

export const EMPLOYEE_STATUSES: EmployeeStatus[] = ['Permanent', 'Contract', 'Probation'];

export const PAGE_SIZES = [5, 10, 25, 50] as const;

export type SortKey = 'username' | 'firstName' | 'email' | 'group' | 'status' | 'basicSalary';
export type SortDir = 'asc' | 'desc';
