<template>
  <div class="wizard-date-time">
    <div class="row row--margin">
      <div class="column">
        <div class="switch">
          <input class="switch-input" id="checkbox-is-recurring" type="checkbox" name="checkbox-is-recurring"
            :checked="isRecurring"
            @change="updateEventIsRecurring">
          <label class="switch-label" for="checkbox-is-recurring"></label>
        </div>
        <label class="switch-title" for="checkbox-is-recurring">Recurring</label>
      </div>
    </div>

    <div class="row row--margin">
      <div class="column small-12 medium-6 large-4">
        <label>Start Date
          <div class="btn btn--datepicker datepicker">
            <icon class="datepicker-icon" name="calendar"></icon>
            <input class="datepicker-input" type="text" placeholder="Pick a date"
              v-pikaday="localEnableDate"
              v-model="enableDate"
              format="YYYY-MM-DD"
              trigger="true">
          </div>
        </label>
      </div>
      <div class="column small-12 medium-6 large-4" v-if="isRecurring">
        <label>End Date (If Applicable)
          <div class="btn btn--datepicker datepicker">
            <icon class="datepicker-icon" name="calendar"></icon>
            <input class="datepicker-input" type="text" placeholder="Pick a date"
              v-pikaday="localDisableDate"
              v-model="disableDate"
              format="YYYY-MM-DD"
              trigger="true">
          </div>
        </label>
      </div>
    </div>

    <div v-if="isRecurring">
      <label>Recurring Days of the Week</label>
      <div class="row row--margin">
        <div class="column small-12 large-4">
          <div class="button-group">
            <button class="btn btn--grayText" @click="updateEventToggleWeekdays">Weekday</button>
            <button class="btn btn--grayText" @click="updateEventToggleWeekendDays">Weekend</button>
          </div>
        </div>
        <div class="column">
          <template v-for="day in daysOfTheWeek">
            <input class="day-of-week-input"
              type="checkbox"
              id="checkbox-on-{{ day | lowercase }}"
              name="checkbox-on-{{ day | lowercase }}"
              value="{{ day | lowercase }}"
              @change="updateEventRecurringDays">
            <label class="day-of-week-label btn btn--marginRight"
              for="checkbox-on-{{ day | lowercase }}"
              :class="{ 'active': event.schedule[0]['occurs_'+day.toLowerCase()] === true }">
              {{ day | truncate '3' }}
            </label>
          </template>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="column medium-6 large-4">
        <label>
          <div>Start Time</div>
          <input class="input-inline" id="startTimeInput" type="text"
            minLength="4"
            maxLength="5"
            size="5"
            placeholder="xx:xx"
            @input="inputStartTime | debounce 1000"
            :value="startTime">
          <select class="input-inline" id="startTimeSelect"
            @change="inputStartTime"
            :value="startTimeMeridiem">
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </label>
      </div>
      <div class="column">
        <label>
          <div>End Time</div>
          <input class="input-inline" id="endTimeInput" type="text"
            minLength="4"
            maxLength="5"
            size="5"
            placeholder="xx:xx"
            @input="inputEndTime | debounce 1000"
            :value="endTime">
          <select class="input-inline" id="endTimeSelect"
            @change="inputEndTime"
            :value="endTimeMeridiem">
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
  import Icon from 'vue-awesome/src/components/Icon';
  import {
    updateEventEnableDate,
    updateEventDisableDate,
    updateEventRecurringDays,
    updateEventStartTime,
    updateEventEndTime,
    updateEventToggleWeekdays,
    updateEventToggleWeekendDays,
    setMessage,
    dismissMessage,
    setWizardStepValid,
    setWizardStepInvalid,
    setDayOfWeek,
  } from '../core/actions';
  import moment from 'moment';

  const CURRENT_STEP = 0;

  export default {
    name: 'wizard-date-time',

    data() {
      return {
        dayOfWeekTimer: 0,
        localEnableDate: null,
        localDisableDate: null,
        startTimeInput: null,
        startTimeSelect: null,
        endTimeInput: null,
        endTimeSelect: null,
        isRecurring: true,
        daysOfTheWeek: [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
      };
    },

    ready() {
      if (!this.event.schedule[0].disable_date ||
          this.event.schedule[0].disable_date !== this.event.schedule[0].enable_date) {
        this.isRecurring = true;
      } else {
        this.isRecurring = false;
      }

      this.startTimeInput = document.getElementById('startTimeInput');
      this.startTimeSelect = document.getElementById('startTimeSelect');
      this.endTimeInput = document.getElementById('endTimeInput');
      this.endTimeSelect = document.getElementById('endTimeSelect');

      setTimeout(() => this.checkIfValid(), 1);
    },

    computed: {
      enableDate() {
        if (this.event && this.event.schedule[0].enable_date) {
          return moment(this.event.schedule[0].enable_date).format('YYYY-MM-DD');
        }
        return null;
      },

      startTime() {
        if (this.event && this.event.schedule[0].start_time) {
          return moment(this.event.schedule[0].start_time, 'H:mm').format('hh:mm');
        }
        return '';
      },

      startTimeMeridiem() {
        if (this.event && this.event.schedule[0].start_time) {
          return moment(this.event.schedule[0].start_time, 'H:mm').format('A');
        }
        return '';
      },

      disableDate() {
        if (this.event && this.event.schedule[0].disable_date) {
          return moment(this.event.schedule[0].disable_date).format('YYYY-MM-DD');
        }
        return null;
      },

      endTime() {
        if (this.event && this.event.schedule[0].end_time) {
          return moment(this.event.schedule[0].end_time, 'H:mm').format('hh:mm');
        }
        return '';
      },

      endTimeMeridiem() {
        if (this.event !== undefined && this.event.schedule[0].end_time) {
          return moment(this.event.schedule[0].end_time, 'H:mm').format('A');
        }
        return '';
      },

      occursSunday() {
        if (this.event && this.event.schedule[0]) {
          return this.event.schedule[0].occurs_sunday;
        }
        return false;
      },

      occursMonday() {
        if (this.event && this.event.schedule[0]) {
          return this.event.schedule[0].occurs_monday;
        }
        return false;
      },

      occursTuesday() {
        if (this.event && this.event.schedule[0]) {
          return this.event.schedule[0].occurs_tuesday;
        }
        return false;
      },

      occursWednesday() {
        if (this.event && this.event.schedule[0]) {
          return this.event.schedule[0].occurs_wednesday;
        }
        return false;
      },

      occursThursday() {
        if (this.event && this.event.schedule[0]) {
          return this.event.schedule[0].occurs_thursday;
        }
        return false;
      },

      occursFriday() {
        if (this.event && this.event.schedule[0]) {
          return this.event.schedule[0].occurs_friday;
        }
        return false;
      },

      occursSaturday() {
        if (this.event && this.event.schedule[0]) {
          return this.event.schedule[0].occurs_saturday;
        }
        return false;
      },
    },

    methods: {
      validTime(time) {
        return /\d\d?:\d\d(:\d\d)?/.test(time);
      },

      validDates() {
        let datesValid = false;
        const startDateStr = this.enableDate;
        const endDateStr = this.disableDate;
        let daysToMatch = [0, 1, 2, 3, 4, 5, 6];
        const curSched = this.event.schedule[0];
        if (startDateStr && curSched) {
          if (!this.isRecurring) {
            return true;
          }
          if (endDateStr) {
            const startDay = moment(startDateStr);
            const endDay = moment(endDateStr);
            if (startDay.isValid() && endDay.isValid()) {
              endDay.add('days', 1);
              daysToMatch = [];
              for (let m = moment(startDay); m.isBefore(endDay); m.add('days', 1)) {
                daysToMatch.push(m.day());
              }
            } else {
              return datesValid;
            }
          }
          for (const day of daysToMatch) {
            if ((day === 0 && curSched.occurs_sunday) ||
               (day === 1 && curSched.occurs_monday) ||
               (day === 2 && curSched.occurs_tuesday) ||
               (day === 3 && curSched.occurs_wednesday) ||
               (day === 4 && curSched.occurs_thursday) ||
               (day === 5 && curSched.occurs_friday) ||
               (day === 6 && curSched.occurs_saturday)) {
              datesValid = true;
              break;
            }
          }
        }
        return datesValid;
      },

      endAfterStart() {
        const startMom = moment(this.startTime + this.startTimeMeridiem, 'h:mmA');
        const endMom = moment(this.endTime + this.endTimeMeridiem, 'h:mmA');
        if (endMom > startMom || endMom.isSame(moment('12:00AM', 'h:mmA'))) {
          return true;
        }
        this.setMessage({
          name: 'Invalid Time',
          details: 'End time must be later in the day than the start time.',
          type: 'error',
        });
        return false;
      },

      checkIfValid() {
        if (this.validDates()
          && this.validTime(this.endTime)
          && this.validTime(this.startTime)
          && this.startTimeMeridiem.length === 2
          && this.endTimeMeridiem.length === 2
          && this.endAfterStart()) {
          this.setWizardStepValid(CURRENT_STEP);
          return true;
        }
        this.setWizardStepInvalid(CURRENT_STEP);
        return false;
      },

      checkDaysChange() {
        if (!this.validDates()) {
          this.setMessage({
            name: 'Invalid Dates',
            details: 'Days of week selected not in date range.',
            type: 'error',
          });
          this.setWizardStepInvalid(CURRENT_STEP);
        } else {
          this.dismissMessage();
          this.checkIfValid();
        }
      },

      updateEventIsRecurring() {
        this.isRecurring = !this.isRecurring;
        if (!this.isRecurring) {
          this.updateEventDisableDate(this.enableDate);
          this.setDayOfWeek(this.enableDate);
        } else {
          this.updateEventDisableDate(null);
        }
        this.checkIfValid();
      },

      constructTime(timeStr, meridiemStr) {
        let newTime = null;
        if (this.validTime(timeStr)) {
          const momTime = moment(timeStr + meridiemStr, 'h:mmA');
          if (momTime.isValid()) {
            newTime = momTime.format('H:mm');
            return newTime;
          }
        }

        this.setMessage({
          name: 'Invalid Time',
          details: 'Please provide the time in the XX:XX format.',
          type: 'error',
        });
        return 'invalid';
      },

      inputStartTime() {
        const startInput = this.startTimeInput.value;
        const startSelect = this.startTimeSelect.value;
        const timestring = this.constructTime(startInput, startSelect);
        if (timestring !== 'invalid') {
          this.updateEventStartTime(timestring);
          this.checkIfValid();
        } else {
          this.setWizardStepInvalid(CURRENT_STEP);
        }
      },

      inputEndTime() {
        const endInput = this.endTimeInput.value;
        const endSelect = this.endTimeSelect.value;
        let timestring = this.constructTime(endInput, endSelect);
        if (timestring === '0:00') {
          timestring = '23:59:59';
          this.endTimeSelect.value = 'PM';
        }
        if (timestring !== 'invalid') {
          this.updateEventEndTime(timestring);
          this.checkIfValid();
        } else {
          this.setWizardStepInvalid(CURRENT_STEP);
        }
      },
    },

    watch: {
      localEnableDate() {
        const eTime = moment(this.localEnableDate).format('YYYY-MM-DD');
        this.updateEventEnableDate(eTime);
        if (!this.isRecurring) {
          this.updateEventDisableDate(eTime);
          this.setDayOfWeek(this.enableDate);
        }
      },
      localDisableDate() {
        const dTime = moment(this.localDisableDate).format('YYYY-MM-DD');
        this.updateEventDisableDate(dTime);
      },
      occursSunday() {
        clearTimeout(this.daysOfWeekTimer);
        this.daysOfWeekTimer = setTimeout(() => this.checkDaysChange(), 250);
      },
      occursMonday() {
        clearTimeout(this.daysOfWeekTimer);
        this.daysOfWeekTimer = setTimeout(() => this.checkDaysChange(), 250);
      },
      occursTuesday() {
        clearTimeout(this.daysOfWeekTimer);
        this.daysOfWeekTimer = setTimeout(() => this.checkDaysChange(), 250);
      },
      occursWednesday() {
        clearTimeout(this.daysOfWeekTimer);
        this.daysOfWeekTimer = setTimeout(() => this.checkDaysChange(), 250);
      },
      occursThursday() {
        clearTimeout(this.daysOfWeekTimer);
        this.daysOfWeekTimer = setTimeout(() => this.checkDaysChange(), 250);
      },
      occursFriday() {
        clearTimeout(this.daysOfWeekTimer);
        this.daysOfWeekTimer = setTimeout(() => this.checkDaysChange(), 250);
      },
      occursSaturday() {
        clearTimeout(this.daysOfWeekTimer);
        this.daysOfWeekTimer = setTimeout(() => this.checkDaysChange(), 250);
      },
    },

    vuex: {
      actions: {
        updateEventEnableDate,
        updateEventDisableDate,
        updateEventRecurringDays,
        updateEventStartTime,
        updateEventEndTime,
        updateEventToggleWeekdays,
        updateEventToggleWeekendDays,
        setMessage,
        dismissMessage,
        setWizardStepValid,
        setWizardStepInvalid,
        setDayOfWeek,
      },

      getters: {
        currentMomentDate: (state) => state.dates.currentMomentDate,
        event: (state) => state.wizardEvent,
      },
    },

    components: {
      Icon,
    },
  };
</script>

<style lang="scss">
  @import "../styles/variables.scss";
  @import "../styles/foundation_settings.scss";
  @import "../../node_modules/foundation-sites/scss/foundation.scss";

  .input-inline {
    width: auto;
    display: inline-block;
    vertical-align: middle;

    &::placeholder {
      color: $light-medium-grey;
    }
  }

  .day-of-week-input {
    display: none;
  }

  .day-of-week-label {
    margin-left: 0 !important;
  }

  .datepicker {
    display: flex;
  }

  .datepicker-icon {
    flex: 1 0 auto;
    margin-right: 0.25rem;
  }

  .datepicker-input {
    flex: 1 1 auto;
    margin: 0;
    background-color: transparent;
    color: $white;
    border: 0;
    outline: none;
    cursor: pointer;
    box-shadow: none;
    line-height: 1;
    height: rem-calc(20);
    padding: 0 rem-calc(5);

    &::placeholder {
      color: $white;
    }

    &:focus {
      background-color: transparent;
      box-shadow: none;
      border: 0;
      outline: none;
    }
  }

  .datepicker-panel {
    font-family: $body-font-family !important;
    font-size: rem-calc(14);
    color: $black;
    top: calc(100% + 3px) !important;
  }

  .datepicker-header {
    background-color: $medium-blue !important;

    .prev,
    .next,
    .title a {
      &:hover {
        background-color: $light-medium-blue !important;
      }
    }
  }

  .datepicker-body td.selected {
    background-color: $medium-blue !important;

    &:hover {
      background-color: $light-medium-blue !important;
    }
  }
</style>
