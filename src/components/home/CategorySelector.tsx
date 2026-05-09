"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { Category } from "@/store/slices/category/type";
import _ from "lodash";
import { GetIconComponent } from "../setIcon/GetIconComponent";
import { TbChevronDown, TbCheck } from "react-icons/tb";

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

  if (!selected) return null;

  return (
    <Listbox
      value={selected}
      onChange={(category: Category) =>
        setForm((prev: any) => ({ ...prev, category: category._id }))
      }
    >
      <div className="relative">
        <ListboxButton className="flex items-center justify-between w-full cursor-default rounded-lg bg-flow-bg py-2.5 px-3 text-left text-flow-ink border border-flow focus:border-flow-ink3 outline-none transition-all text-[13px]">
          <span className="flex items-center gap-2 truncate">
            <div 
              className="w-5 h-5 rounded flex items-center justify-center"
              style={{ backgroundColor: selected.color + '20', color: selected.color }}
            >
              <GetIconComponent iconName={selected.icon} size={14} />
            </div>
            <span className="truncate font-medium">
              {selected.name}
            </span>
          </span>
          <TbChevronDown size={14} className="text-flow-ink3" />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-[70] mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white p-1 text-base shadow-xl border border-flow focus:outline-none text-[13px] animate-in fade-in slide-in-from-top-1 duration-200"
        >
          {categories.map((category) => (
            <ListboxOption
              key={category._id}
              value={category}
              className="group relative cursor-pointer rounded-lg py-2 px-3 text-flow-ink select-none hover:bg-flow-bg transition-colors"
            >
              <div className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded-md flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: category.color + '20', color: category.color }}
                >
                  <GetIconComponent iconName={category.icon} size={14} />
                </div>
                <span className="block truncate group-data-selected:font-semibold">
                  {category.name}
                </span>
              </div>

              <span className="absolute inset-y-0 right-3 flex items-center text-flow-ink group-not-data-selected:hidden">
                <TbCheck size={16} />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
