<script setup lang="ts">
import { computed, nextTick, ref, useId } from 'vue'

interface AttachedFile {
  name: string
  sizeLabel: string
}

type FormStatus = 'idle' | 'submitting' | 'success'

const props = withDefaults(defineProps<{ variant?: 'full' | 'hero' }>(), {
  variant: 'full',
})

const isHero = computed(() => props.variant === 'hero')

// ConsultForm рендерится дважды на странице (hero + основная форма) — id должны быть уникальны для каждого экземпляра.
const uid = useId()
const nameFieldId = `field-name-${uid}`
const phoneFieldId = `field-phone-${uid}`
const messageFieldId = `field-message-${uid}`
const agreeFieldId = `field-agree-${uid}`

const name = ref('')
const phone = ref('')
const message = ref('')
const agree = ref(false)
const attachedFiles = ref<AttachedFile[]>([])

const status = ref<FormStatus>('idle')
const attemptedSubmit = ref(false)

const phoneError = computed(() => attemptedSubmit.value && phone.value.trim() === '')
const agreeError = computed(() => attemptedSubmit.value && !agree.value)

const errorCount = computed(() => {
  let count = 0
  if (phoneError.value) count++
  if (agreeError.value) count++
  return count
})

const hasErrors = computed(() => errorCount.value > 0)

function errorWord(count: number) {
  if (count === 1) return 'поле'
  return 'поля'
}

function formatPhone(raw: string): string {
  let digits = raw.replace(/\D/g, '')
  if (digits.length === 0) return ''
  if (digits[0] === '8') digits = `7${digits.slice(1)}`
  if (digits[0] !== '7') digits = `7${digits}`
  digits = digits.slice(0, 11)

  const rest = digits.slice(1)
  let result = '+7'
  if (rest.length > 0) result += ` (${rest.slice(0, 3)}`
  if (rest.length >= 3) result += ')'
  if (rest.length > 3) result += ` ${rest.slice(3, 6)}`
  if (rest.length > 6) result += `-${rest.slice(6, 8)}`
  if (rest.length > 8) result += `-${rest.slice(8, 10)}`
  return result
}

// Сколько цифр «содержательной» части номера (без учёта кода страны +7) стоит перед курсором —
// нужно, чтобы после переформатирования вернуть курсор на то же логическое место, а не в конец строки.
function restDigitsBeforeCursor(raw: string, cursorPos: number): number {
  const allDigits = raw.replace(/\D/g, '')
  const beforeDigits = raw.slice(0, cursorPos).replace(/\D/g, '')
  const hasCountryDigit = allDigits.length > 0 && (allDigits[0] === '7' || allDigits[0] === '8')
  let count = beforeDigits.length
  if (hasCountryDigit && count > 0) count -= 1
  return Math.max(0, count)
}

function cursorPositionForRestCount(formatted: string, restCount: number): number {
  if (restCount <= 0) return Math.min(2, formatted.length)
  const tail = formatted.slice(2)
  let seen = 0
  for (let i = 0; i < tail.length; i++) {
    if (/\d/.test(tail[i])) {
      seen++
      if (seen === restCount) return i + 1 + 2
    }
  }
  return formatted.length
}

function onPhoneInput(event: Event) {
  const target = event.target as HTMLInputElement
  const cursorPos = target.selectionStart ?? target.value.length
  const restCount = restDigitsBeforeCursor(target.value, cursorPos)

  const formatted = formatPhone(target.value)
  phone.value = formatted

  const newCursor = cursorPositionForRestCount(formatted, restCount)
  nextTick(() => {
    target.setSelectionRange(newCursor, newCursor)
  })
}

function focusField(id: string) {
  const el = document.getElementById(id)
  el?.focus()
}

function attachFile() {
  if (attachedFiles.value.length >= 5) return
  attachedFiles.value.push({ name: 'Акт о заливе квартиры.pdf', sizeLabel: '1,8 МБ' })
}

function removeFile(index: number) {
  attachedFiles.value.splice(index, 1)
}

function handleSubmit() {
  attemptedSubmit.value = true
  if (hasErrors.value) return

  status.value = 'submitting'
  setTimeout(() => {
    status.value = 'success'
  }, 1200)
}

const submittedPhone = computed(() => phone.value || '+7 (909) 466-11-66')

const submitLabel = computed(() => {
  if (status.value === 'submitting') return 'Отправляем…'
  return isHero.value ? 'Отправить заявку' : 'Получить консультацию'
})
</script>

