import Select, { type SelectOption } from '../Select/Select'
import style from './Filters.module.css'

export interface FilterState {
  language: string;
  level: string;
  price: string;
}

interface FiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const ALL: SelectOption = { value: '', label: 'All' };

const LANGUAGE_OPTIONS: SelectOption[] = [
  ALL,
  { value: 'French', label: 'French' },
  { value: 'English', label: 'English' },
  { value: 'German', label: 'German' },
  { value: 'Ukrainian', label: 'Ukrainian' },
  { value: 'Polish', label: 'Polish' },
];

const LEVEL_OPTIONS: SelectOption[] = [
  ALL,
  { value: 'A1 Beginner', label: 'A1 Beginner' },
  { value: 'A2 Elementary', label: 'A2 Elementary' },
  { value: 'B1 Intermediate', label: 'B1 Intermediate' },
  { value: 'B2 Upper-Intermediate', label: 'B2 Upper-Intermediate' },
];

const PRICE_OPTIONS: SelectOption[] = [
  ALL,
  { value: '10', label: '10' },
  { value: '20', label: '20' },
  { value: '30', label: '30' },
  { value: '40', label: '40' },
];

const Filters = ({ filters, onFilterChange }: FiltersProps) => {
  const handleChange = (name: keyof FilterState) => (value: string) => {
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <div className={style.filterContainer}>
      <Select
        className={style.language}
        label='Languages'
        value={filters.language}
        options={LANGUAGE_OPTIONS}
        onChange={handleChange('language')}
      />

      <Select
        className={style.level}
        label='Level of knowledge'
        value={filters.level}
        options={LEVEL_OPTIONS}
        onChange={handleChange('level')}
      />

      <Select
        className={style.price}
        label='Price'
        value={filters.price}
        options={PRICE_OPTIONS}
        onChange={handleChange('price')}
        formatSelected={option => (option.value ? `${option.label} $` : option.label)}
      />
    </div>
  )
}

export default Filters
