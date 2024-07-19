"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Select from "react-select";
import Calendar from "react-calendar";
import { toast } from "react-toastify";
import {
  teams,
  types,
  genderOptions,
  ages,
  venues,
  hours,
} from "@/constants/matchData";
import OutlinedButton from "./common/OutlinedButton";
import PrimaryButton from "./common/PrimaryButton";
import DisabledButton from "./common/DisabledButton";
import useUsers from "@/hooks/useUsers";

const defaultFormFields = {
  home: "",
  away: "",
  type: "",
  gender: "",
  age: "",
  venue: "",
  referee: "",
  referees: [],
  assist1: "",
  assist2: "",
  matchDay: "",
  time: "",
};

const MatchDetailsEdit = ({ resetEditMode }) => {
  const { users } = useUsers();

  const [formFields, setFormFields] = useState(defaultFormFields);
  const [refList, setRefList] = useState([]);
  const [edited, setEdited] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedType, setSelectedType] = useState();
  const [isSingleMatch, setIsSingleMatch] = useState(true);
  const [refereesList, setRefereesList] = useState(null);
  const [refArray, setRefArray] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState();
  const hoursArr = hours;
  const {
    home,
    away,
    type,
    gender,
    age,
    venue,
    referee,
    assist1,
    assist2,
    matchDay,
    time,
  } = formFields;

  const router = useRouter();

  const handleCalendarOpen = (e) => {
    e.preventDefault();
    setShowCalendar((state) => !state);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // test type
    if (type === "7s" || type === "UP torna") {
      let refs = [];
      if (refereesList !== null) {
        refereesList.map((ref) => {
          return refs.push(ref.value);
        });
      }
      setFormFields({ ...formFields, referees: refs });
      if (date !== "" && time !== "" && venue !== "") {
        try {
          await createNewMatch(formFields);
          resetFormFields();
          resetEditMode();
        } catch (error) {
          console.error(error.message);
        }
      } else {
        toast.error("Kérlek, tölts ki minden kötelező mezőt");
      }
    } else {
      if (home === away) {
        toast.error("A hazai és a vendég csapat nem lehet ugyanaz");
        return;
      }
      if (
        (referee !== "" && assist1 !== "" && referee === assist1) ||
        (referee !== "" && assist2 !== "" && referee === assist2) ||
        (assist2 !== "" && assist1 !== "" && assist2 === assist1)
      ) {
        toast.error("A nevek nem egyezhetnek meg");
        return;
      }
      if (
        home !== "" &&
        away !== "" &&
        date !== "" &&
        time !== "" &&
        venue !== ""
      ) {
        try {
          await createNewMatch(formFields);
          resetFormFields();
          resetEditMode();
        } catch (error) {
          console.error(error.message);
        }
      } else {
        toast.error("Kérlek, tölts ki minden kötelező mezőt");
      }
    }
  };

  const exitEditMode = () => {
    router.push("/dashboard/matches");
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleDateChange = () => {
    setFormFields({ ...formFields, date: selectedDate?.format() });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
    setEdited(true);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSelect = (data) => {
    setRefereesList(data);
    let refs = [];
    data.map((ref) => {
      return refs.push(ref.value);
    });
    setFormFields({ ...formFields, referees: refs });
  };

  const createRefArray = () => {
    setRefArray(
      refList.map((n) => ({
        label: n.displayName,
        value: n.displayName,
      })),
    );
  };

  useEffect(() => {
    handleDateChange();
  }, [selectedDate]);

  useEffect(() => {
    if (formFields.type === "7s" || formFields.type === "UP torna") {
      setIsSingleMatch(false);
      createRefArray();
    } else {
      setIsSingleMatch(true);
    }
  }, [selectedType]);

  useEffect(() => {
    setRefList(users);
  }, [users]);

  return (
    <div className="mt-5  mb-6 lg:mx-16 md:mt-0 bg-white md:text-left">
      <form onSubmit={handleSubmit}>
        <div className="overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Típus:
                </label>
                <select
                  id="type"
                  name="type"
                  autoComplete="type"
                  value={type}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => {
                    handleTypeChange(e);
                  }}
                >
                  <option selected disabled={true} value="">
                    --Válassz típust--
                  </option>
                  {types.map((type, id) => (
                    <option key={id}>{type.name}</option>
                  ))}
                </select>
              </div>
              {isSingleMatch && (
                <>
                  <div>
                    <label
                      htmlFor="home"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Hazai:
                    </label>
                    <select
                      id="home"
                      name="home"
                      autoComplete="home"
                      value={home}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    >
                      <option selected disabled={true} value="">
                        --Válassz egyesületet--
                      </option>
                      {teams.map((team, id) => (
                        <option key={id}>{team.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="away"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Vendég:
                    </label>
                    <select
                      id="away"
                      name="away"
                      autoComplete="away"
                      value={away}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    >
                      <option selected disabled={true} value="">
                        --Válassz egyesületet--
                      </option>
                      {teams.map((team, id) => (
                        <option key={id}>{team.name}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700"
                >
                  Neme:
                </label>
                <select
                  id="gender"
                  name="gender"
                  autoComplete="gender"
                  value={gender}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  <option selected disabled={true} value="">
                    --Válassz nemet--
                  </option>
                  {genderOptions.map((data, id) => (
                    <option key={id}>{data.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700"
                >
                  Korosztály:
                </label>
                <select
                  id="age"
                  name="age"
                  autoComplete="age"
                  value={age}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  <option selected disabled={true} value="">
                    --Válassz korosztályt--
                  </option>
                  {ages.map((age, id) => (
                    <option key={id}>{age.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="venue"
                  className="block text-sm font-medium text-gray-700"
                >
                  Helyszín:
                </label>
                <select
                  id="venue"
                  name="venue"
                  autoComplete="venue"
                  value={venue}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  <option selected disabled={true} value="">
                    --Válassz helyszínt--
                  </option>
                  {venues.map((venue, id) => (
                    <option key={id}>{venue.name}</option>
                  ))}
                </select>
              </div>
              {isSingleMatch && (
                <>
                  <div>
                    <label
                      htmlFor="referee"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Játékvezető:
                    </label>
                    <select
                      id="referee"
                      name="referee"
                      autoComplete="referee"
                      value={referee}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    >
                      <option selected disabled={true} value="">
                        --Válassz játékvezetőt--
                      </option>
                      {refList.map((referee, id) => (
                        <option key={id}>{referee.displayName}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="assist1"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Asszisztens 1:
                    </label>
                    <select
                      id="assist1"
                      name="assist1"
                      autoComplete="assist1"
                      value={assist1}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    >
                      <option selected disabled={true} value="">
                        --Válassz asszisztenst--
                      </option>
                      {refList.map((referee, id) => (
                        <option key={id}>{referee.displayName}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="assist2"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Asszisztens 2:
                    </label>
                    <select
                      id="assist2"
                      name="assist2"
                      autoComplete="assist2"
                      value={assist2}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    >
                      <option selected disabled={true} value="">
                        --Válassz asszisztenst--
                      </option>
                      {refList.map((assist2, id) => (
                        <option key={id}>{assist2.displayName}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              <div
                className={
                  !isSingleMatch
                    ? "w-1/2 col-span-2 text-center mx-auto"
                    : "flex flex-col justify-center"
                }
              >
                <label className="block text-sm font-medium text-gray-700">
                  Dátum kiválasztása:
                </label>
                <input
                  type="text"
                  name="eventName"
                  placeholder="---Válassz dátumot---"
                  value={date}
                  id="eventName"
                  autoComplete="eventName"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-2 text-center">
                <div className="mb-4">
                  <OutlinedButton
                    text={"Mutasd a naptárt"}
                    onClick={handleCalendarOpen}
                  />
                </div>
                {showCalendar && (
                  <Calendar
                    onChange={(date) => {
                      setDate(new Date(date).toISOString().slice(0, 10));
                      setEdited(true);
                    }}
                    value={date}
                    onClickDay={() => setShowCalendar(false)}
                  />
                )}
              </div>
              <div
                className={
                  isSingleMatch ? "w-1/2 col-span-2 text-center mx-auto" : ""
                }
              >
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-gray-700"
                >
                  Időpont:
                </label>
                <select
                  id="time"
                  name="time"
                  autoComplete="time"
                  value={time}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  <option selected disabled={true} value="">
                    --Válassz időpontot--
                  </option>
                  {hoursArr.map((hour, id) => (
                    <option key={id}>{hour}</option>
                  ))}
                </select>
              </div>
              {!isSingleMatch && (
                <div>
                  <div className="block text-sm font-medium text-gray-700">
                    Játékvezetők:
                  </div>
                  <Select
                    value={refereesList}
                    className="mt-1 text-sm text-gray-700"
                    placeholder="--Válassz játékvezetőt--"
                    isMulti
                    onChange={handleSelect}
                    options={refArray}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="mt-5 md:mt-10 px-4 py-3 text-center sm:px-6">
            {edited ? (
              <PrimaryButton type={"submit"} text={"Mentem a módosításokat"} />
            ) : (
              <DisabledButton text={"Mentem a módosításokat"} />
            )}
          </div>
          <div className="mb-5 md:mb-10 px-4 py-3 text-center sm:px-6">
            <OutlinedButton
              onClick={exitEditMode}
              type={"button"}
              text={"Mégse"}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default MatchDetailsEdit;