<template>
  <div class="consult-form" :class="{ 'consult-form--hero': isHero }">
    <div v-if="isHero && status !== 'success'" class="hero-form-head">
      <h2 class="hero-form-head__title">Бесплатная консультация</h2>
      <p class="hero-form-head__subtitle">Ответим в течение 15 минут в рабочее время</p>
    </div>

    <div v-if="status === 'success'" class="success-card">
      <span class="success-card__icon"><CheckCircleIcon :size="56" /></span>
      <h3 class="success-card__title">Заявка принята</h3>
      <p class="success-card__text">
        Юрист перезвонит на {{ submittedPhone }} в течение 15 минут.
      </p>
      <a href="https://wa.me/79094661166" target="_blank" rel="noopener" class="btn btn-navy btn-block">
        Написать в WhatsApp
      </a>
      <a href="https://max.ru/" target="_blank" rel="noopener" class="btn btn-outline-navy btn-block">
        Написать в MAX
      </a>
    </div>

    <form v-else class="form" novalidate @submit.prevent="handleSubmit">
      <div v-if="hasErrors" class="alert">
        <span class="alert__icon"><WarningIcon :size="20" /></span>
        <div class="alert__body">
          <p class="alert__title">Не отправляется: {{ errorCount }} {{ errorWord(errorCount) }}</p>
          <ul class="alert__list">
            <li v-if="phoneError">
              <a :href="`#${phoneFieldId}`" @click.prevent="focusField(phoneFieldId)">Введите номер телефона</a>
            </li>
            <li v-if="agreeError">
              <a :href="`#${agreeFieldId}`" @click.prevent="focusField(agreeFieldId)">Отметьте согласие на обработку данных</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="name-phone-row">
        <div class="field">
          <label :for="nameFieldId">Как к вам обращаться</label>
          <input :id="nameFieldId" v-model="name" type="text" placeholder="Имя">
        </div>

        <div class="field">
          <label :for="phoneFieldId">Телефон <span class="required">*</span></label>
          <input
            :id="phoneFieldId"
            type="tel"
            inputmode="numeric"
            autocomplete="tel"
            placeholder="+7 (___) ___-__-__"
            :value="phone"
            :class="{ 'field--error': phoneError }"
            @input="onPhoneInput"
          >
          <p v-if="phoneError" class="field-error">
            <WarningIcon :size="14" />
            Введите номер телефона — мы позвоним на него
          </p>
        </div>
      </div>

      <div v-if="!isHero" class="field">
        <label :for="messageFieldId">Коротко о ситуации</label>
        <textarea
          :id="messageFieldId"
          v-model="message"
          rows="4"
          placeholder="Например: затопили соседи, управляющая компания отказывается составлять акт"
        />
      </div>

      <div v-if="!isHero" class="field">
        <button v-if="attachedFiles.length < 5" type="button" class="attach-btn" @click="attachFile">
          <PaperclipIcon :size="20" />
          <span class="attach-btn__text">
            <strong>Прикрепить документ или фото</strong>
            <small>PDF, JPG, PNG до 20 МБ</small>
          </span>
        </button>

        <ul v-if="attachedFiles.length" class="attached-list">
          <li v-for="(file, index) in attachedFiles" :key="file.name + index" class="attached-file">
            <FileIcon :size="20" />
            <span class="attached-file__info">
              <span class="attached-file__name">{{ file.name }}</span>
              <span class="attached-file__size">{{ file.sizeLabel }}</span>
            </span>
            <button type="button" class="attached-file__remove" aria-label="Удалить файл" @click="removeFile(index)">
              <CloseIcon :size="14" />
            </button>
          </li>
        </ul>
        <p class="field-hint">Можно приложить до 5 файлов, каждый до 20 МБ</p>
      </div>

      <div class="field">
        <label class="checkbox" :class="{ 'checkbox--error': agreeError }">
          <input :id="agreeFieldId" v-model="agree" type="checkbox">
          <span>
            Я согласен(на) на обработку персональных данных в соответствии с
            <NuxtLink to="/policy" target="_blank">Политикой конфиденциальности</NuxtLink>
          </span>
        </label>
      </div>

      <div class="privacy-note">
        <LockIcon :size="18" />
        <p>Всё, что вы расскажете, защищено адвокатской тайной. Мы не передаём данные третьим лицам.</p>
      </div>

      <button
        type="submit"
        class="btn btn-gold btn-block submit-btn"
        :disabled="status === 'submitting'"
        :class="{ 'submit-btn--loading': status === 'submitting' }"
      >
        <SpinnerIcon v-if="status === 'submitting'" :size="18" />
        <span>{{ submitLabel }}</span>
      </button>
    </form>
  </div>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.name-phone-row {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.hero-form-head {
  margin-bottom: 4px;
}
.hero-form-head__title {
  font-size: 24px;
  line-height: 30px;
  margin: 0 0 6px;
}
.hero-form-head__subtitle {
  margin: 0;
  font-size: 14px;
  color: var(--c-text-muted);
}

.alert {
  display: flex;
  gap: 10px;
  padding: 14px 16px;
  background: var(--c-error-bg);
  border: 1px solid var(--c-error);
  border-radius: var(--r-lg);
  color: var(--c-error);
}
.alert__icon {
  flex-shrink: 0;
  margin-top: 1px;
}
.alert__title {
  margin: 0 0 6px;
  font-weight: 700;
  font-size: 15px;
}
.alert__list {
  margin: 0;
  padding-left: 18px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.alert__list a {
  color: var(--c-error);
  font-size: 14px;
  text-decoration: underline;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.field label {
  font-size: 14px;
  font-weight: 600;
  color: var(--c-text);
}
.required {
  color: var(--c-error);
}
.field input[type="text"],
.field input[type="tel"],
.field textarea {
  height: 56px;
  padding: 0 14px;
  border: 1px solid var(--c-border-strong);
  border-radius: var(--r-md);
  font-size: 17px;
  font-family: var(--font-sans);
  color: var(--c-text-body);
  background: var(--c-white);
  width: 100%;
}
.field textarea {
  height: auto;
  padding: 14px;
  resize: vertical;
  line-height: 22px;
}
.field input:focus,
.field textarea:focus {
  outline: none;
  border-color: var(--c-blue);
}
.field--error {
  border-color: var(--c-error) !important;
}
.field-error {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  font-size: 13px;
  color: var(--c-error);
}
.field-hint {
  margin: 0;
  font-size: 13px;
  color: var(--c-text-muted);
}

.attach-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 14px 16px;
  border-radius: var(--r-md);
  border: 1.5px dashed var(--c-border-strong);
  background: var(--c-surface);
  color: var(--c-navy);
  cursor: pointer;
  text-align: left;
}
.attach-btn__text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.attach-btn__text strong {
  font-size: 15px;
  font-weight: 600;
}
.attach-btn__text small {
  font-size: 12px;
  color: var(--c-text-muted);
}

.attached-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.attached-file {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: var(--r-md);
  border: 1px solid var(--c-border);
  background: var(--c-white);
  color: var(--c-navy);
}
.attached-file__info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.attached-file__name {
  font-size: 14px;
  font-weight: 600;
  color: var(--c-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.attached-file__size {
  font-size: 12px;
  color: var(--c-text-muted);
}
.attached-file__remove {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: var(--c-surface);
  color: var(--c-text-muted);
  cursor: pointer;
}

.checkbox {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14px;
  line-height: 20px;
  color: var(--c-text-body);
  padding: 12px;
  border-radius: var(--r-md);
  border: 1px solid transparent;
  cursor: pointer;
}
.checkbox input {
  margin-top: 3px;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}
.checkbox--error {
  background: var(--c-error-bg);
  border-color: var(--c-error);
}

.privacy-note {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 14px;
  border-radius: var(--r-md);
  background: var(--c-surface);
  color: var(--c-text-muted);
  font-size: 13px;
  line-height: 19px;
}
.privacy-note p {
  margin: 0;
}

.submit-btn {
  gap: 10px;
}
.submit-btn--loading {
  opacity: .45;
}

.success-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
  padding: 32px 20px;
}
.success-card__icon {
  color: var(--c-success);
  margin-bottom: 4px;
}
.success-card__title {
  font-size: 24px;
  margin: 0;
}
.success-card__text {
  font-size: 15px;
  line-height: 22px;
  color: var(--c-text-muted);
  margin: 0 0 12px;
}
.success-card .btn {
  margin-top: 4px;
}

@media (min-width: 1024px) {
  .consult-form:not(.consult-form--hero) .name-phone-row {
    flex-direction: row;
    gap: 18px;
  }
  .consult-form:not(.consult-form--hero) .name-phone-row .field {
    flex: 1;
  }
}
</style>
