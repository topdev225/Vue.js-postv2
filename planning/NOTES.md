# Lift Notes

## Global
- there are issues with Firefox and maybe other browsers handling a bunch of the API calls,
  I've fixed them for get events and tags but all the other tag events are broken. This
  seems like it is a server-side issue and may only be a problem with our current API stub.

## Calendar
- day overlay can't be under features since we need events to have static position to make the popups work

## Wizard
- date and time
  - how to get colon separation?
  - can we use native html5 time inputs? browser support isn't good (http://caniuse.com/#feat=input-datetime), lacking firefox and IE for desktop browsers
  - current datepicker is not compatible with vuex actions

# Questions

## Wizard
- date and time
  - current datepicker formatting is limited
- default photo
  - image picker stuff (this may not be up to us)
- post options
  - figure out data for social networks and how to hook it in (this may not be up to us)
  - hook in pre/post-bumper data, upload dialogs? add new account dialogs? (this may not be up to us)

## Calendar
- how do we display events that span over days, ex. 10pm to 1am the next day (these should probably be split server-side)
- what if feature is at beginning of show, overlapping the show's title, or overlapping another feature


# Extras

## datepicker
- 1.5, switch to pikaday, commit bfd7e857f145259a3f533dfe9c3bd6e77807b252
- 3, datepicker for wizard, commit 5940eace0414fd0e3111d02c02ca63a55a064813, datepicker icon and styles, commit 677773977273fab784813fdd02c0af3e2d49c442
- 2, tried a bunch of different datepickers to find one compatible with our vuex and validation systems (vue-datepicker, vue-date-picker, simple-datepicker, vue-datetime-picker)

## tag picker
- 0.5, Fix event tags not getting updated after change tag name in Manage Tags,
- 2, tagging interface and base styles, commit 5608d05281f8a1681739565bc66b461f5ff80bda,
- 1, tag changes propogate to event tags, commit 9b66f73eede42a18c5a7de66980d4038fbcf5d20
