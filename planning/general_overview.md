# Basic Project Specs

- calendar view with ability to see one day or a full week at a time
- events in calendar have popups with various actions to edit, delete, etc.
- step-by-step wizard for creating or editing events including their date and time, default text, default photo, and post options

# API Endpoints and Sample Data

## Endpoint: /events (GET)
This is the endpoint used on startup to fetch the calendar events. Sample Return Data:
```json
[
  [
    {
      id: 'bfc30a29-b6f6-420c-aab4-60d7d35a39fb',
      title: 'Handmade Concrete Towels',
      description: 'Atque molestiae excepturi non velit ducimus qui illum in voluptatum.',
      type: 'show',
      startTime: 0,
      endTime: 53
    },
    // ... the rest of the event objects for current day
  ],
  // ... up to 6 more arrays like the above for day of the week
]
```

## Endpoint: /event/:eventId (GET)(POST)(PUT)(DELETE)
**NOTE:** Currently we have split these endpoints out due to limitations with the api stub for prototyping.

- GET, Called when editing an existing event in the Wizard.
- POST, Called when creating a new event. No ID will be passed.
- PUT, Called when updating an event.
- DELETE, Called when deleting an event.

Start time and end time are currently stored in 24-hour format. Depending on the requirements we could store the date and time values in a combined datetime format.

Recurring days are stored in title-case format for ease of use on the frontend.

We are currently storing the event image simply as a string.

The event type will be either 'show' or 'feature'.

Sample Event Data:
```json
{
  id: 'bfc30a29-b6f6-420c-aab4-60d7d35a39fb',
  type: 'show',
  isRecurring: true,
  startDate: '2016-07-21',
  endDate: '2017-07-21',
  startTime: '14:02',
  endTime: '18:02',
  recurringDays: [
    'Wednesday',
    'Tuesday',
    'Monday',
    // ... the rest of the recurring days assigned
  ],
  title: 'Lorem ipsum Laborum aliquip dolor Excepteur',
  description: 'Lorem ipsum Laborum aliquip dolor Excepteur.',
  tags: [
    {
      id: '369002ab-5d5e-439d-9016-09503d616e21'
      title: 'Licensed Soft Tuna'
    },
    {
      id: "faf4168a-7009-43e2-9a96-77a78bb10a25"
      title: "Refined Concrete Pizza"
    },
    // ... the rest of the tags assigned
  ],
  image: 'http://lorempixel.com/1200/800'
}
```

## Endpoint: /tags (GET)
This is the endpoint used on the Default Text portion of the Wizard to fetch a list of available tags. Sample Return Data:
```json
[
  {
    id: '369002ab-5d5e-439d-9016-09503d616e21',
    title: 'Licensed Soft Tuna'
  },
  // ... the rest of the available tags like the above
]
```

## Endpoint: /tag/:tagId (POST)(PUT)(DELETE)
**NOTE:** Currently we have split these endpoints out due to limitations with the api stub for prototyping.

- POST, Called when creating a new tag. No ID will be passed.
- PUT, Called when updating a tag.
- DELETE, Called when deleting a tag.

Sample Tag Data:
```json
{
  id: '369002ab-5d5e-439d-9016-09503d616e21'
  title: 'Licensed Soft Tuna'
}
```
