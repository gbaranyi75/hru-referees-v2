import { Schema, model, models } from "mongoose";

const CalendarSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    days: [
      {
        type: String,
        required: true,
      },
    ],
    userSelections: [
      {
        selectedDays: [
          {
            type: String,
          },
        ],
        userName: {
          type: String,
        },
        userId: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Calendar = models.Calendar || model("Calendar", CalendarSchema);

export default Calendar;
