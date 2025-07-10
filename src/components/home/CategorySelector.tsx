"use client";

// import { useState } from 'react'
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { HiOutlineCheck, HiOutlineChevronDown } from "react-icons/hi";
import { Category } from "@/store/slices/category/type";
import _ from "lodash";
import { GetIconComponent } from "../setIcon/GetIconComponent";
// import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
// import { CheckIcon } from '@heroicons/react/20/solid'

export default function CategorySelector({
  categories,
  form,
  setForm,
}: {
  categories: Category[];
  form: { category: string };
  setForm: (updater: (prev: any) => any) => void;
}) {
  const selected =
    _.find(categories, (cat) => cat._id === form.category) ?? categories[0];

  return (
    <Listbox
      value={selected}
      onChange={(category: Category) =>
        setForm((prev: any) => ({ ...prev, category: category._id }))
      }
    >
      <Label className="block text-sm font-medium text-gray-900">
        Category
      </Label>
      <div className="relative mt-2">
        <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 border border-gray-300 focus:outline-indigo-600 sm:text-sm">
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <GetIconComponent
              iconName={selected.icon}
              size={20}
              color={selected.color}
            />
            <span className="block truncate">
              {selected.name} - {selected.name_th}
            </span>
          </span>
          <HiOutlineChevronDown
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500"
          />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
        >
          {categories.map((category) => (
            <ListboxOption
              key={category._id}
              value={category}
              className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white"
            >
              <div className="flex items-center gap-2">
                <GetIconComponent
                  iconName={category.icon}
                  size={20}
                  color={category.color}
                />
                <span className="block truncate group-data-selected:font-semibold">
                  {category.name} - {category.name_th}
                </span>
              </div>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                <HiOutlineCheck aria-hidden="true" className="size-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
