import React from 'react'
import style from './Filters.module.css'

interface FiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  language: string;
  level: string;
  price: string;
}

const Filters = ({ filters, onFilterChange }: FiltersProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onFilterChange({
            ...filters,
            [e.target.name]: e.target.value
        });
    }


  return (
    <div className={style.filterContainer}>
      <label className={style.filterWrapper}>
            <p>Languages</p>
            <select value={filters.language} name='language' onChange={handleChange}>
                <option value="">All</option>
                <option value="French">French</option>
                <option value="English">English</option>
                <option value="German">German</option>
                <option value="Ukrainian">Ukrainian</option>
                <option value="Polish">Polish</option>
            </select>
      </label>

        <label className={style.filterWrapper}>
            <p>Level of knowledge</p>
            <select value={filters.level} name='level' onChange={handleChange}>
                <option value="">All</option>
                <option value="A1 Beginner">A1 Beginner</option>
                <option value="A2 Elementary">A2 Elementary</option>
                <option value="B1 Intermediate">B1 Intermediate</option>
                <option value="B2 Upper-Intermediate">B2 Upper-Intermediate</option>
            </select>
      </label>

        <label className={style.filterWrapper}>
            <p>Price</p>
            <select value={filters.price} name='price' onChange={handleChange}>
                <option value="">All</option>
                <option value="10">10 $</option>
                <option value="20">20 $</option>
                <option value="30">30 $</option>
                <option value="40">40 $</option>
            </select>
      </label>

    </div>
  )
}

export default Filters
