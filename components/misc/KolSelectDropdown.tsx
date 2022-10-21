import { Combobox } from '@headlessui/react'
import { CaretDownIcon } from 'components'
import { useState } from 'react'
import { KolDropdownListItem } from 'shared/types'
import clsx from 'clsx'
import { kolDropdownList } from 'utils/config'

export function KolSelectDropdown({ selectedPerson, setSelectedPerson }) {
  const [query, setQuery] = useState('')

  const filteredPeople =
    query === ''
      ? kolDropdownList
      : kolDropdownList.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Combobox
      as="div"
      value={selectedPerson}
      onChange={setSelectedPerson}
      className="relative flex w-full"
    >
      <div
        className={clsx(
          'flex-none bg-lime text-black font-mono px-4 md:px-5 py-2 md:text-2xl'
        )}
      >
        藝人
      </div>
      <div
        className={clsx(
          'flex flex-auto border border-lime bg-transparent focus:border-lime focus:ring-0 justify-between pl-2.5'
        )}
      >
        <Combobox.Input
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(person: KolDropdownListItem) => person?.name}
          className="w-full bg-transparent border-0 focus:ring-0 font-mono md:text-2xl px-0"
          placeholder="選擇藝人"
        />
        <Combobox.Button className="px-4">
          <CaretDownIcon />
        </Combobox.Button>
      </div>
      {filteredPeople.length > 0 && (
        <Combobox.Options className="absolute left-0 origin-bottom-left z-10 mt-14 w-full overflow-auto max-h-60 bg-black border border-lime focus:outline-none">
          {filteredPeople.map((person) => (
            <Combobox.Option
              key={person.id}
              value={person}
              className={({ active }) =>
                clsx(
                  'relative cursor-default select-none py-2 pl-3 pr-9 md:text-xl',
                  active ? 'bg-lime text-black' : 'text-white'
                )
              }
            >
              {({ selected, active }) => (
                <span
                  className={clsx(
                    'block truncate',
                    selected && active ? 'text-black' : selected && 'text-lime'
                  )}
                >
                  {person.name}
                </span>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      )}
    </Combobox>
  )
}
