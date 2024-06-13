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
    users: [
      {
        selectedDays: [
          {
            type: String,
          },
        ],
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
