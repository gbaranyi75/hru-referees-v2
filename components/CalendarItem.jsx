'use client'
import React, { useState, useEffect, useRef } from 'react'
import DatePicker from 'react-multi-date-picker'
import weekends from 'react-multi-date-picker/plugins/highlight_weekends'
import DisabledButton from '@/components/common/DisabledButton'
import PrimaryButton from '@/components/common/PrimaryButton'
import OutlinedButton from '@/components/common/Outlinedbutton'
//import { CalendarCollection } from 'src/contexts/CalendarContext'
import { useRouter } from 'next/navigation'

const format = 'MM/DD'
const mainPosition = 'bottom'
const relativePosition = 'center'
const weekDays = ['Va', 'Hé', 'Ke', 'Sze', 'Csü', 'Pé', 'Szo']
const months = [
  'Jan',
  'Feb',
  'Már',
  'Ápr',
  'Máj',
  'Jún',
  'Júl',
  'Aug',
  'Szep',
  'Okt',
  'Nov',
  'Dec',
]

const CalendarItem = ({ calendar }) => {
  //const { createNewRefAvailabilityCalendar } = CalendarCollection()
  const [currentData, setCurrentdata] = useState(calendar)
  const [dates, setDates] = useState(calendar.days)
  const [eventName, setEventName] = useState('')
  const [edited, setEdited] = useState(false)
  const [showError, setShowError] = useState(false)
  const matchDays = []
  const datePickerRef = useRef()
  const router = useRouter()

  if (calendar.days) setDates[calendar.days]

  const CustomDaysInput = ({ openCalendar, value }) => {
    console.log(value)
    return (
      <input
        type="text"
        value={value}
        readOnly
        placeholder="Klikk ide a megnyitáshoz..."
        className="mt-1 px-4 py-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-solid border border-indigo-50 rounded-md"
        onFocus={openCalendar}
      />
    )
  }

  const exitEditMode = () => {
    router.push('/admindashboard/calendar')
  }

  const mapDaysArray = () => {
    dates.map((date, index) => {
      matchDays.push(date.format())
      return matchDays
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (dates.length !== 0 && eventName !== '') {
      try {
        mapDaysArray()
        console.log(eventName)
        console.log(matchDays)
        //await createNewRefAvailabilityCalendar(eventName, matchDays)
        setDates([])
        setEventName('')
        exitEditMode()
      } catch (error) {
        console.error(error.message)
      }
    } else {
      setShowError(true)
    }
  }

  const handleChange = (e) => {
    setEventName(e.target.value)
    if (e.target.value !== '') {
      setEdited(true)
    }
  }

  useEffect(() => {
    setShowError(false)
  }, [dates])
  console.log(calendar.days)
  return (
    <div className="mt-5 md:mx-32 md:mt-0 bg-white md:text-left">
      <form onSubmit={handleSubmit}>
        <div className="overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label
                  htmlFor="eventName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Esemény neve
                </label>
                <input
                  type="text"
                  name="eventName"
                  value={eventName}
                  id="eventName"
                  autoComplete="eventName"
                  className="mt-1 px-4 py-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-solid border border-indigo-50 rounded-md"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col md:justify-center">
              <label className="mt-6 text-sm font-medium text-gray-700">
                Időpontok kiválasztása:
              </label>

              <DatePicker
                multiple
                format={format}
                weekStartDayIndex={1}
                minDate={new Date()}
                value={dates}
                onChange={setDates}
                weekDays={weekDays}
                months={months}
                calendarPosition={`${mainPosition}-${relativePosition}`}
                sort
                showOtherDays
                placeholder="Klikk ide a megnyitáshoz..."
                render={<CustomDaysInput />}
                ref={datePickerRef}
                plugins={[weekends()]}
              >
                <button
                  className="inline-flex justify-center mb-5 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-500"
                  onClick={() => datePickerRef.current.closeCalendar()}
                >
                  Bezárás
                </button>
              </DatePicker>
              {showError && (
                <p className="mt-2 text-sm text-center text-red-600">
                  Kérlek, add meg a dátumokat!
                </p>
              )}
            </div>
            <div className="mt-5 px-4 py-3 text-center sm:px-6">
              {edited ? (
                <PrimaryButton type={'submit'} text={'Mentés'} />
              ) : (
                <DisabledButton text={'Mentés'} />
              )}
            </div>
            <div className="mb-5 px-4 py-3 text-center sm:px-6">
              <OutlinedButton
                text={'Mégsem'}
                type={'button'}
                onClick={exitEditMode}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CalendarItem
